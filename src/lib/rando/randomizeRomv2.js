import locationMetadata from '../zelda2/templates/z2-location.meta';
import templateData from '../zelda2/templates/z2-vanilla.template';

import { merge, randomSeed, removeNode, chooseRandomNode } from './util';

class Z2Randomizer {
    graphData = null;
    northCastleNode = null;
    items = [];
    abilities = [];
    spells = [];

    constructor(templateData, locationMetadata) {
        this.templateData = templateData;
        this.locationMetadata = locationMetadata;
    }
    
    isSpell = (remedy) => {
        return ["SHIELD", "JUMP", "LIFE", "FAIRY", "REFLECT", "FIRE", "SPELL", "THUNDER"].includes(remedy);
    }
    
    isAbility = (remedy) => {
        return ["UPSTAB", "DOWNSTAB"].includes(remedy);
    }
    
    isBagu = (remedy) => {
        return ["BAGU_SAUCE"].includes(remedy);
    }
    
    isPalace = (locationName) => {
        this.locationMetadata[locationName] && this.locationMetadata[locationName].type === "PALACE";
    }
    
    getNodeLocationName = (nodeName) => {
        return this.templateData[node] ? this.templateData[nodeName].locationKey : null;
    }
    
    getLocationNodeName = (locationName) => {
        return Object.keys(this.templateData).find(nodeName => {
            let node = this.templateData[nodeName];
            return node.locationKey === locationName;
        });
    }
    
    getMappedLocationNodeName = (locationName) => {
        return Object.keys(this.templateData).find(nodeName => {
            let node = this.templateData[nodeName];
            return node.mappedLocation === locationName;
        });
    }
    
    allCrystalsPlaced = (completablePalaces) => {
        return completablePalaces.length >= 6;
    }
    
    getContinentNodes = (continent) => {
        return Object.keys(this.templateData).filter(key => this.templateData[key].continent === continent);
    }
    
    getIsolationZones = (continent) => {
        let continentNodes = this.getContinentNodes(continent);
        let isolationAreas = [];
        continentNodes.forEach((key) => {
            let node = this.templateData[key];
            if (!isolationAreas[node.isolationGroup]) {
                isolationAreas[node.isolationGroup] = [];
            }
    
            isolationAreas[node.isolationGroup].push(key);
        });
        return isolationAreas.filter(index => isolationAreas[index] !== null);
    }
    
    getNodeMappedLocationName = (nodeName) => {
        return this.graphData[nodeName] ? this.graphData[nodeName].mappedLocation : null;
    }
    
    getItemBearingLocations = (completablePalaces, accessibleNodes) => {
        let accessibleContinents = accessibleNodes.reduce((acc, node) => {
            let continent = this.graphData[node].continent;
    
            if (!acc.includes(continent)) {
                acc.push(continent);
            }
    
            return acc;
        }, []);
        return Object.keys(this.locationMetadata).filter(locationName => {
            let location = this.locationMetadata[locationName];
    
            if (location.type === "PALACE" && !completablePalaces.includes(locationName) || location.id === "BAGUS_CABIN") {
                return false;
            }
    
            // Get node that has this location mapped to it.
            let nodeName = this.getMappedLocationNodeName(locationName);
            let node = this.graphData[nodeName];
    
            // Get the mapped item count and number of items in the location.
            let locationItems = location.items.length;
            let mappedItems   = node && node.mappedItems ? node.mappedItems.length : 0;
            
            // Naming my conditions to make it easier to read.
            let roomForMoreItems = mappedItems < locationItems;
            let containsItems = locationItems > 0;
            let withinAccessibleContinents = accessibleContinents.includes(location.worldNumber);
    
            return roomForMoreItems && containsItems && withinAccessibleContinents;
        });
    }
    
    getConnectableIsolationZones = (isolationAreaIndexes, isolationAreas) => {
        return isolationAreaIndexes.filter(index => {
            return isolationAreas[index].length > 1
        });
    }
    
    linkIsInAnotherContinent = (location) => {
        if (location.links && location.links.length > 0) {
            let key = location.links[0];
            return this.locationMetadata[key].worldNumber !== location.worldNumber;
        }
    
        return false;
    }
    
    createGraphData = () => {
        this.graphData = {};
        Object.keys(this.templateData).forEach(key => {
            let templateNode = this.templateData[key];
            let mappedLocation = templateNode.mappedLocation;
    
            // Translate links and linkRequirements into nodes
            if (mappedLocation && this.locationMetadata[mappedLocation]) {
                templateNode.links = this.locationMetadata[mappedLocation].links.map(link => {
                    return Object.keys(this.templateData).find(linkKey => {
                        if (this.templateData[linkKey].mappedLocation === link) {
                            return true;
                        }
                    })
                });
                templateNode.linkRequirements = {};
                templateNode.completionRequirements = this.locationMetadata[mappedLocation].completionRequirements;
                Object.keys(this.locationMetadata[mappedLocation].linkRequirements).forEach(link => {
                    let nodeId = Object.keys(this.templateData).find(linkKey => {
                        if (this.templateData[linkKey].mappedLocation === link) {
                            return true;
                        }
                    });
                    templateNode.linkRequirements[nodeId] = this.locationMetadata[mappedLocation].linkRequirements[link];
                });
            }
    
            // Double link all connections
            if (templateNode.connections) {
                templateNode.connections.forEach(connection => {
                    if (!this.templateData[connection].connections) {
                        this.templateData[connection].connections = [];
                    }
    
                    if (!this.templateData[connection].connectionRequirements) {
                        this.templateData[connection].connectionRequirements = {};
                    }
    
                    if (!this.templateData[connection].connections.includes(key)) {
                        this.templateData[connection].connections.push(key);
                    }
    
                    // Connect back connection requirements
                    if (templateNode.connectionRequirements && connection in templateNode.connectionRequirements) {
                        this.templateData[connection].connectionRequirements[key] = templateNode.connectionRequirements[connection];
                    }
                });
            }
    
            this.graphData[key] = templateNode;
        });
    }
    
    checkRequirements = (requirements) => {
        if (requirements.length <= 0) {
            return true;
        }
    
        let result = true;
        requirements.forEach(requirement => {
            let subRequirements = requirement.split("|").map(subRequirement => subRequirement.trim());
            let subResult = false;
            subRequirements.forEach(subRequirement => {
                subResult = subResult || this.items.includes(subRequirement) || this.spells.includes(subRequirement) || this.abilities.includes(subRequirement);
            });
            result = result && subResult;
        });
    
        return result;
    }
    
    expandRequirements = (requirements) => {
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
    
    getAccessibleNodes = (nodeName, visitedNodes=[]) => {
        if (visitedNodes.includes(nodeName)) {
            return [[], visitedNodes];
        }
    
        let node = this.graphData[nodeName];
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
                    if (requirements && this.checkRequirements(requirements)) {
                        let [newAccessibleNodes, newlyVisitedNodes] = this.getAccessibleNodes(connectedNode, visitedNodes);
                        newAccessibleNodes.forEach(newNode => {if (!accessibleNodes.includes(newNode)) accessibleNodes.push(newNode)});
                        newlyVisitedNodes.forEach(newNode => {if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode)});
                    }
                } else {
                    let [newAccessibleNodes, newlyVisitedNodes] = this.getAccessibleNodes(connectedNode, visitedNodes);
                    newAccessibleNodes.forEach(newNode => {if (!accessibleNodes.includes(newNode)) accessibleNodes.push(newNode)});
                    newlyVisitedNodes.forEach(newNode => {if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode)});
                }
            });
        }
        if (node && node.links) {
            node.links.forEach((linkedNode) => {
                if (node.linkRequirements && node.linkRequirements[linkedNode]) {
                    let requirements = node.linkRequirements[linkedNode];
                    if (requirements && this.checkRequirements(requirements)) {
                        let [newAccessibleNodes, newlyVisitedNodes] = this.getAccessibleNodes(linkedNode, visitedNodes);
                        newAccessibleNodes.forEach(newNode => {if (!accessibleNodes.includes(newNode)) accessibleNodes.push(newNode)});
                        newlyVisitedNodes.forEach(newNode => {if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode)});
                    }
                } else {
                    let [newAccessibleNodes, newlyVisitedNodes] = this.getAccessibleNodes(linkedNode, visitedNodes);
                    newAccessibleNodes.forEach(newNode => {if (!accessibleNodes.includes(newNode)) accessibleNodes.push(newNode)});
                    newlyVisitedNodes.forEach(newNode => {if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode)});
                }
            });
        }
    
        return [accessibleNodes, visitedNodes];
    }
    
    getCompletablePalaces = (accessibleNodes) => {
        return accessibleNodes.filter(node => {
            let mappedLocation = this.getNodeMappedLocationName(node);
            return mappedLocation && this.locationMetadata[mappedLocation].type === "PALACE";
        }).filter(palaceNode => {
            let palaceName = this.getNodeMappedLocationName(palaceNode);
            let palace = this.locationMetadata[palaceName];
            return palace.completionRequirements && this.checkRequirements(palace.completionRequirements);
        }).map(palaceNode => {
            return this.getNodeMappedLocationName(palaceNode);
        }).sort();
    }
    
    getCurrentRemedies = (accessibleNodes) => {
        let neededRemedies = [];
        accessibleNodes.forEach(nodeName => {
            let node = this.graphData[nodeName];
            // Check connection requirements
            if (node.connections) {
                node.connections.forEach((connectedNode) => {
                    if (node.connectionRequirements && node.connectionRequirements[connectedNode]) {
                        let requirements = node.connectionRequirements[connectedNode];
                        if (requirements && !this.checkRequirements(requirements)) {
                            neededRemedies = merge(neededRemedies, this.expandRequirements(requirements));
                        }
                    }
                });
            }
            // Check link requirements
            if (node.links) {
                node.links.forEach((linkedNode) => {
                    if (node.linkRequirements && node.linkRequirements[linkedNode]) {
                        let requirements = node.linkRequirements[linkedNode];
                        if (requirements && !this.checkRequirements(requirements)) {
                            neededRemedies = merge(neededRemedies, this.expandRequirements(requirements));
                        }
                    }
                });
            }
            // Check completion requirements
            if (node.completionRequirements) {
                neededRemedies = merge(neededRemedies, this.expandRequirements(node.completionRequirements));
            }
        });
        return neededRemedies.filter(remedy => !this.items.includes(remedy) && !this.spells.includes(remedy) && !this.abilities.includes(remedy));
    }
    
    getSpellTown = (spell) => {
        let townLocation = Object.keys(this.locationMetadata).find(key => {
            let location = this.locationMetadata[key];
    
            return location.spell === spell;
        });
    
        return this.locationMetadata[townLocation];
    };
    
    getAbilityTown = (ability) => {
        let townLocation = Object.keys(this.locationMetadata).find(key => {
            let location = this.locationMetadata[key];
    
            return location.ability === ability;
        });
    
        return this.locationMetadata[townLocation];
    };
    
    placeMagicContainers = (nMagicContainers, accessibleNodes) => {
        let nMagicContainersAlreadyPlaced = Object.keys(this.graphData).reduce((acc, nodeName) => {
            if (!this.graphData[nodeName].mappedItems) {
                return acc;
            }
    
            this.graphData[nodeName].mappedItems.forEach(itemName => {
                if (itemName === "MAGIC_CONTAINER") {
                    acc++;
                }
            });
    
            return acc;
        }, 0);
    
        for (let i = nMagicContainersAlreadyPlaced; i < nMagicContainers; i++) {
            this.placeRemedies("MAGIC_CONTAINER", accessibleNodes);
        }
    }
    
    placeRemedies = (nextRemedy, accessibleNodes, graphData) => {
        if (!nextRemedy) {
            return;
        }
    
        if (nextRemedy === "MAGIC7") {
            console.log("PLACING MAGIC7");
            return this.placeMagicContainers(3, accessibleNodes);
        } else if (nextRemedy === "MAGIC8") {
            console.log("PLACING MAGIC8");
            return this.placeMagicContainers(4, accessibleNodes);
        } else if (this.isSpell(nextRemedy)) {
            console.log("PLACING SPELL " + nextRemedy);
    
            // Get the spell town for the current needed remedy
            let spellTown = this.getSpellTown(nextRemedy);
    
            // Check if town with spell is already placed
            let unmappedNodes = accessibleNodes.filter(node => !this.graphData[node].mappedLocation && spellTown.worldNumber === this.graphData[node].continent)
    
            // Check to see if town with ability is already placed
            let remedyNode = accessibleNodes.find(node => this.graphData[node].mappedLocation === spellTown.id);
            if (!remedyNode) {
                remedyNode = chooseRandomNode(unmappedNodes);
                this.graphData[remedyNode].mappedLocation = spellTown.id;
            }
            
            // If town needs remedy, recurse into place remedies again.
            if (spellTown.spellRequirements) {
                let spellTownRemedy = spellTown.spellRequirements[0];
    
                this.placeRemedies(spellTownRemedy, accessibleNodes);
            }
    
            if (!this.spells.includes(nextRemedy)) {
                this.spells.push(nextRemedy);
            }
        } else if (this.isAbility(nextRemedy)) {
            console.log("PLACING ABILITY " + nextRemedy);
    
            // Get the ability town for the current needed remedy
            let abilityTown = this.getAbilityTown(nextRemedy);
    
            // If not placed, place it in a random location
            let unmappedNodes = accessibleNodes.filter(node => !this.graphData[node].mappedLocation && abilityTown.worldNumber === this.graphData[node].continent);
    
            // Check to see if town with ability is already placed
            let remedyNode = accessibleNodes.find(node => this.graphData[node].mappedLocation === abilityTown.id);
            if (!remedyNode) {
                remedyNode = chooseRandomNode(unmappedNodes);
                this.graphData[remedyNode].mappedLocation = abilityTown.id;   
            }
    
            // If town needs remedy, recurse into place remedies again.
            if (abilityTown.abilityRequirements) {
                let abilityTownRemedy = abilityTown.abilityRequirements[0];
    
                this.placeRemedies(abilityTownRemedy, accessibleNodes);
            }
    
            if (!this.abilities.includes(nextRemedy)) {
                this.abilities.push(nextRemedy);
            }
        } else if (this.isBagu(nextRemedy)) {
            console.log("PLACING BAGU");
    
            // Pick an accessible node
            let remedyNode = chooseRandomNode(accessibleNodes.filter(node => !this.graphData[node].mappedLocation && this.graphData[node].continent === 0));
    
            // Map node to Bagu
            this.graphData[remedyNode].mappedLocation = "BAGUS_CABIN";
    
            console.log(`PLACING BAGU IN ${remedyNode} (${this.graphData[remedyNode].locationKey})`);
    
            this.items.push(nextRemedy);
        } else {
            console.log("PLACING ITEM " + nextRemedy);
            // Check to see if item is already placed
            let itemNode = accessibleNodes.find(accessibleNode => !["MAGIC_CONTAINER", "HEART_CONTAINER", "1UP", "50PB", "100PB", "200PB", "500PB"].includes(nextRemedy) && this.graphData[accessibleNode].mappedItems && this.graphData[accessibleNode].mappedItems.includes(nextRemedy));
            if (itemNode) {
                console.log("ITEM ALREADY PLACED");
                return;
            }
    
            // Pick a random location
            let completablePalaces = this.getCompletablePalaces(accessibleNodes);
            let itemBearingLocations = this.getItemBearingLocations(completablePalaces, accessibleNodes);
            let randomItemBearingLocationName = chooseRandomNode(itemBearingLocations);
            let randomItemBearingLocation = this.locationMetadata[randomItemBearingLocationName];
            let randomItemBearingLocationContinent = randomItemBearingLocation.worldNumber;
    
            // If the remedy node isn't already mapped then we will map it.
            let remedyNode = accessibleNodes.find(node => this.graphData[node].mappedLocation === randomItemBearingLocation.id);
            if (!remedyNode) {
                // Filter out nodes that don't have a mapped location or ones that do that have room for items left
                let unmappedNodes = accessibleNodes.filter(node => {
                    return this.graphData[node].continent === randomItemBearingLocationContinent &&
                    ((
                        !this.graphData[node].mappedLocation &&
                        !this.graphData[node].mappedItems
                    ) 
                    ||
                    (
                        this.graphData[node].mappedLocation &&
                        this.graphData[node].mappedItems &&
                        this.graphData[node].mappedItems.length < this.locationMetadata[this.graphData[node].mappedLocation].items.length
                    ))
                });
                remedyNode = chooseRandomNode(unmappedNodes);
                this.graphData[remedyNode].mappedLocation = randomItemBearingLocationName;
            }
    
            // If mapped items isn't initialized for this area, initialize it
            if (!this.graphData[remedyNode].mappedItems) {
                this.graphData[remedyNode].mappedItems = this.graphData[remedyNode].mappedItems = [];
            }
    
            // Map items to chosen location
            this.graphData[remedyNode].mappedItems.push(nextRemedy);
    
            // If town needs remedy, recurse into place remedies again.
            if (randomItemBearingLocation.itemRequirements && randomItemBearingLocation.itemRequirements.length > 0) {
                console.log("ITEM HAS REQUIREMENTS");
                let itemIndex = this.graphData[remedyNode].mappedItems.length - 1;
                let itemRemedy = randomItemBearingLocation.itemRequirements[itemIndex];
    
                this.placeRemedies(itemRemedy, accessibleNodes);
            }
    
            this.items.push(nextRemedy);
        }
    }
    
    placeConnectionsPalacesAndExits = () => {
        // Place connections, exits, and palaces for all continents
        let passThroughAreas = Object.keys(this.locationMetadata).filter(key => this.locationMetadata[key].links.length > 0 && !this.locationMetadata[key].passThrough);
        for (let continent = 0; continent < 4; continent++) {
            console.log("CONTINENT: " + continent);
    
            // Filter out all passthrough areas
            let continentNodes = Object.keys(this.templateData).filter(key => this.templateData[key].continent === continent);
            let localPassThroughAreas = passThroughAreas.filter(key => this.locationMetadata[key].worldNumber === continent && continentNodes.map(continentNode => this.templateData[continentNode].locationKey).includes(this.locationMetadata[key].links[0]));
            let palaces = Object.keys(this.locationMetadata).filter(key => this.locationMetadata[key].worldNumber === continent && this.locationMetadata[key].type === 'PALACE');
            let continentExits = Object.keys(this.locationMetadata).filter(key => this.locationMetadata[key].worldNumber === continent && this.linkIsInAnotherContinent(this.locationMetadata[key]));
    
            console.log(`\tCONTINENT EXITS:       ${continentExits}`);
    
            // Separate all nodes into their isolation groups
            let isolationAreas = this.getIsolationZones(continent);
    
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
                this.templateData[entranceNode].mappedLocation = entrance;
    
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
                let availableExits = this.locationMetadata[entrance].links;
                availableExits.forEach((exit) => {
                    let exitIndex;
                    if (connectedIsolationAreas.length === 1 && disconnectedIsolationAreas.length > 0) {
                        let connectableZones = this.getConnectableIsolationZones(disconnectedIsolationAreas, isolationAreas);
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
                    this.templateData[exitNode].mappedLocation = exit;
    
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
    
                    console.log(`\t\t\tCONNECTING    ${this.templateData[entranceNode].locationKey} to ${this.templateData[exitNode].locationKey} via ${entrance} and ${exit}`);
                });
            }
    
            // Randomly place continent exits
            console.log("\tRP2: PLACING EXITS");
            for (let exit of continentExits) {
                console.log("\t\tCONTINENT NODES LEFT: " + JSON.stringify(continentNodes));
    
                let randomNode = chooseRandomNode(continentNodes);
                continentNodes = removeNode(continentNodes, randomNode);
    
                this.templateData[randomNode].mappedLocation = exit;
    
                console.log("\t\tRANDOM NODE PICKED FOR EXIT: " + randomNode);
                console.log(`\t\tPLACING EXIT ${exit} in ${this.templateData[randomNode].locationKey}`);
            }
    
            //Randomly place continent exits
            console.log("\tRP3: PLACING PALACES");
            for (let palace of palaces) {
                console.log("\t\tCONTINENT NODES LEFT: " + JSON.stringify(continentNodes));
    
                let randomNode = chooseRandomNode(continentNodes);
                continentNodes = removeNode(continentNodes, randomNode);
    
                this.templateData[randomNode].mappedLocation = palace;
    
                console.log("\t\tRANDOM NODE PICKED FOR PALACE: " + randomNode);
                console.log(`\t\tPLACING PALACE ${palace} in ${this.templateData[randomNode].locationKey}`);
            }
        }
    }
    
    placeNorthCastle = () => {
        // Place north castle node in an isolation zone where it a winnable state can be reached
        console.log("PLACING NORTH CASTLE");
        let isolationAreas = this.getIsolationZones(0);
        let winnableStartingLocations = [];
        isolationAreas.forEach(isolationAreaNodes => {
            console.log("\tCHECKING ISOLATION ZONE: " + isolationAreaNodes);
            let isolationAreaWinnableStartingLocations = isolationAreaNodes.filter(isolationAreaNodeName => {
                // Check to see if node already has a mapped location.
                let isolationAreaNode = this.getNodeMappedLocationName(isolationAreaNodeName);
                if (isolationAreaNode) {
                    return false;
                }

                let [accessibleNodes] = this.getAccessibleNodes(isolationAreaNodeName);
                let availableItemBearingLocations = accessibleNodes.filter(node =>  
                    (
                        !this.graphData[node].mappedLocation &&
                        !this.graphData[node].mappedItems
                    ) 
                    ||
                    (
                        this.graphData[node].mappedLocation &&
                        this.graphData[node].mappedItems &&
                        this.graphData[node].mappedItems.length < this.locationMetadata[this.graphData[node].mappedLocation].items.length
                    )
                );

                return availableItemBearingLocations.length >= 2;
            });
            winnableStartingLocations = [...winnableStartingLocations, ...isolationAreaWinnableStartingLocations];
        });
        this.northCastleNode = chooseRandomNode(winnableStartingLocations);
        this.graphData[this.northCastleNode].mappedLocation = "NORTH_CASTLE";
        console.log(`\tPLACED NORTH CASTLE AT ${this.graphData[this.northCastleNode].locationKey}`);
    }

    placeItemsAndNodes = () => {
        let [accessibleNodes]  = this.getAccessibleNodes(this.northCastleNode);
        let completablePalaces = this.getCompletablePalaces(accessibleNodes);
        let neededRemedies     = this.getCurrentRemedies(accessibleNodes);
        let i = 0;
        while (completablePalaces.length < 7 && i < 40) {
            console.log("**********************************************************************************************************************");
            console.log("ITERATION " + i);
            console.log("\tITEMS:                " + this.items);
            console.log("\tSPELLS:               " + this.spells);
            console.log("\tABILITIES:            " + this.abilities);
            console.log("\tCOMPLETABLE PALACES:  " + completablePalaces);
            console.log("\tNEEDED REMEDIES:      " + neededRemedies);

            // Find a item bearing location within the same continent to place a remedy in said node
            let nextRemedy = chooseRandomNode(neededRemedies.filter(remedy => remedy !== "CRYSTALS"));
            this.placeRemedies(nextRemedy, accessibleNodes);

            console.log("\tNEXT REMEDY:          " + nextRemedy);

            console.log("\tACCESSIBLE LOCATIONS:");
            console.log(`\t\t${'Node'.padEnd(16, ' ')} ${'Node Location'.padEnd(32, ' ')} ${'Mapped Location'.padEnd(32, ' ')} Mapped Items`);
            accessibleNodes.forEach(node => {
                if (this.graphData[node]) {
                    console.log(`\t\t${node ? node.padEnd(16, ' ') : ''.padEnd(16, ' ')} ${this.graphData[node].locationKey ? this.graphData[node].locationKey.padEnd(32, ' ') : ''.padEnd(32, ' ') } ${this.graphData[node].mappedLocation ? this.graphData[node].mappedLocation.padEnd(32, ' ') :' '.padEnd(32, ' ')} [${this.graphData[node].mappedItems ? this.graphData[node].mappedItems : ''}]`);
                } else {
                    console.log(`\t\t${node ? node.padEnd(16, '-') : ''.padEnd(16, '-')} ${''.padEnd(32, '-')} ${''.padEnd(32, '-')} ${''.padEnd(32, '-')}`);
                }
            });

            if (completablePalaces.length >= 6 && !this.items.includes("CRYSTALS")) {
                this.items.push("CRYSTALS");
            }

            if (this.items.filter(item => item === "MAGIC_CONTAINER").length >= 7 && !this.items.includes("MAGIC7")) {
                this.items.push("MAGIC7");
            }

            if (this.items.filter(item => item === "MAGIC_CONTAINER").length >= 8 && !this.items.includes("MAGIC8")) {
                this.items.push("MAGIC8");
            }

            // Find accessible nodes, completable palaces, and needed remedies to progress
            [accessibleNodes]  = this.getAccessibleNodes(this.northCastleNode);
            completablePalaces = this.getCompletablePalaces(accessibleNodes);
            neededRemedies     = this.getCurrentRemedies(accessibleNodes);
            i++;
        }

        // Place all other items, abilities, and spells.
        let optionalItems = ["SHIELD", "FIRE", "LIFE", "UPSTAB", "CANDLE", "CROSS", "HEART_CONTAINER", "HEART_CONTAINER", "HEART_CONTAINER", "HEART_CONTAINER", "50PB", "100PB", "200PB", "200PB", "500PB", "500PB", "500PB", "500PB", "500PB", "1UP", "1UP", "1UP", "1UP", "BAGU_SAUCE"];
        optionalItems.forEach(optionalItem => {
            this.placeRemedies(optionalItem, accessibleNodes);
        });

        // Place other nodes
        let otherNodes = Object.keys(this.graphData).filter(nodeName => !this.graphData[nodeName].mappedLocation);
        let mappedLocations = Object.keys(this.graphData).map(nodeName => this.graphData[nodeName].mappedLocation);
        let otherLocations = Object.keys(this.locationMetadata).filter(locationName => !mappedLocations.includes(this.locationMetadata[locationName].id));
        otherNodes.forEach((otherNode) => {
            let node = this.graphData[otherNode];
            let randomLocation = chooseRandomNode(otherLocations.filter(locationName => this.locationMetadata[locationName].worldNumber === node.continent));
            node.mappedLocation = randomLocation;
            otherLocations = removeNode(otherLocations, randomLocation);
        });

        console.log("**********************************************************************************************************************");
        console.log(`FINAL REPORT (${i === 40 ? "UNPLAYABLE" : "SUCCESS"})`);
        console.log("\tITEMS:                " + this.items);
        console.log("\tSPELLS:               " + this.spells);
        console.log("\tABILITIES:            " + this.abilities);
        console.log("\tCOMPLETABLE PALACES:  " + completablePalaces);
        console.log("\tNEEDED REMEDIES:      " + neededRemedies);
        console.log(`\tACCESSIBLE LOCATIONS (${Math.trunc(accessibleNodes.length/Object.keys(this.graphData).length * 100)}%):`);
        console.log(`\t\t${'Node'.padEnd(16, ' ')} ${'Node Location'.padEnd(32, ' ')} ${'Mapped Location'.padEnd(32, ' ')} Mapped Items`);
        accessibleNodes.forEach(node => {
            if (this.graphData[node]) {
                console.log(`\t\t${node ? node.padEnd(16, ' ') : ''.padEnd(16, ' ')} ${this.graphData[node].locationKey ? this.graphData[node].locationKey.padEnd(32, ' ') : ''.padEnd(32, ' ') } ${this.graphData[node].mappedLocation ? this.graphData[node].mappedLocation.padEnd(32, ' ') :' '.padEnd(32, ' ')} [${this.graphData[node].mappedItems ? this.graphData[node].mappedItems : ''}]`);
            } else {
                console.log(`\t\t${node ? node.padEnd(16, '-') : ''.padEnd(16, '-')} ${''.padEnd(32, '-')} ${''.padEnd(32, '-')} ${''.padEnd(32, '-')}`);
            }
        });

        console.log(`\tUNACCESSIBLE LOCATIONS:`);
        console.log(`\t\t${'Node'.padEnd(16, ' ')} ${'Node Location'.padEnd(32, ' ')} Mapped Location`);
        Object.keys(this.graphData).filter(node => !accessibleNodes.includes(node)).forEach(node => {
            if (this.graphData[node]) {
                console.log(`\t\t${node ? node.padEnd(16, ' ') : ''.padEnd(16, ' ')} ${this.graphData[node].locationKey ? this.graphData[node].locationKey.padEnd(32, ' ') : ''.padEnd(32, ' ') } ${this.graphData[node].mappedLocation ? this.graphData[node].mappedLocation.padEnd(32, ' ') :' '.padEnd(32, ' ')} [${this.graphData[node].mappedItems ? this.graphData[node].mappedItems : ''}]`);
            } else {
                console.log(`\t\t${node ? node.padEnd(16, '-') : ''.padEnd(16, '-')} ${''.padEnd(32, '-')} ${''.padEnd(32, '-')} ${''.padEnd(32, '-')}`);
            }
        });

        let counts = Object.keys(this.graphData).map(location => {
            return this.graphData[location].mappedLocation;
        }).filter(location => location !== undefined).reduce((previous, current) => {
            if (!previous[current]) {
                previous[current] = 0;
            }

            previous[current]++;

            return previous;
        }, {});

        let duplicateLocations = Object.keys(counts).filter(location => counts[location] > 1);
        console.log("\nDUPLICATED LOCATIONS: " + duplicateLocations);
    }

    randomize = () => {
        // Place connections, palaces and exits
        this.placeConnectionsPalacesAndExits();

        // Double link map
        this.createGraphData();

        // Place north castle node in an isolation zone where it a winnable state can be reached
        this.placeNorthCastle();

        // Place all items and nodes
        this.placeItemsAndNodes();
    }
}

let randomizer = new Z2Randomizer(templateData, locationMetadata);
randomizer.randomize();