export default ({map, keyMap}) => {
    return (
        <table className="data-table striped row-labeled">
            { Object.keys(map).map((key) => {
                    let value = map[key];
                    console.log(key + " = " + value);
                    return (
                        <tr>
                            <td>{keyMap ? keyMap[key] : key}</td>
                            <td>{value}</td>
                        </tr>
                    )
                })}
        </table>
    )
}