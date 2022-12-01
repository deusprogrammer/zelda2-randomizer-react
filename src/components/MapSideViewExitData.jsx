import { useState } from "react";
import HexValue from "./HexValue";

export default ({level: {exits: data}}) => {
    const [exitData, updateExitData] = useState({...data});

    const updateField = (key, value) => {
        let copy = {...exitData.levelExitData};
        copy[key] = value;
        updateExitData({...exitData, levelExitData: copy});
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
                        <input value={upExit.mapNumber} onChange={({target: {value}}) => {updateField("upExit", {...upExit, mapNumber: value})}} />
                    </td>
                    <td>
                        <input value={upExit.xCoord} onChange={({target: {value}}) => {updateField("upExit", {...upExit, xCoord: value})}} />
                    </td>
                    <td>
                        <HexValue>{upExit._offset}</HexValue>
                    </td>
                </tr>
                <tr>
                    <td>down</td>
                    <td>
                        <input value={downExit.mapNumber} onChange={({target: {value}}) => {updateField("downExit", {...downExit, mapNumber: value})}} />
                    </td>
                    <td>
                        <input value={downExit.xCoord} onChange={({target: {value}}) => {updateField("downExit", {...downExit, xCoord: value})}} />
                    </td>
                    <td>
                        <HexValue>{downExit._offset}</HexValue>
                    </td>
                </tr>
                <tr>
                    <td>left</td>
                    <td>
                        <input value={leftExit.mapNumber} onChange={({target: {value}}) => {updateField("leftExit", {...leftExit, mapNumber: value})}} />
                    </td>
                    <td>
                        <input value={leftExit.xCoord} onChange={({target: {value}}) => {updateField("leftExit", {...leftExit, xCoord: value})}} />
                    </td>
                    <td>
                        <HexValue>{leftExit._offset}</HexValue>
                    </td>
                </tr>
                <tr>
                    <td>right</td>
                    <td>
                        <input value={rightExit.mapNumber} onChange={({target: {value}}) => {updateField("upExit", {...rightExit, mapNumber: value})}} />
                    </td>
                    <td>
                        <input value={rightExit.xCoord} onChange={({target: {value}}) => {updateField("upExit", {...rightExit, xCoord: value})}} />
                    </td>
                    <td>
                        <HexValue>{rightExit._offset}</HexValue>
                    </td>
                </tr>
                <tr>
                    <td>up</td>
                    <td>
                        <input value={upExit.mapNumber} onChange={({target: {value}}) => {updateField("upExit", {...upExit, mapNumber: value})}} />
                    </td>
                    <td>
                        <input value={upExit.xCoord} onChange={({target: {value}}) => {updateField("upExit", {...upExit, xCoord: value})}} />
                    </td>
                    <td>
                        <HexValue>{upExit._offset}</HexValue>
                    </td>
                    <td>
                        <button>Write</button>
                    </td>
                </tr>
            </table>
        </div>
    )
}