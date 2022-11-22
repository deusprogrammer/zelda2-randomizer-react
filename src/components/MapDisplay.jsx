import { useState } from "react";

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

export default ({spriteMap, locationData}) => {
    const [selectedSquare, setSelectedSquare] = useState("");

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
                mapBlocks.push(
                    <div 
                        className={`map-square ${found ? 'blinking' : ''}`} 
                        style={{color, backgroundColor}}
                        onMouseEnter={() => {setSelectedSquare(found)}}
                        onMouseLeave={() => {setSelectedSquare(null)}}
                    >
                        {c}
                    </div>
                );
            }
        }

        return <div className="map-container">{mapBlocks}</div>;
    }

    return (
        <div>
            {selectedSquare ? <div style={{display: "inline-block", position: "fixed", top: "0px", left: "0px", backgroundColor: "gray", color: "white"}}>{selectedSquare}</div>: null}
            {printSpriteMap(spriteMap, locationData)}
        </div>
    )
}