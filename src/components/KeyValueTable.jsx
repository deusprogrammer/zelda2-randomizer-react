import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { romAtom } from "../atoms/rom.atom";
import HexValue from "./HexValue";
import { writeFieldToROM } from "../lib/memory/HexTools";
import parse from "../lib/Z2Parser";
import { toast } from "react-toastify";

export default ({map, keyMap, showHex, editable}) => {
    const [mapCache, updateMapCache] = useState({...map});
    const [romData, setRomData] = useAtom(romAtom);

    if (editable === undefined || editable === null) {
        editable = true;
    }

    const updateField = (key, value) => {
        let copy = {...mapCache};
        copy[key] = value;
        updateMapCache(copy);
    }

    const writeData = (key) => {
        try {
            let updatedBytes = writeFieldToROM(mapCache, key, romData.rawBytes);
            setRomData(parse(updatedBytes));
            toast("ROM has been updated", {type: "success"});
        } catch (error) {
            toast("Failed to update ROM", {type: "error"});
        }
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
            </tr>
            { Object.keys(mapCache).filter(key => !key.startsWith("_")).map((key) => {
                    let value = mapCache[key];
                    return (
                        <tr key={key}>
                            <td>{keyMap ? keyMap[key] : key}</td>
                            <td>{editable ? 
                                <input 
                                    type="text" 
                                    onBlur={({target: {value: v}}) => {writeData(key)}}
                                    onChange={({target: {value: v}}) => {updateField(key, v)}} 
                                    value={value}/> : value}
                            </td>
                            {showHex ? <td>{map._metadata && map._metadata[key] ? <HexValue>{map._metadata[key].offset}</HexValue> : null}</td> : null}
                        </tr>
                    )
                })}
        </table>
    )
}