import parse from '../Z2Parser';
import graphData from '../zelda2/z2-vanilla.graph';
import fs from 'fs';
import { createVanillaNodeMapping } from '../zelda2/Z2Utils';

let romFile = process.argv[2];
let rom = fs.readFileSync(romFile);
let romData = parse(rom);

let corrected = createVanillaNodeMapping(graphData, romData.mapData);
console.log(JSON.stringify(corrected, null, 5));