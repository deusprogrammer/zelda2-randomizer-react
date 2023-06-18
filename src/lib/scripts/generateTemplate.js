import templateData from '../zelda2/templates/z2-vanilla.template';

const getType = (locationKey) => {
    if (locationKey.includes("CAVE") && locationKey !== "FAIRY_CAVE_HOLE") {
        return "CAVE";
    } else if (locationKey.includes("BRIDGE") || locationKey.includes("DOCK") || locationKey === "P5_HEART") {
        return "WATER";
    } else if (locationKey.includes("FOREST") || locationKey.includes("WOODS") || locationKey.includes("BAGU") || locationKey.endsWith("FAIRY")) {
        return "FOREST";
    } else if (locationKey.includes("DEATH_VALLEY")) {
        return "LAVA";
    } else if (locationKey.includes("BEACH") || locationKey.includes("DAZZLE") || locationKey === "P5_500P_BAG") {
        return "DESERT";
    } else if (locationKey.includes("SWAMP")) {
        return "SWAMP";
    } else if (locationKey.includes("CEM") || locationKey.includes("TOMB") || locationKey === "FAIRY_CAVE_HOLE") {
        return "CEMETARY";
    } else {
        return "ANY";
    }
}

const correctTemplate = (graphData) => {
    Object.keys(graphData).forEach((nodeName) => {
        graphData[nodeName].type = getType(graphData[nodeName].locationKey);
    });
}

correctTemplate(templateData);
console.log(JSON.stringify(templateData, null, 5));