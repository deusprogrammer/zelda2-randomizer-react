import { useState } from 'react';
import { LARGE_OBJECT_SETS, SMALL_OBJECTS } from "../lib/zelda2/Z2Data";

export default ({level, onStepChange}) => {
    const [selectedStep, setSelectedStep] = useState(-1);
    const [intervalHandler, setIntervalHandler] = useState(null);

    return (
        <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
            <div>
                <h5>Header</h5>
                <table className="data-table striped row-labeled">
                { Object.keys(level.header).map(key => {
                    return (
                        <tr>
                            <td>{key}</td>
                            <td>{level.header[key]}</td>
                        </tr>
                    )
                })}
                </table>
            </div>
            <div>
                <h5>Data</h5>
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
                                    console.log("RESTARTING");
                                    step = 0;
                                }
                                onStepChange(step);
                                return step + 1
                            });
                        }, 1000);
                        setIntervalHandler(iHandle);
                    }}>{intervalHandler ? 'Stop Animation' : 'Animate'}</button>
                </div>
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
                    </tr>
                    { level.levelElements.map(({yPosition, advanceCursor, objectNumber}, step) => {
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
                                object = "Collectible Object";
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
            </div>
        </div>
    )
}