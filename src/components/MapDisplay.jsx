import { useState } from "react";
import { useNavigate } from "react-router";
import { explore } from "../lib/zelda2/Z2Utils";

const OVERWORLD_SPRITE_SYMBOLS = [
    {name: "Town", c: "T", color: "white", backgroundColor: "red"},
    {name: "Cave", c: " ", color: "white", backgroundColor: "black"},
    {name: "Palace", c: "P", color: "white", backgroundColor: "red"},
    {name: "Bridge", c: "=", color: "black", backgroundColor: "yellow"},
    {name: "Desert", c: " ", color: "white", backgroundColor: "sandybrown"},
    {name: "Grass", c: " ", color: "white", backgroundColor: "lightgreen"},
    {name: "Forest", c: " ", color: "white", backgroundColor: "green"},
    {name: "Swamp", c: "~", color: "white", backgroundColor: "purple"},
    {name: "Cemetary", c: "+", color: "white", backgroundColor: "purple"},
    {name: "Road", c: " ", color: "white", backgroundColor: "peachpuff"},
    {name: "Lava", c: " ", color: "white", backgroundColor: "crimson"},
    {name: "Mountains", c: "^", color: "white", backgroundColor: "brown"},
    {name: "Water", c: "~", color: "white", backgroundColor: "blue"},
    {name: "Shallow Water", c: "~", color: "white", backgroundColor: "lightblue"},
    {name: "Boulder", c: "O", color: "white", backgroundColor: "brown"},
    {name: "Spider", c: "*", color: "white", backgroundColor: "red"}
]

export default ({maps, overworld: {locations, spriteMap, worldNumber}, terrainCells, mountainBorders}) => {
    const [selectedSquare, setSelectedSquare] = useState("");
    const navigate = useNavigate();

    const printSpriteMap = () => {
        let mapBlocks = [];
        let i = 0;
        for (let sprite of spriteMap) {
            for (let j = 0; j < sprite.length + 1; j++) {
                let x = i % 64;
                let y = Math.floor(i / 64);
                i++;
    
                let found = Object.keys(locations).find(key => {
                    return locations[key].x === x && locations[key].y - 30 === y
                });

                let isolationZone = 0;
                if (terrainCells && terrainCells[y][x]) {
                    isolationZone = terrainCells[y][x].isolationZone;
                }
        
                if (!sprite.type) {
                    mapBlocks.push(
                        <div 
                            key={`${x},${y}`}
                            className={`map-square`}
                            style={{color: "white", backgroundColor: "white"}}
                            onMouseEnter={() => {setSelectedSquare({id: "", name: "Unknown", x, y: y + 30, items: []})}}
                            onMouseLeave={() => {setSelectedSquare(null)}}
                        >
                            {' '}
                        </div>
                    );
                    continue;
                }

                let {name, c, backgroundColor, color} = OVERWORLD_SPRITE_SYMBOLS[sprite.type];

                let hasBorder; 
                let border = '1px solid black';
                if (mountainBorders) {
                    hasBorder = mountainBorders.find(({x: x1, y: y1}) => x === x1 && y === y1 - 30);
                    if (hasBorder) {
                        border = '1px solid yellow';
                    }
                }

                if (found) {
                    let {mapNumber, mapSet, continent, locationKey} = locations[found];
                    if (mapSet === 0 && continent === 0) {      // Overworld
                        mapSet = worldNumber;
                    } else if (mapSet === 1 || mapSet === 2) {  // Towns
                        mapSet = 4;
                    } else if (mapSet > 2) {
                        mapSet = mapSet + 2;                    // Palaces
                    }

                    let items = explore(maps, mapSet, mapNumber);

                    mapBlocks.push(
                        <div 
                            key={`${x},${y}`}
                            className={`map-square blinking`} 
                            style={{color, backgroundColor, border}}
                            onClick={() => {navigate(`${process.env.PUBLIC_URL}/maps/${mapSet}/${mapNumber}`)}}
                            onMouseEnter={() => {setSelectedSquare({id: found, name: locationKey || name, x, y: y + 30, isolationZone, items})}}
                            onMouseLeave={() => {setSelectedSquare(null)}}
                        >
                            {c}
                        </div>
                    );
                } else {
                    mapBlocks.push(
                        <div 
                            key={`${x},${y}`}
                            className={`map-square`}
                            style={{color, backgroundColor, border}}
                            onMouseEnter={() => {setSelectedSquare({id: "", name, x, y: y + 30, isolationZone, items: []})}}
                            onMouseLeave={() => {setSelectedSquare(null)}}
                        >
                            {c}
                        </div>
                    );
                }
            }
        }

        return <div className="map-container">{mapBlocks}</div>;
    }

    return (
        <div>
            {selectedSquare ? 
                <div style={{display: "inline-block", position: "fixed", top: "0px", left: "0px", padding: "20px", backgroundColor: "gray", color: "white"}}>
                    <h6>{selectedSquare.id}[{selectedSquare.name}]({selectedSquare.x}, {selectedSquare.y}) ISO: {selectedSquare.isolationZone}</h6>
                    {selectedSquare.items.filter(item => (item.number >= 0 && item.number <= 7) || (item.number >= 14 && item.number <= 15) || (item.number >= 19 && item.number <= 21)).map(item => <div>{item.name}</div>)}
                </div>
                : null
            }
            {printSpriteMap()}
        </div>
    )
}