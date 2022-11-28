import locationMeta from '../zelda2/templates/z2-location.meta';
import graphData from '../zelda2/templates/z2-location.meta';

// const getType = (locationMetaKey) => {
//     let type = "OTHER";
//     if (locationMetaKey.includes("CAVE")) {
//         type = "CAVE";
//     } else if (locationMetaKey.includes("BRIDGE")) {
//         type = "BRIDGE";
//     } else if (locationMetaKey.endsWith("TOWN") || locationMetaKey.endsWith("TOWN_N") || locationMetaKey.endsWith("TOWN_S")) {
//         type = "TOWN";
//     } else if (locationMetaKey.includes("DOCK")) {
//         type = "DOCK";
//     }  else if (["P1", "P2", "P3", "P4", "P5", "P6", "GP"].includes(locationMetaKey)) {
//         type = "PALACE";
//     }

//     return type;
// }

let newLocationMeta = {}
Object.keys(locationMeta).forEach(locationMetaKey => {
    let {
        type,
        continent, 
        mapSet, 
        mapNumber, 
        passThrough,
        links,
        items, 
        ability, 
        entryRequirements, 
        completionRequirements,
        abilityRequirements, 
        spellRequirements, 
        itemRequirements, 
        linkRequirements } = locationMeta[locationMetaKey];
    
    let graphLocation = graphData[locationMetaKey];
    if (!graphLocation) {
        return;
    }

    newLocationMeta[locationMetaKey] = {
        id: locationMetaKey, 
        type, 
        continent, 
        mapSet, 
        mapNumber, 
        passThrough: passThrough === 1 ? true : false, 
        ability: ability || "",
        abilityRequirements: abilityRequirements || [],
        spellRequirements: spellRequirements || [],
        items: items || [],
        itemRequirements: itemRequirements || [],
        entryRequirements: entryRequirements || [],
        completionRequirements: completionRequirements || [],
        links: links || [],
        linkRequirements: linkRequirements || {}
    };
})

console.log("export default " + JSON.stringify(newLocationMeta, null, 4));