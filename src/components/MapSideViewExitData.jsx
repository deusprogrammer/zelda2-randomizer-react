export default ({levelExitData: {upExit, leftExit, downExit, rightExit}}) => {
    return (
        <div className="level-exit-data">
            <h5>Level Exits</h5>
            <table className="level-exit-data-table">
                <tr>
                    <td>Direction</td><td>Map Number</td><td>X Position</td>
                </tr>
                <tr>
                    <td>up</td><td>{upExit.mapNumber}</td><td>{upExit.xCoord}</td>
                </tr>
                <tr>
                    <td>left</td><td>{leftExit.mapNumber}</td><td>{leftExit.xCoord}</td>
                </tr>
                <tr>
                    <td>down</td><td>{downExit.mapNumber}</td><td>{downExit.xCoord}</td>
                </tr>
                <tr>
                    <td>right</td><td>{rightExit.mapNumber}</td><td>{rightExit.xCoord}</td>
                </tr>
            </table>
        </div>
    )
}