import locationMetadata from '../zelda2/templates/z2-location.meta';
import templateData from '../zelda2/templates/z2-vanilla.template';

const randomSeed = (a) => {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

const chooseRandomNode = (nodes) => {
    let r = Math.trunc(Math.random() * nodes.length);
    return nodes[r];
}

// const displayNodeInformation = (templateData, nodes, subKey = "id") => {
//     if (!nodes) {
//         return;
//     }

//     nodes.forEach((node) => {
//         if (!node) {
//             return;
//         }

//         console.log("\t\t\t" + templateData[node][subKey]);
//     });
// }

const linkIsInAnotherContinent = (locationMetadata, location) => {
    if (location.links && location.links.length > 0) {
        let key = location.links[0];
        return locationMetadata[key].worldNumber !== location.worldNumber;
    }

    return false;
}

let northPalacePlaced = false;
let passThroughAreas = Object.keys(locationMetadata).filter(key => locationMetadata[key].links.length > 0 && !locationMetadata[key].passThrough);
for (let continent = 0; continent < 4; continent++) {
    console.log("CONTINENT: " + continent);

    // Filter out all passthrough areas
    let continentNodes = Object.keys(templateData).filter(key => templateData[key].continent === continent);
    let localPassThroughAreas = passThroughAreas.filter(key => locationMetadata[key].worldNumber === continent && continentNodes.map(continentNode => templateData[continentNode].locationKey).includes(locationMetadata[key].links[0]));
    let largeItemBearingAreas = Object.keys(locationMetadata).filter(key => locationMetadata[key].worldNumber === continent && locationMetadata[key].items && locationMetadata[key].items.includes('LARGE_ITEM'));
    let smallItemBearingAreas = Object.keys(locationMetadata).filter(key => locationMetadata[key].worldNumber === continent && locationMetadata[key].items && locationMetadata[key].items.includes('SMALL_ITEM'));
    let continentExits = Object.keys(locationMetadata).filter(key => locationMetadata[key].worldNumber === continent && linkIsInAnotherContinent(locationMetadata, locationMetadata[key]));

    console.log(`CONTINENT EXITS: ${continentExits}`);

    // Separate all nodes into their isolation groups
    const isolationAreas = [];
    continentNodes.forEach((key) => {
        let node = templateData[key];
        if (!isolationAreas[node.isolationGroup]) {
            isolationAreas[node.isolationGroup] = [];
        }

        isolationAreas[node.isolationGroup].push(key);
    });

    // RP1 Randomly place North Palace
    if (!northPalacePlaced) {
        let randomIsolationZone = Math.floor(Math.random() * isolationAreas.length);
        let nodes = isolationAreas[randomIsolationZone];
        let northPalaceNode = chooseRandomNode(nodes);

        isolationAreas[randomIsolationZone] = nodes.filter(key => northPalaceNode !== key);
        delete continentNodes[northPalaceNode];

        templateData[northPalaceNode].mappedLocation = "NORTH_PALACE";
        console.log(`\tPLACED NORTH PALACE AT ${templateData[northPalaceNode].locationKey}`);

        northPalacePlaced = true;
    }

    // RP2 Randomly assign one passthrough to each isolation zone.)
    for (let index in isolationAreas) {
        let otherIndex = (index + 1) % isolationAreas.length;

        let nodes = isolationAreas[index];
        let otherNodes = isolationAreas[otherIndex];

        if (!nodes || !otherNodes || localPassThroughAreas.length <= 0) {
            continue;
        }

        // TODO Figure out why connections are being reused over and over again
        let randomNode = chooseRandomNode(nodes);
        let otherRandomNode = chooseRandomNode(otherNodes);
        let randomPassthrough = chooseRandomNode(localPassThroughAreas);

        templateData[randomNode].mappedLocation = randomPassthrough;
        templateData[otherRandomNode].mappedLocation = locationMetadata[randomPassthrough].links[0];

        passThroughAreas = passThroughAreas.filter(key => randomPassthrough !== key && locationMetadata[randomPassthrough].links[0] !== key);
        localPassThroughAreas = localPassThroughAreas.filter(key => randomPassthrough !== key && locationMetadata[randomPassthrough].links[0] !== key);
        isolationAreas[index] = nodes.filter(key => randomNode !== key);
        isolationAreas[otherIndex] = otherNodes.filter(key =>  otherRandomNode !== key);
        delete continentNodes[randomNode];
        delete continentNodes[otherRandomNode];

        console.log(`\tCONNECTING ${templateData[randomNode].locationKey} to ${templateData[otherRandomNode].locationKey} via ${randomPassthrough} and ${locationMetadata[randomPassthrough].links[0]}`);
    }

    // RP3 Randomly place item bearing areas in each isolation zone evenly
    while (largeItemBearingAreas.length > 0) {
        for (let index in isolationAreas) {
            if (largeItemBearingAreas.length <= 0) {
                break;
            }

            let nodes = isolationAreas[index];

            if (!nodes) {
                continue;
            }

            let randomNode = chooseRandomNode(nodes);
            let randomLargeItemArea = chooseRandomNode(largeItemBearingAreas);

            largeItemBearingAreas = largeItemBearingAreas.filter(key => key !== randomLargeItemArea);
            isolationAreas[index] = nodes.filter(key => randomNode !== key);
            delete continentNodes[randomNode];
            
            templateData[randomNode].mappedLocation = randomLargeItemArea;

            console.log(`\tPLACING ${randomLargeItemArea} in ${templateData[randomNode].locationKey}`);
        }
    }

    // RP4 Randomly place towns

    // RP5 Randomly place continent exits
    for (let exit of continentExits) {
        let randomNode = chooseRandomNode(continentNodes);
        delete continentNodes[randomNode];
        templateData[randomNode].mappedLocation = exit;

        console.log(`\tPLACING EXIT ${exit} in ${templateData[randomNode].locationKey}`);
    }
}

// Display first pass
//console.log(JSON.stringify(templateData, null, 5));