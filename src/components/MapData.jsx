export default ({locationData}) => {
    return (
        <table className="map-data-table">
            <tr>
                <th></th>
                <th>x</th>
                <th>y</th>
                <th>external</th>
                <th>caveSeg</th>
                <th>reserved</th>
                <th>mapNumber</th>
                <th>hPosEnt</th>
                <th>continent</th>
                <th>mapSet</th>
                <th>rightEnt</th>
                <th>passThrough</th>
                <th>fallInto</th>
            </tr>
            {Object.keys(locationData).map((key) => {
                let {x, y, external, caveSeg, reserved, mapNumber, hPosEnt, continent, mapSet, rightEnt, passThrough, fallInto} = locationData[key];
                return (
                    <tr>
                        <td>{key}</td>
                        <td>{x}</td>
                        <td>{y}</td>
                        <td>{external}</td>
                        <td>{caveSeg}</td>
                        <td>{reserved}</td>
                        <td>{mapNumber}</td>
                        <td>{hPosEnt}</td>
                        <td>{continent}</td>
                        <td>{mapSet}</td>
                        <td>{rightEnt}</td>
                        <td>{passThrough}</td>
                        <td>{fallInto}</td>
                    </tr>
                )
            })}
        </table>
    )
}