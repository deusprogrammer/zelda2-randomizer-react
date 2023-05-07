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

const addLinksToPartialTemplate = (templateData, locationMetadata) => {
    let partialGraph = {};
    Object.keys(templateData).forEach(key => {
        let templateNode = templateData[key];
        let mappedLocation = templateNode.mappedLocation;

        // Translate links and linkRequirements into nodes
        if (mappedLocation && locationMetadata[mappedLocation]) {
            templateNode.links = locationMetadata[mappedLocation].links.map(link => {
                // console.log("SEARCHING FOR NODE NAME FOR: " + link);
                return Object.keys(templateData).find(linkKey => {
                    if (templateData[linkKey].mappedLocation === link) {
                        // console.log("FOUND " + linkKey);
                        return true;
                    }
                })
            });
            templateNode.linkRequirements = {};
            Object.keys(locationMetadata[mappedLocation].linkRequirements).forEach(link => {
                let nodeId = Object.keys(templateData).find(linkKey => {
                    if (templateData[linkKey].mappedLocation === link) {
                        return true;
                    }
                });
                templateNode.linkRequirements[nodeId] = locationMetadata[mappedLocation].linkRequirements[link];
            })
        }

        // Double link all connections
        if (templateNode.connections) {
            templateNode.connections.forEach(connection => {
                if (!templateData[connection].connections) {
                    templateData[connection].connections = [];
                }

                if (!templateData[connection].connections.includes(key)) {
                    templateData[connection].connections.push(key);
                }
            });
        }

        partialGraph[key] = templateNode;
    });

    return partialGraph;
}

const checkRequirements = (requirements, items, spells) => {
    let result = true;
    requirements.forEach(requirement => {
        // console.log("CHECKING REQUIREMENT " + requirement);
        let subRequirements = requirement.split("|").map(subRequirement => subRequirement.trim());
        let subResult = false;
        subRequirements.forEach(subRequirement => {
            // console.log("CHECKING SUB REQUIREMENT " + subRequirement);
            subResult = subResult || items.includes(subRequirement) || spells.includes(subRequirement);
            // console.log("SUB RESULT: " + subResult);
        });
        result = result && subResult;
        // console.log("RESULT: " + result);
    });

    return result;
}

const getAccessibleNodes = (nodeName, partialTemplate, items=[], spells=[], visitedNodes=[]) => {
    if (visitedNodes.includes(nodeName)) {
        // console.log("NODE " + nodeName + " ALREADY VISITED " + JSON.stringify(visitedNodes));
        return [[], visitedNodes];
    }

    let node = partialTemplate[nodeName];
    let accessibleNodes = [];

    if (!visitedNodes.includes(nodeName)) {
        visitedNodes.push(nodeName);
    }

    if (!accessibleNodes.includes(nodeName)) {
        accessibleNodes.push(nodeName);
    }

    console.log("CHECKING NODE " + nodeName + "\n" + JSON.stringify(node, null, 5));

    if (node && node.connections) {
        node.connections.forEach((connectedNode) => {
            // console.log("CONNECTION: " + connectedNode);
            if (node.connectionRequirements && node.connectionRequirements[connectedNode]) {
                // console.log("CONNECTION HAS REQUIREMENTS");
                let requirements = node.connectionRequirements[connectedNode];
                if (requirements && checkRequirements(requirements, items, spells)) {
                    let [newAccessibleNodes, newlyVisitedNodes] = getAccessibleNodes(connectedNode, partialTemplate, items, spells, visitedNodes);
                    newAccessibleNodes.forEach(newNode => {if (!accessibleNodes.includes(newNode)) accessibleNodes.push(newNode)});
                    newlyVisitedNodes.forEach(newNode => {if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode)});
                }
            } else {
                // console.log("CONNECTION HAS NO REQUIREMENTS");
                let [newAccessibleNodes, newlyVisitedNodes] = getAccessibleNodes(connectedNode, partialTemplate, items, spells, visitedNodes);
                newAccessibleNodes.forEach(newNode => {if (!accessibleNodes.includes(newNode)) accessibleNodes.push(newNode)});
                newlyVisitedNodes.forEach(newNode => {if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode)});
            }
        });
    }
    if (node && node.links) {
        node.links.forEach((linkedNode) => {
            // console.log("LINK: " + linkedNode);
            if (node.linkRequirements && node.linkRequirements[linkedNode]) {
                // console.log("LINK HAS REQUIREMENTS");
                let requirements = node.linkRequirements[linkedNode];
                if (requirements && checkRequirements(requirements, items, spells)) {
                    let [newAccessibleNodes, newlyVisitedNodes] = getAccessibleNodes(linkedNode, partialTemplate, items, spells, visitedNodes);
                    newAccessibleNodes.forEach(newNode => {if (!accessibleNodes.includes(newNode)) accessibleNodes.push(newNode)});
                    newlyVisitedNodes.forEach(newNode => {if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode)});
                }
            } else {
                // console.log("LINK HAS NO REQUIREMENTS");
                let [newAccessibleNodes, newlyVisitedNodes] = getAccessibleNodes(linkedNode, partialTemplate, items, spells, visitedNodes);
                newAccessibleNodes.forEach(newNode => {if (!accessibleNodes.includes(newNode)) accessibleNodes.push(newNode)});
                newlyVisitedNodes.forEach(newNode => {if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode)});
            }
        });
    }

    return [accessibleNodes, visitedNodes];
}

let northPalacePlaced = false;
let passThroughAreas = Object.keys(locationMetadata).filter(key => locationMetadata[key].links.length > 0 && !locationMetadata[key].passThrough);
for (let continent = 0; continent < 4; continent++) {
    console.log("CONTINENT: " + continent);

    // Filter out all passthrough areas
    // TODO Why isn't DM_BRIDGE_E and DM_BRIDGE_W not treated as passthroughs?
    let continentNodes = Object.keys(templateData).filter(key => templateData[key].continent === continent);
    let localPassThroughAreas = passThroughAreas.filter(key => locationMetadata[key].worldNumber === continent && continentNodes.map(continentNode => templateData[continentNode].locationKey).includes(locationMetadata[key].links[0]));
    let largeItemBearingAreas = Object.keys(locationMetadata).filter(key => locationMetadata[key].worldNumber === continent && locationMetadata[key].items && locationMetadata[key].items.includes('LARGE_ITEM'));
    let smallItemBearingAreas = Object.keys(locationMetadata).filter(key => locationMetadata[key].worldNumber === continent && locationMetadata[key].items && locationMetadata[key].items.includes('SMALL_ITEM'));
    let continentExits = Object.keys(locationMetadata).filter(key => locationMetadata[key].worldNumber === continent && linkIsInAnotherContinent(locationMetadata, locationMetadata[key]));

    console.log(`CONTINENT EXITS:       ${continentExits}`);
    console.log(`LOCAL PASSTHROUGHS:    ${localPassThroughAreas}`);

    // Separate all nodes into their isolation groups
    let isolationAreas = [];
    continentNodes.forEach((key) => {
        let node = templateData[key];
        if (!isolationAreas[node.isolationGroup]) {
            isolationAreas[node.isolationGroup] = [];
        }

        isolationAreas[node.isolationGroup].push(key);
    });
    isolationAreas = isolationAreas.filter(index => isolationAreas[index] !== null);
    console.log("ISOLATION ZONES: " + JSON.stringify(isolationAreas, null, 5));

    // Randomly place North Palace
    if (!northPalacePlaced) {
        let randomIsolationZone = Math.floor(Math.random() * isolationAreas.length);
        let nodes = isolationAreas[randomIsolationZone];
        let northPalaceNode = chooseRandomNode(nodes);

        isolationAreas[randomIsolationZone] = nodes.filter(key => northPalaceNode !== key);
        delete continentNodes[northPalaceNode];

        templateData[northPalaceNode].mappedLocation = "NORTH_CASTLE";
        console.log(`\tPLACED NORTH CASTLE AT ${templateData[northPalaceNode].locationKey}`);

        northPalacePlaced = true;
    }

    // Create a list of what isolation groups have been connected. 
    let disconnectedIsolationAreas = [...Array(isolationAreas.length).keys()];
    let firstConnectedIsolationArea = chooseRandomNode(disconnectedIsolationAreas);
    disconnectedIsolationAreas = disconnectedIsolationAreas.filter(area => area !== firstConnectedIsolationArea);
    let connectedIsolationAreas = [firstConnectedIsolationArea];

    // Randomly assign links between isolation groups.   
    while (disconnectedIsolationAreas.length > 0) {
        let index = chooseRandomNode(connectedIsolationAreas);
        let otherIndex = chooseRandomNode(disconnectedIsolationAreas);

        let nodes = isolationAreas[index];
        let otherNodes = isolationAreas[otherIndex];

        if (isolationAreas[index].length <= 0 || isolationAreas[otherIndex] <= 0) {
            continue;
        }

        disconnectedIsolationAreas = disconnectedIsolationAreas.filter(area => area !== otherIndex);
        connectedIsolationAreas.push(otherIndex);

        // console.log("\tCHECKING ISOLATION AREAS " + index + " AND " + otherIndex);
        // console.log(`\tAREA ${index}:\t` + JSON.stringify(nodes));
        // console.log(`\tAREA ${otherIndex}:\t` + JSON.stringify(otherNodes));

        if (!nodes || !otherNodes || localPassThroughAreas.length <= 0) {
            continue;
        }

        let randomNode = chooseRandomNode(nodes);
        let otherRandomNode = chooseRandomNode(otherNodes);
        let randomPassthrough = chooseRandomNode(localPassThroughAreas);

        // TODO Account for connecting locations that have more than one exit
        templateData[randomNode].mappedLocation = randomPassthrough;
        templateData[otherRandomNode].mappedLocation = locationMetadata[randomPassthrough].links[0];

        passThroughAreas = passThroughAreas.filter(key => randomPassthrough !== key && locationMetadata[randomPassthrough].links[0] !== key);
        localPassThroughAreas = localPassThroughAreas.filter(key => randomPassthrough !== key && locationMetadata[randomPassthrough].links[0] !== key);
        isolationAreas[index] = nodes.filter(key => randomNode !== key);
        isolationAreas[otherIndex] = otherNodes.filter(key =>  otherRandomNode !== key);
        continentNodes = continentNodes.filter(key => randomNode !== key && otherRandomNode !== key);

        console.log(`\tCONNECTING ${templateData[randomNode].locationKey} to ${templateData[otherRandomNode].locationKey} via ${randomPassthrough} and ${locationMetadata[randomPassthrough].links[0]}`);
    }

    // Randomly place item bearing areas in each isolation zone evenly
    // while (largeItemBearingAreas.length > 0) {
    //     for (let index in isolationAreas) {
    //         if (largeItemBearingAreas.length <= 0) {
    //             break;
    //         }

    //         let nodes = isolationAreas[index];

    //         if (!nodes) {
    //             continue;
    //         }

    //         let randomNode = chooseRandomNode(nodes);
    //         let randomLargeItemArea = chooseRandomNode(largeItemBearingAreas);

    //         largeItemBearingAreas = largeItemBearingAreas.filter(key => key !== randomLargeItemArea);
    //         isolationAreas[index] = nodes.filter(key => randomNode !== key);
    //         continentNodes = continentNodes.filter(key => randomNode !== key);
            
    //         templateData[randomNode].mappedLocation = randomLargeItemArea;

    //         console.log(`\tPLACING ${randomLargeItemArea} in ${templateData[randomNode].locationKey}`);
    //     }
    // }

    // Randomly place towns

    // Randomly place continent exits
    for (let exit of continentExits) {
        let randomNode = chooseRandomNode(continentNodes);
        continentNodes = continentNodes.filter(key => randomNode !== key);

        templateData[randomNode].mappedLocation = exit;

        console.log(`\tPLACING EXIT ${exit} in ${templateData[randomNode].locationKey}`);
    }
}

// console.log("TEMPLATE: " + JSON.stringify(templateData, null, 5));

// Double link map
let partialTemplate = addLinksToPartialTemplate(templateData, locationMetadata);

// Find accessible areas
let northCastleNode = Object.keys(partialTemplate).find(key => {
    return partialTemplate[key].mappedLocation === "NORTH_CASTLE";
});

let [accessibleNodes] = getAccessibleNodes(northCastleNode, partialTemplate);

console.log("Starting accessible locations: " + JSON.stringify(accessibleNodes, null, 5));