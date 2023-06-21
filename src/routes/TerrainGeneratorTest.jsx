import {useState } from 'react';
import MapDisplay from '../components/MapDisplay';

import { TerrainGenerator, compressMap } from '../lib/rando/TerrainGenerator';
import IsolationZoneMap from '../components/IsolationZoneMap';
import Graph from '../components/Graph';

const TYPE_MAP = {
    12: "MOUNTAIN",
    13: "WATER"
}

export default () => {
    const [ westHyrule, setWestHyrule ] = useState({});
    const [ eastHyrule, setEastHyrule ] = useState({});
    const [ template, setTemplate ] = useState({});

    const generateTerrain = () => {
        let terrainGenerator = new TerrainGenerator(Math.random() * (Math.pow(2, 32) - 1));
        let {continents, maps, template} = terrainGenerator.generateContinents();

        continents[0].compressedMap = compressMap(maps[0]);
        continents[2].compressedMap = compressMap(maps[2]);

        setWestHyrule(continents[0]);
        setEastHyrule(continents[2]);
        setTemplate(template);
    }

    return (
        <div style={{width: "80%", margin: "auto", textAlign: "center"}}>
            <h2>Random Terrain Test</h2>
            <button onClick={() => generateTerrain()}>Generate Terrain</button>
            { westHyrule.terrain && eastHyrule.terrain ?
                <>
                    <h3>West Hyrule</h3>
                    <h4>Terrain Map</h4>
                    <MapDisplay overworld={{spriteMap: westHyrule.compressedMap, locations: Object.values(template).filter(location => location.continent === 0), worldNumber: 0}} maps={[]} terrainCells={westHyrule.terrain} mountainBorders={westHyrule.mountainBorders} />
                    <h4>Isolation Zone Map</h4>
                    <IsolationZoneMap terrainCells={westHyrule.terrain} />
                    <h4>Connections</h4>
                    { westHyrule.connections.map(({to, from, blockers}) =>
                        <div>{to} =&gt; {from} [{blockers.map(blocker => TYPE_MAP[blocker]).join(', ')}]</div>
                    )}
                    <h3>East Hyrule</h3>
                    <h4>Terrain Map</h4>
                    <MapDisplay overworld={{spriteMap: eastHyrule.compressedMap, locations: Object.values(template).filter(location => location.continent === 2), worldNumber: 2}} maps={[]} terrainCells={eastHyrule.terrain} mountainBorders={eastHyrule.mountainBorders} />
                    <h4>Isolation Zone Map</h4>
                    <IsolationZoneMap terrainCells={eastHyrule.terrain} />
                    <h4>Connections</h4>
                    { eastHyrule.connections.map(({to, from, blockers}) =>
                        <div>{to} =&gt; {from} [{blockers.map(blocker => TYPE_MAP[blocker]).join(', ')}]</div>
                    )}
                    <h3>Graph</h3>
                    <Graph template={template} />
                    <h3>Template</h3>
                    <pre style={{textAlign: "left"}}>
                    {
                        JSON.stringify(template, null, 5)
                    }
                    </pre>
                </> : null
            }
        </div>
    );
}