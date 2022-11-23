import { LARGE_OBJECT_SETS, SMALL_OBJECTS } from "../lib/zelda2/Z2Data";

export default ({level}) => {
    return (
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
            <h5>Data</h5>
            <table className="data-table striped row-labeled col-labeled">
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
            { level.levelElements.map(({yPosition, advanceCursor, objectNumber}) => {
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
                    <tr>
                        <td>{yPosition}</td>
                        <td>{advanceCursor}</td>
                        <td style={{fontFamily: "monospace, monospace"}}>0x{objectNumber.toString(16).padStart(2, "0")}</td>
                        <td>{object}</td>
                    </tr>
                )
            })}
            </table>
        </div>
    )
}