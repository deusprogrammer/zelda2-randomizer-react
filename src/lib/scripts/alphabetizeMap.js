import locationMeta from "./location-meta";

let sortedMap = {};
Object.keys(locationMeta).sort().forEach(key => {
    sortedMap[key] = locationMeta[key];
});

console.log("export default " + JSON.stringify(sortedMap, null, 4));