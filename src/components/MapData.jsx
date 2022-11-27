import { useNavigate } from "react-router";
import HexValue from "./HexValue";

export default ({locationData, continent : continentNumber}) => {
    const navigate = useNavigate();

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
                <th>ROM Address</th>
            </tr>
            {Object.keys(locationData).filter(key => !key.startsWith("_")).map((key) => {
                let {x, y, external, caveSeg, reserved, mapNumber, continent, hPosEnt, mapSet, rightEnt, passThrough, fallInto, _romAddress} = locationData[key];
                if (mapSet === 0 && continent === 0) {      // Overworld
                    mapSet = continentNumber;
                } else if (mapSet === 1 || mapSet === 2) {  // Towns
                    mapSet = 4;
                } else if (mapSet > 2) {
                    mapSet = mapSet + 2;                    // Palaces
                }

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
                        <td><HexValue>{_romAddress}</HexValue></td>
                    </tr>
                )
            })}
        </table>
    )
}