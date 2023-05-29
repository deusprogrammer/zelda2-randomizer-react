import locationMetadata from '../zelda2/templates/z2-location.meta';
import templateData from '../zelda2/templates/z2-vanilla.template';

const fs = require('fs');

import { Z2Randomizer } from './Z2Randomizer';

if (process.argv.length < 3) {
    console.error("You must provide a ROM file to patch");
    process.exit(1);
}

let randomizer = new Z2Randomizer(templateData, locationMetadata, process.argv[3] ? process.argv[3] : 0);
randomizer.randomize();
let rom = fs.readFileSync(process.argv[2]);
let randomizedRom = randomizer.patchRom(rom);
fs.writeFileSync("z2-randomized.nes", randomizedRom, "binary");