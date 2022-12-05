import locationMeta from "../zelda2/templates/z2-vanilla.v5.template";

const FIELDS_IN_ORDER = [
    "locationKey",
    "x",
    "y",
    "isolationGroup",
    "continent",
    "continentName",
    "suggestion",
    "connections"
];

let newMap = {};
Object.keys(locationMeta).forEach(key => {
    let sortedEntry = {};
    let entry = locationMeta[key];
    FIELDS_IN_ORDER.forEach(fieldKey => {
        sortedEntry[fieldKey] = entry[fieldKey];
    })
    newMap[key] = sortedEntry;
});

console.log("export default " + JSON.stringify(newMap, null, 4));