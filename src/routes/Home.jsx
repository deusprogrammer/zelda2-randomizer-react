import { useEffect } from 'react';
import { useLocation } from "react-router";
import { useAtom } from 'jotai';

import { parse } from '../lib/Z2Parser';
import MapData from '../components/MapData';
import MapDisplay from '../components/MapDisplay';
import { romAtom } from '../atoms/rom.atom';
import KeyValueTable from '../components/KeyValueTable';

export default () => {
    const [ romData, setRomData ] = useAtom(romAtom);
    const { pathname } = useLocation();

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

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
                <h3>ROM Data</h3>
                <button onClick={() => {setRomData(null)}}>Close ROM</button>
                <KeyValueTable map={{
                    Version: romData.isDigiShake ? 'DigiShake Randomizer' : 'Vanilla'
                }} />


                <h3>West Hyrule</h3>
                <h4>Data</h4>
                <MapData locationData={romData.westHyruleMap} continent={0} />
                <h4>Map</h4>
                <MapDisplay id="map-0" locationData={romData.westHyruleMap} spriteMap={romData.westHyruleSpriteMap} continent={0} />

                <h3>Death Mountain</h3>
                <h4>Data</h4>
                <MapData locationData={romData.deathMountainHyruleMap} continent={1} />
                <h4>Map</h4>
                <MapDisplay id="map-1" locationData={romData.deathMountainHyruleMap} spriteMap={romData.deathMountainHyruleSpriteMap} continent={1} />

                <h3>East Hyrule</h3>
                <h4>Data</h4>
                <MapData locationData={romData.eastHyruleMap} continent={2} />
                <h4>Map</h4>
                <MapDisplay id="map-2" locationData={romData.eastHyruleMap} spriteMap={romData.eastHyruleSpriteMap} continent={2} />
                
                <h3>Maze Island</h3>
                <h4>Data</h4>
                <MapData locationData={romData.mazeIslandMountainHyruleMap} continent={3} />
                <h4>Map</h4>
                <MapDisplay id="map-3" locationData={romData.mazeIslandMountainHyruleMap} spriteMap={romData.mazeIslandMountainHyruleSpriteMap} continent={3} />
            </div>
        );
    }
}