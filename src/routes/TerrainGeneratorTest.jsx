import {useState } from 'react';
import MapDisplay from '../components/MapDisplay';

import { generateContinentCelluar } from '../lib/rando/TerrainGenerator';
import IsolationZoneMap from '../components/IsolationZoneMap';

export default () => {
    const [ terrain, setTerrain ] = useState([]);
    const [ cells, setCells ] = useState(null);
    const [ mountainBorders, setMountainBorders] = useState(null);

    const generateTerrain = () => {
        let [compressedMap, terrainCells, isolationZones, mountainBorders] = generateContinentCelluar(64, 64);
        setTerrain(compressedMap);
        setCells(terrainCells);
        setMountainBorders(mountainBorders)
    }

    return (
        <div style={{width: "80%", margin: "auto", textAlign: "center"}}>
            <h2>Random Terrain Test</h2>
            <button onClick={() => generateTerrain()}>Generate Terrain</button>
            { cells ?
                <>
                    <h3>Terrain Map</h3>
                    <MapDisplay overworld={{spriteMap: terrain, locations: [], worldNumber: 0}} maps={[]} terrainCells={cells} mountainBorders={mountainBorders} />
                    <h3>Isolation Zone Map</h3>
                    <IsolationZoneMap terrainCells={cells} />
                </> : null
            }
        </div>
    );
}