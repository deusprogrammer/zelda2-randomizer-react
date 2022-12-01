import { useAtom } from "jotai";
import { useState } from "react";
import { toast } from "react-toastify";
import { romAtom } from "../atoms/rom.atom";
import { writeFieldToROM } from "../lib/memory/HexTools";
import parse from "../lib/Z2Parser";
import HexValue from "./HexValue";

export default ({level: {exits: data}}) => {
    const [exitData, updateExitData] = useState({...data});
    const [romData, setRomData] = useAtom(romAtom);

    const updateField = (key, value) => {
        let copy = {...exitData.levelExitData};
        copy[key] = value;
        updateExitData({...exitData, levelExitData: copy});
    }

    const updateROM = (key) => {
        try {
            let updatedBytes = writeFieldToROM(exitData, key, romData.rawBytes);
            setRomData(parse(updatedBytes));
            toast("ROM has been updated", {type: "success"});
        } catch (error) {
            toast("Failed to update ROM", {type: "error"});
        }
    }

    let {upExit, leftExit, downExit, rightExit} = exitData;
    return (
        <div className="level-exit-data">
            <h5>Level Exits</h5>
            <table className="data-table striped row-labeled col-labeled">
                <tr>
                    <th>Direction</th>
                    <th>Map Number</th>
                    <th>X Position</th>
                    <th>ROM Address</th>
                    <th>Actions</th>
                </tr>
                <tr>
                    <td>up</td>
                    <td>
                        <input value={upExit.mapNumber} onBlur={() => {updateROM("upExit")}} onChange={({target: {value}}) => {updateField("upExit", {...upExit, mapNumber: value})}} />
                    </td>
                    <td>
                        <input value={upExit.xCoord} onBlur={() => {updateROM("upExit")}} onChange={({target: {value}}) => {updateField("upExit", {...upExit, xCoord: value})}} />
                    </td>
                    <td>
                        <HexValue>{upExit._offset}</HexValue>
                    </td>
                </tr>
                <tr>
                    <td>down</td>
                    <td>
                        <input value={downExit.mapNumber} onBlur={() => {updateROM("downExit")}} onChange={({target: {value}}) => {updateField("downExit", {...downExit, mapNumber: value})}} />
                    </td>
                    <td>
                        <input value={downExit.xCoord} onBlur={() => {updateROM("downExit")}} onChange={({target: {value}}) => {updateField("downExit", {...downExit, xCoord: value})}} />
                    </td>
                    <td>
                        <HexValue>{downExit._offset}</HexValue>
                    </td>
                </tr>
                <tr>
                    <td>left</td>
                    <td>
                        <input value={leftExit.mapNumber} onBlur={() => {updateROM("leftExit")}} onChange={({target: {value}}) => {updateField("leftExit", {...leftExit, mapNumber: value})}} />
                    </td>
                    <td>
                        <input value={leftExit.xCoord} onBlur={() => {updateROM("leftExit")}} onChange={({target: {value}}) => {updateField("leftExit", {...leftExit, xCoord: value})}} />
                    </td>
                    <td>
                        <HexValue>{leftExit._offset}</HexValue>
                    </td>
                </tr>
                <tr>
                    <td>right</td>
                    <td>
                        <input value={rightExit.mapNumber} onBlur={() => {updateROM("rightExit")}} onChange={({target: {value}}) => {updateField("rightExit", {...rightExit, mapNumber: value})}} />
                    </td>
                    <td>
                        <input value={rightExit.xCoord} onBlur={() => {updateROM("rightExit")}} onChange={({target: {value}}) => {updateField("rightExit", {...rightExit, xCoord: value})}} />
                    </td>
                    <td>
                        <HexValue>{rightExit._offset}</HexValue>
                    </td>
                </tr>
            </table>
        </div>
    )
}