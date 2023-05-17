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

const isAbility = (remedy) => {
    return ["UPSTAB", "DOWNSTAB"].includes(remedy);
}

const isBagu = (remedy) => {
    return ["BAGU_SAUCE"].includes(remedy);
}

const isPalace = (locationName) => {
    locationMetadata[locationName] && locationMetadata[locationName].type === "PALACE";
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

const getMappedLocationNodeName = (locationName) => {
    return Object.keys(templateData).find(nodeName => {
        let node = templateData[nodeName];
        return node.mappedLocation === locationName;
    });
}

const allCrystalsPlaced = (completablePalaces) => {
    return completablePalaces.length >= 6;
}

const getContinentNodes = (continent) => {
    return Object.keys(templateData).filter(key => templateData[key].continent === continent);
}

const getIsolationZones = (continent) => {
    let continentNodes = getContinentNodes(continent);
    let isolationAreas = [];
    continentNodes.forEach((key) => {
        let node = templateData[key];
        if (!isolationAreas[node.isolationGroup]) {
            isolationAreas[node.isolationGroup] = [];
        }

        isolationAreas[node.isolationGroup].push(key);
    });
    return isolationAreas.filter(index => isolationAreas[index] !== null);
}

const getNodeMappedLocationName = (nodeName) => {
    return templateData[nodeName] ? templateData[nodeName].mappedLocation : null;
}

const getItemBearingLocations = (referenceNode, completablePalaces) => {
    let continent = templateData[referenceNode].continent;
    return Object.keys(locationMetadata).filter(locationName => {
        let location = locationMetadata[locationName];

        if (location.type === "PALACE" && !completablePalaces.includes(locationName) || location.id === "BAGUS_CABIN") {
            return false;
        }

        // Get node that has this location mapped to it.
        let nodeName = getMappedLocationNodeName(locationName);
        let node = templateData[nodeName];

        // Get the mapped item count and number of items in the location.
        let locationItems = location.items.length;
        let mappedItems   = node && node.mappedItems ? node.mappedItems.length : 0;
        
        // Naming my conditions to make it easier to read.
        let roomForMoreItems = mappedItems < locationItems;
        let containsItems = locationItems > 0;
        let inSameContinent = continent === location.worldNumber;

        return inSameContinent && roomForMoreItems && containsItems;
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
            templateNode.completionRequirements = locationMetadata[mappedLocation].completionRequirements;
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

const checkRequirements = (requirements, items, spells, abilities) => {
    if (requirements.length <= 0) {
        return true;
    }

    let result = true;
    requirements.forEach(requirement => {
        let subRequirements = requirement.split("|").map(subRequirement => subRequirement.trim());
        let subResult = false;
        subRequirements.forEach(subRequirement => {
            subResult = subResult || items.includes(subRequirement) || spells.includes(subRequirement) || abilities.includes(subRequirement);
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

const getAccessibleNodes = (nodeName, partialTemplate, items=[], spells=[], abilities=[], visitedNodes=[]) => {
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
                if (requirements && checkRequirements(requirements, items, spells, abilities)) {
                    let [newAccessibleNodes, newlyVisitedNodes] = getAccessibleNodes(connectedNode, partialTemplate, items, spells, abilities, visitedNodes);
                    newAccessibleNodes.forEach(newNode => {if (!accessibleNodes.includes(newNode)) accessibleNodes.push(newNode)});
                    newlyVisitedNodes.forEach(newNode => {if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode)});
                }
            } else {
                let [newAccessibleNodes, newlyVisitedNodes] = getAccessibleNodes(connectedNode, partialTemplate, items, spells, abilities, visitedNodes);
                newAccessibleNodes.forEach(newNode => {if (!accessibleNodes.includes(newNode)) accessibleNodes.push(newNode)});
                newlyVisitedNodes.forEach(newNode => {if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode)});
            }
        });
    }
    if (node && node.links) {
        node.links.forEach((linkedNode) => {
            if (node.linkRequirements && node.linkRequirements[linkedNode]) {
                let requirements = node.linkRequirements[linkedNode];
                if (requirements && checkRequirements(requirements, items, spells, abilities)) {
                    let [newAccessibleNodes, newlyVisitedNodes] = getAccessibleNodes(linkedNode, partialTemplate, items, spells, abilities, visitedNodes);
                    newAccessibleNodes.forEach(newNode => {if (!accessibleNodes.includes(newNode)) accessibleNodes.push(newNode)});
                    newlyVisitedNodes.forEach(newNode => {if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode)});
                }
            } else {
                let [newAccessibleNodes, newlyVisitedNodes] = getAccessibleNodes(linkedNode, partialTemplate, items, spells, abilities, visitedNodes);
                newAccessibleNodes.forEach(newNode => {if (!accessibleNodes.includes(newNode)) accessibleNodes.push(newNode)});
                newlyVisitedNodes.forEach(newNode => {if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode)});
            }
        });
    }

    return [accessibleNodes, visitedNodes];
}

const getCompletablePalaces = (accessibleNodes, items=[], spells=[], abilities=[]) => {
    return accessibleNodes.filter(node => {
        let mappedLocation = getNodeMappedLocationName(node);
        return mappedLocation && locationMetadata[mappedLocation].type === "PALACE";
    }).filter(palaceNode => {
        let palaceName = getNodeMappedLocationName(palaceNode);
        let palace = locationMetadata[palaceName];
        return palace.completionRequirements && checkRequirements(palace.completionRequirements, items, spells, abilities);
    }).map(palaceNode => {
        return getNodeMappedLocationName(palaceNode);
    }).sort();
}

const getCurrentRemedies = (accessibleNodes, items=[], spells=[], abilities=[]) => {
    let neededRemedies = [];
    accessibleNodes.forEach(nodeName => {
        let node = templateData[nodeName];
        // Check connection requirements
        if (node.connections) {
            node.connections.forEach((connectedNode) => {
                if (node.connectionRequirements && node.connectionRequirements[connectedNode]) {
                    let requirements = node.connectionRequirements[connectedNode];
                    if (requirements && !checkRequirements(requirements, items, spells, abilities)) {
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
                    if (requirements && !checkRequirements(requirements, items, spells, abilities)) {
                        neededRemedies = merge(neededRemedies, expandRequirements(requirements));
                    }
                }
            });
        }
        // Check completion requirements
        if (node.completionRequirements) {
            neededRemedies = merge(neededRemedies, expandRequirements(node.completionRequirements));
        }
    });
    return neededRemedies.filter(remedy => !items.includes(remedy) && !spells.includes(remedy) && !abilities.includes(remedy));
}

const getSpellTown = (spell) => {
    let townLocation = Object.keys(locationMetadata).find(key => {
        let location = locationMetadata[key];

        return location.spell === spell;
    });

    return locationMetadata[townLocation];
};

const getAbilityTown = (ability) => {
    let townLocation = Object.keys(locationMetadata).find(key => {
        let location = locationMetadata[key];

        return location.ability === ability;
    });

    return locationMetadata[townLocation];
};

const placeMagicContainers = (nMagicContainers, accessibleNodes, partialTemplate) => {
    let nMagicContainersAlreadyPlaced = Object.keys(partialTemplate).reduce((acc, nodeName) => {
        if (!partialTemplate[nodeName].mappedItems) {
            return acc;
        }

        partialTemplate[nodeName].mappedItems.forEach(itemName => {
            if (itemName === "MAGIC_CONTAINER") {
                acc++;
            }
        });

        return acc;
    }, 0);

    for (let i = nMagicContainersAlreadyPlaced; i < nMagicContainers; i++) {
        partialTemplate = placeRemedies("MAGIC_CONTAINER", accessibleNodes, partialTemplate);
    }

    return partialTemplate;
}

const placeRemedies = (nextRemedy, accessibleNodes, partialTemplate) => {
    if (!nextRemedy) {
        return partialTemplate;
    }

    if (nextRemedy === "MAGIC7") {
        console.log("PLACING MAGIC7");
        return placeMagicContainers(3, accessibleNodes, partialTemplate);
    } else if (nextRemedy === "MAGIC8") {
        console.log("PLACING MAGIC8");
        return placeMagicContainers(4, accessibleNodes, partialTemplate);
    } else if (isSpell(nextRemedy)) {
        console.log("PLACING SPELL " + nextRemedy);

        // Get the spell town for the current needed remedy
        let spellTown = getSpellTown(nextRemedy);

        // Check if town with spell is already placed
        let unmappedNodes = accessibleNodes.filter(node => !partialTemplate[node].mappedLocation && spellTown.worldNumber === partialTemplate[node].continent)

        // Check to see if town with ability is already placed
        let remedyNode = accessibleNodes.find(node => partialTemplate[node].mappedLocation === spellTown.id);
        if (!remedyNode) {
            remedyNode = chooseRandomNode(unmappedNodes);
            partialTemplate[remedyNode].mappedLocation = spellTown.id;
        }
        
        // If town needs remedy, recurse into place remedies again.
        if (spellTown.spellRequirements) {
            let spellTownRemedy = spellTown.spellRequirements[0];

            partialTemplate = placeRemedies(spellTownRemedy, accessibleNodes, partialTemplate);
        }

        if (!spells.includes(nextRemedy)) {
            spells.push(nextRemedy);
        }
    } else if (isAbility(nextRemedy)) {
        console.log("PLACING ABILITY " + nextRemedy);

        // Get the ability town for the current needed remedy
        let abilityTown = getAbilityTown(nextRemedy);

        // If not placed, place it in a random location
        let unmappedNodes = accessibleNodes.filter(node => !partialTemplate[node].mappedLocation && abilityTown.worldNumber === partialTemplate[node].continent);

        // Check to see if town with ability is already placed
        let remedyNode = accessibleNodes.find(node => partialTemplate[node].mappedLocation === abilityTown.id);
        if (!remedyNode) {
            remedyNode = chooseRandomNode(unmappedNodes);
            partialTemplate[remedyNode].mappedLocation = abilityTown.id;   
        }

        // If town needs remedy, recurse into place remedies again.
        if (abilityTown.abilityRequirements) {
            let abilityTownRemedy = abilityTown.abilityRequirements[0];

            partialTemplate = placeRemedies(abilityTownRemedy, accessibleNodes, partialTemplate);
        }

        if (!abilities.includes(nextRemedy)) {
            abilities.push(nextRemedy);
        }
    } else if (isBagu(nextRemedy)) {
        console.log("PLACING BAGU");

        // Pick an accessible node
        let remedyNode = chooseRandomNode(accessibleNodes.filter(node => !partialTemplate[node].mappedLocation));

        // Map node to spell town
        partialTemplate[remedyNode].mappedLocation = "BAGUS_CABIN";

        items.push(nextRemedy);
    } else {
        console.log("PLACING ITEM " + nextRemedy);
        // Check to see if item is already placed
        let itemNode = accessibleNodes.find(accessibleNode => !["MAGIC_CONTAINER", "HEART_CONTAINER", "1UP", "50PB", "100PB", "200PB", "500PB"].includes(nextRemedy) && partialTemplate[accessibleNode].mappedItems && partialTemplate[accessibleNode].mappedItems.includes(nextRemedy));
        if (itemNode) {
            console.log("ITEM ALREADY PLACED");
            return partialTemplate;
        }

        // Filter out nodes that don't have a mapped location or ones that do that have room for items left
        let unmappedNodes = accessibleNodes.filter(node =>  
            (
                !partialTemplate[node].mappedLocation &&
                !partialTemplate[node].mappedItems
            ) 
            ||
            (
                partialTemplate[node].mappedLocation &&
                partialTemplate[node].mappedItems &&
                partialTemplate[node].mappedItems.length < locationMetadata[partialTemplate[node].mappedLocation].items.length
            )
        );

        // Pick a random node
        let remedyNode = chooseRandomNode(unmappedNodes);

        // Pick a random location
        let completablePalaces = getCompletablePalaces(accessibleNodes, items, spells, abilities);
        let itemBearingLocations = getItemBearingLocations(remedyNode, completablePalaces);
        let randomItemBearingLocationName = chooseRandomNode(itemBearingLocations);
        let randomItemBearingLocation = locationMetadata[randomItemBearingLocationName];

        console.log("ITEM BEARING LOCATIONS: " + itemBearingLocations);
        console.log("SELECTED LOCATION:      " + randomItemBearingLocationName);

        // If the remedy node isn't already mapped then we will map it.
        let foundNode = accessibleNodes.find(node => partialTemplate[node].mappedLocation === randomItemBearingLocation.id);
        if (!foundNode && !partialTemplate[remedyNode].mappedLocation) {
            partialTemplate[remedyNode].mappedLocation = randomItemBearingLocationName;
        } else if (foundNode) {
            remedyNode = foundNode;
        }

        // If mapped items isn't initialized for this area, initialize it
        if (!partialTemplate[remedyNode].mappedItems) {
            partialTemplate[remedyNode].mappedItems = templateData[remedyNode].mappedItems = [];
        }

        // Map items to chosen location
        partialTemplate[remedyNode].mappedItems.push(nextRemedy);

        // If town needs remedy, recurse into place remedies again.
        if (randomItemBearingLocation.itemRequirements && randomItemBearingLocation.itemRequirements.length > 0) {
            console.log("ITEM HAS REQUIREMENTS");
            let itemIndex = partialTemplate[remedyNode].mappedItems.length - 1;
            let itemRemedy = randomItemBearingLocation.itemRequirements[itemIndex];

            partialTemplate = placeRemedies(itemRemedy, accessibleNodes, partialTemplate);
        }

        items.push(nextRemedy);
    }

    return partialTemplate;
}

// Place connections, exits, and palaces for all continents
let passThroughAreas = Object.keys(locationMetadata).filter(key => locationMetadata[key].links.length > 0 && !locationMetadata[key].passThrough);
for (let continent = 0; continent < 4; continent++) {
    console.log("CONTINENT: " + continent);

    // Filter out all passthrough areas
    let continentNodes = Object.keys(templateData).filter(key => templateData[key].continent === continent);
    let localPassThroughAreas = passThroughAreas.filter(key => locationMetadata[key].worldNumber === continent && continentNodes.map(continentNode => templateData[continentNode].locationKey).includes(locationMetadata[key].links[0]));
    let palaces = Object.keys(locationMetadata).filter(key => locationMetadata[key].worldNumber === continent && locationMetadata[key].type === 'PALACE');
    let continentExits = Object.keys(locationMetadata).filter(key => locationMetadata[key].worldNumber === continent && linkIsInAnotherContinent(locationMetadata, locationMetadata[key]));

    console.log(`\tCONTINENT EXITS:       ${continentExits}`);

    // Separate all nodes into their isolation groups
    let isolationAreas = getIsolationZones(continent);

    // Create a list of what isolation groups have been connected. 
    let disconnectedIsolationAreas = [...Array(isolationAreas.length).keys()];
    let firstConnectedIsolationArea = chooseRandomNode(disconnectedIsolationAreas.filter(disconnectedIsolationArea => isolationAreas[disconnectedIsolationArea].length >= 2));
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

    //Randomly place continent exits
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

// Double link map
let partialTemplate = addLinksToPartialTemplate(templateData, locationMetadata);

// Place north castle node in an isolation zone where it a winnable state can be reached
console.log("PLACING NORTH CASTLE");
let isolationAreas = getIsolationZones(0);
let winnableStartingLocations = [];
isolationAreas.forEach(isolationAreaNodes => {
    console.log("\tCHECKING ISOLATION ZONE: " + isolationAreaNodes);
    let isolationAreaWinnableStartingLocations = isolationAreaNodes.filter(isolationAreaNodeName => {
        // Check to see if node already has a mapped location.
        let isolationAreaNode = getNodeMappedLocationName(isolationAreaNodeName);
        if (isolationAreaNode) {
            return false;
        }

        let [accessibleNodes] = getAccessibleNodes(isolationAreaNodeName, partialTemplate);
        let availableItemBearingLocations = accessibleNodes.filter(node =>  
            (
                !partialTemplate[node].mappedLocation &&
                !partialTemplate[node].mappedItems
            ) 
            ||
            (
                partialTemplate[node].mappedLocation &&
                partialTemplate[node].mappedItems &&
                partialTemplate[node].mappedItems.length < locationMetadata[partialTemplate[node].mappedLocation].items.length
            )
        );

        return availableItemBearingLocations.length >= 2;
    });
    winnableStartingLocations = [...winnableStartingLocations, ...isolationAreaWinnableStartingLocations];
});
let northPalaceNode = chooseRandomNode(winnableStartingLocations);
partialTemplate[northPalaceNode].mappedLocation = "NORTH_CASTLE";
console.log(`\tPLACED NORTH CASTLE AT ${templateData[northPalaceNode].locationKey}`);

// Find north castle node
let northCastleNode = Object.keys(partialTemplate).find(key => {
    return partialTemplate[key].mappedLocation === "NORTH_CASTLE";
});

let items = [];
let spells = [];
let abilities = [];
let [accessibleNodes]  = getAccessibleNodes(northCastleNode, partialTemplate, items, spells, abilities);
let completablePalaces = getCompletablePalaces(accessibleNodes, items, spells, abilities);
let neededRemedies     = getCurrentRemedies(accessibleNodes, items, spells, abilities);
let i = 0;
while (completablePalaces.length < 7 && i < 40) {
    console.log("**********************************************************************************************************************");
    console.log("ITERATION " + i);
    console.log("\tITEMS:                " + items);
    console.log("\tSPELLS:               " + spells);
    console.log("\tABILITIES:            " + abilities);
    console.log("\tCOMPLETABLE PALACES:  " + completablePalaces);
    console.log("\tNEEDED REMEDIES:      " + neededRemedies);

    // Find a item bearing location within the same continent to place a remedy in said node
    let nextRemedy = chooseRandomNode(neededRemedies.filter(remedy => remedy !== "CRYSTALS"));
    partialTemplate = placeRemedies(nextRemedy, accessibleNodes, partialTemplate);

    console.log("\tNEXT REMEDY:          " + nextRemedy);

    console.log("\tACCESSIBLE LOCATIONS:");
    console.log(`\t\t${'Node'.padEnd(16, ' ')} ${'Node Location'.padEnd(32, ' ')} ${'Mapped Location'.padEnd(32, ' ')} Mapped Items`);
    accessibleNodes.forEach(node => {
        if (partialTemplate[node]) {
            console.log(`\t\t${node ? node.padEnd(16, ' ') : ''.padEnd(16, ' ')} ${partialTemplate[node].locationKey ? partialTemplate[node].locationKey.padEnd(32, ' ') : ''.padEnd(32, ' ') } ${partialTemplate[node].mappedLocation ? partialTemplate[node].mappedLocation.padEnd(32, ' ') :' '.padEnd(32, ' ')} [${partialTemplate[node].mappedItems ? partialTemplate[node].mappedItems : ''}]`);
        } else {
            console.log(`\t\t${node ? node.padEnd(16, '-') : ''.padEnd(16, '-')} ${''.padEnd(32, '-')} ${''.padEnd(32, '-')} ${''.padEnd(32, '-')}`);
        }
    });

    if (completablePalaces.length >= 6 && !items.includes("CRYSTALS")) {
        items.push("CRYSTALS");
    }

    if (items.filter(item => item === "MAGIC_CONTAINER").length >= 7 && !items.includes("MAGIC7")) {
        items.push("MAGIC7");
    }

    if (items.filter(item => item === "MAGIC_CONTAINER").length >= 8 && !items.includes("MAGIC8")) {
        items.push("MAGIC8");
    }

    // Find accessible nodes, completable palaces, and needed remedies to progress
    [accessibleNodes]  = getAccessibleNodes(northCastleNode, partialTemplate, items, spells, abilities);
    completablePalaces = getCompletablePalaces(accessibleNodes, items, spells, abilities);
    neededRemedies     = getCurrentRemedies(accessibleNodes, items, spells, abilities);
    i++;
}

// // Place all other items, abilities, and spells.
// let optionalItems = ["SHIELD", "FIRE", "LIFE", "UPSTAB", "CANDLE", "CROSS", "HEART_CONTAINER", "HEART_CONTAINER", "HEART_CONTAINER", "HEART_CONTAINER", "50PB", "100PB", "200PB", "200PB", "500PB", "500PB", "500PB", "500PB", "500PB", "1UP", "1UP", "1UP", "1UP", "BAGU_SAUCE"];
// optionalItems.forEach(optionalItem => {
//     partialTemplate = placeRemedies(optionalItem, accessibleNodes, partialTemplate);
// });

// // Place other nodes
// let otherNodes = Object.keys(templateData).filter(nodeName => !templateData[nodeName].mappedLocation);
// let mappedLocations = Object.keys(templateData).map(nodeName => templateData[nodeName].mappedLocation);
// let otherLocations = Object.keys(locationMetadata).filter(locationName => !mappedLocations.includes(locationMetadata[locationName].id));
// otherNodes.forEach((otherNode) => {
//     let node = templateData[otherNode];
//     let randomLocation = chooseRandomNode(otherLocations.filter(locationName => locationMetadata[locationName].worldNumber === node.continent));
//     node.mappedLocation = randomLocation;
//     otherLocations = removeNode(otherLocations, randomLocation);
// });

console.log("**********************************************************************************************************************");
console.log(`FINAL REPORT (${i === 40 ? "UNPLAYABLE" : "SUCCESS"})`);
console.log("\tITEMS:                " + items);
console.log("\tSPELLS:               " + spells);
console.log("\tABILITIES:            " + abilities);
console.log("\tCOMPLETABLE PALACES:  " + completablePalaces);
console.log("\tNEEDED REMEDIES:      " + neededRemedies);
console.log(`\tACCESSIBLE LOCATIONS (${Math.trunc(accessibleNodes.length/Object.keys(partialTemplate).length * 100)}%):`);
console.log(`\t\t${'Node'.padEnd(16, ' ')} ${'Node Location'.padEnd(32, ' ')} ${'Mapped Location'.padEnd(32, ' ')} Mapped Items`);
accessibleNodes.forEach(node => {
    if (partialTemplate[node]) {
        console.log(`\t\t${node ? node.padEnd(16, ' ') : ''.padEnd(16, ' ')} ${partialTemplate[node].locationKey ? partialTemplate[node].locationKey.padEnd(32, ' ') : ''.padEnd(32, ' ') } ${partialTemplate[node].mappedLocation ? partialTemplate[node].mappedLocation.padEnd(32, ' ') :' '.padEnd(32, ' ')} [${partialTemplate[node].mappedItems ? partialTemplate[node].mappedItems : ''}]`);
    } else {
        console.log(`\t\t${node ? node.padEnd(16, '-') : ''.padEnd(16, '-')} ${''.padEnd(32, '-')} ${''.padEnd(32, '-')} ${''.padEnd(32, '-')}`);
    }
});

console.log(`\tUNACCESSIBLE LOCATIONS:`);
console.log(`\t\t${'Node'.padEnd(16, ' ')} ${'Node Location'.padEnd(32, ' ')} Mapped Location`);
Object.keys(partialTemplate).filter(node => !accessibleNodes.includes(node)).forEach(node => {
    if (partialTemplate[node]) {
        console.log(`\t\t${node ? node.padEnd(16, ' ') : ''.padEnd(16, ' ')} ${partialTemplate[node].locationKey ? partialTemplate[node].locationKey.padEnd(32, ' ') : ''.padEnd(32, ' ') } ${partialTemplate[node].mappedLocation ? partialTemplate[node].mappedLocation.padEnd(32, ' ') :' '.padEnd(32, ' ')} [${partialTemplate[node].mappedItems ? partialTemplate[node].mappedItems : ''}]`);
    } else {
        console.log(`\t\t${node ? node.padEnd(16, '-') : ''.padEnd(16, '-')} ${''.padEnd(32, '-')} ${''.padEnd(32, '-')} ${''.padEnd(32, '-')}`);
    }
});

let counts = Object.keys(partialTemplate).map(location => {
    return partialTemplate[location].mappedLocation;
}).filter(location => location !== undefined).reduce((previous, current) => {
    if (!previous[current]) {
        previous[current] = 0;
    }

    previous[current]++;

    return previous;
}, {});

let duplicateLocations = Object.keys(counts).filter(location => counts[location] > 1);
console.log("\nDUPLICATED LOCATIONS: " + duplicateLocations);