import locationMetadata from '../zelda2/templates/z2-location.v4.meta';

let itemData = {};
for (let locationKey in locationMetadata) {
    let {itemRomMetaData} = locationMetadata[locationKey];

    itemRomMetaData.forEach(({name, number, mapSet, mapNumber, _metadata}) => {
        if (!itemData[`${mapSet}:${mapNumber}`]) {
            itemData[`${mapSet}:${mapNumber}`] = [];
        }

        itemData[`${mapSet}:${mapNumber}`].push({name, number, mapSet, mapNumber, _metadata});
    })
}

console.log("export default " + JSON.stringify(itemData, null, 4));