import { useAtom } from 'jotai';

import { parse } from '../lib/Z2Parser';
import MapData from '../components/MapData';
import MapDisplay from '../components/MapDisplay';
import { romAtom } from '../atoms/rom.atom';

export default () => {
    const [romData, setRomData] = useAtom(romAtom);

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

    if (!romData) {
        return (
            <div style={{width: "80%", margin: "auto", textAlign: "center"}}>
                <h2>ROM File Selection</h2>
                <label>Zelda 2 ROM File</label>
                <input type="file" onChange={onFileLoad} />
            </div>
        );
    } else {
        return (
            <div>
                <h2>ROM Details</h2>
                <h3>West Hyrule</h3>
                <h4>Data</h4>
                <MapData locationData={romData.westHyruleMap} />
                <h4>Map</h4>
                <MapDisplay locationData={romData.westHyruleMap} spriteMap={romData.westHyruleSpriteMap} />

                <h3>East Hyrule</h3>
                <h4>Data</h4>
                <MapData locationData={romData.eastHyruleMap} />
                <h4>Map</h4>
                <MapDisplay locationData={romData.eastHyruleMap} spriteMap={romData.eastHyruleSpriteMap} />
                
                <h3>Death Mountain</h3>
                <h4>Data</h4>
                <MapData locationData={romData.deathMountainHyruleMap} />
                <h4>Map</h4>
                <MapDisplay locationData={romData.deathMountainHyruleMap} spriteMap={romData.deathMountainHyruleSpriteMap} />

                <h3>Maze Island</h3>
                <h4>Data</h4>
                <MapData locationData={romData.mazeIslandMountainHyruleMap} />
                <h4>Map</h4>
                <MapDisplay locationData={romData.mazeIslandMountainHyruleMap} spriteMap={romData.mazeIslandMountainHyruleSpriteMap} />
            </div>
        );
    }
}