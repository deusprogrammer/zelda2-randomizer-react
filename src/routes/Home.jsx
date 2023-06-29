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
import { TerrainGenerator } from '../lib/rando/TerrainGenerator';

import z2LocationMeta from '../lib/zelda2/templates/z2-location.meta';
import z2VanillaTemplate from '../lib/zelda2/templates/z2-vanilla.template';
import z2VanillaLevels from '../lib/zelda2/templates/z2-vanilla.levels';
import { RANDOMIZER_VERSION } from '../constants/RandoConstants';
import TextData from '../components/TextData';
import { toast } from 'react-toastify';
import { ROM } from '../lib/rando/ROM';
import z2VanillaMap from '../lib/zelda2/templates/z2-vanilla.map';

export default () => {
    const [ rooms, setRooms ] = useState({});
    const [ seed, setSeed ] = useState(0);
    const [ cleanRom, setCleanRom ] = useState(null);
    const [ options, setOptions ] = useState({
        overworld: "VANILLA",
        monsters: "VANILLA"
    });
    const [ mode, setMode ] = useState("USER");
    const [ romData, setRomData ] = useAtom(romAtom);
    const { pathname } = useLocation();

    const parseRom = (rom) => {
        setRomData(parse(rom));
    }

    const onFileLoad = (event) => {
        let fr = new FileReader();

        let file = event.target.files[0];
        
        fr.addEventListener("load", ({target: {result}}) => {
            setCleanRom(new Uint8Array(result));
            parseRom(new Uint8Array(result));
        });

        fr.readAsArrayBuffer(file);
    }

    const randomizeRom = (generateSeed=false) => {
        let newSeed = seed;
        if (generateSeed) {
            newSeed = Math.trunc(Math.random() * (Math.pow(2, 32) - 1));
            setSeed(newSeed);
        }
        
        toast.promise(new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let template = z2VanillaTemplate;
                    let maps = z2VanillaMap;

                    // Generate random terrain
                    if (options.overworld === "RANDOMIZED") {
                        let terrainGenerator = new TerrainGenerator(newSeed);
                        ({template, maps} = terrainGenerator.generateContinents());
                    }
            
                    // Initialize randomizer
                    let randomizer = new Z2Randomizer(template, z2LocationMeta, z2VanillaLevels, newSeed);

                    // Shuffle items and locations
                    let graph = randomizer.randomizeLocationsAndItems();

                    // Randomize enemies
                    let levelData = z2VanillaLevels;
                    if (options.monsters === "RANDOMIZED") {
                        levelData = randomizer.randomizeEnemiesAndPalaces();
                    }

                    // Patch ROM
                    let rom = new ROM(new Uint8Array(cleanRom));
                    let patchedRom = rom.patchRom(graph, maps, levelData);

                    // Reparse ROM to display in admin tools
                    parseRom(patchedRom);
                    resolve();
                } catch (e) {
                    console.error(e);
                    reject();
                }
            }, 500);
        }), {
            pending: "Randomizing ROM...",
            success: "Randomization Successful!  Click 'Download Current ROM' to receive your randomized seed.",
            error: "Failed to generate ROM.  Please note the seed number and give it to one of our administrators."
        })
    }

    useEffect(() => {
        let mode = localStorage.getItem("mode");

        if (!mode) {
            mode = "USER";
        }

        setMode(mode);

        let rooms = localStorage.getItem("connectionData");
        rooms = JSON.parse(rooms);
        setRooms(JSON.stringify(rooms, null, 5));
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const setOption = (field, value) => {
        let optionsCopy = {...options};
        optionsCopy[field] = value;
        setOptions(optionsCopy);
    }

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
                <div>
                    <h2>What is Zelda 2 Randomizer JS?</h2>
                        <p>Zelda 2 Randomizer JS is a web based alternative randomizer for...well...Zelda 2.  Our goal is to make a one stop shop for all things Zelda 2 randomizer including a seed bank that can spit out generated randomized roms and even act as a scoreboard.</p>
                    <h2>Features</h2>
                    <ul>
                        <li>One pass deterministic randomization</li>
                    </ul>
                    <h2>Current Support</h2>
                    <ul>
                        <li>Vanilla overworld location shuffling</li>
                        <li>Item shuffling</li>
                        <li>Enemy Shuffling</li>
                        <li>Random Terrain</li>
                    </ul>
                    <h2>Coming Soon</h2>
                    <ul>
                        <li>Encounter shuffling</li>
                        <li>XP shuffling</li>
                        <li>Drop shuffling</li>
                        <li>Palace room shuffling</li>
                        <li>Town spell shuffling</li>
                    </ul>
                    <h2>FAQ</h2>
                    <h3>Why Make a New One?</h3>
                    <p>Aside from the above reasons, I wanted to explore alternative randomization strategies and map rendering that I think will be much faster and more efficient than the current randomizer.  But mainly I wanted to make a randomizer you don't need to download onto your computer.</p>
                    <h3>Why doesn't X work?</h3>
                    <p>This is still very much a work in progress.  We still have many bugs to squash, but the randomizer is spitting out winnable seeds for the most part with albeit limited randomization.</p>
                    <h3>What's up with all the spoilers?</h3>
                    <p>These are currently in place only to aid in troubleshooting.  These tools are not meant to be a cheating device for the other randomizer.  So don't be a cheater...the only person you are lying to is yourself.  This feature will be locked down to administrators at a later date to allow for tournament organizers to validate a seed is beatable before giving it to the players.</p>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Randomizer</h2>
                <h3>Data</h3>
                <KeyValueTable showHex={false} editable={false} map={{
                    "Randomizer Version": RANDOMIZER_VERSION,
                    "ROM Version": romData.isExtendedRom ? 'Extended' : 'Vanilla'
                }} />
                <h3>Options</h3>
                <div className="data-div">
                    <div style={{display: "grid", gap: "5px", gridTemplateColumns: "1fr 1fr 1fr 1fr"}}>
                        <div>
                            <label>Overworld:</label>
                            <select value={options.overworld} onChange={({target: {value}}) => {setOption("overworld", value)}}>
                                <option value="VANILLA">Vanilla</option>
                                <option value="RANDOMIZED">Randomized</option>
                            </select>
                        </div>
                        <div>
                            <label>Monsters:</label>
                            <select value={options.monsters} onChange={({target: {value}}) => {setOption("monsters", value)}}>
                                <option value="VANILLA">Vanilla</option>
                                <option value="RANDOMIZED">Randomized</option>
                            </select>
                        </div>
                    </div>
                </div>
                <h3>Randomize</h3>
                <div className="data-div">
                    <input type="number" value={seed} onChange={({target: {value}}) => {setSeed(parseInt(value))}} />
                    <button onClick={() => {
                        setSeed(Math.trunc(Math.random() * (Math.pow(2, 32) - 1)));
                    }}>
                        Generate Seed
                    </button>
                    <button onClick={() => {
                        randomizeRom(false);
                    }}>
                        Randomize ROM
                    </button><br/>
                    <button onClick={() => {
                        let file = new File([romData.rawBytes], `Z2RA${seed}.nes`, {type: "application/octet-stream"});
                        FileSaver.saveAs(file);
                    }}>
                        Download Current ROM
                    </button><br />
                    <button onClick={() => {setRomData(null)}}>Close ROM</button>
                </div>

                {mode === "ADMIN" ?
                    <>
                        <h2>Debugging Tools</h2>
                        <h3>Tools</h3>
                        <div className="data-div" style={{display: "flex", flexDirection: "column"}}>
                            <Link to={`${process.env.PUBLIC_URL}/cdl`}><button>CDL Viewer</button></Link>
                            <Link to={`${process.env.PUBLIC_URL}/hex`}><button>Hex Viewer</button></Link>
                            <Link to={`${process.env.PUBLIC_URL}/terrain`}><button>Terrain Generator Test</button></Link>
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

                        <h3>Room Data</h3>
                        <pre>
                            {rooms}
                        </pre>
                    </> : null
                }
            </div>
        );
    }
}