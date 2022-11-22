import './App.css';

import {useState} from 'react';
import { parse } from './lib/Z2Parser';
import MapData from './components/MapData';
import MapDisplay from './components/MapDisplay';
import MapSideViewDisplay from './components/MapSideViewDisplay';
import MapSideViews from './components/MapSideViews';

function App() {
    const [romData, setRomData] = useState(null);

    const parseRom = (romData) => {
        setRomData(parse(romData, "VANILLA"));
    }

    const onFileLoad = (event) => {
        let fr = new FileReader();

        let file = event.target.files[0];
        
        fr.addEventListener("load", ({target: {result}}) => {
            parseRom(new Uint8Array(result));
        });

        fr.readAsArrayBuffer(file);
    }

    return (
        <div>
            <h1>Zelda 2 Rando</h1>
            { !romData ?
                <div>
                    <h2>ROM File Selection</h2>
                    <label>Zelda 2 ROM File</label>
                    <input type="file" onChange={onFileLoad} />
                </div> :
                <div>
                    <h2>ROM Details</h2>
                    <h3>West Hyrule</h3>
                    <h4>Data</h4>
                    <MapData locationData={romData.westHyruleMap} />
                    <h4>Map</h4>
                    <MapDisplay locationData={romData.westHyruleMap} spriteMap={romData.westHyruleSpriteMap} />
                    <h4>Side View Maps</h4>
                    <MapSideViews locationData={romData.westHyruleMap} maps={romData.sideViewMaps} continent={0} />

                    <h3>East Hyrule</h3>
                    <h4>Data</h4>
                    <MapData locationData={romData.eastHyruleMap} />
                    <h4>Map</h4>
                    <MapDisplay locationData={romData.eastHyruleMap} spriteMap={romData.eastHyruleSpriteMap} />
                    <h4>Side View Maps</h4>
                    <MapSideViews locationData={romData.eastHyruleMap} maps={romData.sideViewMaps} continent={2} />
                    
                    <h3>Death Mountain</h3>
                    <h4>Data</h4>
                    <MapData locationData={romData.deathMountainHyruleMap} />
                    <h4>Map</h4>
                    <MapDisplay locationData={romData.deathMountainHyruleMap} spriteMap={romData.deathMountainHyruleSpriteMap} />
                    <h4>Side View Maps</h4>
                    <MapSideViews locationData={romData.deathMountainHyruleMap} maps={romData.sideViewMaps} continent={1} />

                    <h3>Maze Island</h3>
                    <h4>Data</h4>
                    <MapData locationData={romData.mazeIslandMountainHyruleMap} />
                    <h4>Map</h4>
                    <MapDisplay locationData={romData.mazeIslandMountainHyruleMap} spriteMap={romData.mazeIslandMountainHyruleSpriteMap} />
                    <h4>Side View Maps</h4>
                    <MapSideViews locationData={romData.mazeIslandMountainHyruleMap} maps={romData.sideViewMaps} continent={1} />
                </div>
            }
        </div>
    );
}

export default App;
