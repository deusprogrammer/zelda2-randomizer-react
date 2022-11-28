import fs from 'fs';
import {hexExtractor} from '../memory/HexTools';

let file = fs.readFileSync(process.argv[2]);

const MAPPING = {
    SCENE_MAP_INDEX: {
        offset: 0x0561
    },
    TOWN_CODE: {
        offset: 0x056B
    },
    PALACE_CODE: {
        offset: 0x056C
    },
    OVERWORLD_INDEX: {
        offset: 0x0706
    },
    WORLD: {
        offset: 0x0707
    },
    AREA_LOCATION_INDEX: {
        offset: 0x0748
    },
    BANK: {
        offset: 0x0769
    }
}

let [extractedData] = hexExtractor(MAPPING, file);
let transformed = {};
for (let key in extractedData) {
    if (key.startsWith("_")) {
        continue;
    }
    transformed[key] = {value: extractedData[key], offset: "0x" + extractedData._metadata[key].offset.toString(16)};
}

console.table(transformed);