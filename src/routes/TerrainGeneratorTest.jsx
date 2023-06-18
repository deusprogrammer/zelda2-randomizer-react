import {useState } from 'react';
import MapDisplay from '../components/MapDisplay';

import { generateContinentCelluar } from '../lib/rando/TerrainGenerator';
import IsolationZoneMap from '../components/IsolationZoneMap';

const TYPE_MAP = {
    12: "MOUNTAIN",
    13: "WATER"
}

export default () => {
    const [ terrain, setTerrain ] = useState([]);
    const [ cells, setCells ] = useState(null);
    const [ mountainBorders, setMountainBorders ] = useState(null);
    const [ connections, setConnections ] = useState([]);

    const generateTerrain = () => {
        let [compressedMap, terrainCells, isolationZones, mountainBorders, connections] = generateContinentCelluar(64, 64);
        setTerrain(compressedMap);
        setCells(terrainCells);
        setMountainBorders(mountainBorders);
        setConnections(connections);
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
                    <h3>Connections</h3>
                    { connections.map(({to, from, blockers}) =>
                        <div>{to} =&gt; {from} [{blockers.map(blocker => TYPE_MAP[blocker]).join(', ')}]</div>
                    )}
                </> : null
            }
        </div>
    );
}