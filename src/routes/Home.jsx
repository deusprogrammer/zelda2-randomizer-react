import { useEffect } from 'react';
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
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
                <input type="file" accept='.nes' onChange={onFileLoad} />
            </div>
        );
    } else {
        let {isDigiShake} = romData;
        return (
            <div>
                <h2>ROM Details</h2>
                <h3>ROM Data</h3>
                <KeyValueTable showHex={false} map={{
                    Version: romData.isDigiShake ? 'DigiShake Randomizer' : 'Vanilla'
                }} />
                <h3>Actions</h3>
                <div className="data-div">
                    <button onClick={() => {setRomData(null)}}>Close ROM</button>
                </div>

                {!isDigiShake ? 
                <>
                    <h3>Graph</h3>
                    <div style={{textAlign: "center"}}>
                        <Link to={`${process.env.PUBLIC_URL}/graph`}>Vanilla Graph Test</Link>
                    </div>
                </> : null}


                <h3>West Hyrule</h3>
                <h4>Data</h4>
                <MapData locationData={romData.westHyruleMap} continent={0} />
                <h4>Map</h4>
                <MapDisplay id="map-0" maps={romData.sideViewMaps} levelExits={romData.levelExits} locationData={romData.westHyruleMap} spriteMap={romData.westHyruleSpriteMap} continent={0} />

                <h3>Death Mountain</h3>
                <h4>Data</h4>
                <MapData locationData={romData.deathMountainHyruleMap} continent={1} />
                <h4>Map</h4>
                <MapDisplay id="map-1" maps={romData.sideViewMaps} levelExits={romData.levelExits} locationData={romData.deathMountainHyruleMap} spriteMap={romData.deathMountainHyruleSpriteMap} continent={1} />

                <h3>East Hyrule</h3>
                <h4>Data</h4>
                <MapData locationData={romData.eastHyruleMap} continent={2} />
                <h4>Map</h4>
                <MapDisplay id="map-2" maps={romData.sideViewMaps} levelExits={romData.levelExits} locationData={romData.eastHyruleMap} spriteMap={romData.eastHyruleSpriteMap} continent={2} />
                
                <h3>Maze Island</h3>
                <h4>Data</h4>
                <MapData locationData={romData.mazeIslandMountainHyruleMap} continent={1} />
                <h4>Map</h4>
                <MapDisplay id="map-3" maps={romData.sideViewMaps} levelExits={romData.levelExits} locationData={romData.mazeIslandMountainHyruleMap} spriteMap={romData.mazeIslandMountainHyruleSpriteMap} continent={1} />
            </div>
        );
    }
}