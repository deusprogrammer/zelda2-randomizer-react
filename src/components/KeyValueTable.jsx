import { useState } from "react";
import { useAtom } from "jotai";
import { romAtom } from "../atoms/rom.atom";
import HexValue from "./HexValue";
import FileSaver from "file-saver";
import { maskBits } from "../lib/memory/HexTools";

const LAST_BIT_MASK = 0x01 >>> 0;

export default ({map, keyMap, showHex, editable}) => {
    const [mapCache, updateMapCache] = useState({...map});
    const [romData] = useAtom(romAtom);

    if (editable === undefined || editable === null) {
        editable = true;
    }

    const updateField = (key, value) => {
        let copy = {...mapCache};
        copy[key] = value;
        updateMapCache(copy);
    }

    const writeToROM = (field) => {
        let romDataCopy = new Uint8Array(romData.rawBytes);
        let {offset: romAddress, bitFields} = mapCache._metadata[field];
        
        let byte = 0x0;
        bitFields.forEach(({mask, name}) => {
            let value = mapCache[name];
            console.log(name + " => " + value.toString(2));
            while ((mask & LAST_BIT_MASK) === 0) {
                mask = mask >> 1;
                value = value << 1;
            }
            byte += value;
        });

        romDataCopy[romAddress] = byte;
        let file = new File([romDataCopy], "Zelda 2 Modified.nes", {type: "application/octet-stream"});
        FileSaver.saveAs(file);
    }

    if (!map) {
        return <div>No Data</div>
    }

    if (showHex === undefined || showHex === null) {
        showHex = true;
    }

    return (
        <table className="data-table striped row-labeled">
            <tr>
                <th>Key</th>
                <th>Value</th>
                {showHex ? <th>ROM Address</th> : null}
                <th>Actions</th>
            </tr>
            { Object.keys(mapCache).filter(key => !key.startsWith("_")).map((key) => {
                    let value = mapCache[key];
                    return (
                        <tr>
                            <td>{keyMap ? keyMap[key] : key}</td>
                            <td>{editable ? <input type="text" onChange={({target: {value: v}}) => {updateField(key, v)}} value={value}/> : value}</td>
                            {showHex ? <td>{map._metadata && map._metadata[key] ? <HexValue>{map._metadata[key].offset}</HexValue> : null}</td> : null}
                            <td><button onClick={() => {writeToROM(key)}}>Write</button></td>
                        </tr>
                    )
                })}
        </table>
    )
}