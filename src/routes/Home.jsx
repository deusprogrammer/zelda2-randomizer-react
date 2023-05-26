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
import { RANDOMIZER_VERSION } from '../constants/RandoConstants';
import TextData from '../components/TextData';
import { toast } from 'react-toastify';

export default () => {
    const [ seed, setSeed ] = useState(0);
    const [ romData, setRomData ] = useAtom(romAtom);
    const { pathname } = useLocation();

    const parseRom = (rom) => {
        setRomData(parse(rom));
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
            parseRom(patchedRom);
            toast("ROM randomized.  Click download current rom to get patched rom.", {type: "info"});
        } catch (e) {
            alert(`Our apologies...this seed has caused an error.  Please report the seed value to the developer to aid them in troubleshooting.\n\nSeed number: ${seed}`);
            console.error(e);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (!romData) {
        return (
            <div style={{width: "80%", margin: "auto", textAlign: "center"}}>
                <img src={`${process.env.PUBLIC_URL}/i-farted.png`} style={{width: "500px"}} />
                <div>
                    <h2>Randomizer Details</h2>
                    <h3>Data</h3>
                    <KeyValueTable showHex={false} editable={false} map={{
                        "Randomizer Version": RANDOMIZER_VERSION,
                    }} />
                    <h2>ROM File Selection</h2>
                    <input type="file" accept='.nes' onChange={onFileLoad} />
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <h2>Actions</h2>
                    <h3>Tools</h3>
                    <Link to={`${process.env.PUBLIC_URL}/cdl`}><button>CDL Viewer</button></Link>
                    <Link to={`${process.env.PUBLIC_URL}/hex`}><button>Hex Viewer</button></Link>
                </div>
                <div>
                    <h2>What is Zelda 2 Randomizer JS?</h2>
                        <p>Zelda 2 Randomizer JS is a web based alternative randomizer for...well...Zelda 2.  Our goal is to make a one stop shop for all things Zelda 2 randomizer including a seed bank that can spit out generated randomized roms and even act as a scoreboard.</p>
                    <h2>FAQ</h2>
                    <h3>Why Make a New One?</h3>
                    <p>Aside from the above reasons, I wanted to explore alternative randomization strategies and map rendering that I think will be much faster and more efficient than the current randomizer.  But mainly I wanted to make a randomizer you don't need to download onto your computer.</p>
                    <h3>Why doesn't X work?</h3>
                    <p>This is still very much a work in progress.  We still have many bugs to squash, but the randomizer is spitting out winnable seeds for the most part with albeit limited randomization.</p>
                    <h3>What currently works?</h3>
                    <p>Right now the randomizer only generates a vanilla map with shuffled locations and items.  No enemies, xp, palace rooms, etc are shuffled YET...but they will be.</p>
                    <h3>What's up with all the spoilers?</h3>
                    <p>These are currently in place only to aid in troubleshooting.  These tools are not meant to be a cheating device for the other randomizer.  So don't be a cheater...the only person you are lying to is yourself.  This feature will be locked down to administrators at a later date to allow for tournament organizers to validate a seed is beatable before giving it to the players.</p>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Randomizer Details</h2>
                <h3>Data</h3>
                <KeyValueTable showHex={false} editable={false} map={{
                    "Randomizer Version": RANDOMIZER_VERSION,
                    "ROM Version": romData.isExtendedRom ? 'Extended' : 'Vanilla'
                }} />
                <h3>Actions</h3>
                <div className="data-div">
                    <h4>Tools</h4>
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

                <h3>Text Data</h3>
                <TextData textData={romData.textData} />
            </div>
        );
    }
}