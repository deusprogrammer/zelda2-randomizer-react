import HexValue from "./HexValue";

export default (data) => {
    let {levelExitData: {upExit, leftExit, downExit, rightExit}} = data;
    return (
        <div className="level-exit-data">
            <h5>Level Exits</h5>
            <table className="data-table striped row-labeled col-labeled">
                <tr>
                    <td>Direction</td><td>Map Number</td><td>X Position</td><td>ROM Address</td>
                </tr>
                <tr>
                    <td>up</td><td>{upExit.mapNumber}</td><td>{upExit.xCoord}</td><td><HexValue>{upExit._romAddress}</HexValue></td>
                </tr>
                <tr>
                    <td>left</td><td>{leftExit.mapNumber}</td><td>{leftExit.xCoord}</td><td><HexValue>{leftExit._romAddress}</HexValue></td>
                </tr>
                <tr>
                    <td>down</td><td>{downExit.mapNumber}</td><td>{downExit.xCoord}</td><td><HexValue>{downExit._romAddress}</HexValue></td>
                </tr>
                <tr>
                    <td>right</td><td>{rightExit.mapNumber}</td><td>{rightExit.xCoord}</td><td><HexValue>{rightExit._romAddress}</HexValue></td>
                </tr>
            </table>
        </div>
    )
}