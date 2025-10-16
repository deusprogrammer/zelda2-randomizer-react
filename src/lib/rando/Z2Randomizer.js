import { ENEMY_MAPPINGS, ENEMY_RANDO_EXCLUSIONS, QUALITY_OF_LIFE_ITEMS } from "../zelda2/Z2Data";
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
    levels = {};

    constructor(templateData, locationMetadata, levels, seed = 0, options = DEFAULT_OPTIONS) {
        this.templateData = deepCopy(templateData);
        this.graphData = deepCopy(templateData);
        this.locationMetadata = locationMetadata;
        this.levels = deepCopy(levels);
        this.randomNumberGenerator = randomSeed(seed);
        this.options = options;

        // Debug: Check if isCave properties survived the deep copy
        const caveNodesInGraphData = Object.keys(this.graphData).filter(key => this.graphData[key].isCave);
        console.log(`🔍 INITIALIZATION: ${caveNodesInGraphData.length} nodes with isCave=true in graphData: [${caveNodesInGraphData.join(', ')}]`);
        
        // Sample a few to show their properties
        caveNodesInGraphData.slice(0, 3).forEach(nodeName => {
            const node = this.graphData[nodeName];
            console.log(`   ${nodeName}: isCave=${node.isCave}, continent=${node.continent}, type=${node.type}`);
        });
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
     * Select appropriate node for a connection location based on cave preference
     * @param {Array} availableNodes - Nodes available for connection placement
     * @param {string} connectionLocation - The connection location to place
     * @returns {string} Selected node name
     */
    selectNodeForConnection = (availableNodes, connectionLocation) => {
        if (this.locationMetadata[connectionLocation].type === "CAVE") {
            const caveNodes = availableNodes.filter(node => this.graphData[node].isCave);
            if (caveNodes.length > 0) {
                const selectedNode = this.chooseRandomNode(caveNodes);
                console.log(`\t\t\t🏔️ Connection: Placing cave connection ${connectionLocation} in cave node ${selectedNode} (${caveNodes.length} cave nodes available)`);
                return selectedNode;
            } else {
                const selectedNode = this.chooseRandomNode(availableNodes);
                console.log(`\t\t\t📍 Connection: No cave nodes available for ${connectionLocation}, using regular node ${selectedNode}`);
                return selectedNode;
            }
        } else {
            const selectedNode = this.chooseRandomNode(availableNodes);
            console.log(`\t\t\t🏛️ Connection: Placing non-cave connection ${connectionLocation} in node ${selectedNode}`);
            return selectedNode;
        }
    };

    /**
     * Get available cave locations for a specific continent
     * @param {Array} itemBearingLocations - All available item-bearing locations
     * @param {number} continent - Continent number to filter by
     * @param {Array} accessibleNodes - Currently accessible nodes
     * @returns {Array} Available cave locations on the specified continent
     */
    getAvailableCaveLocations = (itemBearingLocations, continent, accessibleNodes) => {
        return itemBearingLocations.filter(locationName => {
            const location = this.locationMetadata[locationName];
            return location.type === "CAVE" &&
                   location.worldNumber === continent &&
                   !accessibleNodes.some(node => this.graphData[node].mappedLocation === location.id);
        });
    };

    /**
     * Select appropriate location for a node based on its cave status
     * @param {string} nodeName - The node to select a location for
     * @param {Array} itemBearingLocations - All available item-bearing locations
     * @param {Array} accessibleNodes - Currently accessible nodes
     * @returns {string} Selected location name
     */
    selectLocationForNode = (nodeName, itemBearingLocations, accessibleNodes) => {
        const node = this.graphData[nodeName];
        const nodeContinent = node.continent;
        
        // Filter locations by node's continent
        const continentLocations = itemBearingLocations.filter(locationName =>
            this.locationMetadata[locationName].worldNumber === nodeContinent
        );
        
        if (node.isCave) {
            console.log(`   🏔️ Cave node detected! Looking for cave locations on continent ${nodeContinent}...`);
            
            const availableCaveLocations = this.getAvailableCaveLocations(
                continentLocations, 
                nodeContinent, 
                accessibleNodes
            );
            
            console.log(`   🏔️ Found ${availableCaveLocations.length} available cave locations: ${availableCaveLocations.join(', ')}`);
            
            if (availableCaveLocations.length > 0) {
                const selectedLocation = this.chooseRandomNode(availableCaveLocations);
                console.log(`   🏔️ Selected cave location ${selectedLocation} for cave node`);
                return selectedLocation;
            } else {
                const fallbackLocation = this.chooseRandomNode(continentLocations);
                console.log(`   📍 No cave locations available, using regular location ${fallbackLocation}`);
                return fallbackLocation;
            }
        } else {
            const selectedLocation = this.chooseRandomNode(continentLocations);
            console.log(`   🏛️ Regular node, selected location ${selectedLocation}`);
            return selectedLocation;
        }
    };

    /**
     * Choose a random node from a list deterministically based on seed
     * @param {Array} nodes
     * @returns
     */
    chooseRandomNode = (nodes) => {
        if (!nodes || nodes.length === 0) {
            console.warn("chooseRandomNode called with empty or null nodes:", nodes);
            return null;
        }
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
        return ["BAGU", "BAGU_SAUCE"].includes(remedy);
    };

    /**
     * Check if an item is a meta item (story progression)
     * @param {string} item
     * @returns
     */
    isMetaItem = (item) => {
        return ["BAGU", "BAGU_SAUCE", "TROPHY", "CHILD", "MEDICINE", "WATER_OF_LIFE", "MAGIC_KEY", "CRYSTALS"].includes(item);
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
    getIsolationZones = (continent, isHard = false) => {
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
                                return linkKey;
                            }
                            return undefined;
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
                            return linkKey;
                        }
                        return undefined;
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
            let requirementResult = this.evaluateRequirement(requirement, items, spells, abilities);
            result = result && requirementResult;
        });

        return result;
    };

    /**
     * Evaluate a single requirement string that may contain boolean operators
     * @param {string} requirement - A requirement string like "FAIRY | JUMP" or "FAIRY & JUMP"
     * @param {Array} items
     * @param {Array} spells  
     * @param {Array} abilities
     * @returns {boolean}
     */
    evaluateRequirement = (requirement, items, spells, abilities) => {
        // Handle OR operations first (lowest precedence)
        if (requirement.includes("|")) {
            return this.evaluateOrRequirement(requirement, items, spells, abilities);
        } 
        // Handle AND operations (higher precedence)
        else if (requirement.includes("&")) {
            return this.evaluateAndRequirement(requirement, items, spells, abilities);
        } 
        // Single requirement
        else {
            let trimmedReq = requirement.trim();
            const inItems = items.includes(trimmedReq);
            const inSpells = spells.includes(trimmedReq);
            const inAbilities = abilities.includes(trimmedReq);
            console.log(
                `CHECKING: ${trimmedReq} | items: ${inItems} | spells: ${inSpells} | abilities: ${inAbilities}`
            );
            return inItems || inSpells || inAbilities;
        }
    };

    /**
     * Evaluate an OR requirement (contains | operator) - recursively handles nested operations
     * @param {string} requirement - A requirement string like "FAIRY | JUMP" or "FAIRY | (JUMP & FIRE)"
     * @param {Array} items
     * @param {Array} spells
     * @param {Array} abilities  
     * @returns {boolean}
     */
    evaluateOrRequirement = (requirement, items, spells, abilities) => {
        let orParts = requirement.split("|").map(part => part.trim());
        return orParts.some(part => {
            // Recursively evaluate each OR part (might contain AND operations or be single requirements)
            return this.evaluateRequirement(part, items, spells, abilities);
        });
    };

    /**
     * Evaluate an AND requirement (contains & operator) - recursively handles nested operations
     * @param {string} requirement - A requirement string like "FAIRY & JUMP" or "(FAIRY | LIFE) & JUMP"
     * @param {Array} items
     * @param {Array} spells
     * @param {Array} abilities  
     * @returns {boolean}
     */
    evaluateAndRequirement = (requirement, items, spells, abilities) => {
        let andParts = requirement.split("&").map(part => part.trim());
        return andParts.every(part => {
            // Recursively evaluate each AND part (might contain OR operations or be single requirements)
            return this.evaluateRequirement(part, items, spells, abilities);
        });
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
     * Format requirements for display, properly handling boolean operators
     * @param {Array} requirements
     * @returns {string}
     */
    formatRequirements = (requirements) => {
        if (!requirements || requirements.length === 0) {
            return "none";
        }

        // Handle each requirement (AND between array elements)
        let formattedRequirements = requirements.map(requirement => {
            // Simply replace operators and remove whitespace - all items use underscores
            return requirement
                .replace(/\s*\|\s*/g, ' OR ')  // Replace | with OR
                .replace(/\s*&\s*/g, ' AND '); // Replace & with AND
        });

        // Join multiple requirements with AND
        return formattedRequirements.join(" AND ");
    };

    /**
     * Parse a requirement string and place appropriate remedies
     * For example: "FAIRY | JUMP" - place either FAIRY (spell) or JUMP (ability) with their requirements
     * @param {string} requirement
     * @param {Array} accessibleNodes
     */
    placeRequirementRemedies = (requirement, accessibleNodes) => {
        if (!requirement) return;
        
        // Split by | for OR operations - we only need to satisfy ONE of these
        if (requirement.includes("|")) {
            let orOptions = requirement.split("|").map(part => part.trim());
            // For OR requirements, place the first option we can
            // TODO: Could be randomized or pick the "easiest" option
            let selectedOption = orOptions[0];
            this.placeIndividualRequirement(selectedOption, accessibleNodes);
        } else if (requirement.includes("&")) {
            // Split by & for AND operations - we need ALL of these
            let andOptions = requirement.split("&").map(part => part.trim());
            andOptions.forEach(option => {
                this.placeIndividualRequirement(option, accessibleNodes);
            });
        } else {
            // Single requirement
            this.placeIndividualRequirement(requirement.trim(), accessibleNodes);
        }
    };

    /**
     * Place a single requirement (item, spell, or ability) and its dependencies
     * @param {string} requirement - A single requirement like "FAIRY" or "JUMP"
     * @param {Array} accessibleNodes
     */
    placeIndividualRequirement = (requirement, accessibleNodes) => {
        if (!requirement) return;
        
        if (this.isSpell(requirement)) {
            // It's a spell - place the spell and its requirements
            console.log(`   🪄 Placing spell requirement: ${requirement}`);
            this.placeRemedies(requirement, accessibleNodes);
        } else if (this.isAbility(requirement)) {
            // It's an ability - place the ability and its requirements  
            console.log(`   💪 Placing ability requirement: ${requirement}`);
            this.placeRemedies(requirement, accessibleNodes);
        } else {
            // It's an item - place the item directly
            console.log(`   🎒 Placing item requirement: ${requirement}`);
            this.placeRemedies(requirement, accessibleNodes);
        }
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

            // 🏔️ LOG CAVE NODES IN THIS CONTINENT BY ISOLATION ZONE
            let isolationAreasForLogging = this.getIsolationZones(continent);
            console.log(`\t🏔️ CONTINENT ${continent} CAVE NODE ANALYSIS:`);
            let totalCaveNodes = 0;
            isolationAreasForLogging.forEach((zone, zoneIndex) => {
                let caveNodes = zone.filter(nodeName => this.graphData[nodeName] && this.graphData[nodeName].isCave);
                totalCaveNodes += caveNodes.length;
                console.log(`\t\tZone ${zoneIndex}: ${caveNodes.length} cave nodes out of ${zone.length} total nodes`);
                if (caveNodes.length > 0) {
                    caveNodes.forEach(nodeName => {
                        let node = this.graphData[nodeName];
                        console.log(`\t\t\t🏔️ ${nodeName} at (${node.x}, ${node.y}) - mountainRange: ${node.mountainRange}`);
                    });
                } else {
                    console.log(`\t\t\t❌ No cave nodes in this zone`);
                }
            });
            console.log(`\t🏔️ CONTINENT ${continent} TOTAL: ${totalCaveNodes} cave nodes across ${isolationAreasForLogging.length} isolation zones`);
            console.log(``);
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

            // Debug: Check isCave status in isolation zones for continent 1
            if (continent === 1) {
                console.log(`\t🔍 CONTINENT 1 ISOLATION ZONE CAVE DEBUG:`);
                isolationAreas.forEach((zone, zoneIndex) => {
                    let caveNodes = zone.filter(nodeName => this.graphData[nodeName] && this.graphData[nodeName].isCave);
                    console.log(`\t\tZone ${zoneIndex}: ${zone.length} nodes, ${caveNodes.length} cave nodes: [${caveNodes.join(', ')}]`);
                    
                    // Sample a few nodes to show their isCave status
                    let sampleNodes = zone.slice(0, 3);
                    sampleNodes.forEach(nodeName => {
                        let node = this.graphData[nodeName];
                        console.log(`\t\t\t${nodeName}: isCave=${node?.isCave}, type=${node?.type}, continent=${node?.continent}`);
                    });
                });
            }

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

                // Choose a random connecting location and collect it's exits
                let entrance = this.chooseRandomNode(localPassThroughAreas);
                
                // Choose entrance node, preferring cave nodes for cave locations
                let entranceNodes = isolationAreas[entranceIndex];
                
                // Debug: Check if any nodes have isCave property
                let caveNodeCount = entranceNodes.filter(node => this.graphData[node].isCave).length;
                console.log(`\t\t\t🔍 Connection Debug: ${entranceNodes.length} entrance nodes, ${caveNodeCount} have isCave=true`);
                
                let entranceNode = this.selectNodeForConnection(entranceNodes, entrance);

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

                // eslint-disable-next-line
                availableExits.forEach((exit) => {
                    let exitIndex;
                    if (connectedIsolationAreas.length === 1 &&
                        disconnectedIsolationAreas.length === 1) {
                        console.log(`There is one connected zone and one disconnected zone`);
                        console.log(`   disconnectedIsolationAreas: ${JSON.stringify(disconnectedIsolationAreas)}`);
                        console.log(`   connectedIsolationAreas: ${JSON.stringify(connectedIsolationAreas)}`);
                        exitIndex = this.chooseRandomNode(disconnectedIsolationAreas);
                    } else if (
                        connectedIsolationAreas.length === 1 &&
                        disconnectedIsolationAreas.length > 0
                    ) {
                        let connectableZones = this.getConnectableIsolationZones(
                            disconnectedIsolationAreas,
                            isolationAreas
                        );
                        console.log(`There is one connected zone and one or more disconnected zones`);
                        console.log(`   disconnectedIsolationAreas: ${JSON.stringify(disconnectedIsolationAreas)}`);
                        console.log(`   connectedIsolationAreas: ${JSON.stringify(connectedIsolationAreas)}`);
                        console.log(`   connectableZones: ${JSON.stringify(connectableZones)}`);
                        exitIndex = this.chooseRandomNode(connectableZones);
                    } else if (
                        disconnectedIsolationAreas.length > 0 &&
                        connectedIsolationAreas.length > 0
                    ) {
                        console.log(`There is one or more connected zones and one or more disconnected zones`);
                        console.log(`   disconnectedIsolationAreas: ${JSON.stringify(disconnectedIsolationAreas)}`);
                        console.log(`   connectedIsolationAreas: ${JSON.stringify(connectedIsolationAreas)}`);
                        exitIndex = this.chooseRandomNode(disconnectedIsolationAreas);
                    } else {
                        console.log(`There are no disconnected isolation zones`);
                        console.log(`   disconnectedIsolationAreas: ${JSON.stringify(disconnectedIsolationAreas)}`);
                        console.log(`   connectedIsolationAreas: ${JSON.stringify(connectedIsolationAreas)}`);
                        exitIndex = this.chooseRandomNode(connectedIsolationAreas);
                    }

                    if (exitIndex == null) {
                        throw new Error("No more connectable zones exist, impossible terrain");
                    }

                    // Choose a random node from this exit's isolation area
                    let exitNodes = isolationAreas[exitIndex];
                    
                    // 🏔️ LOG: Show available nodes and cave status for this exit
                    let caveNodesInZone = exitNodes.filter(node => this.graphData[node].isCave);
                    console.log(`\t\t🚪 Exit ${exit} - Zone ${exitIndex}: ${exitNodes.length} nodes available, ${caveNodesInZone.length} cave nodes`);
                    if (caveNodesInZone.length > 0) {
                        console.log(`\t\t\t🏔️ Cave nodes available: [${caveNodesInZone.join(', ')}]`);
                    }
                    
                    // Use the helper function to select node based on connection type
                    let exitNode = this.selectNodeForConnection(exitNodes, exit);

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
                let spellTownRequirement = spellTown.spellRequirements[0];
                this.placeRequirementRemedies(spellTownRequirement, accessibleNodes);
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
                let abilityTownRequirement = abilityTown.abilityRequirements[0];
                this.placeRequirementRemedies(abilityTownRequirement, accessibleNodes);
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

            // First get all unmapped nodes across all continents
            let allUnmappedNodes = accessibleNodes.filter(
                (node) => !this.graphData[node].mappedLocation
            );
            
            // Debug: Check if any nodes have isCave property
            let caveNodeCount = allUnmappedNodes.filter(node => this.graphData[node].isCave).length;
            console.log(`   🔍 Debug: ${allUnmappedNodes.length} unmapped nodes, ${caveNodeCount} have isCave=true`);
            
            // Extra debugging: Show some sample nodes with their isCave status
            let sampleNodes = allUnmappedNodes.slice(0, 5);
            sampleNodes.forEach(nodeName => {
                let node = this.graphData[nodeName];
                console.log(`   🔍 Sample: ${nodeName}: isCave=${node?.isCave}, continent=${node?.continent}, mapped=${!!node?.mappedLocation}`);
            });

            let remedyNode = this.chooseRandomNode(allUnmappedNodes);
            console.log(`   🎲 Selected node: ${remedyNode}, isCave: ${this.graphData[remedyNode].isCave}, continent: ${this.graphData[remedyNode].continent}`);
            
            // Select appropriate location for this node
            let randomItemBearingLocationName = this.selectLocationForNode(
                remedyNode, 
                itemBearingLocations, 
                accessibleNodes
            );
            
            let randomItemBearingLocation = this.locationMetadata[randomItemBearingLocationName];

            // Check to see if location we picked is already mapped
            let existingNode = accessibleNodes.find(
                (node) =>
                    this.graphData[node].mappedLocation === randomItemBearingLocation.id
            );

            // If it's already mapped somewhere else, use that node instead
            if (existingNode) {
                remedyNode = existingNode;
            } else {
                this.graphData[remedyNode].mappedLocation = randomItemBearingLocationName;
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
                let itemRequirement = randomItemBearingLocation.itemRequirements[itemIndex];

                // Parse and place requirements properly
                if (itemRequirement) {
                    this.placeRequirementRemedies(itemRequirement, accessibleNodes);
                }
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
                let spellTownRequirement = spellTown.spellRequirements[0];

                // For counting, we need to parse the requirement and count nodes for each option
                let [recurseCount, recurseSameContinentCount] = 
                    this.getNodeCountForRequirement(spellTownRequirement, accessibleNodes);
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
                let abilityTownRequirement = abilityTown.abilityRequirements[0];

                // For counting, we need to parse the requirement and count nodes for each option
                let [recurseCount, recurseSameContinentCount] = 
                    this.getNodeCountForRequirement(abilityTownRequirement, accessibleNodes);
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
     * Get node count needed for a requirement (handles boolean operators)
     * @param {string} requirement
     * @param {Array} accessibleNodes
     * @returns {Array} [count, sameContinentCount]
     */
    getNodeCountForRequirement = (requirement, accessibleNodes) => {
        if (!requirement) return [0, 0];
        
        let totalCount = 0;
        let totalSameContinentCount = 0;
        
        // Split by | for OR operations - we only need to place one of these
        if (requirement.includes("|")) {
            let orOptions = requirement.split("|").map(part => part.trim());
            // For OR requirements, we only need to count the first option
            let selectedOption = orOptions[0];
            return this.getNodeCountNeededForRemedy(selectedOption, accessibleNodes);
        } else if (requirement.includes("&")) {
            // Split by & for AND operations - we need all of these
            let andOptions = requirement.split("&").map(part => part.trim());
            andOptions.forEach(option => {
                let [count, sameContinentCount] = this.getNodeCountNeededForRemedy(option, accessibleNodes);
                totalCount += count;
                totalSameContinentCount += sameContinentCount;
            });
            return [totalCount, totalSameContinentCount];
        } else {
            // Single requirement
            return this.getNodeCountNeededForRemedy(requirement.trim(), accessibleNodes);
        }
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
     * Get item-bearing nodes that are accessible with minimal requirements (0-1 items)
     */
    getEarlyAccessibleNodes = (availableNodes) => {
        return availableNodes.filter(nodeName => {
            let node = this.graphData[nodeName];
            if (!node?.items || node.items.length === 0) return false;
            
            // Calculate requirements to reach this node from North Castle
            let requirements = this.getRequirementsToReach(nodeName);
            return requirements.length <= 1; // Accessible with 0-1 items
        });
    };

    /**
     * Calculate what items are needed to reach a specific node from North Castle
     */
    getRequirementsToReach = (targetNode) => {
        let visited = new Set();
        let requirements = new Set();
        
        const traverse = (currentNode, currentReqs) => {
            if (visited.has(currentNode)) return;
            visited.add(currentNode);
            
            if (currentNode === targetNode) {
                currentReqs.forEach(req => requirements.add(req));
                return;
            }
            
            let node = this.graphData[currentNode];
            if (!node?.connections) return;
            
            node.connections.forEach(connection => {
                let connectionReqs = [...currentReqs];
                if (node.connectionRequirements?.[connection]) {
                    node.connectionRequirements[connection].forEach(req => {
                        if (req && req !== "") {
                            connectionReqs.push(req);
                        }
                    });
                }
                traverse(connection, connectionReqs);
            });
        };
        
        traverse(this.northCastleNode, []);
        return Array.from(requirements);
    };

    /**
     * Find the closest node to North Castle by graph distance
     */
    findClosestToNorthCastle = (candidates) => {
        let bestDistance = Infinity;
        let bestNode = null;
        
        candidates.forEach(candidate => {
            let distance = this.calculateGraphDistance(this.northCastleNode, candidate);
            if (distance < bestDistance) {
                bestDistance = distance;
                bestNode = candidate;
            }
        });
        
        return bestNode;
    };

    /**
     * Calculate graph distance between two nodes (BFS)
     */
    calculateGraphDistance = (from, to) => {
        if (from === to) return 0;
        
        let queue = [{node: from, distance: 0}];
        let visited = new Set();
        
        while (queue.length > 0) {
            let {node, distance} = queue.shift();
            
            if (visited.has(node)) continue;
            visited.add(node);
            
            if (node === to) return distance;
            
            let nodeData = this.graphData[node];
            if (nodeData?.connections) {
                nodeData.connections.forEach(connection => {
                    if (!visited.has(connection)) {
                        queue.push({node: connection, distance: distance + 1});
                    }
                });
            }
        }
        
        return Infinity; // Not reachable
    };

    /**
     * Attempt to place quality of life items early near North Castle
     */
    attemptEarlyQoLPlacement = (accessibleNodes) => {
        // Get all item-bearing nodes
        let itemBearingNodes = accessibleNodes.filter(nodeName => {
            let node = this.graphData[nodeName];
            return node?.items && node.items.length > 0;
        });
        
        // Check if we have enough nodes for safe early placement
        let totalItemsToPlace = REMEDY_LIST.length;
        let safetyBuffer = 2;
        
        if (itemBearingNodes.length < totalItemsToPlace + safetyBuffer) {
            console.log("Not enough item nodes for safe QoL early placement");
            return [];
        }
        
        // Find early accessible item-bearing nodes
        let earlyNodes = this.getEarlyAccessibleNodes(itemBearingNodes);
        
        if (earlyNodes.length === 0) {
            console.log("No early accessible item nodes found");
            return [];
        }
        
        let placedEarly = [];
        
        // Try to place each QoL item early
        QUALITY_OF_LIFE_ITEMS.forEach(item => {
            if (earlyNodes.length > 0 && 
                !this.items.includes(item) && 
                !this.spells.includes(item) && 
                !this.abilities.includes(item)) {
                
                let bestNode = this.findClosestToNorthCastle(earlyNodes);
                if (bestNode) {
                    try {
                        this.placeRemedies(item, [bestNode]);
                        placedEarly.push({item, location: bestNode});
                        earlyNodes = earlyNodes.filter(n => n !== bestNode);
                        console.log(`✓ Placed QoL item ${item} early at ${bestNode}`);
                    } catch (error) {
                        console.log(`✗ Failed to place ${item} early: ${error.message}`);
                    }
                }
            }
        });
        
        return placedEarly;
    };

    /**
     * Place all items and nodes in such a way that the game is beatable
     */
    placeItemsAndNodes = () => {
        let [accessibleNodes] = this.getAccessibleNodes(this.northCastleNode);
        
        // Phase 1: Attempt early placement of quality of life items
        let earlyPlacements = this.attemptEarlyQoLPlacement(accessibleNodes);
        if (earlyPlacements.length > 0) {
            console.log(`Early QoL placement successful: ${earlyPlacements.map(p => `${p.item} at ${p.location}`).join(', ')}`);
            // Refresh accessible nodes after early placements
            [accessibleNodes] = this.getAccessibleNodes(this.northCastleNode);
        }
        
        // Phase 2: Continue with critical path item placement using existing algorithm
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
                const currentAccessibleNodes = accessibleNodes;
                inaccessibleNodes = Object.keys(this.graphData).filter(
                    (node) => !currentAccessibleNodes.includes(node)
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
    randomizeLocationsAndItems = () => {
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

    /**
     * Process palace completion and item rewards
     */
    processPalaceCompletion = (nextNode, nodeData, palaceRequirements, currentItems, currentSpells, currentAbilities, updateContainerCount, addAcquisitionStep, addStoryStep, updateCrystalCount, containerCounts, isReturnVisit = false) => {
        // Update crystal count (palace completion tracking)
        updateCrystalCount();
        
        // Show traversal details for palace entry
        let traversalDetails = "";
        if (palaceRequirements.length > 0) {
            traversalDetails = isReturnVisit ? `(used ${palaceRequirements.join(" and ")} to enter)` : "";
            console.log(`   🔑 Link used ${palaceRequirements.join(" and ")} to enter the palace`);
        }
        
        // Get the item from completing this palace
        if (nodeData.mappedItems && nodeData.mappedItems.length > 0) {
            let palaceItem = nodeData.mappedItems[0];
            let locationName = this.getLocationDisplayName(nextNode);
            
            this.processItemAcquisition(
                palaceItem, locationName, "from palace",
                currentItems, currentSpells, currentAbilities, updateContainerCount, addAcquisitionStep
            );
        }
        
        let completionMessage = isReturnVisit 
            ? `and completed the palace on return visit ${traversalDetails}`
            : `and completed the palace`;
        
        let action = isReturnVisit ? "🏰 returned to" : "🏰 went to";
        addStoryStep(action, nextNode, null, completionMessage);
        
        let statusMessage = isReturnVisit ? "Palace completed on return!" : "Palace completed!";
        console.log(`   🏆 ${statusMessage} (${containerCounts.CRYSTALS}/7 palaces done)`);
    };

    /**
     * Process an item and add it to the appropriate inventory
     */
    processItemAcquisition = (item, locationName, context, currentItems, currentSpells, currentAbilities, updateContainerCount, addAcquisitionStep, collectedLocations = null, nodeId = null) => {
        if (this.isSpell(item)) {
            if (!currentSpells.includes(item)) {
                currentSpells.push(item);
                console.log(`   🪄 Added ${item} to spell inventory`);
                addAcquisitionStep("spell", item, locationName, context);
                return `a magical spell (${item})`;
            }
        } else if (this.isAbility(item)) {
            if (!currentAbilities.includes(item)) {
                currentAbilities.push(item);
                console.log(`   💪 Added ${item} to ability inventory`);
                addAcquisitionStep("ability", item, locationName, context);
                return `a new ability (${item})`;
            }
        } else {
            // Regular items
            updateContainerCount(item);
            currentItems.push(item);
            
            if (collectedLocations && nodeId) {
                collectedLocations.add(nodeId);
            }
            
            console.log(`   🎒 Added ${item} to item inventory`);
            addAcquisitionStep("item", item, locationName, context);
            
            if (item === "BAGU_SAUCE") {
                return "and talked to Bagu";
            } else if (item === "MAGIC_CONTAINER") {
                return `a magic container`;
            } else {
                return `${item}`;
            }
        }
        return null; // Already had this item
    };

    /**
     * Check if an item can be accessed at a location with current inventory
     */
    canAccessItemAtLocation = (item, locationMeta, currentItems, currentSpells, currentAbilities, containerCounts, itemIndex = 0) => {
        let canAccess = true;
        
        // Check item requirements for this specific item index
        if (locationMeta.itemRequirements && locationMeta.itemRequirements.length > itemIndex && locationMeta.itemRequirements[itemIndex]) {
            let specificRequirements = Array.isArray(locationMeta.itemRequirements[itemIndex]) 
                ? locationMeta.itemRequirements[itemIndex] 
                : [locationMeta.itemRequirements[itemIndex]];
            canAccess = this.checkRequirements(specificRequirements, currentItems, currentSpells, currentAbilities);
            console.log(`   🔍 ${item} (index ${itemIndex}) item requirements check: ${canAccess} (needs: ${specificRequirements.join(", ")})`);
        }
        
        // Check spell requirements for this specific item index
        if (canAccess && locationMeta.spellRequirements && locationMeta.spellRequirements.length > itemIndex && locationMeta.spellRequirements[itemIndex]) {
            let specificSpellRequirements = Array.isArray(locationMeta.spellRequirements[itemIndex]) 
                ? locationMeta.spellRequirements[itemIndex] 
                : [locationMeta.spellRequirements[itemIndex]];
            canAccess = this.checkRequirements(specificSpellRequirements, currentItems, currentSpells, currentAbilities);
            console.log(`   🔍 ${item} (index ${itemIndex}) spell requirements check: ${canAccess} (needs: ${specificSpellRequirements.join(", ")})`);
        }
        
        // Check magic level requirements for containers
        if (canAccess && item === "MAGIC_CONTAINER") {
            let specificRequirements = locationMeta.itemRequirements && locationMeta.itemRequirements.length > itemIndex 
                ? (Array.isArray(locationMeta.itemRequirements[itemIndex]) ? locationMeta.itemRequirements[itemIndex] : [locationMeta.itemRequirements[itemIndex]])
                : [];
            let magicLevelRequired = specificRequirements.find(req => req && req.startsWith("MAGIC"));
            if (magicLevelRequired) {
                let requiredLevel = parseInt(magicLevelRequired.replace("MAGIC", ""));
                let currentMagicLevel = containerCounts.MAGIC;
                canAccess = currentMagicLevel >= requiredLevel;
                console.log(`   🔍 ${item} (index ${itemIndex}) level check: ${canAccess} (has ${currentMagicLevel}, needs ${requiredLevel})`);
            }
        }
        
        return canAccess;
    };

    /**
     * Process all items at a location after learning a spell/ability
     */
    processLocationItems = (nodeId, nodeData, locationMeta, currentItems, currentSpells, currentAbilities, updateContainerCount, addAcquisitionStep, addStoryStep, containerCounts, failedItemLocations) => {
        if (!nodeData.mappedItems || nodeData.mappedItems.length === 0) return;
        
        let locationName = this.getLocationDisplayName(nodeId);
        
        nodeData.mappedItems.forEach((item, index) => {
            console.log(`   🔍 Checking item ${index + 1}/${nodeData.mappedItems.length} at ${locationName}: ${item}`);
            
            let canAccess = this.canAccessItemAtLocation(item, locationMeta, currentItems, currentSpells, currentAbilities, containerCounts, index);
            
            if (canAccess) {
                let description = this.processItemAcquisition(
                    item, locationName, "also found in same location after learning spell",
                    currentItems, currentSpells, currentAbilities, updateContainerCount, addAcquisitionStep
                );
                
                if (description) {
                    if (item === "MAGIC_CONTAINER") {
                        addStoryStep("🔮 also found", nodeId, null, `${description} in the same location (now accessible with new spell!)`, true);
                    } else {
                        addStoryStep("🗡️ also found", nodeId, null, `${description} in the same location`);
                    }
                }
            } else {
                console.log(`   🔒 Cannot access ${item} yet (requirements not met)`);
                
                // Track this failed item location for later re-evaluation
                failedItemLocations.set(`${nodeId}_${index}`, {
                    nodeId: nodeId,
                    item: item,
                    itemIndex: index,
                    locationName: locationName,
                    requirements: locationMeta.itemRequirements || [],
                    spellRequirements: locationMeta.spellRequirements || []
                });
                console.log(`   📋 Tracking ${item} (index ${index}) at ${locationName} for later re-evaluation`);
            }
        });
    };

    /**
     * Test the randomized ROM by simulating optimal graph traversal
     * Returns completion status and walkthrough details
     */
    testRandomizedROM = () => {
        // Ensure randomization has been completed
        if (!this.graphData || Object.keys(this.graphData).length === 0) {
            return {
                success: false,
                error: "No randomized ROM data found. Please run randomization first.",
                walkthrough: ""
            };
        }
        console.log("\n🗡️ === LINK'S ADVENTURE WALKTHROUGH ===");
        
        // Find the North Castle node by mappedLocation
        let startingNode = Object.keys(this.graphData).find(nodeId => {
            let node = this.graphData[nodeId];
            return node.mappedLocation === "NORTH_CASTLE";
        });
        
        if (!startingNode) {
            console.log("❌ Could not find North Castle starting location");
            return [];
        }
        
        let startingLocationName = this.getLocationDisplayName(startingNode);
        console.log(`📍 Link begins his journey at ${startingLocationName}...`);
        
        // Count how many magic containers are placed on the map
        let totalMagicContainersOnMap = this.getMagicContainersAlreadyPlaced();
        console.log(`🔮 Total magic containers placed on map: ${totalMagicContainersOnMap}`);
        
        let currentItems = [];
        let currentSpells = [];
        let currentAbilities = [];
        let visitedNodes = new Set([startingNode]);
        let blockedPaths = new Map(); // Track what's blocking each path
        let failedPalaces = new Map(); // Track palaces we couldn't complete and their requirements
        let failedLocations = new Map(); // Track locations with multiple reasons to revisit (spells, abilities, etc.)
        let failedItemLocations = new Map(); // Track locations with items we couldn't access and their requirements
        let collectedLocations = new Set(); // Track locations where items have been collected from
        let storySteps = [];
        
        // Track container counts and crystals
        let containerCounts = {
            MAGIC: 4,      // Start with 4 magic containers
            HEART: 4,      // Start with 4 heart containers  
            CRYSTALS: 0    // Start with 0 crystals (palaces completed)
        };
        
        // Helper for adding emphasized acquisition logs
        const addAcquisitionStep = (type, name, location, context) => {
            let emoji = type === "spell" ? "✨" : (type === "ability" ? "💪" : "🎁");
            let typeLabel = type === "spell" ? "Spell" : (type === "ability" ? "Ability" : "Item");
            addStoryStep(`${emoji} **${typeLabel}**`, `**${name}**`, null, `acquired at ${location} ${context}`, true);
        };
        
        // Helper function to update container counts
        const updateContainerCount = (containerType) => {
            if (containerType === "MAGIC_CONTAINER" || containerType === "magic_container") {
                containerCounts.MAGIC++;
                console.log(`   🔮 Magic containers: ${containerCounts.MAGIC} total (${containerCounts.MAGIC - 4} found, need ${Math.max(0, 8 - containerCounts.MAGIC)} more for THUNDER)`);
                
                // Add MAGIC level items to inventory for requirements
                let magicLevel = `MAGIC${containerCounts.MAGIC}`;
                if (!currentItems.includes(magicLevel)) {
                    currentItems.push(magicLevel);
                }
                
                // Check for newly accessible items at failed locations with this higher magic level
                console.log(`🔄 Magic level increased to ${containerCounts.MAGIC}! Checking failed item locations...`);
                checkFailedItemLocationsForNewAccess();
            } else if (containerType === "HEART_CONTAINER" || containerType === "heart_container") {
                containerCounts.HEART++;
                console.log(`   ❤️ Heart containers: ${containerCounts.HEART} total`);
            }
            // Note: Function is called for all items, but only acts on containers
        };
        
        // Helper function to re-check failed item locations when magic level increases
        const checkFailedItemLocationsForNewAccess = () => {
            let newlyAccessibleItems = [];
            
            failedItemLocations.forEach((itemInfo, key) => {
                let nodeData = this.graphData[itemInfo.nodeId];
                let locationMeta = nodeData.mappedLocation ? this.locationMetadata[nodeData.mappedLocation] : null;
                
                if (locationMeta && itemInfo.item) {
                    let canAccessNow = this.canAccessItemAtLocation(
                        itemInfo.item, 
                        locationMeta, 
                        currentItems, 
                        currentSpells, 
                        currentAbilities, 
                        containerCounts, 
                        itemInfo.itemIndex
                    );
                    
                    if (canAccessNow) {
                        console.log(`🔄 Can now access ${itemInfo.item} (index ${itemInfo.itemIndex}) at ${this.getLocationDisplayName(itemInfo.nodeId)}!`);
                        newlyAccessibleItems.push({nodeId: itemInfo.nodeId, item: itemInfo.item, locationName: itemInfo.locationName});
                        failedItemLocations.delete(key); // Remove from failed list
                    }
                }
            });
            
            // Immediately collect newly accessible items
            newlyAccessibleItems.forEach(({nodeId, item, locationName}) => {
                updateContainerCount(item);
                currentItems.push(item);
                collectedLocations.add(nodeId);
                
                console.log(`🔄 Collected ${item} from ${locationName} (now accessible with MAGIC${containerCounts.MAGIC - 1}!)`)
                addAcquisitionStep("item", item, locationName, `collected after reaching MAGIC${containerCounts.MAGIC - 1}`);
                addStoryStep("🔄 returned to", nodeId, null, `and collected ${item} (now accessible with higher magic level!)`, true);
            });
        };
        
        // Helper function to update crystal count when palace is completed
        const updateCrystalCount = () => {
            containerCounts.CRYSTALS++;
            console.log(`   💎 Crystals: ${containerCounts.CRYSTALS}/6 (palaces completed)`);
            
            // Add CRYSTALS item to inventory when 6 palaces completed
            if (containerCounts.CRYSTALS >= 6 && !currentItems.includes("CRYSTALS")) {
                currentItems.push("CRYSTALS");
                console.log(`   ✨ CRYSTALS item acquired! (6 palaces completed)`);
            }
        };
        
        // Track story progression with mapped location names - only eventful moments
        const addStoryStep = (action, nodeId, item = null, details = "", isEventful = true) => {
            let locationName = this.getLocationDisplayName(nodeId);
            let step = `${action} ${locationName}`;
            if (item) step += ` and retrieved the ${item}`;
            if (details) step += ` ${details}`;
            
            // Only add eventful moments to the story
            if (isEventful) {
                storySteps.push(step);
            }
            console.log(`📖 Link ${step.toLowerCase()}`);
        };
        
        let stepCount = 0;
        
        // Continue until all palaces are completed or no more progress can be made
        while (containerCounts.CRYSTALS < 7) {
            stepCount++;
            
            // Get accessible nodes with current inventory
            let [accessibleNodes] = this.getAccessibleNodes(
                startingNode, 
                currentItems, 
                currentSpells, 
                currentAbilities
            );
            
            // Check for newly accessible paths after item collection
            this.checkNewlyAccessiblePaths(accessibleNodes, blockedPaths, currentItems, currentSpells, currentAbilities);
            
            // Check for previously failed palaces that we can now complete
            let nowCompletablePalaces = this.checkFailedPalaces(failedPalaces, currentItems, currentSpells, currentAbilities);
            
            // Check for locations with multiple reasons to revisit (spells, abilities, etc.)
            let nowAccessibleLocations = this.checkFailedLocations(failedLocations, currentItems, currentSpells, currentAbilities);
            
            // Find new nodes we can visit
            let newAccessibleNodes = accessibleNodes.filter(node => !visitedNodes.has(node));
            
            // Prioritize newly completable palaces (that we've already visited but couldn't complete)
            let priorityPalaces = nowCompletablePalaces.filter(nodeId => visitedNodes.has(nodeId));
            
            // Also prioritize locations with newly accessible content (spells, abilities)
            let priorityLocations = nowAccessibleLocations.filter(nodeId => visitedNodes.has(nodeId));
            
            if (priorityPalaces.length > 0) {
                // Loop through all newly completable palaces and process each one
                priorityPalaces.forEach(nextNode => {
                    console.log(`🏰 Prioritizing previously failed palace: ${this.getLocationDisplayName(nextNode)}`);
                    let nodeData = this.graphData[nextNode];

                    // Handle palace completion for revisited palaces
                    let locationMeta = nodeData.mappedLocation ? this.locationMetadata[nodeData.mappedLocation] : null;
                    if (locationMeta && locationMeta.type === "PALACE") {
                        let palaceRequirements = locationMeta.completionRequirements || [];
                        this.processPalaceCompletion(
                            nextNode,
                            nodeData,
                            palaceRequirements,
                            currentItems,
                            currentSpells,
                            currentAbilities,
                            updateContainerCount,
                            addAcquisitionStep,
                            addStoryStep,
                            updateCrystalCount,
                            containerCounts,
                            true
                        );
                    }
                });
                continue; // Skip the normal node selection process after handling all
            }
            
            // Handle locations with newly accessible content (spells, abilities)
            if (priorityLocations.length > 0) {
                // Loop through all locations with newly accessible content and process each one
                priorityLocations.forEach(nextNode => {
                    console.log(`🏫 Prioritizing location with newly accessible content: ${this.getLocationDisplayName(nextNode)}`);
                    let nodeData = this.graphData[nextNode];
                    let locationMeta = nodeData.mappedLocation ? this.locationMetadata[nodeData.mappedLocation] : null;

                    // Process this location for spells and abilities
                    this.processLocationForContent(
                        nextNode,
                        locationMeta,
                        currentItems,
                        currentSpells,
                        currentAbilities,
                        addStoryStep,
                        updateContainerCount,
                        failedLocations,
                        containerCounts,
                        addAcquisitionStep
                    );
                });
                continue; // Skip the normal node selection process after handling all
            }
            
            if (newAccessibleNodes.length === 0) {
                console.log("❌ No new accessible nodes found - checking if we can make progress...");
                
                // Check if we have any blocked paths that could lead to progress
                let progressPossible = this.canMakeProgress(blockedPaths, currentItems, currentSpells, currentAbilities);
                
                if (!progressPossible) {
                    console.log("❌ No way to make further progress - adventure ends here");
                    this.exploreBlockedPaths(visitedNodes, blockedPaths, currentItems, currentSpells, currentAbilities);
                    break;
                } else {
                    console.log("⚠️ No new nodes accessible but progress still possible - continuing exploration...");
                    this.exploreBlockedPaths(visitedNodes, blockedPaths, currentItems, currentSpells, currentAbilities);
                    break;
                }
            }
            
            // Choose the most optimal next node
            let nextNode = this.chooseOptimalNextNode(newAccessibleNodes, currentItems, containerCounts.CRYSTALS, collectedLocations);
            
            if (!nextNode) {
                console.log(`\n🚫 No valid next node found - ending exploration`);
                break;
            }
            
            let nodeData = this.graphData[nextNode];
            
            visitedNodes.add(nextNode);
            
            // Explore all edges from this node to understand what's blocked
            this.exploreEdgesFromNode(nextNode, visitedNodes, blockedPaths, currentItems, currentSpells, currentAbilities);
            
            // Check what type of location this is and handle accordingly
            let locationMeta = nodeData.mappedLocation ? this.locationMetadata[nodeData.mappedLocation] : null;
            
            // Check if this is a palace
            if (locationMeta && locationMeta.type === "PALACE") {
                let palaceRequirements = locationMeta.completionRequirements || [];
                
                if (this.checkRequirements(palaceRequirements, currentItems, currentSpells, currentAbilities)) {
                    this.processPalaceCompletion(nextNode, nodeData, palaceRequirements, currentItems, currentSpells, currentAbilities, updateContainerCount, addAcquisitionStep, addStoryStep, updateCrystalCount, containerCounts, false);
                } else {
                    // Track this failed palace for potential revisit later
                    let palaceName = this.getLocationDisplayName(nextNode);
                    failedPalaces.set(nextNode, {
                        name: palaceName,
                        requirements: palaceRequirements,
                        location: locationMeta
                    });
                    console.log(`   🔒 Failed to complete ${palaceName} - tracking for later (needs: ${palaceRequirements.join(", ")})`);
                    addStoryStep("🔍 explored", nextNode, null, `but couldn't complete the palace yet (needs: ${palaceRequirements.join(", ")})`);
                }
            }
            // Check if this is a spell/ability town
            else if (locationMeta && (locationMeta.spell || locationMeta.ability)) {
                console.log(`   🏫 Processing spell/ability town: ${this.getLocationDisplayName(nextNode)}`);
                console.log(`   🏫 Location metadata:`, {
                    spell: locationMeta.spell,
                    ability: locationMeta.ability,
                    itemRequirements: locationMeta.itemRequirements,
                    spellRequirements: locationMeta.spellRequirements,
                    abilityRequirements: locationMeta.abilityRequirements
                });
                console.log(`   🏫 Mapped items at this location:`, nodeData.mappedItems);
                
                this.processLocationForContent(nextNode, locationMeta, currentItems, currentSpells, currentAbilities, addStoryStep, updateContainerCount, failedLocations, containerCounts, addAcquisitionStep);
                
                // After learning a spell/ability, check for newly accessible items at the same location
                this.processLocationItems(nextNode, nodeData, locationMeta, currentItems, currentSpells, currentAbilities, updateContainerCount, addAcquisitionStep, addStoryStep, containerCounts, failedItemLocations);
            }
            // Check if this location has items (use mapped items)
            else if (nodeData.mappedItems && nodeData.mappedItems.length > 0) {
                let item = nodeData.mappedItems[0]; // Get the first item
                let locationName = this.getLocationDisplayName(nextNode);
                
                let description = this.processItemAcquisition(
                    item, locationName, "found in location",
                    currentItems, currentSpells, currentAbilities, updateContainerCount, addAcquisitionStep,
                    collectedLocations, nextNode
                );
                
                if (description) {
                    if (item === "BAGU_SAUCE") {
                        addStoryStep("🏠 went to", nextNode, null, description);
                    } else if (this.isSpell(item)) {
                        addStoryStep("🗡️ went to", nextNode, null, "and found a magical spell");
                    } else if (this.isAbility(item)) {
                        addStoryStep("🗡️ went to", nextNode, null, "and found a new ability");
                    } else {
                        addStoryStep("🗡️ went to", nextNode, null, "and found a valuable item");
                    }
                }
            }
            // Legacy handling for locations that give BAGU_SAUCE but don't have it in mappedItems
            else if (locationMeta && locationMeta.items && locationMeta.items.includes("BAGU_SAUCE")) {
                if (!currentItems.includes("BAGU_SAUCE")) {
                    currentItems.push("BAGU_SAUCE");
                    console.log(`   👨 Link talked to Bagu and gained his favor (BAGU_SAUCE)!`);
                    addAcquisitionStep("item", "BAGU_SAUCE", this.getLocationDisplayName(nextNode), "(gained Bagu's favor)");
                    addStoryStep("🏠 went to", nextNode, null, "and talked to Bagu");
                } else {
                    // Not eventful if already have BAGU_SAUCE
                    addStoryStep("🏠 revisited", nextNode, null, "but Bagu had nothing new to say", false);
                }
            } else {
                // Regular exploration - not eventful enough for story
                addStoryStep("🚶 visited", nextNode, null, "", false);
            }
        }
        
        if (containerCounts.CRYSTALS >= 7) {
            console.log("🎉 Link completed all palaces and saved Hyrule!");
        } else {
            console.log(`⚠️ Adventure incomplete - only ${containerCounts.CRYSTALS}/7 palaces completed`);
        }
        
        // Final summary of what's still blocked
        console.log(`\n🚧 Remaining Blocked Paths:`);
        if (blockedPaths.size === 0) {
            console.log("   ✅ All paths have been explored!");
        } else {
            blockedPaths.forEach((requirements, path) => {
                console.log(`   🔒 ${path}: Needs ${this.formatRequirements(requirements)}`);
            });
        }
        
        // Summary of failed palaces
        console.log(`\n🏰 Failed Palaces:`);
        if (failedPalaces.size === 0) {
            console.log("   ✅ All accessible palaces were completed!");
        } else {
            failedPalaces.forEach((palaceInfo, nodeId) => {
                console.log(`   🔒 ${palaceInfo.name}: Needs ${palaceInfo.requirements.join(" and ")}`);
            });
        }
        
        // Summary of failed locations (spells/abilities)
        console.log(`\n🏫 Failed Locations:`);
        if (failedLocations.size === 0) {
            console.log("   ✅ All accessible spells and abilities were learned!");
        } else {
            failedLocations.forEach((locationInfo, nodeId) => {
                let failures = [];
                if (locationInfo.failedSpell) {
                    failures.push(`${locationInfo.failedSpell.spell} spell (needs: ${locationInfo.failedSpell.requirements.join(", ")})`);
                }
                if (locationInfo.failedAbility) {
                    failures.push(`${locationInfo.failedAbility.ability} ability (needs: ${locationInfo.failedAbility.requirements.join(", ")})`);
                }
                console.log(`   🔒 ${locationInfo.name}: ${failures.join(", ")}`);
            });
        }
        
        console.log(`\n📊 Adventure Summary:`);
        console.log(`   🏰 Palaces completed: ${containerCounts.CRYSTALS}/7`);
        console.log(`   🔮 Magic containers: ${containerCounts.MAGIC}`);
        console.log(`   ❤️ Heart containers: ${containerCounts.HEART}`);
        console.log(`   💎 Crystals: ${containerCounts.CRYSTALS}/6`);
        console.log(`   🎒 Items collected: ${currentItems.length} - [${currentItems.join(", ") || "none"}]`);
        console.log(`   ✨ Spells learned: ${currentSpells.length} - [${currentSpells.join(", ") || "none"}]`);
        console.log(`   💪 Abilities gained: ${currentAbilities.length} - [${currentAbilities.join(", ") || "none"}]`);
        console.log(`   📍 Locations visited: ${visitedNodes.size}`);
        console.log(`   🐾 Total steps: ${stepCount}`);
        console.log(`   🚧 Blocked paths discovered: ${blockedPaths.size}`);
        
        // Format the story as markdown
        let formattedStory = "# 🗡️ Link's Adventure Walkthrough\n\n";
        formattedStory += `*📍 Link begins his journey at ${this.getLocationDisplayName(startingNode)}...*\n\n`;
        
        // Add a brief summary
        formattedStory += `## 📈 Adventure Summary\n\n`;
        formattedStory += `- 🏰 **Palaces completed:** ${containerCounts.CRYSTALS}/7\n`;
        formattedStory += `- 🎒 **Items collected:** ${currentItems.length}\n`;
        formattedStory += `- ✨ **Spells learned:** ${currentSpells.length}\n`;
        formattedStory += `- 💪 **Abilities gained:** ${currentAbilities.length}\n`;
        formattedStory += `- 📍 **Key locations visited:** ${storySteps.length}\n\n`;
        
        formattedStory += `## 📖 Key Events\n\n`;
        storySteps.forEach((step, index) => {
            formattedStory += `${index + 1}. ${step}\n`;
        });
        
        if (containerCounts.CRYSTALS >= 7) {
            formattedStory += "\n> 🎉 **Link completed all palaces and saved Hyrule!**\n\n";
        } else {
            formattedStory += `\n> ⚠️ **Adventure incomplete** - only ${containerCounts.CRYSTALS}/7 palaces completed\n\n`;
        }
        
        formattedStory += `## 🚧 Remaining Blocked Paths\n\n`;
        if (blockedPaths.size === 0) {
            formattedStory += "✅ All paths have been explored!\n\n";
        } else {
            blockedPaths.forEach((requirements, path) => {
                formattedStory += `- 🔒 **${path}:** Needs ${this.formatRequirements(requirements)}\n`;
            });
        }
        
        formattedStory += `\n## 🏰 Failed Palaces\n\n`;
        if (failedPalaces.size === 0) {
            formattedStory += "✅ All accessible palaces were completed!\n\n";
        } else {
            failedPalaces.forEach((palaceInfo, nodeId) => {
                formattedStory += `- 🔒 **${palaceInfo.name}:** Needs ${this.formatRequirements(palaceInfo.requirements)}\n`;
            });
        }
        
        formattedStory += `\n## 🏫 Failed Locations\n\n`;
        if (failedLocations.size === 0) {
            formattedStory += "✅ All accessible spells and abilities were learned!\n\n";
        } else {
            failedLocations.forEach((locationInfo, nodeId) => {
                let failures = [];
                if (locationInfo.failedSpell) {
                    failures.push(`${locationInfo.failedSpell.spell} spell (needs: ${locationInfo.failedSpell.requirements.join(", ")})`);
                }
                if (locationInfo.failedAbility) {
                    failures.push(`${locationInfo.failedAbility.ability} ability (needs: ${locationInfo.failedAbility.requirements.join(", ")})`);
                }
                formattedStory += `- 🔒 **${locationInfo.name}:** ${failures.join(", ")}\n`;
            });
        }
        
        formattedStory += `\n## 📊 Adventure Summary\n\n`;
        formattedStory += `- 🏰 **Palaces completed:** ${containerCounts.CRYSTALS}/7\n`;
        formattedStory += `- 🔮 **Magic containers:** ${containerCounts.MAGIC}\n`;
        formattedStory += `- ❤️ **Heart containers:** ${containerCounts.HEART}\n`;
        formattedStory += `- 💎 **Crystals:** ${containerCounts.CRYSTALS}/6\n`;
        formattedStory += `- 🎒 **Items collected:** ${currentItems.length} - [${currentItems.join(", ") || "none"}]\n`;
        formattedStory += `- ✨ **Spells learned:** ${currentSpells.length} - [${currentSpells.join(", ") || "none"}]\n`;
        formattedStory += `- 💪 **Abilities gained:** ${currentAbilities.length} - [${currentAbilities.join(", ") || "none"}]\n`;
        formattedStory += `- 📍 **Locations visited:** ${visitedNodes.size}\n`;
        formattedStory += `- 🐾 **Total steps:** ${stepCount}\n`;
        formattedStory += `- 🚧 **Blocked paths discovered:** ${blockedPaths.size}\n`;
        formattedStory += `- 🔮 **Magic containers collected:** ${containerCounts.MAGIC} / ${totalMagicContainersOnMap + 4} total (started with 4)\n`;
        formattedStory += `- ⚡ **THUNDER spell accessible:** ${containerCounts.MAGIC >= 8 ? "YES" : `NO (need ${8 - containerCounts.MAGIC} more)`}\n\n`;
        
        // Determine if the ROM is completable
        const isCompletable = containerCounts.CRYSTALS >= 7;
        
        return {
            success: isCompletable,
            completedPalaces: containerCounts.CRYSTALS,
            totalPalaces: 7,
            walkthrough: formattedStory,
            stats: {
                itemsCollected: currentItems.length,
                spellsLearned: currentSpells.length,
                abilitiesGained: currentAbilities.length,
                locationsVisited: visitedNodes.size,
                steps: stepCount,
                blockedPaths: blockedPaths.size,
                magicContainers: containerCounts.MAGIC,
                heartContainers: containerCounts.HEART
            }
        };
    };

    /**
     * Choose the optimal next node for story progression
     */
    chooseOptimalNextNode = (availableNodes, currentItems, crystalCount, collectedLocations = new Set()) => {
        // Priority 1: Uncompleted palaces we can actually complete
        let completablePalaces = availableNodes.filter(node => {
            let nodeData = this.graphData[node];
            let locationMeta = nodeData.mappedLocation ? this.locationMetadata[nodeData.mappedLocation] : null;
            if (locationMeta && locationMeta.type === "PALACE") {
                // Check if we can complete this palace
                let palaceRequirements = locationMeta.completionRequirements || [];
                return this.checkRequirements(palaceRequirements, currentItems, [], []);
            }
            return false;
        });
        
        if (completablePalaces.length > 0) {
            return completablePalaces[0];
        }
        
        // Priority 2: Spell/ability towns where we can learn new content
        let spellAbilityTowns = availableNodes.filter(node => {
            let nodeData = this.graphData[node];
            let locationMeta = nodeData.mappedLocation ? this.locationMetadata[nodeData.mappedLocation] : null;
            if (locationMeta && (locationMeta.spell || locationMeta.ability)) {
                let canLearnSpell = false;
                let canLearnAbility = false;
                
                if (locationMeta.spell) {
                    let spellRequirements = locationMeta.spellRequirements || [];
                    canLearnSpell = this.checkRequirements(spellRequirements, currentItems, [], []);
                }
                
                if (locationMeta.ability) {
                    let abilityRequirements = locationMeta.abilityRequirements || [];
                    canLearnAbility = this.checkRequirements(abilityRequirements, currentItems, [], []);
                }
                
                return canLearnSpell || canLearnAbility;
            }
            return false;
        });
        
        if (spellAbilityTowns.length > 0) {
            return spellAbilityTowns[0];
        }
        
        // Priority 3: Locations with useful items we don't have yet or can collect more of
        let itemLocations = availableNodes.filter(node => {
            let nodeData = this.graphData[node];
            if (nodeData.mappedItems && nodeData.mappedItems.length > 0) {
                let item = nodeData.mappedItems[0];
                
                // Skip if we've already collected from this location
                if (collectedLocations.has(node)) {
                    return false;
                }
                
                // Magic containers can always be collected (we need 8 for THUNDER)
                if (item === "MAGIC_CONTAINER") {
                    return true;
                }
                
                // Heart containers can always be collected
                if (item === "HEART_CONTAINER") {
                    return true;
                }
                
                // Other items should only be collected once
                return !currentItems.includes(item);
            }
            return false;
        });
        
        if (itemLocations.length > 0) {
            return itemLocations[0];
        }
        
        // Priority 4: Any available node
        if (availableNodes.length > 0) {
            return availableNodes[0];
        }
        
        // No nodes available
        console.warn("chooseOptimalNextNode: No available nodes to choose from");
        return null;
    };

    /**
     * Extract palace number from node data
     */
    extractPalaceNumber = (nodeId) => {
        let nodeData = this.graphData[nodeId];
        
        // Check mapped location first (this is where P1, P2, etc. are stored)
        let mappedLocation = nodeData.mappedLocation;
        let locationKey = nodeData.locationKey;
        
        // Look for palace IDs in mapped location first (P1, P2, etc.)
        if (mappedLocation === "P1") return 1;
        if (mappedLocation === "P2") return 2;
        if (mappedLocation === "P3") return 3;
        if (mappedLocation === "P4") return 4;
        if (mappedLocation === "P5") return 5;
        if (mappedLocation === "P6") return 6;
        if (mappedLocation === "GP") return 7;
        
        // Try location key as fallback
        if (locationKey && locationKey.includes("P1")) return 1;
        if (locationKey && locationKey.includes("P2")) return 2;
        if (locationKey && locationKey.includes("P3")) return 3;
        if (locationKey && locationKey.includes("P4")) return 4;
        if (locationKey && locationKey.includes("P5")) return 5;
        if (locationKey && locationKey.includes("P6")) return 6;
        if (locationKey && (locationKey.includes("GP") || locationKey.includes("GREAT_PALACE"))) return 7;
        
        // Check nodeId itself as last resort
        if (nodeId === "P1" || nodeId.includes("P1")) return 1;
        if (nodeId === "P2" || nodeId.includes("P2")) return 2;
        if (nodeId === "P3" || nodeId.includes("P3")) return 3;
        if (nodeId === "P4" || nodeId.includes("P4")) return 4;
        if (nodeId === "P5" || nodeId.includes("P5")) return 5;
        if (nodeId === "P6" || nodeId.includes("P6")) return 6;
        if (nodeId === "GP" || nodeId.includes("GP")) return 7;
        
        console.warn(`⚠️ Could not determine palace number for node ${nodeId} (mapped: ${mappedLocation}, key: ${locationKey}), defaulting to 1`);
        return 1;
    };

    /**
     * Check if a palace can be completed with current inventory
     */
    canCompletePalace = (palaceNumber, items, spells, abilities) => {
        // Define palace completion requirements
        const palaceRequirements = {
            1: [], // No requirements
            2: ["GLOVE"], // Needs glove
            3: ["RAFT"], // Needs raft to access
            4: ["BOOTS"], // Needs boots
            5: ["FLUTE"], // Needs flute
            6: ["FAIRY", "JUMP", "MAGIC_KEY"], // Needs fairy, jump, and magic key
            7: ["CRYSTALS"] // Needs all 6 crystals
        };
        
        let requirements = palaceRequirements[palaceNumber] || [];
        return this.checkRequirements(requirements, items, spells, abilities);
    };

    /**
     * Get the spell reward for completing a palace
     */
    getPalaceSpellReward = (palaceNumber) => {
        const spellRewards = {
            1: "SHIELD",
            2: "JUMP", 
            3: "LIFE",
            4: "FAIRY",
            5: "FIRE",
            6: "REFLECT"
        };
        return spellRewards[palaceNumber];
    };

    /**
     * Get the display name for a location (mapped location or location key)
     */
    getLocationDisplayName = (nodeId) => {
        let node = this.graphData[nodeId];
        if (!node) return nodeId;
        
        // Prefer mapped location name, fall back to location key, then node ID
        return node.mappedLocation || node.locationKey || nodeId;
    };

    /**
     * Explore all edges from a node to understand what's blocked
     */
    exploreEdgesFromNode = (nodeId, visitedNodes, blockedPaths, items, spells, abilities) => {
        let node = this.graphData[nodeId];
        let currentLocation = this.getLocationDisplayName(nodeId);
        
        // Check connections
        if (node.connections) {
            node.connections.forEach(connectedNode => {
                if (!visitedNodes.has(connectedNode)) {
                    let pathName = `${currentLocation} → ${this.getLocationDisplayName(connectedNode)}`;
                    
                    // Check if this connection has requirements
                    if (node.connectionRequirements && node.connectionRequirements[connectedNode]) {
                        let requirements = node.connectionRequirements[connectedNode];
                        let canTraverse = this.checkRequirements(requirements, items, spells, abilities);
                        
                        if (!canTraverse) {
                            blockedPaths.set(pathName, requirements);
                            console.log(`   🚧 Path blocked: ${pathName} (needs: ${requirements.join(" and ")})`);
                        } else {
                            console.log(`   ✅ Path open: ${pathName} (used: ${requirements.join(" and ")})`);
                        }
                    } else {
                        console.log(`   🚶 Free path: ${pathName}`);
                    }
                }
            });
        }
        
        // Check links  
        if (node.links) {
            node.links.forEach(linkedNode => {
                if (!visitedNodes.has(linkedNode)) {
                    let pathName = `${currentLocation} → ${this.getLocationDisplayName(linkedNode)}`;
                    
                    // Check if this link has requirements
                    if (node.linkRequirements && node.linkRequirements[linkedNode]) {
                        let requirements = node.linkRequirements[linkedNode];
                        let canTraverse = this.checkRequirements(requirements, items, spells, abilities);
                        
                        if (!canTraverse) {
                            blockedPaths.set(pathName, requirements);
                            console.log(`   🌉 Bridge blocked: ${pathName} (needs: ${requirements.join(" and ")})`);
                        } else {
                            console.log(`   🌉 Bridge open: ${pathName} (used: ${requirements.join(" and ")})`);
                        }
                    } else {
                        console.log(`   🌉 Free bridge: ${pathName}`);
                    }
                }
            });
        }
    };

    /**
     * Check if any previously blocked paths are now accessible
     */
    checkNewlyAccessiblePaths = (accessibleNodes, blockedPaths, items, spells, abilities) => {
        let newlyOpened = [];
        
        blockedPaths.forEach((requirements, pathName) => {
            let canTraverse = this.checkRequirements(requirements, items, spells, abilities);
            if (canTraverse) {
                console.log(`   🔓 Path unlocked: ${pathName} (now have: ${requirements.join(", ")})`);
                newlyOpened.push(pathName);
            }
        });
        
        // Remove newly opened paths from blocked list
        newlyOpened.forEach(pathName => {
            blockedPaths.delete(pathName);
        });
        
        if (newlyOpened.length > 0) {
            console.log(`   🎉 ${newlyOpened.length} new path(s) opened!`);
        }
    };

    /**
     * Check if any previously failed palaces can now be completed
     */
    checkFailedPalaces = (failedPalaces, items, spells, abilities) => {
        let nowCompletable = [];
        
        failedPalaces.forEach((palaceInfo, nodeId) => {
            // Add detailed logging before testing requirements
            console.log("TESTING PREVIOUSLY FAILED PALACE: " + palaceInfo.name);
            console.log("   Requirements to test: ", palaceInfo.requirements);
            console.log("   Current items: ", items);
            console.log("   Current spells: ", spells);
            console.log("   Current abilities: ", abilities);
            
            let canComplete = this.checkRequirements(palaceInfo.requirements, items, spells, abilities);
            if (canComplete) {
                console.log(`   🏰 Palace ${palaceInfo.name} can now be completed! (have: ${palaceInfo.requirements.join(", ")})`);
                nowCompletable.push(nodeId);
            }
        });
        
        // Remove palaces that can now be completed from failed list
        nowCompletable.forEach(nodeId => {
            failedPalaces.delete(nodeId);
        });
        
        if (nowCompletable.length > 0) {
            console.log(`   🎉 ${nowCompletable.length} palace(s) can now be completed!`);
        }
        
        return nowCompletable;
    };

    /**
     * Check if any previously failed locations can now provide spells or abilities
     */
    checkFailedLocations = (failedLocations, items, spells, abilities) => {
        let nowAccessible = [];
        
        failedLocations.forEach((locationInfo, nodeId) => {
            let hasNewContent = false;
            
            // Check if any previously failed spells can now be learned
            if (locationInfo.failedSpell) {
                let canLearnSpell = this.checkRequirements(locationInfo.failedSpell.requirements, items, spells, abilities);
                if (canLearnSpell && !spells.includes(locationInfo.failedSpell.spell)) {
                    console.log(`   🏫 Spell ${locationInfo.failedSpell.spell} can now be learned at ${locationInfo.name}!`);
                    hasNewContent = true;
                }
            }
            
            // Check if any previously failed abilities can now be learned
            if (locationInfo.failedAbility) {
                let canLearnAbility = this.checkRequirements(locationInfo.failedAbility.requirements, items, spells, abilities);
                if (canLearnAbility && !abilities.includes(locationInfo.failedAbility.ability)) {
                    console.log(`   🏫 Ability ${locationInfo.failedAbility.ability} can now be learned at ${locationInfo.name}!`);
                    hasNewContent = true;
                }
            }
            
            if (hasNewContent) {
                nowAccessible.push(nodeId);
            }
        });
        
        return nowAccessible;
    };

    /**
     * Process a location for spells, abilities, and other content
     */
    processLocationForContent = (nodeId, locationMeta, currentItems, currentSpells, currentAbilities, addStoryStep, updateContainerCount, failedLocations = null, containerCounts = null, addAcquisitionStep = null) => {
        let locationName = this.getLocationDisplayName(nodeId);
        let hasFailedContent = false;
        let completedActions = [];
        
        // Check for spells
        if (locationMeta.spell) {
            let spellToLearn = locationMeta.spell;
            let spellRequirements = locationMeta.spellRequirements || [];
            
            if (this.checkRequirements(spellRequirements, currentItems, currentSpells, currentAbilities)) {
                if (!currentSpells.includes(spellToLearn)) {
                    currentSpells.push(spellToLearn);
                    if (spellRequirements.length > 0) {
                        console.log(`   🎁 Link presented ${spellRequirements.join(" and ")} and learned ${spellToLearn}!`);
                        addAcquisitionStep("spell", spellToLearn, locationName, `(presented ${spellRequirements.join(" and ")})`);
                        completedActions.push(`learned the ${spellToLearn} spell by presenting ${spellRequirements.join(" and ")}`);
                    } else {
                        console.log(`   🎓 Link learned ${spellToLearn} from the wise man!`);
                        addAcquisitionStep("spell", spellToLearn, locationName, "(from wise man)");
                        completedActions.push(`learned the ${spellToLearn} spell from the wise man`);
                    }
                }
            } else {
                // Track failed spell attempt
                if (failedLocations) {
                    let locationInfo = failedLocations.get(nodeId) || { name: locationName };
                    locationInfo.failedSpell = { spell: spellToLearn, requirements: spellRequirements };
                    failedLocations.set(nodeId, locationInfo);
                }
                hasFailedContent = true;
                console.log(`   🔒 Cannot learn ${spellToLearn} yet (needs: ${spellRequirements.join(", ")})`);
            }
        }
        
        // Check for abilities
        if (locationMeta.ability) {
            let abilityToLearn = locationMeta.ability;
            let abilityRequirements = locationMeta.abilityRequirements || [];
            
            if (this.checkRequirements(abilityRequirements, currentItems, currentSpells, currentAbilities)) {
                if (!currentAbilities.includes(abilityToLearn)) {
                    currentAbilities.push(abilityToLearn);
                    if (abilityRequirements.length > 0) {
                        console.log(`   🎁 Link presented ${abilityRequirements.join(" and ")} and learned ${abilityToLearn}!`);
                        addAcquisitionStep("ability", abilityToLearn, locationName, `(presented ${abilityRequirements.join(" and ")})`);
                        completedActions.push(`learned the ${abilityToLearn} ability by presenting ${abilityRequirements.join(" and ")}`);
                    } else {
                        console.log(`   💪 Link learned ${abilityToLearn} from the master!`);
                        addAcquisitionStep("ability", abilityToLearn, locationName, "(from master)");
                        completedActions.push(`learned the ${abilityToLearn} ability from the master`);
                    }
                }
            } else {
                // Track failed ability attempt
                if (failedLocations) {
                    let locationInfo = failedLocations.get(nodeId) || { name: locationName };
                    locationInfo.failedAbility = { ability: abilityToLearn, requirements: abilityRequirements };
                    failedLocations.set(nodeId, locationInfo);
                }
                hasFailedContent = true;
                console.log(`   🔒 Cannot learn ${abilityToLearn} yet (needs: ${abilityRequirements.join(", ")})`);
            }
        }
        
        // Check for THUNDER spell (8 magic containers requirement)
        if (locationMeta.spell === "THUNDER") {
            // Use the container count instead of filtering items array
            let magicContainerCount = containerCounts ? containerCounts.MAGIC : currentItems.filter(item => item === "MAGIC_CONTAINER").length;
            if (magicContainerCount >= 8) {
                if (!currentSpells.includes("THUNDER")) {
                    currentSpells.push("THUNDER");
                    console.log(`   ⚡ Link has enough magic containers (${magicContainerCount}) and learned THUNDER!`);
                    addAcquisitionStep("spell", "THUNDER", locationName, `(with ${magicContainerCount} magic containers)`);
                    completedActions.push(`learned the THUNDER spell with ${magicContainerCount} magic containers`);
                }
            } else {
                console.log(`   ⚡ Cannot learn THUNDER yet (has ${magicContainerCount}/8 magic containers)`);
                hasFailedContent = true;
            }
        }
        
        // Remove from failed locations if all content has been accessed
        if (failedLocations && !hasFailedContent) {
            failedLocations.delete(nodeId);
        }
        
        // Create story step only if there were failed attempts (acquisitions get their own logs)
        if (hasFailedContent) {
            let failedReasons = [];
            if (locationMeta.spell && locationMeta.spellRequirements && locationMeta.spellRequirements.length > 0) {
                failedReasons.push(`${locationMeta.spell} spell (needs: ${locationMeta.spellRequirements.join(", ")})`);
            }
            if (locationMeta.ability && locationMeta.abilityRequirements && locationMeta.abilityRequirements.length > 0) {
                failedReasons.push(`${locationMeta.ability} ability (needs: ${locationMeta.abilityRequirements.join(", ")})`);
            }
            if (locationMeta.spell === "THUNDER") {
                let magicCount = containerCounts ? containerCounts.MAGIC : currentItems.filter(item => item === "MAGIC_CONTAINER").length;
                failedReasons.push(`THUNDER spell (needs: 8 magic containers, has ${magicCount})`);
            }
            
            addStoryStep("🏫 went to", nodeId, null, `but couldn't access: ${failedReasons.join(", ")}`);
        } else if (completedActions.length === 0) {
            // Not eventful if nothing was gained or blocked
            addStoryStep("🏫 revisited", nodeId, null, "but had nothing new to offer", false);
        }
    };

    /**
     * Explore what paths are currently blocked and what would be needed
     */
    exploreBlockedPaths = (visitedNodes, blockedPaths, items, spells, abilities) => {
        console.log(`\n🔍 Analyzing blocked paths to find progression opportunities...`);
        
        if (blockedPaths.size === 0) {
            console.log("   ✅ No blocked paths found - all reachable areas explored!");
            return;
        }
        
        // Group blocked paths by what's needed
        let itemNeeds = new Map();
        
        blockedPaths.forEach((requirements, pathName) => {
            requirements.forEach(requirement => {
                // Parse OR requirements (e.g., "ITEM1|ITEM2")
                let alternatives = requirement.split("|").map(alt => alt.trim());
                alternatives.forEach(alt => {
                    if (!items.includes(alt) && !spells.includes(alt) && !abilities.includes(alt)) {
                        if (!itemNeeds.has(alt)) {
                            itemNeeds.set(alt, []);
                        }
                        itemNeeds.get(alt).push(pathName);
                    }
                });
            });
        });
        
        console.log(`\n📋 Items needed for progression:`);
        if (itemNeeds.size === 0) {
            console.log("   ✅ No specific items needed - may need palace completion or other progression");
        } else {
            itemNeeds.forEach((paths, item) => {
                console.log(`   🔑 ${item} would unlock:`);
                paths.forEach(path => {
                    console.log(`      → ${path}`);
                });
            });
        }
        
        console.log(`\n🎒 Current inventory:`);
        console.log(`   Items: [${items.join(", ") || "none"}]`);
        console.log(`   Spells: [${spells.join(", ") || "none"}]`);
        console.log(`   Abilities: [${abilities.join(", ") || "none"}]`);
    };

    /**
     * Check if we can still make progress given current blocked paths and inventory
     */
    canMakeProgress = (blockedPaths, items, spells, abilities) => {
        // If no blocked paths, we can't make progress
        if (blockedPaths.size === 0) {
            return false;
        }
        
        // Check if any blocked path could be opened with items we could potentially get
        for (let [pathName, requirements] of blockedPaths) {
            // Check if we're close to satisfying any requirements
            let missingItems = [];
            requirements.forEach(requirement => {
                let alternatives = requirement.split("|").map(alt => alt.trim());
                let hasSome = alternatives.some(alt => 
                    items.includes(alt) || spells.includes(alt) || abilities.includes(alt)
                );
                if (!hasSome) {
                    missingItems.push(requirement);
                }
            });
            
            // If we're only missing a few items, there might be hope
            if (missingItems.length <= 2) {
                console.log(`   🤔 Potentially reachable: ${pathName} (missing: ${missingItems.join(", ")})`);
                return true;
            }
        }
        
        return false;
    };

    randomizeEnemiesAndPalaces = () => {
        Object.keys(this.levels).forEach((key) => {
            let {enemies} = this.levels[key];
            // console.log(key);
            enemies.forEach((enemy, index) => {
                if ([4].includes(enemy.mapSet)) {
                    return;
                }

                if (ENEMY_RANDO_EXCLUSIONS[enemy.mapSet].includes(enemy.enemyNumber)) {
                    return;
                }

                let acceptableEnemies = Object.keys(ENEMY_MAPPINGS[enemy.mapSet]);
                acceptableEnemies = acceptableEnemies.filter(key => !ENEMY_RANDO_EXCLUSIONS[enemy.mapSet].includes(parseInt(key)));

                let originalEnemyData = ENEMY_MAPPINGS[enemy.mapSet][enemy.enemyNumber];

                let chosenEnemy = this.chooseRandomNode(acceptableEnemies);
                let chosenEnemyData = ENEMY_MAPPINGS[enemy.mapSet][chosenEnemy];
                
                let heightDifference = 0;
                let newY = 0;
                if (chosenEnemyData && originalEnemyData) {
                    heightDifference = chosenEnemyData.height - originalEnemyData.height;

                    if (chosenEnemyData.height !== 0) {
                        newY = enemy.y - heightDifference;
                    }
                }

                this.levels[key].enemies[index] = {
                    ...enemy,
                    y: newY,
                    enemyNumber: chosenEnemy
                }
            })
        })

        return this.levels;
    }
}
