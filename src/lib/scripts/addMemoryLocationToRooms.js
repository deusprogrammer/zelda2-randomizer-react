import parse from '../Z2Parser';
import fs from 'fs';

import roomMeta from './z2-rooms.meta';

let rom = fs.readFileSync('../../../../rom.nes');
let romData = parse(rom);

romData.sideViewMaps.forEach((maps) => {
    maps.forEach(({mapSetNumber, offset}, map) => {
        let key = `${mapSetNumber}:${map}`;
        if (roomMeta[key]) {
            roomMeta[key].memoryLocation = "0x" + offset.toString(16);
        }
    });
});

console.log("export default " + JSON.stringify(roomMeta, null, 4));