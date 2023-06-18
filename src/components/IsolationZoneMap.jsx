const ISOLATION_ZONE_COLORS = [
    "red",
    "green",
    "blue",
    "yellow",
    "magenta",
    "turquoise",
    "purple",
    "gray",
    "lightgray",
    "darkblue",
    "palegreen",
    "olive",
    "orange",
    "limegreen",
    "fuschia",
    "aliceblue",
    "beige",
    "brown",
    "coral",
    "chocolate",
    "goldenrod",
    "darkcyan",
    "darkred",
    "pink",
    "deeppink",
    "gold",
    "khaki"
]

export default ({terrainCells}) => {
    if (!terrainCells) {
        return null;
    }

    const printSpriteMap = () => {
        let mapBlocks = [];
        
        for (let y = 0; y <  terrainCells.length; y++) {
            for (let x = 0; x < terrainCells[0].length; x++) {
                if (terrainCells[y][x].isolationZone === undefined) {
                    mapBlocks.push(
                        <div 
                            className={`map-square`}
                            style={{color: "black"}}
                        >
                            X
                        </div>
                    );
                    continue;
                }
                mapBlocks.push(
                    <div 
                        className={`map-square`}
                        onClick={() => {alert(terrainCells[y][x].isolationZone)}}
                        style={{backgroundColor: ISOLATION_ZONE_COLORS[terrainCells[y][x].isolationZone]}}
                    >
                    </div>
                );
            }
        }

        return <div className="map-container">{mapBlocks}</div>;
    }

    return (
        <div>
            {printSpriteMap()}
        </div>
    )
}