import { useState } from "react";
import { useNavigate } from "react-router";
import { explore } from "../lib/zelda2/Z2Utils";

const OVERWORLD_SPRITE_SYMBOLS = [
    {c: "T", color: "white", backgroundColor: "red"},
    {c: " ", color: "white", backgroundColor: "black"},
    {c: "P", color: "white", backgroundColor: "red"},
    {c: "=", color: "black", backgroundColor: "yellow"},
    {c: " ", color: "white", backgroundColor: "sandybrown"},
    {c: " ", color: "white", backgroundColor: "lightgreen"},
    {c: " ", color: "white", backgroundColor: "green"},
    {c: "~", color: "white", backgroundColor: "purple"},
    {c: "+", color: "white", backgroundColor: "purple"},
    {c: " ", color: "white", backgroundColor: "peachpuff"},
    {c: " ", color: "white", backgroundColor: "crimson"},
    {c: "^", color: "white", backgroundColor: "brown"},
    {c: "~", color: "white", backgroundColor: "blue"},
    {c: "~", color: "white", backgroundColor: "lightblue"},
    {c: "O", color: "white", backgroundColor: "brown"},
    {c: "*", color: "white", backgroundColor: "red"}
]

export default ({maps, levelExits, spriteMap, locationData, continent: continentNumber}) => {
    const [selectedSquare, setSelectedSquare] = useState("");
    const navigate = useNavigate();

    const printSpriteMap = (mapObject, locations) => {
        let mapBlocks = [];
        let i = 0;
        for (let sprite of mapObject) {
            for (let j = 0; j < sprite.length + 1; j++) {
                let x = i % 64;
                let y = Math.ceil(i / 64);
                i++;
    
                let found = Object.keys(locations).find(key => {
                    return locations[key].x === x && locations[key].y - 29 === y
                });
        
                let {c, backgroundColor, color} = OVERWORLD_SPRITE_SYMBOLS[sprite.type];

                if (found) {
                    let {mapNumber, mapSet, continent} = locations[found];
                    if (mapSet === 0 && continent === 0) {      // Overworld
                        mapSet = continentNumber;
                    } else if (mapSet === 1 || mapSet === 2) {  // Towns
                        mapSet = 4;
                    } else if (mapSet > 2) {
                        mapSet = mapSet + 2;                    // Palaces
                    }

                    let items = explore(maps, levelExits, mapNumber, mapSet);

                    mapBlocks.push(
                        <div 
                            className={`map-square blinking`} 
                            style={{color, backgroundColor}}
                            onClick={() => {navigate(`${process.env.PUBLIC_URL}/maps/${mapSet}/${mapNumber}`)}}
                            onMouseEnter={() => {setSelectedSquare({name: found, items})}}
                            onMouseLeave={() => {setSelectedSquare(null)}}
                        >
                            {c}
                        </div>
                    );
                } else {
                    mapBlocks.push(
                        <div 
                            className={`map-square`}
                            style={{color, backgroundColor}}
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
                    <h6>{selectedSquare.name}</h6>
                    {selectedSquare.items.filter(item => (item.number >= 0 && item.number <= 7) || (item.number >= 14 && item.number <= 15) || (item.number >= 19 && item.number <= 21)).map(item => <div>{item.name}</div>)}
                </div>
                : null
            }
            {printSpriteMap(spriteMap, locationData)}
        </div>
    )
}