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

const merge = (list1, list2) => {
    list2.forEach(element => {
        if (!list1.includes(element)) {
            list1.push(element);
        }
    });
    return list1;
}

const isSpell = (remedy) => {
    return ["SHIELD", "JUMP", "LIFE", "FAIRY", "REFLECT", "FIRE", "SPELL", "THUNDER"].includes(remedy);
}

const isPalace = (locationName) => {
    locationMetadata[locationName].type === "PALACE";
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

const getNodeMappedLocationName = (nodeName) => {
    return templateData[nodeName] ? templateData[nodeName].mappedLocation : null;
}

const getItemBearingLocationsInSameContinent = (referenceNodeName, completablePalaces) => {
    let referenceNode = templateData[referenceNodeName];
    return Object.keys(locationMetadata).filter(locationName => {
        let location = locationMetadata[locationName];

        if (location.type === "PALACE" && !completablePalaces.includes(locationName)) {
            return false;
        }

        return location.worldNumber === referenceNode.continent && location.items && location.items.includes('LARGE_ITEM')
    });
}

const getConnectableIsolationZones = (isolationAreaIndexes, isolationAreas) => {
    return isolationAreaIndexes.filter(index => {
        return isolationAreas[index].length > 1
    });
}

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
                return Object.keys(templateData).find(linkKey => {
                    if (templateData[linkKey].mappedLocation === link) {
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
    if (requirements.length <= 0) {
        return true;
    }

    let result = true;
    requirements.forEach(requirement => {
        let subRequirements = requirement.split("|").map(subRequirement => subRequirement.trim());
        let subResult = false;
        subRequirements.forEach(subRequirement => {
            subResult = subResult || items.includes(subRequirement) || spells.includes(subRequirement);
        });
        result = result && subResult;
    });

    return result;
}

const expandRequirements = (requirements) => {
    if (requirements.length <= 0) {
        return [];
    }

    let expanded = [];
    requirements.forEach(requirement => {
        let subRequirements = requirement.split("|").map(subRequirement => subRequirement.trim());
        subRequirements.forEach(subRequirement => {
            expanded.push(subRequirement);
        });
    });

    return expanded;
}

const getAccessibleNodes = (nodeName, partialTemplate, items=[], spells=[], visitedNodes=[]) => {
    if (visitedNodes.includes(nodeName)) {
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

    if (node && node.connections) {
        node.connections.forEach((connectedNode) => {
            if (node.connectionRequirements && node.connectionRequirements[connectedNode]) {
                let requirements = node.connectionRequirements[connectedNode];
                if (requirements && checkRequirements(requirements, items, spells)) {
                    let [newAccessibleNodes, newlyVisitedNodes] = getAccessibleNodes(connectedNode, partialTemplate, items, spells, visitedNodes);
                    newAccessibleNodes.forEach(newNode => {if (!accessibleNodes.includes(newNode)) accessibleNodes.push(newNode)});
                    newlyVisitedNodes.forEach(newNode => {if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode)});
                }
            } else {
                let [newAccessibleNodes, newlyVisitedNodes] = getAccessibleNodes(connectedNode, partialTemplate, items, spells, visitedNodes);
                newAccessibleNodes.forEach(newNode => {if (!accessibleNodes.includes(newNode)) accessibleNodes.push(newNode)});
                newlyVisitedNodes.forEach(newNode => {if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode)});
            }
        });
    }
    if (node && node.links) {
        node.links.forEach((linkedNode) => {
            if (node.linkRequirements && node.linkRequirements[linkedNode]) {
                let requirements = node.linkRequirements[linkedNode];
                if (requirements && checkRequirements(requirements, items, spells)) {
                    let [newAccessibleNodes, newlyVisitedNodes] = getAccessibleNodes(linkedNode, partialTemplate, items, spells, visitedNodes);
                    newAccessibleNodes.forEach(newNode => {if (!accessibleNodes.includes(newNode)) accessibleNodes.push(newNode)});
                    newlyVisitedNodes.forEach(newNode => {if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode)});
                }
            } else {
                let [newAccessibleNodes, newlyVisitedNodes] = getAccessibleNodes(linkedNode, partialTemplate, items, spells, visitedNodes);
                newAccessibleNodes.forEach(newNode => {if (!accessibleNodes.includes(newNode)) accessibleNodes.push(newNode)});
                newlyVisitedNodes.forEach(newNode => {if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode)});
            }
        });
    }

    return [accessibleNodes, visitedNodes];
}

const getCompletablePalaces = (accessibleNodes, items=[], spells=[]) => {
    return accessibleNodes.filter(node => {
        let mappedLocation = getNodeMappedLocationName(node);
        return mappedLocation && locationMetadata[mappedLocation].type === "PALACE";
    }).filter(palaceNode => {
        let palaceName = getNodeMappedLocationName(palaceNode);
        let palace = locationMetadata[palaceName];
        return palace.completionRequirements && checkRequirements(palace.completionRequirements, items, spells);
    }).map(palaceNode => {
        return getNodeMappedLocationName(palaceNode);
    });
}

const getCurrentRemedies = (accessibleNodes, items=[], spells=[]) => {
    let neededRemedies = [];
    accessibleNodes.forEach(nodeName => {
        let node = templateData[nodeName];
        // Check connection requirements
        if (node.connections) {
            node.connections.forEach((connectedNode) => {
                if (node.connectionRequirements && node.connectionRequirements[connectedNode]) {
                    let requirements = node.connectionRequirements[connectedNode];
                    if (requirements && !checkRequirements(requirements, items, spells)) {
                        neededRemedies = merge(neededRemedies, expandRequirements(requirements));
                    }
                }
            });
        }
        // Check link requirements
        if (node.links) {
            node.links.forEach((linkedNode) => {
                if (node.linkRequirements && node.linkRequirements[linkedNode]) {
                    let requirements = node.linkRequirements[linkedNode];
                    if (requirements && !checkRequirements(requirements, items, spells)) {
                        neededRemedies = merge(neededRemedies, expandRequirements(requirements));
                    }
                }
            });
        }
    });
    return neededRemedies.filter(remedy => !items.includes(remedy) && !spells.includes(remedy));
}

const getSpellTown = (spell) => {
    console.log("SPELL: " + spell);
    let townLocation = Object.keys(locationMetadata).find(key => {
        let location = locationMetadata[key];

        return location.spell === spell;
    });

    return locationMetadata[townLocation];
};

let northPalaceNode = null;
let northPalaceIsolationZone = null;
let passThroughAreas = Object.keys(locationMetadata).filter(key => locationMetadata[key].links.length > 0 && !locationMetadata[key].passThrough);
for (let continent = 0; continent < 4; continent++) {
    console.log("CONTINENT: " + continent);

    // Filter out all passthrough areas
    let continentNodes = Object.keys(templateData).filter(key => templateData[key].continent === continent);
    let localPassThroughAreas = passThroughAreas.filter(key => locationMetadata[key].worldNumber === continent && continentNodes.map(continentNode => templateData[continentNode].locationKey).includes(locationMetadata[key].links[0]));
    // let largeItemBearingAreas = Object.keys(locationMetadata).filter(key => locationMetadata[key].worldNumber === continent && locationMetadata[key].items && locationMetadata[key].items.includes('LARGE_ITEM'));
    // let smallItemBearingAreas = Object.keys(locationMetadata).filter(key => locationMetadata[key].worldNumber === continent && locationMetadata[key].items && locationMetadata[key].items.includes('SMALL_ITEM'));
    let palaces = Object.keys(locationMetadata).filter(key => locationMetadata[key].worldNumber === continent && locationMetadata[key].type === 'PALACE');
    let continentExits = Object.keys(locationMetadata).filter(key => locationMetadata[key].worldNumber === continent && linkIsInAnotherContinent(locationMetadata, locationMetadata[key]));

    console.log(`\tCONTINENT EXITS:       ${continentExits}`);

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
        console.log("\t\tSTARTING NEW PASSTHROUGH");
        console.log("\t\t\tISOLATION ZONES:");
        isolationAreas.forEach((zone, index) => {
            console.log(`\t\t\t\tISOLATION ${index.toString().padStart(2, '')}:\t` + JSON.stringify(zone));
        });
        console.log(`\t\t\tLOCAL PASSES  ${JSON.stringify(localPassThroughAreas)}`);
        console.log(`\t\t\tCONNECTED     ${JSON.stringify(connectedIsolationAreas)}`);
        console.log(`\t\t\tDISCONNECTED  ${JSON.stringify(disconnectedIsolationAreas)}`);

        // Choose a random isolation zone for the entrance
        let entranceIndex = chooseRandomNode(connectedIsolationAreas);

        // Choose a random entrance node for the entrance
        let entranceNodes = isolationAreas[entranceIndex];
        let entranceNode = chooseRandomNode(entranceNodes);

        // Choose a random connecting location and collect it's exits
        let entrance = chooseRandomNode(localPassThroughAreas);
        
        // Set entrance
        templateData[entranceNode].mappedLocation = entrance;

        // Remove used passthroughs
        passThroughAreas = removeNode(passThroughAreas, entrance);
        localPassThroughAreas = removeNode(localPassThroughAreas, entrance);

        // Remove node from continent nodes
        continentNodes = removeNode(continentNodes, entranceNode);

        // Remove nodes from isolation zones
        isolationAreas[entranceIndex] = removeNode(isolationAreas[entranceIndex], entranceNode);

        // Remove empty entrance isolation area
        if (isolationAreas[entranceIndex].length <= 0) {
            connectedIsolationAreas = removeNode(connectedIsolationAreas, entranceIndex);
        }

        // For each exit, select a random isolation zone to connect it to
        let availableExits = locationMetadata[entrance].links;
        availableExits.forEach((exit) => {
            let exitIndex;
            if (connectedIsolationAreas.length === 1 && disconnectedIsolationAreas.length > 0) {
                let connectableZones = getConnectableIsolationZones(disconnectedIsolationAreas, isolationAreas);
                exitIndex = chooseRandomNode(connectableZones);
            } else if (disconnectedIsolationAreas.length > 0 && connectedIsolationAreas.length > 0) {
                exitIndex = chooseRandomNode(disconnectedIsolationAreas);
            } else {
                exitIndex = chooseRandomNode(connectedIsolationAreas);
            }

            // Choose a random node from this exit's isolation area
            let exitNodes = isolationAreas[exitIndex];
            let exitNode = chooseRandomNode(exitNodes);

            // Set exit
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

            // Remove empty exit isolation area
            if (isolationAreas[exitIndex].length <= 0) {
                connectedIsolationAreas = removeNode(connectedIsolationAreas, exitIndex);
            }

            console.log(`\t\t\tCONNECTING    ${templateData[entranceNode].locationKey} to ${templateData[exitNode].locationKey} via ${entrance} and ${exit}`);
        });
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

    // Randomly place continent exits
    console.log("\tRP3: PLACING PALACES");
    for (let palace of palaces) {
        console.log("\t\tCONTINENT NODES LEFT: " + JSON.stringify(continentNodes));

        let randomNode = chooseRandomNode(continentNodes);
        continentNodes = removeNode(continentNodes, randomNode);

        templateData[randomNode].mappedLocation = palace;

        console.log("\t\tRANDOM NODE PICKED FOR PALACE: " + randomNode);
        console.log(`\t\tPLACING PALACE ${palace} in ${templateData[randomNode].locationKey}`);
    }
}

/**
 * TODO LOOP THIS WHOLE SECTION UNTIL ALL PALACES ARE REACHABLE AND COMPLETABLE
 */

// Double link map
let partialTemplate = addLinksToPartialTemplate(templateData, locationMetadata);

// Find north castle node
let northCastleNode = Object.keys(partialTemplate).find(key => {
    return partialTemplate[key].mappedLocation === "NORTH_CASTLE";
});

// Find accessible nodes, completable palaces, and needed remedies to progress
let [accessibleNodes]  = getAccessibleNodes(northCastleNode, partialTemplate);
let completablePalaces = getCompletablePalaces(accessibleNodes);
let neededRemedies     = getCurrentRemedies(accessibleNodes);

// Find a item bearing location within the same continent to place a remedy in said node
let nextRemedy = chooseRandomNode(neededRemedies);
let remedyNode = chooseRandomNode(accessibleNodes.filter(node => !partialTemplate[node].mappedLocation));
if (!isSpell(nextRemedy)) {
    let itemBearingLocations = getItemBearingLocationsInSameContinent(remedyNode, accessibleNodes);
    let randomItemBearingLocation = chooseRandomNode(itemBearingLocations);
    
    // TODO Check if random item bearing location is already placed (specifically SPELL_TOWN since it has 2 items in it)
    if (!isPalace(randomItemBearingLocation)) {
        partialTemplate[remedyNode].mappedLocation = templateData[remedyNode].mappedLocation = randomItemBearingLocation;
    }
    partialTemplate[remedyNode].mappedItem = templateData[remedyNode].mappedItem = nextRemedy;

    console.log("REMEDYING:              " + nextRemedy);
    console.log("PICKED                  " + randomItemBearingLocation);
} else {
    let spellTown = getSpellTown(nextRemedy);
    console.log("SPELL TOWN:  " + spellTown.id);
    console.log("REMEDY NODE: " + remedyNode);

    // TODO Check if remedy resides in a town that is already placed (i.e. towns that have both an ability and a spell or LIFE_TOWN_N and LIFE_TOWN_S since they get placed as connections)
    partialTemplate[remedyNode].mappedLocation = spellTown.id;

    if (spellTown.spellRequirements) {
        let spellTownRemedy = spellTown.spellRequirements[0];
        console.log("SPELL NEEDS REMEDY: " + spellTownRemedy);

        remedyNode = chooseRandomNode(accessibleNodes.filter(node => !partialTemplate[node].mappedLocation));
        let itemBearingLocations = getItemBearingLocationsInSameContinent(remedyNode, accessibleNodes);
        let randomItemBearingLocation = chooseRandomNode(itemBearingLocations);
        
        if (!isPalace(randomItemBearingLocation)) {
            partialTemplate[remedyNode].mappedLocation = templateData[remedyNode].mappedLocation = randomItemBearingLocation;
        }
        partialTemplate[remedyNode].mappedItem = templateData[remedyNode].mappedItem = spellTown.spellRequirements[0];
    }

    console.log("REMEDYING:              " + nextRemedy);
}

// If placed remedy is a town needing a remedy itself, pick another random node, and place an item bearing area with that remedy as well

console.log("STARTING ACCESSIBLE LOCATIONS:");
console.log(`\t${'Node'.padEnd(16, ' ')} ${'Node Location'.padEnd(32, ' ')} Mapped Location\n`);
accessibleNodes.forEach(node => {
    if (partialTemplate[node]) {
        console.log(`\t${node ? node.padEnd(16, ' ') : ''.padEnd(16, ' ')} ${partialTemplate[node].locationKey ? partialTemplate[node].locationKey.padEnd(32, ' ') : ''.padEnd(32, ' ') } ${partialTemplate[node].mappedLocation ? partialTemplate[node].mappedLocation.padEnd(32, ' ') :' '.padEnd(32, ' ')} ${partialTemplate[node].mappedItem}`);
    } else {
        console.log(`\t${node ? node.padEnd(16, '-') : ''.padEnd(16, '-')} ${''.padEnd(32, '-')} ${''.padEnd(32, '-')} ${''.padEnd(32, '-')}`);
    }
});

console.log("STARTING COMPLETABLE PALACES:");
console.log(JSON.stringify(completablePalaces, null, 5));

console.log("STARTING NEEDED REMEDIES:");
console.log(JSON.stringify(neededRemedies, null, 5));

/**
 * END TODO
 */

// Place all other unplaced nodes, small items, and large items