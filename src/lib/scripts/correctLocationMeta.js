import locationData from '../zelda2/templates/z2-location.v2.meta';
import parse from '../Z2Parser';
import fs from 'fs';
import { getLocationByKey } from '../zelda2/Z2Utils';
import { CONTINENT_MAPPINGS } from '../zelda2/Z2MemoryMappings';

let rom = fs.readFileSync(process.argv[2]);
let romData = parse(rom);

let newLocationData = {};
for (let locationKey in locationData) {
    let [location, continent] = getLocationByKey(romData, locationKey);
    let {continent: worldNumber} = location;
    let {id, type, mapSet, mapNumber, passThrough, ability, abilityRequirements, spellRequirements, items, itemRequirements, entryRequirements, completionRequirements, links, linkRequirements} = locationData[locationKey];
    let romMetaData = CONTINENT_MAPPINGS[continent][locationKey];
    newLocationData[locationKey] = {id, type, continent, worldNumber, mapSet, mapNumber, passThrough, ability, abilityRequirements, spellRequirements, items, itemRequirements, entryRequirements, completionRequirements, links, linkRequirements, romMetaData};
}

console.log("export default " + JSON.stringify(newLocationData, null, 4));