import HexValue from "./HexValue";

export default ({map, keyMap}) => {
    if (!map) {
        return <div>No Data</div>
    }

    return (
        <table className="data-table striped row-labeled">
            <tr>
                <th>Key</th>
                <th>Value</th>
                <th>ROM Address</th>
            </tr>
            { Object.keys(map).filter(key => !key.startsWith("_")).map((key) => {
                    let value = map[key];
                    return (
                        <tr>
                            <td>{keyMap ? keyMap[key] : key}</td>
                            <td>{value}</td>
                            <td>{map._metadata && map._metadata[key] ? <HexValue>{map._metadata[key].romAddress}</HexValue> : null}</td>
                        </tr>
                    )
                })}
        </table>
    )
}