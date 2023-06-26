import parse from '../Z2Parser';
import fs from 'fs';

let rom = fs.readFileSync(process.argv[2]);
let {sideViewMaps} = parse(rom);

let enemyMetaData = {};
sideViewMaps.forEach((mapSet, mapSetIndex) => {
    mapSet.forEach(({enemyData: {enemies}, exits}, mapNumber) => {
        enemies.forEach(({x, y, xUpper, xLower, enemyNumber, name, _metadata}) => {
            let key = `${mapSetIndex}:${mapNumber}`;
            if (!enemyMetaData[key]) {
                enemyMetaData[key] = {
                    enemies: [], 
                    paths: {}, 
                    exits: {}
                };
            }
            enemyMetaData[key].enemies.push({
                x,
                y,
                xUpper,
                xLower,
                mapSet: mapSetIndex,
                mapNumber,
                enemyNumber,
                name,
                offset: _metadata.enemyNumber.offset,
                mask: 0b111111
            });
            Object.keys(exits).filter(exit => !exit.startsWith("_") && exit !== "editable").forEach((exit) => {
                let {mapNumber, _metadata} = exits[exit];
                enemyMetaData[key].exits[exit.replace("Exit", "")] = {
                    mapNumber,
                    offset: _metadata["mapNumber"].offset,
                    mask: _metadata["mapNumber"].mask
                }
            });
        });
    });
});
console.log(`export default ${JSON.stringify(enemyMetaData, null, 5)}`);