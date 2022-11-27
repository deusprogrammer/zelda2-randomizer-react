import parse from '../Z2Parser';
import graphData from '../zelda2/z2-vanilla.graph';
import fs from 'fs';
import { createVanillaNodeMapping } from '../zelda2/Z2Utils';

const findMissing = (romData, templateData) => {
    let template = {};
    romData.mapData.forEach((world) => {
        Object.keys(world).filter(locationKey => !locationKey.startsWith("_")).forEach(locationKey => {
            let templateKey = Object.keys(templateData).find((nodeName) => locationKey === templateData[nodeName].locationKey);

            if (!templateKey) {
                console.log("MISSING " + locationKey);
                return;
            }
        });
    });
    return template;
}

let romFile = process.argv[2];
let rom = fs.readFileSync(romFile);
let romData = parse(rom);

let corrected = createVanillaNodeMapping(graphData, romData.mapData);
console.log(JSON.stringify(corrected, null, 5));

// findMissing(romData, templateData);