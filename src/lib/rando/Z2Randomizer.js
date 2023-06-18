import { deepCopy, merge, randomSeed, removeNode } from "./util";

const REMEDY_LIST = [
    "SHIELD",
    "JUMP",
    "LIFE",
    "FAIRY",
    "FIRE",
    "REFLECT",
    "SPELL",
    "THUNDER",
    "DOWNSTAB",
    "UPSTAB",
    "CANDLE",
    "HANDY_GLOVE",
    "RAFT",
    "HAMMER",
    "BOOTS",
    "RECORDER",
    "MAGIC_KEY",
    "CROSS",
    "BAGU_SAUCE",
    "HEART_CONTAINER",
    "HEART_CONTAINER",
    "HEART_CONTAINER",
    "HEART_CONTAINER",
    "50PB",
    "100PB",
    "200PB",
    "500PB",
    "500PB",
    "500PB",
    "500PB",
    "500PB",
    "500PB",
    "1UP",
    "1UP",
    "1UP",
    "1UP",
];

const DEFAULT_OPTIONS = {
    matchLocationTypes: false,
    allWaterIsWalkable: false
}

export class Z2Randomizer {
    graphData = null;
    northCastleNode = null;
    items = [];
    abilities = [];
    spells = [];
    options = {};

    constructor(templateData, locationMetadata, seed = 0, options = DEFAULT_OPTIONS) {
        this.templateData = deepCopy(templateData);
        this.graphData = deepCopy(templateData);
        this.locationMetadata = locationMetadata;
        this.randomNumberGenerator = randomSeed(seed);
        this.options = options;
    }

    /**
     * Check node to see if it is either unmapped or still has room
     * @param {string} node
     * @returns
     */
    isNodeUnmappedOrNotFull = (node) => {
        let mappedLocationItemCapacity = this.getMappedLocationItemCapacity(node);
        let mappedLocationItemCount = this.getNodeItemCount(node);

        let noMappedLocationOrItem =
            !this.graphData[node].mappedLocation && !this.graphData[node].mappedItems;
        let stillRoomForItem = mappedLocationItemCount < mappedLocationItemCapacity;

        let hasMappedLocationAndItems =
            this.graphData[node].mappedLocation && this.graphData[node].mappedItems;
        let hasMappedLocationButStillRoomForItem =
            hasMappedLocationAndItems && stillRoomForItem;

        return noMappedLocationOrItem || hasMappedLocationButStillRoomForItem;
    };

    /**
     * Get nodes that are available to have an item placed in them
     * @param {Array} accessibleNodes
     * @param {number} continent
     * @returns
     */
    getAvailableNodes = (accessibleNodes, continent) => {
        return accessibleNodes.filter((node) => {
            let onSameContinent = this.graphData[node].continent === continent;
            return onSameContinent && !this.graphData[node].mappedLocation;
        });
    };

    /**
     *
     * @param {string} node
     * @returns item capacity in given location
     */
    getMappedLocationItemCapacity = (node) => {
        let mappedLocationData =
            this.locationMetadata[this.graphData[node].mappedLocation];
        return mappedLocationData && mappedLocationData.items
            ? mappedLocationData.items.length
            : 0;
    };

    /**
     *
     * @param {string} node
     * @returns number of items in node
     */
    getNodeItemCount = (node) => {
        return this.graphData[node].mappedItems
            ? this.graphData[node].mappedItems.length
            : 0;
    };

    /**
     * Choose a random node from a list deterministically based on seed
     * @param {Array} nodes
     * @returns
     */
    chooseRandomNode = (nodes) => {
        // let r = Math.trunc(Math.random() * nodes.length);
        let r = Math.trunc(this.randomNumberGenerator() * nodes.length);
        return nodes[r];
    };

    /**
     * Checks to see if this remedy is a spell
     * @param {string} remedy
     * @returns
     */
    isSpell = (remedy) => {
        return [
            "SHIELD",
            "JUMP",
            "LIFE",
            "FAIRY",
            "REFLECT",
            "FIRE",
            "SPELL",
            "THUNDER",
        ].includes(remedy);
    };

    /**
     * Checks to see if this remedy is an ability
     * @param {string} remedy
     * @returns
     */
    isAbility = (remedy) => {
        return ["UPSTAB", "DOWNSTAB"].includes(remedy);
    };

    /**
     * Checks to see if this remedy is bagu
     * @param {string} remedy
     * @returns
     */
    isBagu = (remedy) => {
        return ["BAGU_SAUCE"].includes(remedy);
    };

    /**
     * Checks location database to determine if this location is a palace
     * @param {string} locationName
     */
    isPalace = (locationName) => {
        return (
            this.locationMetadata[locationName] &&
            this.locationMetadata[locationName].type === "PALACE"
        );
    };

    /**
     * Adds an item to the list of accessible items
     * @param {string} item
     */
    addItem = (item) => {
        if (!this.items.includes(item)) {
            this.items.push(item);
        }
    };

    /**
     * Adds a spell to the list of accessible spells
     * @param {string} spell
     */
    addSpell = (spell) => {
        if (!this.spells.includes(spell)) {
            this.spells.push(spell);
        }
    };

    /**
     * Adds an ability to the list of accessible abilities
     * @param {string} ability
     */
    addAbility = (ability) => {
        if (!this.abilities.includes(ability)) {
            this.abilities.push(ability);
        }
    };

    /**
     * Get's a node's location name (in Vanilla this is the original name of what would normally be in that node)
     * @param {string} nodeName
     * @returns
     */
    getNodeLocationName = (nodeName) => {
        return this.graphData[nodeName]
            ? this.graphData[nodeName].locationKey
            : null;
    };

    /**
     * Get a node's coordinates
     * @param {string} nodeName
     * @returns
     */
    getNodeCoordinates = (nodeName) => {
        return [this.templateData[nodeName].x, this.templateData[nodeName].y];
    };

    /**
     * Get the node name for a location based on the location's name
     * @param {string} locationName
     * @returns
     */
    getLocationNodeName = (locationName) => {
        return Object.keys(this.graphData).find((nodeName) => {
            let node = this.graphData[nodeName];
            return node.locationKey === locationName;
        });
    };

    /**
     * Get the location name for a mapped node
     * @param {string} locationName
     * @returns
     */
    getMappedLocationNodeName = (locationName) => {
        return Object.keys(this.graphData).find((nodeName) => {
            let node = this.graphData[nodeName];
            return node.mappedLocation === locationName;
        });
    };

    /**
     * Gets the mapped location based on a node name
     * @param {string} nodeName
     * @returns
     */
    getNodeMappedLocationName = (nodeName) => {
        return this.graphData[nodeName]
            ? this.graphData[nodeName].mappedLocation
            : null;
    };

    /**
     * Check to see if all crystals have been placed
     * @param {Array} completablePalaces
     * @returns
     */
    allCrystalsPlaced = (completablePalaces) => {
        return completablePalaces.length >= 6;
    };

    /**
     * Checks to see if a location has a link that is outside the current continent
     * @param {Object} location
     * @returns
     */
    linkIsInAnotherContinent = (location) => {
        if (location.links && location.links.length > 0) {
            let key = location.links[0];
            return this.locationMetadata[key].worldNumber !== location.worldNumber;
        }

        return false;
    };

    /**
     * Gets all nodes in this continent
     * @param {number} continent
     * @returns
     */
    getContinentNodes = (continent) => {
        return Object.keys(this.graphData).filter(
            (key) => this.graphData[key].continent === continent
        );
    };

    /**
     * Gets all isolation zones in this continent
     * @param {number} continent
     * @returns
     */
    getIsolationZones = (continent) => {
        let continentNodes = this.getContinentNodes(continent);
        let isolationAreas = [];
        continentNodes.forEach((key) => {
            let node = this.graphData[key];
            if (!isolationAreas[node.isolationGroup]) {
                isolationAreas[node.isolationGroup] = [];
            }

            isolationAreas[node.isolationGroup].push(key);
        });
        return isolationAreas.filter((index) => isolationAreas[index] !== null);
    };

    /**
     * Get all accessible item bearing locations
     * @param {Array} completablePalaces
     * @param {Array} accessibleNodes
     * @returns
     */
    getAccessibleItemBearingLocations = (completablePalaces, accessibleNodes) => {
        let accessibleNodesPerContinent = accessibleNodes.reduce((acc, node) => {
            let continent = this.graphData[node].continent;

            if (!acc[continent]) {
                acc[continent] = 0;
            }

            if (this.isNodeUnmappedOrNotFull(node)) {
                acc[continent]++;
            }

            return acc;
        }, []);
        let accessibleContinents = accessibleNodes.reduce((acc, node) => {
            let continent = this.graphData[node].continent;

            if (
                !acc.includes(continent) &&
                accessibleNodesPerContinent[continent] > 0
            ) {
                acc.push(continent);
            }

            return acc;
        }, []);
        return Object.keys(this.locationMetadata).filter((locationName) => {
            let location = this.locationMetadata[locationName];

            if (
                (location.type === "PALACE" &&
                    !completablePalaces.includes(locationName)) ||
                location.id === "BAGUS_CABIN"
            ) {
                return false;
            }

            // Get node that has this location mapped to it.
            let nodeName = this.getMappedLocationNodeName(locationName);
            let node = this.graphData[nodeName];

            // Get the mapped item count and number of items in the location.
            let itemCapacity = location && location.items ? location.items.length : 0;
            let itemCount = node && node.mappedItems ? node.mappedItems.length : 0;

            // Naming my conditions to make it easier to read.
            let roomForMoreItems = itemCount < itemCapacity;
            let containsItems = itemCapacity > 0;
            let withinAccessibleContinents = accessibleContinents.includes(
                location.worldNumber
            );

            return roomForMoreItems && containsItems && withinAccessibleContinents;
        });
    };

    /**
     * Get isolation zones that are still connectable to each other
     * @param {Array} isolationAreaIndexes
     * @param {Array} isolationAreas
     * @returns
     */
    getConnectableIsolationZones = (isolationAreaIndexes, isolationAreas) => {
        return isolationAreaIndexes.filter((index) => {
            return isolationAreas[index].length > 1;
        });
    };

    /**
     * Create a graph from a connected template
     */
    createGraphData = () => {
        // this.graphData = {};
        Object.keys(this.graphData).forEach((key) => {
            let templateNode = this.graphData[key];
            let mappedLocation = templateNode.mappedLocation;

            // Translate links and linkRequirements into nodes
            if (mappedLocation && this.locationMetadata[mappedLocation]) {
                templateNode.links = this.locationMetadata[mappedLocation].links.map(
                    (link) => {
                        return Object.keys(this.graphData).find((linkKey) => {
                            if (this.graphData[linkKey].mappedLocation === link) {
                                return true;
                            }
                        });
                    }
                );
                templateNode.linkRequirements = {};
                templateNode.completionRequirements =
                    this.locationMetadata[mappedLocation].completionRequirements;
                Object.keys(
                    this.locationMetadata[mappedLocation].linkRequirements
                ).forEach((link) => {
                    let nodeId = Object.keys(this.graphData).find((linkKey) => {
                        if (this.graphData[linkKey].mappedLocation === link) {
                            return true;
                        }
                    });
                    templateNode.linkRequirements[nodeId] =
                        this.locationMetadata[mappedLocation].linkRequirements[link];
                });
            }

            // Double link all connections
            if (templateNode.connections) {
                templateNode.connections.forEach((connection) => {
                    if (!this.graphData[connection].connections) {
                        this.graphData[connection].connections = [];
                    }

                    if (!this.graphData[connection].connectionRequirements) {
                        this.graphData[connection].connectionRequirements = {};
                    }

                    if (!this.graphData[connection].connections.includes(key)) {
                        this.graphData[connection].connections.push(key);
                    }

                    // Connect back connection requirements
                    if (
                        templateNode.connectionRequirements &&
                        connection in templateNode.connectionRequirements
                    ) {
                        this.graphData[connection].connectionRequirements[key] =
                            templateNode.connectionRequirements[connection];
                    }
                });
            }

            this.graphData[key] = templateNode;
        });
    };

    /**
     * Check requirements against the accessible items, spells, and abilities
     * @param {Array} requirements
     * @returns
     */
    checkRequirements = (
        requirements,
        items = this.items,
        spells = this.spells,
        abilities = this.abilities
    ) => {
        if (requirements.length <= 0) {
            return true;
        }

        let result = true;
        requirements.forEach((requirement) => {
            let subRequirements = requirement
                .split("|")
                .map((subRequirement) => subRequirement.trim());
            let subResult = false;
            subRequirements.forEach((subRequirement) => {
                subResult =
                    subResult ||
                    items.includes(subRequirement) ||
                    spells.includes(subRequirement) ||
                    abilities.includes(subRequirement);
            });
            result = result && subResult;
        });

        return result;
    };

    /**
     * Expand requirements into a list
     * @param {Array} requirements
     * @returns
     */
    expandRequirements = (requirements) => {
        if (requirements.length <= 0) {
            return [];
        }

        let expanded = [];
        requirements.forEach((requirement) => {
            let subRequirements = requirement
                .split("|")
                .map((subRequirement) => subRequirement.trim());
            subRequirements.forEach((subRequirement) => {
                expanded.push(subRequirement);
            });
        });

        return expanded;
    };

    /**
     * Get all accessible nodes recursively without visiting the same nodes twice
     * @param {string} nodeName
     * @param {Array} visitedNodes
     * @returns
     */
    getAccessibleNodes = (
        nodeName,
        items = this.items,
        spells = this.spells,
        abilities = this.abilities,
        visitedNodes = []
    ) => {
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
                if (
                    node.connectionRequirements &&
                    node.connectionRequirements[connectedNode]
                ) {
                    let requirements = node.connectionRequirements[connectedNode];
                    if (
                        requirements &&
                        this.checkRequirements(requirements, items, spells, abilities)
                    ) {
                        let [newAccessibleNodes, newlyVisitedNodes] =
                            this.getAccessibleNodes(
                                connectedNode,
                                items,
                                spells,
                                abilities,
                                visitedNodes
                            );
                        newAccessibleNodes.forEach((newNode) => {
                            if (!accessibleNodes.includes(newNode))
                                accessibleNodes.push(newNode);
                        });
                        newlyVisitedNodes.forEach((newNode) => {
                            if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode);
                        });
                    }
                } else {
                    let [newAccessibleNodes, newlyVisitedNodes] = this.getAccessibleNodes(
                        connectedNode,
                        items,
                        spells,
                        abilities,
                        visitedNodes
                    );
                    newAccessibleNodes.forEach((newNode) => {
                        if (!accessibleNodes.includes(newNode))
                            accessibleNodes.push(newNode);
                    });
                    newlyVisitedNodes.forEach((newNode) => {
                        if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode);
                    });
                }
            });
        }
        if (node && node.links) {
            node.links.forEach((linkedNode) => {
                if (node.linkRequirements && node.linkRequirements[linkedNode]) {
                    let requirements = node.linkRequirements[linkedNode];
                    if (
                        requirements &&
                        this.checkRequirements(requirements, items, spells, abilities)
                    ) {
                        let [newAccessibleNodes, newlyVisitedNodes] =
                            this.getAccessibleNodes(
                                linkedNode,
                                items,
                                spells,
                                abilities,
                                visitedNodes
                            );
                        newAccessibleNodes.forEach((newNode) => {
                            if (!accessibleNodes.includes(newNode))
                                accessibleNodes.push(newNode);
                        });
                        newlyVisitedNodes.forEach((newNode) => {
                            if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode);
                        });
                    }
                } else {
                    let [newAccessibleNodes, newlyVisitedNodes] = this.getAccessibleNodes(
                        linkedNode,
                        items,
                        spells,
                        abilities,
                        visitedNodes
                    );
                    newAccessibleNodes.forEach((newNode) => {
                        if (!accessibleNodes.includes(newNode))
                            accessibleNodes.push(newNode);
                    });
                    newlyVisitedNodes.forEach((newNode) => {
                        if (!visitedNodes.includes(newNode)) visitedNodes.push(newNode);
                    });
                }
            });
        }

        return [accessibleNodes, visitedNodes];
    };

    /**
     * Determines which palaces are able to be accessed and completed
     * @param {Array} accessibleNodes
     * @returns
     */
    getCompletablePalaces = (
        accessibleNodes,
        items = this.items,
        spells = this.spells,
        abilities = this.abilities
    ) => {
        return accessibleNodes
            .filter((node) => {
                let mappedLocation = this.getNodeMappedLocationName(node);
                return (
                    mappedLocation &&
                    this.locationMetadata[mappedLocation].type === "PALACE"
                );
            })
            .filter((palaceNode) => {
                let palaceName = this.getNodeMappedLocationName(palaceNode);
                let palace = this.locationMetadata[palaceName];
                return (
                    palace.completionRequirements &&
                    this.checkRequirements(
                        palace.completionRequirements,
                        items,
                        spells,
                        abilities
                    )
                );
            })
            .map((palaceNode) => {
                return this.getNodeMappedLocationName(palaceNode);
            })
            .sort();
    };

    /**
     * Get the current needed remedies based on the currently accessible nodes
     * @param {Array} accessibleNodes
     * @returns
     */
    getCurrentRemedies = (accessibleNodes) => {
        let neededRemedies = [];
        accessibleNodes.forEach((nodeName) => {
            let node = this.graphData[nodeName];
            // Check connection requirements
            if (node.connections) {
                node.connections.forEach((connectedNode) => {
                    if (
                        node.connectionRequirements &&
                        node.connectionRequirements[connectedNode]
                    ) {
                        let requirements = node.connectionRequirements[connectedNode];
                        if (requirements && !this.checkRequirements(requirements)) {
                            neededRemedies = merge(
                                neededRemedies,
                                this.expandRequirements(requirements)
                            );
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
                            neededRemedies = merge(
                                neededRemedies,
                                this.expandRequirements(requirements)
                            );
                        }
                    }
                });
            }
            // Check completion requirements
            if (node.completionRequirements) {
                neededRemedies = merge(
                    neededRemedies,
                    this.expandRequirements(node.completionRequirements)
                );
            }
        });
        return neededRemedies.filter(
            (remedy) =>
                !this.items.includes(remedy) &&
                !this.spells.includes(remedy) &&
                !this.abilities.includes(remedy)
        );
    };

    /**
     * Get the town that contains this spell
     * @param {string} spell
     * @returns
     */
    getSpellTown = (spell) => {
        let townLocation = Object.keys(this.locationMetadata).find((key) => {
            let location = this.locationMetadata[key];

            return location.spell === spell;
        });

        return this.locationMetadata[townLocation];
    };

    /**
     * Get the town that contains this ability
     * @param {string} ability
     * @returns
     */
    getAbilityTown = (ability) => {
        let townLocation = Object.keys(this.locationMetadata).find((key) => {
            let location = this.locationMetadata[key];

            return location.ability === ability;
        });

        return this.locationMetadata[townLocation];
    };

    /**
     * Place connections between isolation groups and place palaces and continent exits
     */
    placeConnectionsPalacesAndExits = () => {
        // Place connections, exits, and palaces for all continents
        let passThroughAreas = Object.keys(this.locationMetadata).filter(
            (key) =>
                this.locationMetadata[key].links.length > 0 &&
                !this.locationMetadata[key].passThrough
        );
        for (let continent = 0; continent < 4; continent++) {
            console.log("CONTINENT: " + continent);

            // Filter out all passthrough areas
            let continentNodes = Object.keys(this.graphData).filter(
                (key) => this.graphData[key].continent === continent
            );
            let localPassThroughAreas = passThroughAreas.filter(
                (key) =>
                    this.locationMetadata[key].worldNumber === continent &&
                    continentNodes
                        .map((continentNode) => this.graphData[continentNode].locationKey)
                        .includes(this.locationMetadata[key].links[0])
            );
            let palaces = Object.keys(this.locationMetadata).filter(
                (key) =>
                    this.locationMetadata[key].worldNumber === continent &&
                    this.locationMetadata[key].type === "PALACE"
            );
            let continentExits = Object.keys(this.locationMetadata).filter(
                (key) =>
                    this.locationMetadata[key].worldNumber === continent &&
                    this.linkIsInAnotherContinent(this.locationMetadata[key])
            );

            console.log(`\tCONTINENT EXITS:       ${continentExits}`);

            // Separate all nodes into their isolation groups
            let isolationAreas = this.getIsolationZones(continent);

            // Create a list of what isolation groups have been connected.
            let disconnectedIsolationAreas = [...Array(isolationAreas.length).keys()];
            let firstConnectedIsolationArea = this.chooseRandomNode(
                disconnectedIsolationAreas.filter(
                    (disconnectedIsolationArea) =>
                        isolationAreas[disconnectedIsolationArea].length >= 2
                )
            );
            disconnectedIsolationAreas = removeNode(
                disconnectedIsolationAreas,
                firstConnectedIsolationArea
            );
            let connectedIsolationAreas = [firstConnectedIsolationArea];

            // Randomly assign links between isolation groups.
            console.log("\tRP1: PLACING CONNECTIONS");
            while (localPassThroughAreas.length > 0) {
                console.log("\t\tSTARTING NEW PASSTHROUGH");
                console.log("\t\t\tISOLATION ZONES:");
                isolationAreas.forEach((zone, index) => {
                    console.log(
                        `\t\t\t\tISOLATION ${index.toString().padStart(2, "")}:\t` +
                        JSON.stringify(zone)
                    );
                });
                console.log(
                    `\t\t\tLOCAL PASSES  ${JSON.stringify(localPassThroughAreas)}`
                );
                console.log(
                    `\t\t\tCONNECTED     ${JSON.stringify(connectedIsolationAreas)}`
                );
                console.log(
                    `\t\t\tDISCONNECTED  ${JSON.stringify(disconnectedIsolationAreas)}`
                );

                // TODO Use options here to determine if we should place areas where they should go in the first place

                // Choose a random isolation zone for the entrance
                let entranceIndex = this.chooseRandomNode(connectedIsolationAreas);

                // Choose a random entrance node for the entrance
                let entranceNodes = isolationAreas[entranceIndex];
                let entranceNode = this.chooseRandomNode(entranceNodes);

                // Choose a random connecting location and collect it's exits
                let entrance = this.chooseRandomNode(localPassThroughAreas);

                // Set entrance
                this.graphData[entranceNode].mappedLocation = entrance;

                // Remove used passthroughs
                passThroughAreas = removeNode(passThroughAreas, entrance);
                localPassThroughAreas = removeNode(localPassThroughAreas, entrance);

                // Remove node from continent nodes
                continentNodes = removeNode(continentNodes, entranceNode);

                // Remove nodes from isolation zones
                isolationAreas[entranceIndex] = removeNode(
                    isolationAreas[entranceIndex],
                    entranceNode
                );

                // Remove empty entrance isolation area
                if (isolationAreas[entranceIndex].length <= 0) {
                    connectedIsolationAreas = removeNode(
                        connectedIsolationAreas,
                        entranceIndex
                    );
                }

                // For each exit, select a random isolation zone to connect it to
                let availableExits = this.locationMetadata[entrance].links;
                availableExits.forEach((exit) => {
                    let exitIndex;
                    if (
                        connectedIsolationAreas.length === 1 &&
                        disconnectedIsolationAreas.length > 0
                    ) {
                        let connectableZones = this.getConnectableIsolationZones(
                            disconnectedIsolationAreas,
                            isolationAreas
                        );
                        exitIndex = this.chooseRandomNode(connectableZones);
                    } else if (
                        disconnectedIsolationAreas.length > 0 &&
                        connectedIsolationAreas.length > 0
                    ) {
                        exitIndex = this.chooseRandomNode(disconnectedIsolationAreas);
                    } else {
                        exitIndex = this.chooseRandomNode(connectedIsolationAreas);
                    }

                    // Choose a random node from this exit's isolation area
                    let exitNodes = isolationAreas[exitIndex];
                    let exitNode = this.chooseRandomNode(exitNodes);

                    // Set exit
                    this.graphData[exitNode].mappedLocation = exit;

                    // Remove used passthroughs
                    passThroughAreas = removeNode(passThroughAreas, exit);
                    localPassThroughAreas = removeNode(localPassThroughAreas, exit);

                    // Remove node from continent nodes
                    continentNodes = removeNode(continentNodes, exitNode);

                    // Remove nodes from isolation zones
                    isolationAreas[exitIndex] = removeNode(
                        isolationAreas[exitIndex],
                        exitNode
                    );

                    // Remove the nodes we just chose from the disconnected isolation areas list.
                    disconnectedIsolationAreas = removeNode(
                        disconnectedIsolationAreas,
                        exitIndex
                    );
                    if (!connectedIsolationAreas.includes(exitIndex)) {
                        connectedIsolationAreas.push(exitIndex);
                    }

                    // Remove empty exit isolation area
                    if (isolationAreas[exitIndex].length <= 0) {
                        connectedIsolationAreas = removeNode(
                            connectedIsolationAreas,
                            exitIndex
                        );
                    }

                    console.log(
                        `\t\t\tCONNECTING    ${this.graphData[entranceNode].locationKey} to ${this.graphData[exitNode].locationKey} via ${entrance} and ${exit}`
                    );
                });
            }

            // Randomly place continent exits
            console.log("\tRP2: PLACING EXITS");
            for (let exit of continentExits) {
                console.log(
                    "\t\tCONTINENT NODES LEFT: " + JSON.stringify(continentNodes)
                );

                let randomNode = this.chooseRandomNode(continentNodes);
                continentNodes = removeNode(continentNodes, randomNode);

                this.graphData[randomNode].mappedLocation = exit;

                console.log("\t\tRANDOM NODE PICKED FOR EXIT: " + randomNode);
                console.log(
                    `\t\tPLACING EXIT ${exit} in ${this.graphData[randomNode].locationKey}`
                );
            }

            //Randomly place continent exits
            console.log("\tRP3: PLACING PALACES");
            for (let palace of palaces) {
                console.log(
                    "\t\tCONTINENT NODES LEFT: " + JSON.stringify(continentNodes)
                );

                let randomNode = this.chooseRandomNode(continentNodes);
                continentNodes = removeNode(continentNodes, randomNode);

                this.graphData[randomNode].mappedLocation = palace;

                console.log("\t\tRANDOM NODE PICKED FOR PALACE: " + randomNode);
                console.log(
                    `\t\tPLACING PALACE ${palace} in ${this.graphData[randomNode].locationKey}`
                );
            }
        }
    };

    /**
     * Place the north castle node
     */
    placeNorthCastle = () => {
        // Place north castle node in an isolation zone where it a winnable state can be reached
        console.log("PLACING NORTH CASTLE");
        let isolationAreas = this.getIsolationZones(0);
        let winnableStartingLocations = [];
        isolationAreas.forEach((isolationAreaNodes) => {
            console.log("\tCHECKING ISOLATION ZONE: " + isolationAreaNodes);
            let isolationAreaWinnableStartingLocations = isolationAreaNodes.filter(
                (isolationAreaNodeName) => {
                    // Check to see if node already has a mapped location.
                    let isolationAreaNode = this.getNodeMappedLocationName(
                        isolationAreaNodeName
                    );
                    if (isolationAreaNode) {
                        return false;
                    }

                    let [accessibleNodes] = this.getAccessibleNodes(
                        isolationAreaNodeName
                    );
                    let availableItemBearingLocations = accessibleNodes.filter(
                        (node) =>
                            (!this.graphData[node].mappedLocation &&
                                !this.graphData[node].mappedItems) ||
                            (this.graphData[node].mappedLocation &&
                                this.graphData[node].mappedItems &&
                                this.graphData[node].mappedItems.length <
                                this.locationMetadata[this.graphData[node].mappedLocation]
                                    .items.length)
                    );

                    return availableItemBearingLocations.length >= 3;
                }
            );
            winnableStartingLocations = [
                ...winnableStartingLocations,
                ...isolationAreaWinnableStartingLocations,
            ];
        });
        this.northCastleNode = this.chooseRandomNode(winnableStartingLocations);
        this.graphData[this.northCastleNode].mappedLocation = "NORTH_CASTLE";
        console.log(
            `\tPLACED NORTH CASTLE AT ${this.graphData[this.northCastleNode].locationKey
            }`
        );
    };

    getMagicContainersAlreadyPlaced = () => {
        return Object.keys(this.graphData).reduce((acc, nodeName) => {
            if (!this.graphData[nodeName].mappedItems) {
                return acc;
            }

            this.graphData[nodeName].mappedItems.forEach((itemName) => {
                if (itemName === "MAGIC_CONTAINER") {
                    acc++;
                }
            });

            return acc;
        }, 0);
    };

    /**
     * Places magic containers up to a maximum of nMagicContainers in accessible nodes
     * @param {number} nMagicContainers
     * @param {Array} accessibleNodes
     */
    placeMagicContainers = (nMagicContainers, accessibleNodes) => {
        let nMagicContainersAlreadyPlaced = this.getMagicContainersAlreadyPlaced();
        console.log("MAGIC TO PLACE: " + nMagicContainers);
        while (nMagicContainersAlreadyPlaced < nMagicContainers) {
            console.log("MAGIC PLACED:   " + nMagicContainersAlreadyPlaced);
            this.placeRemedies("MAGIC_CONTAINER", accessibleNodes);
            nMagicContainersAlreadyPlaced = this.getMagicContainersAlreadyPlaced();
        }
    };

    /**
     * Places a remedy or remedies in accessible nodes
     * @param {string} nextRemedy
     * @param {Array} accessibleNodes
     */
    placeRemedies = (nextRemedy, accessibleNodes) => {
        if (!nextRemedy) {
            return;
        }

        if (nextRemedy === "MAGIC5") {
            console.log("PLACING MAGIC5");
            return this.placeMagicContainers(1, accessibleNodes);
        } else if (nextRemedy === "MAGIC6") {
            console.log("PLACING MAGIC6");
            return this.placeMagicContainers(2, accessibleNodes);
        } else if (nextRemedy === "MAGIC7") {
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
            let unmappedNodes = accessibleNodes.filter(
                (node) =>
                    !this.graphData[node].mappedLocation &&
                    spellTown.worldNumber === this.graphData[node].continent
            );

            // Check to see if town with ability is already placed
            let remedyNode = accessibleNodes.find(
                (node) => this.graphData[node].mappedLocation === spellTown.id
            );
            if (!remedyNode) {
                remedyNode = this.chooseRandomNode(unmappedNodes);
                this.graphData[remedyNode].mappedLocation = spellTown.id;
            }

            // If town needs remedy, recurse into place remedies again.
            if (spellTown.spellRequirements) {
                let spellTownRemedy = spellTown.spellRequirements[0];

                this.placeRemedies(spellTownRemedy, accessibleNodes);
            }

            this.addSpell(nextRemedy);
        } else if (this.isAbility(nextRemedy)) {
            console.log("PLACING ABILITY " + nextRemedy);

            // Get the ability town for the current needed remedy
            let abilityTown = this.getAbilityTown(nextRemedy);

            // If not placed, place it in a random location
            let unmappedNodes = accessibleNodes.filter(
                (node) =>
                    !this.graphData[node].mappedLocation &&
                    abilityTown.worldNumber === this.graphData[node].continent
            );

            // Check to see if town with ability is already placed
            let remedyNode = accessibleNodes.find(
                (node) => this.graphData[node].mappedLocation === abilityTown.id
            );
            if (!remedyNode) {
                remedyNode = this.chooseRandomNode(unmappedNodes);
                this.graphData[remedyNode].mappedLocation = abilityTown.id;
            }

            // If town needs remedy, recurse into place remedies again.
            if (abilityTown.abilityRequirements) {
                let abilityTownRemedy = abilityTown.abilityRequirements[0];

                this.placeRemedies(abilityTownRemedy, accessibleNodes);
            }

            this.addAbility(nextRemedy);
        } else if (this.isBagu(nextRemedy)) {
            console.log("PLACING BAGU");

            // Pick an accessible node
            let remedyNode = this.chooseRandomNode(
                accessibleNodes.filter(
                    (node) =>
                        !this.graphData[node].mappedLocation &&
                        this.graphData[node].continent === 0
                )
            );

            // Map node to Bagu
            this.graphData[remedyNode].mappedLocation = "BAGUS_CABIN";

            console.log(
                `PLACING BAGU IN ${remedyNode} (${this.graphData[remedyNode].locationKey})`
            );

            this.addItem(nextRemedy);
        } else {
            console.log("PLACING ITEM " + nextRemedy);
            // Check to see if item is already placed
            let itemNode = accessibleNodes.find(
                (accessibleNode) =>
                    ![
                        "MAGIC_CONTAINER",
                        "HEART_CONTAINER",
                        "1UP",
                        "50PB",
                        "100PB",
                        "200PB",
                        "500PB",
                    ].includes(nextRemedy) &&
                    this.graphData[accessibleNode].mappedItems &&
                    this.graphData[accessibleNode].mappedItems.includes(nextRemedy)
            );
            if (itemNode) {
                console.log("ITEM ALREADY PLACED");
                return;
            }

            // Pick a random location
            let completablePalaces = this.getCompletablePalaces(accessibleNodes);
            let itemBearingLocations = this.getAccessibleItemBearingLocations(
                completablePalaces,
                accessibleNodes
            );
            let randomItemBearingLocationName =
                this.chooseRandomNode(itemBearingLocations);
            let randomItemBearingLocation =
                this.locationMetadata[randomItemBearingLocationName];
            let randomItemBearingLocationContinent =
                randomItemBearingLocation.worldNumber;

            // Check to see if location we picked is already mapped
            let remedyNode = accessibleNodes.find(
                (node) =>
                    this.graphData[node].mappedLocation === randomItemBearingLocation.id
            );

            // If it's not already mapped, then find an accessible node and place it there
            if (!remedyNode) {
                let unmappedNodes = this.getAvailableNodes(
                    accessibleNodes,
                    randomItemBearingLocationContinent
                );

                remedyNode = this.chooseRandomNode(unmappedNodes);
                this.graphData[remedyNode].mappedLocation =
                    randomItemBearingLocationName;
            }

            // If mapped items isn't initialized for this area, initialize it
            if (!this.graphData[remedyNode].mappedItems) {
                this.graphData[remedyNode].mappedItems = this.graphData[
                    remedyNode
                ].mappedItems = [];
            }

            // Map items to chosen location
            this.graphData[remedyNode].mappedItems.push(nextRemedy);

            // If town needs remedy, recurse into place remedies again.
            if (
                randomItemBearingLocation.itemRequirements &&
                randomItemBearingLocation.itemRequirements.length > 0
            ) {
                let itemIndex = this.graphData[remedyNode].mappedItems.length - 1;
                let itemRemedy = randomItemBearingLocation.itemRequirements[itemIndex];

                this.placeRemedies(itemRemedy, accessibleNodes);
            }

            this.addItem(nextRemedy);
        }
    };

    /**
     * Places a remedy or remedies in accessible nodes
     * @param {string} nextRemedy
     * @param {Array} accessibleNodes
     */
    getNodeCountNeededForRemedy = (nextRemedy, accessibleNodes) => {
        let count = 0;
        let sameContinentCount = 0;
        if (!nextRemedy) {
            return [0, 0];
        }

        if (nextRemedy === "MAGIC5") {
            let containersPlaced = this.getMagicContainersAlreadyPlaced();
            return [Math.max(1 - containersPlaced, 0), 0];
        } else if (nextRemedy === "MAGIC6") {
            let containersPlaced = this.getMagicContainersAlreadyPlaced();
            return [Math.max(2 - containersPlaced, 0), 0];
        } else if (nextRemedy === "MAGIC7") {
            let containersPlaced = this.getMagicContainersAlreadyPlaced();
            return [Math.max(3 - containersPlaced, 0), 0];
        } else if (nextRemedy === "MAGIC8") {
            let containersPlaced = this.getMagicContainersAlreadyPlaced();
            return [Math.max(4 - containersPlaced, 0), 0];
        } else if (this.isSpell(nextRemedy)) {
            // Get the spell town for the current needed remedy
            let spellTown = this.getSpellTown(nextRemedy);

            // Check to see if town with ability is already placed
            let remedyNode = accessibleNodes.find(
                (node) => this.graphData[node].mappedLocation === spellTown.id
            );
            if (!remedyNode) {
                sameContinentCount++;
            }

            // If town needs remedy, recurse into place remedies again.
            if (spellTown.spellRequirements) {
                let spellTownRemedy = spellTown.spellRequirements[0];

                let [recurseCount, recurseSameContinentCount] =
                    this.getNodeCountNeededForRemedy(spellTownRemedy, accessibleNodes);
                count += recurseCount;
                sameContinentCount += recurseSameContinentCount;
            }

            return [count, sameContinentCount];
        } else if (this.isAbility(nextRemedy)) {
            // Get the ability town for the current needed remedy
            let abilityTown = this.getAbilityTown(nextRemedy);

            // Check to see if town with ability is already placed
            let remedyNode = accessibleNodes.find(
                (node) => this.graphData[node].mappedLocation === abilityTown.id
            );
            if (!remedyNode) {
                sameContinentCount++;
            }

            // If town needs remedy, recurse into place remedies again.
            if (abilityTown.abilityRequirements) {
                let abilityTownRemedy = abilityTown.abilityRequirements[0];

                let [recurseCount, recurseSameContinentCount] =
                    this.getNodeCountNeededForRemedy(abilityTownRemedy, accessibleNodes);
                count += recurseCount;
                sameContinentCount += recurseSameContinentCount;
            }

            return [count, sameContinentCount];
        } else if (this.isBagu(nextRemedy)) {
            return [0, 1];
        } else {
            let itemNode = accessibleNodes.find(
                (accessibleNode) =>
                    ![
                        "MAGIC_CONTAINER",
                        "HEART_CONTAINER",
                        "1UP",
                        "50PB",
                        "100PB",
                        "200PB",
                        "500PB",
                    ].includes(nextRemedy) &&
                    this.graphData[accessibleNode].mappedItems &&
                    this.graphData[accessibleNode].mappedItems.includes(nextRemedy)
            );
            if (itemNode) {
                console.log("ITEM ALREADY PLACED");
                return [0, 0];
            }

            return [1, 0];
        }
    };

    /**
     * Places a remedy or remedies in accessible nodes
     * @param {string} nextRemedy
     * @param {Array} accessibleNodes
     */
    isRemedyPlaceable = (nextRemedy, accessibleNodes) => {
        if (!nextRemedy) {
            return false;
        }

        let continent = -1;
        if (this.isSpell(nextRemedy)) {
            let spellTown = this.getSpellTown(nextRemedy);
            continent = spellTown.continent;
        } else if (this.isAbility(nextRemedy)) {
            let abilityTown = this.getAbilityTown(nextRemedy);
            continent = abilityTown.continent;
        }

        let [count, sameContinentCount] = this.getNodeCountNeededForRemedy(
            nextRemedy,
            accessibleNodes
        );
        let unmappedLocations = accessibleNodes.filter(
            (node) => !this.graphData[node].mappedLocation
        ).length;
        let unmappedContinentalLocations = accessibleNodes.filter(
            (node) =>
                !this.graphData[node].mappedLocation &&
                this.graphData[node].continent === continent
        ).length;
        unmappedContinentalLocations = unmappedContinentalLocations
            ? unmappedContinentalLocations
            : 0;
        return (
            unmappedLocations >= count &&
            unmappedContinentalLocations >= sameContinentCount
        );
    };

    /**
     * Gets all remedies that are placable or useful
     * @param {Array} accessibleNodes
     * @returns
     */
    getPlaceableRemedies = (accessibleNodes, completablePalaces) => {
        let neededRemedies = this.getCurrentRemedies(accessibleNodes).filter(
            (remedy) =>
                remedy !== "CRYSTALS" && this.isRemedyPlaceable(remedy, accessibleNodes)
        );
        return neededRemedies.filter((remedy) => {
            let newlyAccessibleNodes, newlyCompletablePalaces;
            if (this.isSpell(remedy)) {
                [newlyAccessibleNodes] = this.getAccessibleNodes(
                    this.northCastleNode,
                    this.items,
                    [...this.spells, remedy],
                    this.abilities
                );
                newlyCompletablePalaces = this.getCompletablePalaces(
                    accessibleNodes,
                    this.items,
                    [...this.spells, remedy],
                    this.abilities
                );
            } else if (this.isAbility(remedy)) {
                [newlyAccessibleNodes] = this.getAccessibleNodes(
                    this.northCastleNode,
                    this.items,
                    this.spells,
                    [...this.abilities, remedy]
                );
                newlyCompletablePalaces = this.getCompletablePalaces(
                    accessibleNodes,
                    this.items,
                    this.spells,
                    [...this.abilities, remedy]
                );
            } else {
                [newlyAccessibleNodes] = this.getAccessibleNodes(
                    this.northCastleNode,
                    [...this.items, remedy],
                    this.spells,
                    this.abilities
                );
                newlyCompletablePalaces = this.getCompletablePalaces(
                    accessibleNodes,
                    [...this.items, remedy],
                    this.spells,
                    this.abilities
                );
            }

            return (
                newlyAccessibleNodes.length > accessibleNodes.length ||
                newlyCompletablePalaces.length > completablePalaces.length
            );
        });
    };

    /**
     * Place all items and nodes in such a way that the game is beatable
     */
    placeItemsAndNodes = () => {
        let [accessibleNodes] = this.getAccessibleNodes(this.northCastleNode);
        let inaccessibleNodes = Object.keys(this.graphData).filter(
            (node) => !accessibleNodes.includes(node)
        );
        let completablePalaces = this.getCompletablePalaces(accessibleNodes);
        let neededRemedies = this.getPlaceableRemedies(
            accessibleNodes,
            completablePalaces
        );
        let nextRemedy = this.chooseRandomNode(neededRemedies);
        try {
            while (nextRemedy && completablePalaces.length < 7) {
                // Set pseudoitems
                if (
                    completablePalaces.length >= 6 &&
                    !this.items.includes("CRYSTALS")
                ) {
                    this.items.push("CRYSTALS");
                }

                if (
                    this.items.filter((item) => item === "MAGIC_CONTAINER").length >= 7 &&
                    !this.items.includes("MAGIC7")
                ) {
                    this.items.push("MAGIC7");
                }

                if (
                    this.items.filter((item) => item === "MAGIC_CONTAINER").length >= 8 &&
                    !this.items.includes("MAGIC8")
                ) {
                    this.items.push("MAGIC8");
                }

                // Place remedies
                this.placeRemedies(nextRemedy, accessibleNodes);

                // Find accessible nodes, completable palaces, and needed remedies to progress
                [accessibleNodes] = this.getAccessibleNodes(this.northCastleNode);
                inaccessibleNodes = Object.keys(this.graphData).filter(
                    (node) => !accessibleNodes.includes(node)
                );
                completablePalaces = this.getCompletablePalaces(accessibleNodes);
                neededRemedies = this.getPlaceableRemedies(
                    accessibleNodes,
                    completablePalaces
                );
                nextRemedy = this.chooseRandomNode(neededRemedies);
            }

            // Check if all nodes are accessible
            if (inaccessibleNodes.length > 0) {
                throw new Error("Unable to place all nodes");
            }

            // Place all other items, abilities, and spells.
            let optionalItems = REMEDY_LIST.filter(
                (remedy) =>
                    !(
                        this.items.includes(remedy) ||
                        this.spells.includes(remedy) ||
                        this.abilities.includes(remedy)
                    )
            );
            optionalItems.forEach((optionalItem) => {
                try {
                    this.placeRemedies(optionalItem, accessibleNodes);
                } catch (error) {
                    console.trace("Can't place anymore items");
                }
            });

            // Check for crystals once more
            completablePalaces = this.getCompletablePalaces(accessibleNodes);
            if (completablePalaces.length >= 6 && !this.items.includes("CRYSTALS")) {
                this.items.push("CRYSTALS");
            }

            // Check that all palaces are completeable
            if (this.getCompletablePalaces(accessibleNodes).length < 7) {
                throw new Error("All palaces aren't completeable");
            }

            // Place other nodes
            let otherNodes = Object.keys(this.graphData).filter(
                (nodeName) => !this.graphData[nodeName].mappedLocation
            );
            let mappedLocations = Object.keys(this.graphData).map(
                (nodeName) => this.graphData[nodeName].mappedLocation
            );
            let otherLocations = Object.keys(this.locationMetadata).filter(
                (locationName) =>
                    !mappedLocations.includes(this.locationMetadata[locationName].id)
            );
            otherNodes.forEach((otherNode) => {
                let node = this.graphData[otherNode];
                let randomLocation = this.chooseRandomNode(
                    otherLocations.filter(
                        (locationName) =>
                            this.locationMetadata[locationName].worldNumber === node.continent
                    )
                );
                node.mappedLocation = randomLocation;
                otherLocations = removeNode(otherLocations, randomLocation);
            });
        } finally {
            [accessibleNodes] = this.getAccessibleNodes(this.northCastleNode);
            inaccessibleNodes = Object.keys(this.graphData).filter(
                (node) => !accessibleNodes.includes(node)
            );
            completablePalaces = this.getCompletablePalaces(accessibleNodes);
            neededRemedies = this.getPlaceableRemedies(
                accessibleNodes,
                completablePalaces
            );
            console.log(
                "**********************************************************************************************************************"
            );
            console.log(`FINAL REPORT`);
            console.log("\tITEMS:                " + this.items);
            console.log("\tSPELLS:               " + this.spells);
            console.log("\tABILITIES:            " + this.abilities);
            console.log("\tCOMPLETABLE PALACES:  " + completablePalaces);
            console.log("\tNEEDED REMEDIES:      " + neededRemedies);
            console.log(
                `\tACCESSIBLE LOCATIONS (${Math.trunc(
                    (accessibleNodes.length / Object.keys(this.graphData).length) * 100
                )}%):`
            );
            console.log(
                `\t\t${"Node".padEnd(16, " ")} ${"Node Location".padEnd(
                    32,
                    " "
                )} ${"Mapped Location".padEnd(32, " ")} Mapped Items`
            );
            accessibleNodes.forEach((node) => {
                if (this.graphData[node]) {
                    console.log(
                        `\t\t${node ? node.padEnd(16, " ") : "".padEnd(16, " ")} ${this.graphData[node].locationKey
                            ? this.graphData[node].locationKey.padEnd(32, " ")
                            : "".padEnd(32, " ")
                        } ${this.graphData[node].mappedLocation
                            ? this.graphData[node].mappedLocation.padEnd(32, " ")
                            : " ".padEnd(32, " ")
                        } [${this.graphData[node].mappedItems
                            ? this.graphData[node].mappedItems
                            : ""
                        }]`
                    );
                } else {
                    console.log(
                        `\t\t${node ? node.padEnd(16, "-") : "".padEnd(16, "-")
                        } ${"".padEnd(32, "-")} ${"".padEnd(32, "-")} ${"".padEnd(32, "-")}`
                    );
                }
            });

            console.log(`\tUNACCESSIBLE LOCATIONS:`);
            console.log(
                `\t\t${"Node".padEnd(16, " ")} ${"Node Location".padEnd(
                    32,
                    " "
                )} Mapped Location`
            );
            Object.keys(this.graphData)
                .filter((node) => !accessibleNodes.includes(node))
                .forEach((node) => {
                    if (this.graphData[node]) {
                        console.log(
                            `\t\t${node ? node.padEnd(16, " ") : "".padEnd(16, " ")} ${this.graphData[node].locationKey
                                ? this.graphData[node].locationKey.padEnd(32, " ")
                                : "".padEnd(32, " ")
                            } ${this.graphData[node].mappedLocation
                                ? this.graphData[node].mappedLocation.padEnd(32, " ")
                                : " ".padEnd(32, " ")
                            } [${this.graphData[node].mappedItems
                                ? this.graphData[node].mappedItems
                                : ""
                            }]`
                        );
                    } else {
                        console.log(
                            `\t\t${node ? node.padEnd(16, "-") : "".padEnd(16, "-")
                            } ${"".padEnd(32, "-")} ${"".padEnd(32, "-")} ${"".padEnd(
                                32,
                                "-"
                            )}`
                        );
                    }
                });

            let counts = Object.keys(this.graphData)
                .map((location) => {
                    return this.graphData[location].mappedLocation;
                })
                .filter((location) => location !== undefined)
                .reduce((previous, current) => {
                    if (!previous[current]) {
                        previous[current] = 0;
                    }

                    previous[current]++;

                    return previous;
                }, {});

            let duplicateLocations = Object.keys(counts).filter(
                (location) => counts[location] > 1
            );
            console.log("\nDUPLICATED LOCATIONS: " + duplicateLocations);
        }
    };

    /**
     * Create a random graph such that the game is winnable
     */
    randomize = () => {
        // Place connections, palaces and exits
        this.placeConnectionsPalacesAndExits();

        // Double link map
        this.createGraphData();

        // Place north castle node in an isolation zone where it a winnable state can be reached
        this.placeNorthCastle();

        // Place all items and nodes
        this.placeItemsAndNodes();

        return this.graphData;
    };
}
