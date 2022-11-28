import parse from '../Z2Parser';
import graphData from '../zelda2/templates/z2-vanilla.v2.graph';
import fs from 'fs';

let romFile = process.argv[2];
let rom = fs.readFileSync(romFile);
let romData = parse(rom);

const mapNames = [
    "WEST HYRULE",
    "DEATH MOUNTAIN",
    "EAST HYRULE",
    "MAZE ISLAND"
]

const createVanillaNodeMapping = (graphData, mapData) => {
    let mapping = {};
    let template = {};
    Object.keys(graphData).forEach((nodeName, i) => {
        mapping[nodeName] = `NODE${i}`;
    });
    Object.keys(graphData).forEach((nodeName, i) => {
        let {id, renderData: {map}} = graphData[nodeName];

        let {x, y} = mapData[map][id] || {x: 0, y: 0};

        template[`NODE${i}`] = {id, x, y, map, mapName: mapNames[map]};
    });
    return template;
}

let corrected = createVanillaNodeMapping(graphData, romData.mapData);
console.log(JSON.stringify(corrected, null, 5));