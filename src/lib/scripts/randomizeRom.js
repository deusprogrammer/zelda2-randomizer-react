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

const displayNodeInformation = (templateData, nodes, subKey = "id") => {
    if (!nodes) {
        return;
    }

    nodes.forEach((node) => {
        if (!node) {
            return;
        }

        console.log("\t\t\t" + templateData[node][subKey]);
    });
}

let passThroughAreas = Object.keys(locationMetadata).filter(key => locationMetadata[key].links.length > 0 && !locationMetadata[key].passThrough);
for (let continent = 0; continent < 4; continent++) {
    console.log("CONTINENT: " + continent);

    // Filter out all passthrough areas
    let continentNodes = Object.keys(templateData).filter(key => templateData[key].continent === continent);
    let localPassThroughAreas = passThroughAreas.filter(key => locationMetadata[key].worldNumber === continent && continentNodes.map(continentNode => templateData[continentNode].locationKey).includes(locationMetadata[key].links[0]));
    let largeItemBearingAreas = Object.keys(locationMetadata).filter(key => locationMetadata[key].worldNumber === continent && locationMetadata[key].items && locationMetadata[key].items.includes('LARGE_ITEM'));
    let smallItemBearingAreas = Object.keys(locationMetadata).filter(key => locationMetadata[key].worldNumber === continent && locationMetadata[key].items && locationMetadata[key].items.includes('SMALL_ITEM'));

    // console.log("LOCAL PASS THROUGHS: " + JSON.stringify(localPassThroughAreas));
    // console.log("CONTINENT NODES: ");
    // displayNodeInformation(templateData, continentNodes);

    // Separate all nodes into their isolation groups
    const isolationAreas = [];
    continentNodes.forEach((key) => {
        let node = templateData[key];
        if (!isolationAreas[node.isolationGroup]) {
            isolationAreas[node.isolationGroup] = [];
        }

        isolationAreas[node.isolationGroup].push(key);
    });

    // console.log("\tISOLATION ZONES: ");
    // isolationAreas.forEach((nodes, index) => {
    //     console.log("\t\tISOLATION ZONE " + index);
    //     displayNodeInformation(templateData, nodes);
    // });

    // RP2 Randomly assign one passthrough to each isolation zone.)
    for (let index in isolationAreas) {
        let otherIndex = (index + 1) % isolationAreas.length;

        let nodes = isolationAreas[index];
        let otherNodes = isolationAreas[otherIndex];

        if (!nodes || !otherNodes) {
            continue;
        }

        let randomNode = chooseRandomNode(nodes);
        let otherRandomNode = chooseRandomNode(otherNodes);
        let randomPassthrough = chooseRandomNode(localPassThroughAreas);
        delete passThroughAreas[randomPassthrough];
        delete localPassThroughAreas[randomPassthrough];
        delete continentNodes[randomNode];
        delete continentNodes[otherRandomNode];
        templateData[randomNode].mappedLocation = randomPassthrough;
        templateData[otherRandomNode].mappedLocation = locationMetadata[randomPassthrough].links[0];

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
            delete continentNodes[randomNode];
            largeItemBearingAreas = largeItemBearingAreas.filter(key => key !== randomLargeItemArea);
            templateData[randomNode].mappedLocation = randomLargeItemArea;

            console.log(`\tPLACING ${randomLargeItemArea} in ${templateData[randomNode].locationKey}`);
        }
    }

    // RP4 Randomly place towns

    // RP5 Randomly place continent exits
}

// Display first pass
//console.log(JSON.stringify(templateData, null, 5));