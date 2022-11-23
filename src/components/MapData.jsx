import { useNavigate } from "react-router";

export default ({locationData, continent : continentNumber}) => {
    const navigate = useNavigate();

    console.log("CONTINENT: " + continentNumber);

    return (
        <table className="data-table striped row-labeled col-labeled link-rows">
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
                let {x, y, external, caveSeg, reserved, mapNumber, continent, hPosEnt, mapSet, rightEnt, passThrough, fallInto} = locationData[key];
                if (mapSet === 0 && continent === 0) {// Overworld
                    mapSet = continentNumber;
                } else if (mapSet === 1 || mapSet === 2) {  // Towns
                    mapSet = 4;
                } else if (mapSet > 2) {
                    mapSet = mapSet + 2;                    // Palaces
                }
                console.log("KEY:       " + key);
                console.log("CONTINENT: " + continentNumber);
                console.log("MAPSET:    " + mapSet);
                console.log("\n");
                return (
                    <tr onClick={() => {navigate(`${process.env.PUBLIC_URL}/maps/${mapSet}/${mapNumber}`)}}>
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