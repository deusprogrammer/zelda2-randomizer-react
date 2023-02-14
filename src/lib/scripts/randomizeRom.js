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

for (let continent = 0; continent < 4; continent++) {
    // Filter out all passthrough areas
    const passThroughAreas = Object.keys(locationMetadata).filter(key => locationMetadata[key].passThrough && locationMetadata[key].worldNumber === continent);
    const continentNodes = Object.keys(templateData).filter(key => templateData[key].continent === continent);

    // Separate all nodes into their isolation groups
    const isolationAreas = [];
    continentNodes.forEach((key) => {
        let node = templateData[key];
        if (!isolationAreas[node.isolationGroup]) {
            isolationAreas[node.isolationGroup] = [];
        }

        isolationAreas[node.isolationGroup].push(key);
    });

    // RP2 Randomly assign one passthrough to each isolation zone.)
    for (let nodes of isolationAreas) {
        if (!nodes) {
            continue;
        }

        let randomNode = chooseRandomNode(nodes);
        let randomPassthrough = chooseRandomNode(passThroughAreas);
        templateData[randomNode].mappedLocation = randomPassthrough;
    }
}

// Display first pass
console.log(JSON.stringify(templateData, null, 5));