import { useEffect } from 'react';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { romAtom } from '../atoms/rom.atom';
import { LARGE_OBJECT_SETS, SMALL_OBJECTS } from "../lib/zelda2/Z2Data";
import { ITEM_MAP } from '../lib/zelda2/Z2Utils';
import HexValue from './HexValue';
import KeyValueTable from './KeyValueTable';
import { writeFieldToROM } from '../lib/memory/HexTools';
import parse from '../lib/Z2Parser';

export default ({level, onStepChange, location}) => {
    const [romData, setRomData] = useAtom(romAtom);
    const [selectedStep, setSelectedStep] = useState(-1);
    const [intervalHandler, setIntervalHandler] = useState(null);

    const [collectibleItems, setCollectibleItems] = useState([]);

    useEffect(() => {
        let items = [];
        level.levelElements.forEach((element, i) => {
            let offset = 0x0;
            if (element.collectableObjectNumber) {
                offset = element._metadata.collectableObjectNumber.offset;
            }
            items.push({itemNumber: element.collectableObjectNumber || -1, romAddress: offset, element});
        });
        setCollectibleItems(items);
    }, [level.levelElements]);

    const updateCollectibleItem = (elementIndex, itemNumber, romAddress) => {
        let copy = [...collectibleItems];
        let elementCopy = {...copy[elementIndex].element};
        elementCopy.collectableObjectNumber = itemNumber;
        copy[elementIndex] = {itemNumber, romAddress};
        setCollectibleItems(copy);

        let updatedBytes = writeFieldToROM(elementCopy, "collectableObjectNumber", romData.rawBytes);
        setRomData(parse(updatedBytes));
    }

    let extraContent;
    if (location) {
        let {x, y, external, caveSeg, reserved, continent, mapSet, mapNumber, rightEnt, hPosEnt, passThrough, fallInto, _metadata} = location;
        extraContent = (
            <div>
                <h5>Location Data</h5>
                <KeyValueTable 
                    map={{x, y, external, caveSeg, reserved, continent, mapSet, mapNumber, rightEnt, hPosEnt, passThrough, fallInto, _metadata}} />
            </div>
        )
    }

    return (
        <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
            {extraContent}
            <div>
                <h5>Header</h5>
                <table className="data-table striped row-labeled">
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                        <th>ROM Address</th>
                    </tr>
                    { Object.keys(level.header).filter(key => !key.startsWith("_")).map(key => {
                        return (
                            <tr>
                                <td>{key}</td>
                                <td>{level.header[key]}</td>
                                <td><HexValue>{level.header._metadata[key].offset}</HexValue></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            <div>
                <h5>Enemy Data</h5>
                <table className="data-table striped">
                    <thead>
                        <tr>
                            <th>Offset</th>
                            <th>Enemy Name</th>
                            <th>Enemy Number</th>
                            <th>X</th>
                            <th>Y</th>
                            <th>Height</th>
                        </tr>
                    </thead>
                    <tbody>
                        {level.enemyData.enemies.map(({x, y, name, enemyNumber, height}, index) => 
                            <tr>
                                <td>{index}</td>
                                <td>{name}</td>
                                <td><HexValue>{enemyNumber}</HexValue></td>
                                <td>{x}</td>
                                <td>{y}</td>
                                <td>{height}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <h5>Data</h5>
                <table className="data-table striped col-labeled link-rows">
                    <tr>
                        <th>
                            Y Position
                        </th>
                        <th>
                            Advance Cursor
                        </th>
                        <th>
                            Object Number
                        </th>
                        <th>
                            Object
                        </th>
                        <th>
                            ROM Address
                        </th>
                    </tr>
                    { level.levelElements.map(({yPosition, advanceCursor, objectNumber, collectableObjectNumber, _offset, _metadata}, step) => {
                        let mapSetNumber = level.mapSetNumber;
                        let object = "unknown";
                        let size = 1;
                        if (yPosition === 0xD) {
                            object = ">Change floor height";
                        } else if (yPosition === 0xE) {
                            object = `>Advance cursor to ${advanceCursor * 16}`;
                        } else if (yPosition === 0xF) {
                            object = "Extra Object";
                        } else {
                            if (objectNumber === 0xF && yPosition < 13) {
                                let itemNumber = collectableObjectNumber;
                                let offset = _metadata["collectableObjectNumber"].offset;
                                if (collectibleItems[step]) {
                                    itemNumber = collectibleItems[step].itemNumber;
                                }
                                object = (
                                    <select value={itemNumber} onChange={({target: {value}}) => {updateCollectibleItem(step, value, offset)}}>
                                        { ITEM_MAP.map((item, i) => {
                                            return <option value={i}>{item}</option>
                                        })}
                                    </select>
                                );
                            } else if (objectNumber > 0xF) {
                                size = objectNumber & 0b00001111;
                                objectNumber = objectNumber >> 4;
                                let {name, type, width, height} = LARGE_OBJECT_SETS[mapSetNumber][level.header.objectSet][objectNumber];
                                object = `${name} [${type}] ${width}X${height}`;
                            } else if (objectNumber <= 0xF) {
                                let {name, type, width, height} = SMALL_OBJECTS[mapSetNumber][objectNumber];
                                object = `${name} [${type}] ${width}X${height}`;
                            }
                        }
                        return (
                            <tr onClick={() => {onStepChange(step); setSelectedStep(step);}} className={selectedStep === step ? 'selected' : ''}>
                                <td>{yPosition}</td>
                                <td>{advanceCursor}</td>
                                <td style={{fontFamily: "monospace, monospace"}}>0x{objectNumber.toString(16).padStart(2, "0")}</td>
                                <td>{object}</td>
                                <td><HexValue>{_offset}</HexValue></td>
                            </tr>
                        )
                    })}
                    <tr onClick={() => {onStepChange(-1);setSelectedStep(-1);}} className={selectedStep === -1 ? 'selected' : ''}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Done</td>
                    </tr>
                </table>
                <div className="data-div">
                    <button onClick={() => {
                        setSelectedStep(0);
                        onStepChange(0);

                        if (intervalHandler) {
                            clearInterval(intervalHandler);
                            setIntervalHandler(null);
                            setSelectedStep(-1);
                            onStepChange(-1);
                            return;
                        }

                        let iHandle = setInterval(() => {
                            setSelectedStep(step => {
                                if (step + 1 > level.levelElements.length + 1) {
                                    step = 0;
                                }
                                onStepChange(step);
                                return step + 1
                            });
                        }, 1000);
                        setIntervalHandler(iHandle);
                    }}>{intervalHandler ? 'Stop Animation' : 'Animate'}</button>
                </div>
            </div>
        </div>
    )
}