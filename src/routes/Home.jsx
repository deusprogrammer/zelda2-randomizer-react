import { useEffect, useState } from 'react';
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';

import { parse } from '../lib/Z2Parser';
import MapData from '../components/MapData';
import MapDisplay from '../components/MapDisplay';
import { romAtom } from '../atoms/rom.atom';
import KeyValueTable from '../components/KeyValueTable';
import FileSaver from 'file-saver';
import { Z2Randomizer } from '../lib/rando/Z2Randomizer';

import z2VanillaTemplate from '../lib/zelda2/templates/z2-vanilla.template';
import z2LocationMeta from '../lib/zelda2/templates/z2-location.meta';

export default () => {
    const [ seed, setSeed ] = useState(0);
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

    const randomizeRom = () => {
        try {
            let randomizer = new Z2Randomizer(z2VanillaTemplate, z2LocationMeta, seed);
            randomizer.randomize();
            let patchedRom = randomizer.patchRom(romData.rawBytes);
            setRomData(parse(patchedRom));
        } catch (e) {
            alert(`Our apologies...this seed has caused an error.  Please report the seed value to the developer to aid them in troubleshooting.  Seed number: ${seed}G`);
            console.error(e);
            setRomData(null);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (!romData) {
        return (
            <div style={{width: "80%", margin: "auto", textAlign: "center"}}>
                <div>
                    <h2>ROM File Selection</h2>
                    <input type="file" accept='.nes' onChange={onFileLoad} />
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <h2>Debugging Tools</h2>
                    <Link to={`${process.env.PUBLIC_URL}/cdl`}><button>CDL Viewer</button></Link>
                    <Link to={`${process.env.PUBLIC_URL}/hex`}><button>Hex Viewer</button></Link>
                </div>
            </div>
        );
    } else {
        let {isDigiShake} = romData;
        return (
            <div>
                <h2>ROM Details</h2>
                <h3>ROM Data</h3>
                <KeyValueTable showHex={false} editable={false} map={{
                    Version: romData.isDigiShake ? 'DigiShake Randomizer' : 'Vanilla'
                }} />
                <h3>Actions</h3>
                <div className="data-div">
                    <h4>Viewing</h4>
                    <Link to={`${process.env.PUBLIC_URL}/hex`}><button>Hex Viewer</button></Link><br/>
                    <Link to={`${process.env.PUBLIC_URL}/cdl`}><button>CDL Viewer</button></Link><br/>
                    <h4>ROM</h4>

                    <input type="number" value={seed} onChange={({target: {value}}) => {setSeed(value)}} />
                    <button onClick={() => {
                        setSeed(Math.trunc(Math.random() * (Math.pow(2, 32) - 1)));
                    }}>
                        Generate Seed
                    </button><br />
                    <button onClick={() => {
                        randomizeRom();
                    }}>
                        Randomize ROM (Alpha)
                    </button><br />
                    <button onClick={() => {
                        let file = new File([romData.rawBytes], "Zelda 2.modified.nes", {type: "application/octet-stream"});
                        FileSaver.saveAs(file);
                    }}>
                        Download Current ROM
                    </button><br />
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
                <MapData overworld={romData.overworld[0]} continent={0} />
                <h4>Map</h4>
                <MapDisplay id="map-0" maps={romData.sideViewMaps} overworld={romData.overworld[0]} />

                <h3>Death Mountain</h3>
                <h4>Data</h4>
                <MapData overworld={romData.overworld[1]} continent={1} />
                <h4>Map</h4>
                <MapDisplay id="map-1" maps={romData.sideViewMaps} overworld={romData.overworld[1]} />

                <h3>East Hyrule</h3>
                <h4>Data</h4>
                <MapData overworld={romData.overworld[2]} continent={2} />
                <h4>Map</h4>
                <MapDisplay id="map-2" maps={romData.sideViewMaps} overworld={romData.overworld[2]} />
                
                <h3>Maze Island</h3>
                <h4>Data</h4>
                <MapData overworld={romData.overworld[3]} continent={3} />
                <h4>Map</h4>
                <MapDisplay id="map-3" maps={romData.sideViewMaps} overworld={romData.overworld[3]} />
            </div>
        );
    }
}