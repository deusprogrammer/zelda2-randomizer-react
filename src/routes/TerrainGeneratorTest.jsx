import {useState } from 'react';
import MapDisplay from '../components/MapDisplay';

import { generateContinentCelluar } from '../lib/rando/TerrainGenerator';

export default () => {
    const [ terrain, setTerrain ] = useState([]);

    const generateTerrain = () => {
        let compressedMap = generateContinentCelluar(64, 64);
        setTerrain(compressedMap);
    }

    return (
        <div style={{width: "80%", margin: "auto", textAlign: "center"}}>
            <h2>Random Terrain Test</h2>
            <button onClick={() => generateTerrain()}>Generate Terrain</button>
            <MapDisplay overworld={{spriteMap: terrain, locations: [], worldNumber: 0}} maps={[]} />
        </div>
    );
}