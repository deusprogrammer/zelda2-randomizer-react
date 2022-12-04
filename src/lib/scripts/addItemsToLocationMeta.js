import parse from '../Z2Parser';
import fs from 'fs';

import locationMetadata from '../zelda2/templates/z2-location.v3.meta';
import { explore } from '../zelda2/Z2Utils';

let rom = fs.readFileSync(process.argv[2]);
let romData = parse(rom);

let newLocationData = {};
for (let locationKey in locationMetadata) {
    let {id, type, mapSet, continent, worldNumber, mapNumber, passThrough, ability, abilityRequirements, spellRequirements, items, itemRequirements, entryRequirements, completionRequirements, links, linkRequirements, romMetaData} = locationMetadata[locationKey];
    
    if (mapSet === 0 && worldNumber === 0) {      // Overworld
        mapSet = continent;
    } else if (mapSet === 1 || mapSet === 2) {  // Towns
        mapSet = 4;
    } else if (mapSet > 2) {
        mapSet = mapSet + 2;                    // Palaces
    }

    let itemRomMetaData = explore(romData.sideViewMaps, mapSet, mapNumber);
    newLocationData[locationKey] = {id, type, continent: worldNumber, worldNumber: continent, mapSet, mapNumber, passThrough, ability, abilityRequirements, spellRequirements, items, itemRequirements, entryRequirements, completionRequirements, links, linkRequirements, romMetaData, itemRomMetaData};
}

console.log("export default " + JSON.stringify(newLocationData, null, 4));