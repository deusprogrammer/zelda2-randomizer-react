import HexValue from "./HexValue";

export default ({map, keyMap, showHex}) => {
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
            { Object.keys(map).filter(key => !key.startsWith("_")).map((key) => {
                    let value = map[key];
                    return (
                        <tr>
                            <td>{keyMap ? keyMap[key] : key}</td>
                            <td>{value}</td>
                            {showHex ? <td>{map._metadata && map._metadata[key] ? <HexValue>{map._metadata[key].romAddress}</HexValue> : null}</td> : null}
                        </tr>
                    )
                })}
        </table>
    )
}