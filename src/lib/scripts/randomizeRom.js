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

const removeNode = (nodes, nodeName) => {
    return nodes.filter(node => node !== nodeName);
}

const getNodeLocationName = (nodeName) => {
    return templateData[node] ? templateData[nodeName].locationKey : null;
}

const getLocationNodeName = (locationName) => {
    return Object.keys(templateData).find(nodeName => {
        let node = templateData[nodeName];
        return node.locationKey === locationName;
    });
}

const getNodeMappedLocationName = (node) => {
    return templateData[node] ? templateData[node].mappedLocation : null;
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
            });
        }

        // Double link all connections
        if (templateNode.connections) {
            templateNode.connections.forEach(connection => {
                if (!templateData[connection].connections) {
                    templateData[connection].connections = [];
                }

                if (!templateData[connection].connectionRequirements) {
                    templateData[connection].connectionRequirements = {};
                }

                if (!templateData[connection].connections.includes(key)) {
                    templateData[connection].connections.push(key);
                }

                // Connect back connection requirements
                if (templateNode.connectionRequirements && connection in templateNode.connectionRequirements) {
                    templateData[connection].connectionRequirements[key] = templateNode.connectionRequirements[connection];
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
            subResult = subResult || items.includes(subRequirement) || spells.includes(subRequirement);
            // console.log("CHECKING SUB REQUIREMENT " + subRequirement + " => " + subResult);
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

    // console.log("CHECKING NODE " + nodeName + "\n" + JSON.stringify(node, null, 5));

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
                //console.log("CONNECTION HAS NO REQUIREMENTS");
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

let northPalaceNode = null;
let northPalaceIsolationZone = null;
let passThroughAreas = Object.keys(locationMetadata).filter(key => locationMetadata[key].links.length > 0 && !locationMetadata[key].passThrough);
for (let continent = 0; continent < 4; continent++) {
    console.log("CONTINENT: " + continent);

    // Filter out all passthrough areas
    let continentNodes = Object.keys(templateData).filter(key => templateData[key].continent === continent);
    let localPassThroughAreas = passThroughAreas.filter(key => locationMetadata[key].worldNumber === continent && continentNodes.map(continentNode => templateData[continentNode].locationKey).includes(locationMetadata[key].links[0]));
    let largeItemBearingAreas = Object.keys(locationMetadata).filter(key => locationMetadata[key].worldNumber === continent && locationMetadata[key].items && locationMetadata[key].items.includes('LARGE_ITEM'));
    let smallItemBearingAreas = Object.keys(locationMetadata).filter(key => locationMetadata[key].worldNumber === continent && locationMetadata[key].items && locationMetadata[key].items.includes('SMALL_ITEM'));
    let continentExits = Object.keys(locationMetadata).filter(key => locationMetadata[key].worldNumber === continent && linkIsInAnotherContinent(locationMetadata, locationMetadata[key]));

    console.log(`\tCONTINENT EXITS:       ${continentExits}`);
    console.log(`\tLOCAL PASSTHROUGHS:    ${localPassThroughAreas}`);

    // Separate all nodes into their isolation groups
    let isolationAreas = [];
    continentNodes.forEach((key) => {
        let node = templateData[key];
        if (!isolationAreas[node.isolationGroup]) {
            isolationAreas[node.isolationGroup] = [];
        }

        isolationAreas[node.isolationGroup].push(key);
    });
    console.log("\tISOLATION ZONES:");
    isolationAreas.forEach((zone, index) => {
        console.log(`\t\tISOLATION ${index}:\t` + JSON.stringify(zone));
    });
    isolationAreas = isolationAreas.filter(index => isolationAreas[index] !== null);

    // Randomly place North Palace
    if (!northPalaceNode) {
        console.log("\tPLACING NORTH CASTLE");
        let largeIsolationAreas = isolationAreas.filter(isolationArea => isolationArea.length > 2);
        northPalaceIsolationZone = Math.floor(Math.random() * largeIsolationAreas.length);
        let nodes = isolationAreas[northPalaceIsolationZone];
        northPalaceNode = chooseRandomNode(nodes);

        isolationAreas[northPalaceIsolationZone] = nodes.filter(key => northPalaceNode !== key);
        continentNodes = removeNode(continentNodes, northPalaceNode);

        templateData[northPalaceNode].mappedLocation = "NORTH_CASTLE";
        console.log(`\t\tPLACED NORTH CASTLE AT ${templateData[northPalaceNode].locationKey}`);
    }

    // Create a list of what isolation groups have been connected. 
    let disconnectedIsolationAreas = [...Array(isolationAreas.length).keys()];
    let firstConnectedIsolationArea = northPalaceIsolationZone;
    disconnectedIsolationAreas = removeNode(disconnectedIsolationAreas, firstConnectedIsolationArea);
    let connectedIsolationAreas = [firstConnectedIsolationArea];

    // Randomly assign links between isolation groups.   
    console.log("\tRP1: PLACING CONNECTIONS");
    while (localPassThroughAreas.length > 0) {
        console.log(`CONNECTED     ${JSON.stringify(connectedIsolationAreas)}`);
        console.log(`DISCONNECTED  ${JSON.stringify(disconnectedIsolationAreas)}`);

        // Choose random isolation groups for entrance and exits
        let entranceIndex, exitIndex;
        if (disconnectedIsolationAreas.length > 0 && connectedIsolationAreas.length > 0) {
            // Make sure all nodes are connected before randomly applying connections locally.
            entranceIndex = chooseRandomNode(connectedIsolationAreas);
            exitIndex = chooseRandomNode(disconnectedIsolationAreas);
        } else if (disconnectedIsolationAreas.length > 0 && connectedIsolationAreas.length <= 0) {
            entranceIndex = chooseRandomNode(disconnectedIsolationAreas);
            exitIndex = chooseRandomNode(disconnectedIsolationAreas);
        } else {
            entranceIndex = chooseRandomNode(connectedIsolationAreas);
            exitIndex = chooseRandomNode(connectedIsolationAreas);
        }
    
        // Acquire nodes from random isolation groups for entrance and exits.
        let entranceNodes = isolationAreas[entranceIndex];
        let exitNodes = isolationAreas[exitIndex];

        // Choose a random node from each isolation group for entrance and exits
        let entranceNode = chooseRandomNode(entranceNodes);
        let exitNode = chooseRandomNode(exitNodes);

        // Set entrance and exit
        let entrance = chooseRandomNode(localPassThroughAreas);
        let availableExits = locationMetadata[entrance].links.filter(link => localPassThroughAreas.includes(link));
        let exit = chooseRandomNode(availableExits);

        if (entrance) {
            // Set entrance
            templateData[entranceNode].mappedLocation = entrance;

            // Remove used passthroughs
            passThroughAreas = removeNode(passThroughAreas, entrance);
            localPassThroughAreas = removeNode(localPassThroughAreas, entrance);

            // Remove node from continent nodes
            continentNodes = removeNode(continentNodes, entranceNode);

            // Remove nodes from isolation zones
            isolationAreas[entranceIndex] = removeNode(isolationAreas[entranceIndex], entranceNode);
        }
        if (exit) {
            templateData[exitNode].mappedLocation = exit;

            // Remove used passthroughs
            passThroughAreas = removeNode(passThroughAreas, exit);
            localPassThroughAreas = removeNode(localPassThroughAreas, exit);

            // Remove node from continent nodes
            continentNodes = removeNode(continentNodes, exitNode);

            // Remove nodes from isolation zones
            isolationAreas[exitIndex] = removeNode(isolationAreas[exitIndex], exitNode);

            // Remove the nodes we just chose from the disconnected isolation areas list.
            disconnectedIsolationAreas = removeNode(disconnectedIsolationAreas, exitIndex);
            if (!connectedIsolationAreas.includes(exitIndex)) {
                connectedIsolationAreas.push(exitIndex);
            }
        }

        // Remove empty isolation areas
        if (isolationAreas[entranceIndex].length <= 0) {
            connectedIsolationAreas = removeNode(connectedIsolationAreas, entranceIndex);
        }
        if (isolationAreas[exitIndex].length <= 0) {
            connectedIsolationAreas = removeNode(connectedIsolationAreas, exitIndex);
        }

        if (entrance && exit) {
            console.log(`\t\tCONNECTING AREAS ${entranceIndex} AND ${exitIndex}`);
            console.log(`\t\tCONNECTING       ${templateData[entranceNode].locationKey} to ${templateData[exitNode].locationKey} via ${entrance} and ${exit}`);
        } else {
            console.log(`\t\tMAPPING          ${templateData[entranceNode].locationKey} to ${entrance}`);
        }
    }

    // Randomly place continent exits
    console.log("\tRP2: PLACING EXITS");
    for (let exit of continentExits) {
        console.log("\t\tCONTINENT NODES LEFT: " + JSON.stringify(continentNodes));

        let randomNode = chooseRandomNode(continentNodes);
        continentNodes = removeNode(continentNodes, randomNode);

        templateData[randomNode].mappedLocation = exit;

        console.log("\t\tRANDOM NODE PICKED FOR EXIT: " + randomNode);
        console.log(`\t\tPLACING EXIT ${exit} in ${templateData[randomNode].locationKey}`);
    }
}

// Double link map
let partialTemplate = addLinksToPartialTemplate(templateData, locationMetadata);

// console.log("TEMPLATE: " + JSON.stringify([partialTemplate], null, 5));

// Find accessible areas
let northCastleNode = Object.keys(partialTemplate).find(key => {
    return partialTemplate[key].mappedLocation === "NORTH_CASTLE";
});

let [accessibleNodes] = getAccessibleNodes(northCastleNode, partialTemplate);

console.log("STARTING ACCESSIBLE LOCATIONS:");
console.log(`\t${'Node'.padEnd(16, ' ')} ${'Node Location'.padEnd(32, ' ')} Mapped Location\n`);
accessibleNodes.forEach(node => {
    if (partialTemplate[node]) {
        console.log(`\t${node ? node.padEnd(16, ' ') : ''.padEnd(16, ' ')} ${partialTemplate[node].locationKey ? partialTemplate[node].locationKey.padEnd(32, ' ') : ''.padEnd(32, ' ') } ${partialTemplate[node].mappedLocation}`);
    } else {
        console.log(`\t${node ? node.padEnd(16, '-') : ''.padEnd(16, '-')} ${''.padEnd(32, '-')} ${''.padEnd(32, '-')}`);
    }
});