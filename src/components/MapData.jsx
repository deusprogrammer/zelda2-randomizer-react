export default ({locationData}) => {
    return (
        <div className="map-data-display">
            <div className="table-head"></div>
            <div className="table-head">x</div>
            <div className="table-head">y</div>
            <div className="table-head">external</div>
            <div className="table-head">caveSeg</div>
            <div className="table-head">reserved</div>
            <div className="table-head">mapNumber</div>
            <div className="table-head">hPosEnt</div>
            <div className="table-head">worldNumber</div>
            <div className="table-head">rightEnt</div>
            <div className="table-head">passThrough</div>
            <div className="table-head">fallInto</div>
            {Object.keys(locationData).map((key) => {
                let {x, y, external, caveSeg, reserved, mapNumber, hPosEnt, worldNumber, rightEnt, passThrough, fallInto} = locationData[key];
                return (
                    <>
                        <div>{key}</div>
                        <div>{x}</div>
                        <div>{y}</div>
                        <div>{external}</div>
                        <div>{caveSeg}</div>
                        <div>{reserved}</div>
                        <div>{mapNumber}</div>
                        <div>{hPosEnt}</div>
                        <div>{worldNumber}</div>
                        <div>{rightEnt}</div>
                        <div>{passThrough}</div>
                        <div>{fallInto}</div>
                    </>
                )
            })}
        </div>
    )
}