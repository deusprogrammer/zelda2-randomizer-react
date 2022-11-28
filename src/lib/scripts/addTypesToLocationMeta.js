import parse from '../Z2Parser';
import locationMeta from '../zelda2/templates/z2-location.meta';
import graphData from '../zelda2/z2-vanilla.graph';
import fs from 'fs';
import { getLocationByKey } from '../zelda2/Z2Utils';
import { type } from 'os';

let romFile = process.argv[2];
let rom = fs.readFileSync(romFile);
let romData = parse(rom);

const CONNECTING_AREAS = [
    "EAST_HYRULE_BRIDGE",
    "MAZE_ISLAND_BRIDGE",
    "DM_ENTRANCE",
    "DM_EXIT",
    "FAIRY_CAVE_HOLE",
    "FAIRY_CAVE"
];

const isConnectingArea = (name) => {
    if (CONNECTING_AREAS.includes(name)) {
        return true;
    }

    const connectingRegex = /^.*(CAVE|BRIDGE|DOCK).*_(W|E|N|S|(W|E|N|S|D)_(BR|BL|TR|TL)|A|K|ENTRANCE|EXIT)$/;

    return connectingRegex.test(name);
}

const getType = (locationMetaKey) => {
    let type = "OTHER";
    if (locationMetaKey.includes("CAVE")) {
        type = "CAVE";
    } else if (locationMetaKey.includes("BRIDGE")) {
        type = "BRIDGE";
    } else if (locationMetaKey.includes("TOWN")) {
        type = "TOWN";
    } else if (locationMetaKey.includes("BOULDER")) {
        type = "BOULDER";
    } else if (locationMetaKey.includes("DOCK")) {
        type = "DOCK";
    }  else if (["P1", "P2", "P3", "P4", "P5", "P6", "GP"].includes(locationMetaKey)) {
        type = "PALACE";
    }

    return type;
}

const getBaseName = (locationMetaKey) => {
    const connectingRegex = /^(.*)_(W|E|N|S|(W|E|N|S|D)_(BR|BL|TR|TL)|A|K|ENTRANCE|EXIT)$/;
    const match = connectingRegex.exec(locationMetaKey);

    if (!match) {
        return null;
    }

    return match[1];
}

let newLocationMeta = {}
Object.keys(locationMeta).forEach(locationMetaKey => {
    let type = getType(locationMetaKey);

    let {passThrough} = getLocationByKey(romData, locationMetaKey);

    let {continent, mapSet, mapNumber, items, spells, requirements} = locationMeta[locationMetaKey];
    
    let graphLocation = graphData[locationMetaKey];
    if (!graphLocation) {
        return;
    }

    let connections;
    if (isConnectingArea(locationMetaKey) && graphLocation.connections) {
        connections = graphLocation.connections.filter(connectedArea => isConnectingArea(connectedArea) && getBaseName(locationMetaKey) === getBaseName(connectedArea));
        if (connections.length <= 0) {
            connections = undefined;
        }
    }

    newLocationMeta[locationMetaKey] = {type, continent, mapSet, mapNumber, passThrough: passThrough === 1 ? true : false, items, spells, requirements, connections};
})

console.log("export default " + JSON.stringify(newLocationMeta, null, 4));