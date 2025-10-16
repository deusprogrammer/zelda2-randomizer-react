import vanillaTemplate from '../zelda2/templates/z2-vanilla.template';
import vanillaMap from '../zelda2/templates/z2-vanilla.map';
import { randomSeed } from './util';

const BRIDGE = 0x3;
const DESERT = 0x4;
const GRASS = 0x5;
const FOREST = 0x6;
const SWAMP = 0x7;
const CEMETARY = 0x8;
const MOUNTAIN = 0xb;
const DEEP_WATER = 0xc;
const WATER = 0xd;

const DESERT_RATE = 0.20;
const GRASS_RATE = 0.45;
const FOREST_RATE = 0.20;
const SWAMP_RATE = 0.25;
const CEMETARY_RATE = 0.25;
const WATER_RATE = 0.20;

const ISOLATION_ZONE_MIN_SIZE = 20;

const REMEDY_MAP = {
    0xd: "BOOTS"
}

export const compressMap = (mapBlocks) => {
    // RLE the map
    let currentBlockType = null;
    let run = 0;
    let compressedMap = [];
    mapBlocks.forEach((mapBlock, index) => {
        if (currentBlockType !== mapBlock || run === 0xf || index % 64 === 0) {
            if (currentBlockType !== null) {
                compressedMap.push({ type: currentBlockType, length: run - 1 });
            }
            run = 0;
            currentBlockType = mapBlock;
        }
        run++;
    });
    if (run > 0) {
        compressedMap.push({ type: currentBlockType, length: run - 1 });
    }

    return compressedMap;
}

class Cell {
    type;
    x;
    y;
    isolationZone;
    hardIsolationZone;

    constructor(type) {
        this.type = type;
    }

    getType = () => {
        return this.type;
    };

    setType = (type) => {
        this.type = type;
    };

    setLocation = (x, y) => {
        this.x = x;
        this.y = y;
    }

    setIsolationZone = (isolationZone) => {
        this.isolationZone = isolationZone;
    }

    setHardIsolationZone = (isolationZone) => {
        this.hardIsolationZone = isolationZone;
    }
}

export class TerrainGenerator {
    vanillaTemplate;
    randomNumberGenerator;

    constructor(seed) {
        this.randomNumberGenerator = randomSeed(seed);
    }

    /**
     * Choose a random node from a list deterministically based on seed
     * @param {Array} nodes
     * @returns
     */
    chooseRandomNode = (nodes) => {
        let r = Math.trunc(this.randomNumberGenerator() * nodes.length);
        return nodes[r];
    };

    floodFill = (x, y, blockingTypes, terrain, visitedNodes, isolationZoneNumber, isHard = false, isolationZone = []) => {
        if (visitedNodes.includes(`${x},${y}`)) {
            return [];
        }
    
        visitedNodes.push(`${x},${y}`);
    
        if (
            x < 0 || x >= terrain.length ||
            y < 0 || y >= terrain[0].length ||
            blockingTypes.includes(terrain[y][x].getType())
        ) {
            return [];
        }
    
        terrain[y][x].setLocation(x, y + 30);
        if (isHard) {
            terrain[y][x].setHardIsolationZone(isolationZoneNumber);
        } else {
            terrain[y][x].setIsolationZone(isolationZoneNumber);
        }
        isolationZone.push(terrain[y][x]);
    
        this.floodFill(x + 1, y, blockingTypes, terrain, visitedNodes, isolationZoneNumber, isHard, isolationZone);
        this.floodFill(x - 1, y, blockingTypes, terrain, visitedNodes, isolationZoneNumber, isHard, isolationZone);
        this.floodFill(x, y + 1, blockingTypes, terrain, visitedNodes, isolationZoneNumber, isHard, isolationZone);
        this.floodFill(x, y - 1, blockingTypes, terrain, visitedNodes, isolationZoneNumber, isHard, isolationZone);
    
        return isolationZone;
    }
    
    findSurroundingWallType = (x, y, blockingTypes, terrain, visitedNodes = []) => {
        if (visitedNodes.includes(`${x},${y}`)) {
            return null;
        }
    
        visitedNodes.push(`${x},${y}`);
    
        if (
            x < 0 || x >= terrain.length ||
            y < 0 || y >= terrain[0].length
        ) {
            return null;
        }
    
        if (blockingTypes.includes(terrain[y][x].getType())) {
            return terrain[y][x].getType();
        }
    
        return this.findSurroundingWallType(x + 1, y, blockingTypes, terrain, visitedNodes) ||
            this.findSurroundingWallType(x - 1, y, blockingTypes, terrain, visitedNodes) ||
            this.findSurroundingWallType(x, y + 1, blockingTypes, terrain, visitedNodes) ||
            this.findSurroundingWallType(x, y - 1, blockingTypes, terrain, visitedNodes);
    }
    
    findIsolationZones = (blockingTypes, terrain, isHard = false) => {
        let isolationZones = [];
        let visitedNodes = [];
        for (let y = 0; y < terrain.length; y++) {
            for (let x = 0; x < terrain[0].length; x++) {
                let isolationZone = this.floodFill(x, y, blockingTypes, terrain, visitedNodes, isolationZones.length, isHard);
                if (isolationZone.length > 0) {
                    isolationZones.push(isolationZone);
                }
            }
        }
    
        return isolationZones;
    }
    
    createEmptyMatrix = (width, height) => {
        // Initialize matrix
        let terrain = [];
        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                row.push(new Cell(GRASS));
            }
            terrain.push(row);
        }
    
        return terrain;
    };
    
    isNeighborNonblocking = (x, y, terrain, blockingTypes, otherBlockingTypes) => {
        if (
            x < 0 || x >= terrain.length ||
            y < 0 || y >= terrain[0].length
        ) {
            return false;
        }
    
        if (!blockingTypes.includes(terrain[y][x].getType()) && !otherBlockingTypes.includes(terrain[y][x].getType())) {
            return true;
        }
    
        return false;
    }
    
    findBorders = (blockingTypes, otherBlockingTypes, terrain) => {
        let borders = [];
        for (let x = 0; x < terrain.length; x++) {
            for (let y = 0; y < terrain[0].length; y++) {
                let block = terrain[y][x];
                let isolationZones = new Set();
                if (blockingTypes.includes(block.getType())) {
                    if (this.isNeighborNonblocking(x + 1, y, terrain, blockingTypes, otherBlockingTypes)) {
                        isolationZones.add(terrain[y][x + 1].isolationZone);
                    }
    
                    if (this.isNeighborNonblocking(x - 1, y, terrain, blockingTypes, otherBlockingTypes)) {
                        isolationZones.add(terrain[y][x - 1].isolationZone);
                    }
    
                    if (this.isNeighborNonblocking(x, y + 1, terrain, blockingTypes, otherBlockingTypes)) {
                        isolationZones.add(terrain[y + 1][x].isolationZone);
                    }
    
                    if (this.isNeighborNonblocking(x, y - 1, terrain, blockingTypes, otherBlockingTypes)) {
                        isolationZones.add(terrain[y - 1][x].isolationZone);
                    }
    
                    if (isolationZones.size > 0) {
                        borders.push({ x, y: y + 30, isolationZones: Array.from(isolationZones) });
                    }
                }
            }
        }
    
        return borders;
    }
    
    findSoftConnections = (isolationZone, x, y, terrain, hardBlockers, softBlockers, connections = {}, visitedNodes = [], blockerStack = []) => {
        blockerStack = [...blockerStack];
    
        if (visitedNodes.includes(`${x},${y}`)) {
            return [];
        }
    
        visitedNodes.push(`${x},${y}`);
    
        if (
            x < 0 || x >= terrain.length ||
            y < 0 || y >= terrain[0].length ||
            hardBlockers.includes(terrain[y][x].getType())
        ) {
            return [];
        }
    
        if (softBlockers.includes(terrain[y][x].getType())) {
            if (!blockerStack.includes(terrain[y][x].getType())) {
                blockerStack.push(terrain[y][x].getType());
            }
        }
    
        if (isolationZone !== terrain[y][x].isolationZone && terrain[y][x].isolationZone !== undefined) {
            if (blockerStack.length > 0 && (!connections[`${isolationZone}:${terrain[y][x].isolationZone}`] || blockerStack.length < connections[`${isolationZone}:${terrain[y][x].isolationZone}`].length)) {
                connections[`${isolationZone}:${terrain[y][x].isolationZone}`] = {from: isolationZone, to: terrain[y][x].isolationZone, blockers: blockerStack};
            }
            return connections;
        }
    
        this.findSoftConnections(isolationZone, x + 1, y, terrain, hardBlockers, softBlockers, connections, visitedNodes, blockerStack);
        this.findSoftConnections(isolationZone, x - 1, y, terrain, hardBlockers, softBlockers, connections, visitedNodes, blockerStack);
        this.findSoftConnections(isolationZone, x, y + 1, terrain, hardBlockers, softBlockers, connections, visitedNodes, blockerStack);
        this.findSoftConnections(isolationZone, x, y - 1, terrain, hardBlockers, softBlockers, connections, visitedNodes, blockerStack);
    
        return connections;
    }
    
    placeAndGrow = (type, placeIn, ignore, rate, passes, liveNeighborsThreshold, terrain) => {
        // Place some water in the grassy areas
        for (let i = 0; i < terrain.length; i++) {
            for (let j = 0; j < terrain[0].length; j++) {
                if (terrain[i][j].getType() === placeIn && this.randomNumberGenerator() < rate) {
                    terrain[i][j] = new Cell(type);
                }
            }
        }
        for (
            let pass = 0;
            pass < passes;
            pass++
        ) {
            let workingTerrain = this.createEmptyMatrix(terrain.length, terrain[0].length);
            for (let i = 0; i < terrain.length; i++) {
                for (let j = 0; j < terrain[0].length; j++) {
                    let liveNeighbors = 0;
    
                    for (let m = i - 1; m <= i + 1; m++) {
                        for (let l = j - 1; l <= j + 1; l++) {
                            if (
                                m < 0 ||
                                l < 0 ||
                                l >= terrain[0].length ||
                                m >= terrain.length
                            ) {
                                continue;
                            }
    
                            if (terrain[l][m].getType() === type) {
                                liveNeighbors++;
                            }
                        }
                    }
    
                    if (ignore.includes(terrain[i][j].getType())) {
                        workingTerrain[i][j] = new Cell(terrain[i][j].getType());
                        continue;
                    }
    
                    if (liveNeighbors > liveNeighborsThreshold) {
                        workingTerrain[i][j] = new Cell(type);
                    } else {
                        workingTerrain[i][j] = new Cell(placeIn);
                    }
                }
            }
            terrain = workingTerrain;
        }
    
        return terrain;
    }
    
    generateContinent = (width, height) => {
        // Create the terrain
        let terrain = this.createEmptyMatrix(width, height);
        terrain = this.placeAndGrow(MOUNTAIN, GRASS, [], GRASS_RATE, 3, 4, terrain);
        terrain = this.placeAndGrow(WATER, GRASS, [MOUNTAIN], WATER_RATE, 3, 2, terrain);
        terrain = this.placeAndGrow(FOREST, GRASS, [MOUNTAIN, WATER], FOREST_RATE, 3, 2, terrain);
        terrain = this.placeAndGrow(DESERT, GRASS, [MOUNTAIN, WATER, FOREST], DESERT_RATE, 3, 2, terrain);
        terrain = this.placeAndGrow(SWAMP, GRASS, [MOUNTAIN, WATER, FOREST, DESERT], SWAMP_RATE, 4, 2, terrain);
        terrain = this.placeAndGrow(CEMETARY, GRASS, [MOUNTAIN, WATER, FOREST, DESERT, SWAMP], CEMETARY_RATE, 4, 2, terrain);
    
        // Detect the isolation zones
        let isolationZones = this.findIsolationZones([MOUNTAIN, DEEP_WATER, WATER], terrain);
        this.findIsolationZones([MOUNTAIN, DEEP_WATER], terrain, true);
    
        // Fill in small isolation zones
        let undersizedIsolationZones = [];
        isolationZones.filter(isolationZone => isolationZone.length < ISOLATION_ZONE_MIN_SIZE).forEach((isolationZone) => {
            let { x, y, isolationZone: isolationZoneNumber } = isolationZone[0];
            undersizedIsolationZones.push(isolationZoneNumber);
            let wallType = this.findSurroundingWallType(x, y - 30, [MOUNTAIN, WATER], terrain);
            isolationZone.forEach(({ x, y }) => {
                terrain[y - 30][x].setType(wallType);
                terrain[y - 30][x].setLocation(x, y);
                terrain[y - 30][x].setIsolationZone(undefined);
                terrain[y - 30][x].setHardIsolationZone(undefined);
            });
        });
    
        // Detect mountains that can have caves placed in them
        let mountainBorders = this.findBorders([MOUNTAIN], [WATER], terrain);
    
        // Filter out small isolation zones we already filled in
        isolationZones = isolationZones.filter(isolationZone => isolationZone.length >= ISOLATION_ZONE_MIN_SIZE);
    
        // Normalize isolationZone numbers
        isolationZones.forEach(((isolationZone, index) => {
            isolationZones[index] = isolationZone.map(block => {
                return {
                    ...block,
                    normalizedIsolationZone: index
                }
            })
        }));
    
        // Find connections
        let connections = {};
        isolationZones.forEach((isolationZone) => {
            let { x, y, isolationZone: index } = isolationZone[0];
            this.findSoftConnections(index, x, y - 30, terrain, [MOUNTAIN], [WATER], connections);
        });
    
        // Clean up connections
        let toDelete = [];
        Object.keys(connections).forEach(key => {
            let {to, from} = connections[key];
    
            // If to delete already contains this entry, don't delete it's counterpart
            if (toDelete.includes(key)) {
                return;
            }
    
            toDelete.push(`${to}:${from}`);
        });
        toDelete.forEach((keyToDelete) => {
            delete connections[keyToDelete];
        })
    
        // Turn object into an array
        connections = Object.values(connections);

        // Flatten the map
        let mapBlocks = terrain.flat().map(({ type }) => type);        return {mapBlocks, terrain, isolationZones, mountainBorders, mountainRanges: this.groupMountainRanges(mountainBorders, terrain), connections};
    };    // Generate a text representation of the terrain for debugging
    generateTerrainTextDump = (terrain, template = null, continent = 0) => {
        // Terrain type to character mapping (lowercase = no node, uppercase = has node)
        const terrainMap = {
            [GRASS]: 'g',      // Grass
            [WATER]: 'w',      // Water
            [MOUNTAIN]: 'm',   // Mountain
            [FOREST]: 'f',     // Forest
            [DESERT]: 'd',     // Desert
            [SWAMP]: 's',      // Swamp
            [CEMETARY]: 'c',   // Cemetery
            [BRIDGE]: 'b',     // Bridge
            [DEEP_WATER]: 'x'  // Deep water (if used)
        };

        // Create a map of node positions for this continent
        let nodePositions = new Set();
        if (template) {
            Object.values(template).forEach(node => {
                if (node.continent === continent) {
                    nodePositions.add(`${node.x},${node.y}`);
                }
            });
        }

        let textDump = '';
        for (let y = 0; y < terrain.length; y++) {
            let row = '';
            for (let x = 0; x < terrain[0].length; x++) {
                let terrainType = terrain[y][x].getType();
                let baseChar = terrainMap[terrainType] || '?';
                
                // Check if there's a node at this position (adjust for coordinate system)
                let hasNode = nodePositions.has(`${x},${y + 30}`);
                
                // Use uppercase if node exists, lowercase if not
                row += hasNode ? baseChar.toUpperCase() : baseChar;
            }
            textDump += row + '\n';
        }
        return textDump;
    };
    
    reorderMapKeys = (map, order) => {
        let newMap = {};
        order.forEach(key => {
            newMap[key] = map[key];
        });
    
        return newMap;
    }
    
    removeNode = (nodes, nodeName) => {
        return nodes.filter(node => node !== nodeName);
    }
    
    // Filter mountain borders to find those that are part of a substantial wall
    // Only borders with 3+ consecutive border tiles (horizontally or vertically) qualify
    // Returns only the middle tiles of wall segments (not endpoints)
    filterSubstantialMountainWalls = (borders) => {
        // Create a map of border positions for quick lookup
        const borderMap = new Set(borders.map(b => `${b.x},${b.y}`));
        
        return borders.filter(border => {
            const { x, y } = border;
            
            // Check horizontal line (left and right)
            let leftCount = 0;
            let rightCount = 0;
            
            // Count consecutive borders to the left
            let checkX = x - 1;
            while (borderMap.has(`${checkX},${y}`)) {
                leftCount++;
                checkX--;
            }
            
            // Count consecutive borders to the right
            checkX = x + 1;
            while (borderMap.has(`${checkX},${y}`)) {
                rightCount++;
                checkX++;
            }
            
            let horizontalTotal = leftCount + 1 + rightCount; // Include this tile
            let isHorizontalMiddle = horizontalTotal >= 3 && leftCount > 0 && rightCount > 0;
            
            // Check vertical line (up and down)
            let upCount = 0;
            let downCount = 0;
            
            // Count consecutive borders upward
            let checkY = y - 1;
            while (borderMap.has(`${x},${checkY}`)) {
                upCount++;
                checkY--;
            }
            
            // Count consecutive borders downward
            checkY = y + 1;
            while (borderMap.has(`${x},${checkY}`)) {
                downCount++;
                checkY++;
            }
            
            let verticalTotal = upCount + 1 + downCount; // Include this tile
            let isVerticalMiddle = verticalTotal >= 3 && upCount > 0 && downCount > 0;
            
            // Must be in the middle of a wall of at least 3 consecutive borders
            return isHorizontalMiddle || isVerticalMiddle;
        });
    }
    
    generateTemplate = (continents) => {
        let template = {...vanillaTemplate};
        continents.forEach(({isolationZones, connections, terrain, mountainBorders, mountainRanges}, continentIndex) => {
            // Skip Death Mountain and Maze Island for now
            if (continentIndex === 1 || continentIndex === 3) {
                return;
            }
    
            let continentNodes = Object.keys(template).filter(nodeName => template[nodeName].continent === continentIndex);
    
            // Normalize zone sizes - ensure every island gets at least one node
            let nodesPerZone = [];
            let totalSize = isolationZones.reduce((acc, isolationZone) => {
                return acc + isolationZone.length;
            }, 0);
            isolationZones.forEach((isolationZone, zoneIndex) => {
                nodesPerZone[zoneIndex] = Math.round(isolationZone.length / totalSize * continentNodes.length);
            });
    
            let biggest = 0;
            let totalAssigned = 0;
            nodesPerZone.forEach((nodeCount, index) => {
                if (nodeCount < 1) {
                    nodesPerZone[index] = 1; // Ensure every island gets at least 1 node
                }
                if (nodesPerZone[biggest] < nodesPerZone[index]) {
                    biggest = index;
                }
                totalAssigned += nodesPerZone[index];
            });
            
            // Distribute remaining nodes to the biggest zone
            let remainingNodes = continentNodes.length - totalAssigned;
            if (remainingNodes > 0) {
                nodesPerZone[biggest] += remainingNodes;
            }
    
            console.log("NODES PER ZONE: " + JSON.stringify(nodesPerZone));
            console.log(`Total nodes to distribute: ${continentNodes.length}, Total zones: ${isolationZones.length}`);

            // Use mountain ranges from continent data (calculated during terrain generation)
            console.log(`CAVE PLACEMENT: Processing ${mountainRanges?.length || 0} mountain ranges for cave placement`);
            
            // Simple approach: Place one cave node in every mountain range
            let mountainRangeNodes = [];
            
            mountainRanges?.forEach((range, index) => {
                if (range.length > 0) {
                    // Filter to only substantial mountain walls (3+ consecutive borders)
                    let substantialWalls = this.filterSubstantialMountainWalls(range);
                    
                    if (substantialWalls.length > 0) {
                        let randomBorder = this.chooseRandomNode(substantialWalls);
                        mountainRangeNodes.push({
                            x: randomBorder.x,
                            y: randomBorder.y,
                            hardIsolationZone: randomBorder.isolationZones?.[0],
                            isCave: true,
                            mountainRange: index
                        });
                        console.log(`  Range ${index}: 🏔️ Cave node selected at (${randomBorder.x}, ${randomBorder.y}) from ${substantialWalls.length}/${range.length} candidates`);
                    } else {
                        // Fallback to any border if no substantial walls found
                        let randomBorder = this.chooseRandomNode(range);
                        mountainRangeNodes.push({
                            x: randomBorder.x,
                            y: randomBorder.y,
                            hardIsolationZone: randomBorder.isolationZones?.[0],
                            isCave: true,
                            mountainRange: index
                        });
                        console.log(`  Range ${index}: 🏔️ Cave node fallback at (${randomBorder.x}, ${randomBorder.y}) - no substantial walls`);
                    }
                }
            });
            
            console.log(`🏔️ CAVE DISTRIBUTION SUMMARY: ${mountainRangeNodes.length} cave nodes placed in ${mountainRanges?.length || 0} mountain ranges (100% coverage)`);

            // Randomly place nodes among the isolation zones based on their size, connecting nodes within each zone.
            let firstLocations = {};
            
            isolationZones.forEach((isolationZone) => {
                let softIsolationZone = isolationZone[0].isolationZone;
                let normalizedZoneIndex = isolationZone[0].normalizedIsolationZone;
                let numberOfNodesToPlace = nodesPerZone[normalizedZoneIndex];

                for (let i = 0; i < numberOfNodesToPlace && isolationZone.length > 0 && continentNodes.length > 0; i++) {
                    let randomContinentNode = this.chooseRandomNode(continentNodes);
                    let placement;
                    
                    // Check if we have a mountain range node that should be placed in this zone
                    let mountainNodeForThisZone = mountainRangeNodes.find(node => 
                        node.hardIsolationZone === softIsolationZone && !node.used
                    );
                    
                    if (mountainNodeForThisZone) {
                        placement = mountainNodeForThisZone;
                        mountainNodeForThisZone.used = true; // Mark as used
                        console.log(`Placing mountain cave node ${randomContinentNode} at (${placement.x}, ${placement.y}) in zone ${softIsolationZone}`);
                    } else {
                        // Regular node placement
                        placement = this.findAccessibleNodePlacement(isolationZone, terrain, mountainBorders);
                        if (!placement) {
                            console.warn(`No accessible placement found for node ${randomContinentNode} in zone ${softIsolationZone}`);
                            break;
                        }
                    }
                    
                    let {x, y, hardIsolationZone, isCave} = placement;

                    // Remove nodes
                    continentNodes = this.removeNode(continentNodes, randomContinentNode);
                    isolationZone = isolationZone.filter(({x: x1, y: y1}) => x !== x1 && y !== y1);

                    // Initialize connections and requirements
                    template[randomContinentNode].connections = [];
                    template[randomContinentNode].connectionRequirements = {};

                    if (!randomContinentNode) {
                        continue;
                    }

                    // If first location, set.  Otherwise, connect to first location.
                    if (!firstLocations[softIsolationZone]) {
                        firstLocations[softIsolationZone] = randomContinentNode;
                    } else {
                        template[firstLocations[softIsolationZone]].connections.push(randomContinentNode);
                    }

                    // Update the x and y, and set cave type if needed
                    let nodeData = {
                        ...template[randomContinentNode],
                        softIsolationZone,
                        isolationGroup: hardIsolationZone || softIsolationZone,
                        x,
                        y,
                        isCave,  // Preserve the isCave flag for randomizer prioritization
                        renderData: {
                            area: continentIndex === 0 ? 0 : 1,
                            subArea: 0
                        }
                    };
                    
                    // Debug: Log when we set isCave=true
                    if (isCave) {
                        console.log(`🏔️ Template Generation: Setting ${randomContinentNode} isCave=true at (${x}, ${y})`);
                    }
                    
                    // Mark as cave if placed on mountain border
                    if (isCave && template[randomContinentNode].type !== "CAVE") {
                        console.log(`Converting ${randomContinentNode} to CAVE type for mountain placement`);
                        nodeData.type = "CAVE";
                    }
                    
                    template[randomContinentNode] = this.reorderMapKeys(nodeData, ["locationKey", "type", "x", "y", "isolationGroup", "softIsolationZone", "continent", "continentName", "connections", "connectionRequirements", "renderData", "isCave"]);
                }
            });
            
            // Place any remaining unused mountain range nodes
            mountainRangeNodes.filter(node => !node.used).forEach(mountainNode => {
                if (continentNodes.length > 0) {
                    let randomContinentNode = this.chooseRandomNode(continentNodes);
                    
                    template[randomContinentNode].x = mountainNode.x;
                    template[randomContinentNode].y = mountainNode.y;
                    template[randomContinentNode].isolationGroup = mountainNode.hardIsolationZone;
                    template[randomContinentNode].type = "CAVE";
                    
                    console.log(`Placing remaining mountain cave node ${randomContinentNode} at (${mountainNode.x}, ${mountainNode.y})`);
                    
                    // Remove node from pool
                    let index = continentNodes.indexOf(randomContinentNode);
                    if (index > -1) {
                        continentNodes.splice(index, 1);
                    }
                }
            });

            console.log(`CAVE PLACEMENT COMPLETE: ${mountainRangeNodes.length} total cave positions prepared on continent ${continentIndex}`);

            // Generate limited connections between isolation zones using connections data.  Only one node needs to be connected between zones.
            console.log("FIRST LOCATIONS: " + JSON.stringify(firstLocations, null, 5));
            connections.forEach(({to, from, blockers}) => {
                let fromLocation = firstLocations[from];
                let toLocation = firstLocations[to];
    
                // If the from or the to doesn't exist, it means it was filled in already.
                if (!fromLocation || !toLocation) {
                    return;
                }
    
                let requirements = blockers.map(blocker => REMEDY_MAP[blocker]).join("|");
                template[fromLocation].connections.push(toLocation);
                template[fromLocation].connectionRequirements[toLocation] = [requirements];
            });
        });
    
        // Debug: Dump template with isCave information
        console.log("🏗️ TEMPLATE DUMP - Cave Node Analysis:");
        Object.keys(template).forEach(nodeKey => {
            const node = template[nodeKey];
            if (node.isCave) {
                console.log(`  ✅ ${nodeKey}: isCave=true, type=${node.type}, location=(${node.x}, ${node.y})`);
            }
        });
        
        const totalNodes = Object.keys(template).length;
        const caveNodes = Object.keys(template).filter(key => template[key].isCave).length;
        console.log(`📊 Template Summary: ${totalNodes} total nodes, ${caveNodes} marked as isCave=true`);
    
        return template;
    }

    // Find an accessible placement for a node within an isolation zone
    findAccessibleNodePlacement = (isolationZone, terrain, mountainBorders = []) => {
        // Filter to only accessible terrain types (exclude mountains, water, etc.)
        let accessibleCells = isolationZone.filter(({x, y}) => {
            if (!terrain || y - 30 < 0 || y - 30 >= terrain.length || x < 0 || x >= terrain[0].length) {
                return false;
            }
            
            let terrainType = terrain[y - 30][x].getType();
            return this.isAccessibleTerrain(terrainType);
        });
        
        // If we have accessible terrain, use it
        if (accessibleCells.length > 0) {
            return {
                ...this.chooseRandomNode(accessibleCells),
                isCave: false
            };
        }
        
        // No accessible terrain found - use pre-identified mountain borders for caves
        // Filter mountain borders to those within this isolation zone
        let zoneMountainBorders = mountainBorders.filter(mountainBorder => {
            return isolationZone.some(({x, y}) => 
                x === mountainBorder.x && y === mountainBorder.y
            );
        });
        
        if (zoneMountainBorders.length > 0) {
            console.log(`Using mountain border for cave placement: ${zoneMountainBorders.length} borders available`);
            return {
                ...this.chooseRandomNode(zoneMountainBorders),
                hardIsolationZone: zoneMountainBorders[0].isolationZones?.[0], // Use first isolation zone from borders
                isCave: true
            };
        }
        
        console.warn("No accessible or mountain border placement found in isolation zone");
        return null;
    };

    // Check if terrain type is accessible for normal node placement
    isAccessibleTerrain = (terrainType) => {
        return terrainType === GRASS || 
               terrainType === DESERT || 
               terrainType === FOREST || 
               terrainType === SWAMP || 
               terrainType === CEMETARY;
               // Note: Removed BRIDGE - nodes should not be placed on bridges
    };

    // Check if a mountain position is adjacent to accessible terrain (for cave placement)
    isAdjacentToAccessibleTerrain = (x, y, terrain) => {
        const directions = [
            {dx: 0, dy: -1}, // North
            {dx: 1, dy: 0},  // East
            {dx: 0, dy: 1},  // South
            {dx: -1, dy: 0}  // West
        ];
        
        for (let {dx, dy} of directions) {
            let newX = x + dx;
            let newY = y + dy;
            
            if (newX >= 0 && newX < terrain[0].length && 
                newY >= 0 && newY < terrain.length) {
                let neighborType = terrain[newY][newX].getType();
                if (this.isAccessibleTerrain(neighborType)) {
                    return true;
                }
            }
        }
        
        return false;
    };

    generateIslandContinent = (width, height, numIslands = 18) => {
        // Start with all water
        let terrain = this.createEmptyMatrix(width, height);
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                terrain[i][j] = new Cell(WATER);
            }
        }

        // Generate island seeds with volcanic mountain origins
        let islandSeeds = [];
        for (let i = 0; i < numIslands; i++) {
            let attempts = 0;
            let x, y;
            let validPlacement = false;
            
            // Find valid placement with moderate minimum distance
            while (!validPlacement && attempts < 100) {
                x = Math.floor(this.randomNumberGenerator() * (width - 12)) + 6;
                y = Math.floor(this.randomNumberGenerator() * (height - 12)) + 6;
                
                validPlacement = true;
                for (let seed of islandSeeds) {
                    let distance = Math.sqrt((x - seed.x) ** 2 + (y - seed.y) ** 2);
                    if (distance < 8) { // Slightly closer for more organic clustering
                        validPlacement = false;
                        break;
                    }
                }
                attempts++;
            }
            
            if (validPlacement) {
                // Create varied island sizes with more substantial land mass
                let baseSize = 3 + Math.floor(this.randomNumberGenerator() * 5); // 3-7 radius (larger)
                let elongation = 0.6 + this.randomNumberGenerator() * 0.8; // 0.6-1.4 aspect ratio
                let rotation = this.randomNumberGenerator() * Math.PI * 2; // Random rotation
                let biome = this.chooseRandomNode(["volcanic", "tropical", "temperate", "arid", "wetland"]);
                islandSeeds.push({x, y, baseSize, elongation, rotation, biome});
            }
        }

        // Grow islands from mountain seeds using organic growth patterns
        islandSeeds.forEach(({x, y, baseSize, elongation, rotation, biome}) => {
            // Start with volcanic mountain core
            terrain[y][x] = new Cell(MOUNTAIN);
            
            // Create organic island shape using multiple growth passes
            let growthRadius = 1;
            let maxRadius = baseSize + Math.floor(this.randomNumberGenerator() * 4); // Slightly larger max
            
            while (growthRadius <= maxRadius) {
                for (let dy = -growthRadius; dy <= growthRadius; dy++) {
                    for (let dx = -growthRadius; dx <= growthRadius; dx++) {
                        // Apply rotation and elongation for organic shapes
                        let rotatedX = dx * Math.cos(rotation) - dy * Math.sin(rotation);
                        let rotatedY = dx * Math.sin(rotation) + dy * Math.cos(rotation);
                        let stretchedDistance = Math.sqrt((rotatedX * elongation) ** 2 + rotatedY ** 2);
                        
                        // More generous growth probability for denser islands
                        let growthProbability = 1.0 - (stretchedDistance / maxRadius);
                        growthProbability *= (0.75 + this.randomNumberGenerator() * 0.5); // 0.75-1.25 range
                        
                        if (stretchedDistance <= growthRadius && 
                            this.randomNumberGenerator() < growthProbability &&
                            x + dx >= 0 && x + dx < width && 
                            y + dy >= 0 && y + dy < height &&
                            terrain[y + dy][x + dx].getType() === WATER) {
                            
                            // Place terrain based on distance from center and biome
                            let terrainType = this.selectIslandTerrain(stretchedDistance, maxRadius, biome);
                            terrain[y + dy][x + dx] = new Cell(terrainType);
                        }
                    }
                }
                growthRadius++;
            }
        });

        // Apply organic cellular automata to enhance natural coastlines and terrain distribution
        for (let pass = 0; pass < 4; pass++) {
            let workingTerrain = this.createEmptyMatrix(width, height);
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    let landNeighbors = 0;
                    let waterNeighbors = 0;
                    let mountainNeighbors = 0;
                    let currentType = terrain[i][j].getType();

                    // Count neighbors in 3x3 grid
                    for (let m = i - 1; m <= i + 1; m++) {
                        for (let l = j - 1; l <= j + 1; l++) {
                            if (m >= 0 && l >= 0 && l < width && m < height) {
                                let neighborType = terrain[m][l].getType();
                                if (neighborType === WATER) {
                                    waterNeighbors++;
                                } else if (neighborType === MOUNTAIN) {
                                    mountainNeighbors++;
                                } else {
                                    landNeighbors++;
                                }
                            }
                        }
                    }

                    // Natural erosion and deposition rules (more generous for land growth)
                    if (currentType === WATER) {
                        // Water can become land with moderate land influence
                        if (landNeighbors >= 5) { // Reduced from 6 to 5
                            workingTerrain[i][j] = new Cell(GRASS); // Beach formation
                        } else {
                            workingTerrain[i][j] = new Cell(WATER);
                        }
                    } else if (currentType === MOUNTAIN) {
                        // Mountains are stable but can erode slightly
                        if (waterNeighbors >= 7) {
                            workingTerrain[i][j] = new Cell(GRASS); // Coastal erosion
                        } else {
                            workingTerrain[i][j] = new Cell(MOUNTAIN);
                        }
                    } else {
                        // Land terrain - slightly more resistant to erosion
                        if (waterNeighbors >= 7) { // Increased from 6 to 7
                            workingTerrain[i][j] = new Cell(WATER); // Coastal erosion
                        } else if (mountainNeighbors >= 3 && this.randomNumberGenerator() < 0.3) {
                            workingTerrain[i][j] = new Cell(MOUNTAIN); // Mountain spreading
                        } else {
                            workingTerrain[i][j] = new Cell(currentType); // Keep current terrain
                        }
                    }
                }
            }
            terrain = workingTerrain;
        }

        // Remove tiny islands (similar to filling small isolation zones)
        let tempIsolationZones = this.findIsolationZones([WATER], terrain);
        let minIslandSize = 12; // Minimum island size - increased from 8
        
        tempIsolationZones.filter(island => island.length < minIslandSize).forEach((tinyIsland) => {
            console.log(`Removing tiny island of size ${tinyIsland.length}`);
            tinyIsland.forEach(({ x, y }) => {
                let terrainY = y - 30;
                if (terrainY >= 0 && terrainY < terrain.length && x >= 0 && x < terrain[0].length) {
                    terrain[terrainY][x].setType(WATER);
                }
            });
        });

        // Add biodiversity pass - scatter various terrain types for realism
        this.addIslandBiodiversity(terrain, width, height);

        // Detect isolation zones (each island should be its own zone)
        // For islands, mountains should also be barriers for normal node placement
        let isolationZones = this.findIsolationZones([WATER, MOUNTAIN], terrain);
        this.findIsolationZones([WATER, MOUNTAIN], terrain, true); // Hard barriers include mountains

        // Filter out tiny islands and single-mountain islands BEFORE bridge placement
        // For islands, use a smaller minimum size to keep interesting small islands
        let minIslandZoneSize = 8; // Smaller minimum for islands (was 20)
        isolationZones = isolationZones.filter(island => {
            // Must have minimum size
            if (island.length < minIslandZoneSize) {
                console.log(`Filtering out tiny island zone of size ${island.length}`);
                return false;
            }
            
            // Check if island has any accessible terrain (not just mountains)
            let hasAccessibleTerrain = island.some(({x, y}) => {
                if (y - 30 < 0 || y - 30 >= terrain.length || x < 0 || x >= terrain[0].length) {
                    return false;
                }
                let terrainType = terrain[y - 30][x].getType();
                return this.isAccessibleTerrain(terrainType);
            });
            
            if (!hasAccessibleTerrain) {
                console.log(`Filtering out mountain-only island zone of size ${island.length}`);
                return false;
            }
            
            return true;
        });

        console.log(`Filtered down to ${isolationZones.length} viable islands for bridge placement`);

        // Place Manhattan-style bridges between some islands
        let bridgeData = this.placeManhattanBridges(terrain, isolationZones);

        // Re-detect isolation zones after bridge placement (bridges create bigger zones)
        isolationZones = this.findIsolationZones([WATER, MOUNTAIN], terrain);
        isolationZones = isolationZones.filter(isolationZone => isolationZone.length >= ISOLATION_ZONE_MIN_SIZE);

        // Detect mountains that can have caves placed in them AFTER bridge placement
        let mountainBorders = this.findBorders([MOUNTAIN], [WATER, BRIDGE], terrain);

        // Remove tiny islands again after bridge placement (bridges might create new tiny islands)
        let postBridgeIsolationZones = this.findIsolationZones([WATER], terrain);
        let minUsableIslandSize = 12; // Increase minimum size for usable islands
        
        postBridgeIsolationZones.filter(island => island.length < minUsableIslandSize).forEach((tinyIsland) => {
            console.log(`Removing tiny post-bridge island of size ${tinyIsland.length}`);
            tinyIsland.forEach(({ x, y }) => {
                let terrainY = y - 30;
                if (terrainY >= 0 && terrainY < terrain.length && x >= 0 && x < terrain[0].length) {
                    terrain[terrainY][x].setType(WATER);
                }
            });
        });

        // Remove tiny islands (less than minimum size) - final cleanup
        let undersizedIsolationZones = [];
        isolationZones.filter(isolationZone => isolationZone.length < ISOLATION_ZONE_MIN_SIZE).forEach((isolationZone) => {
            let { isolationZone: isolationZoneNumber } = isolationZone[0];
            undersizedIsolationZones.push(isolationZoneNumber);
            isolationZone.forEach(({ x, y }) => {
                terrain[y - 30][x].setType(WATER);
                terrain[y - 30][x].setLocation(x, y);
                terrain[y - 30][x].setIsolationZone(undefined);
                terrain[y - 30][x].setHardIsolationZone(undefined);
            });
        });

        // Re-detect isolation zones after bridge placement and cleanup  
        isolationZones = this.findIsolationZones([WATER, MOUNTAIN], terrain);
        // Use same smaller minimum size for post-bridge filtering
        isolationZones = isolationZones.filter(isolationZone => isolationZone.length >= 8);

        // Normalize isolation zone numbers
        isolationZones.forEach(((isolationZone, index) => {
            isolationZones[index] = isolationZone.map(block => {
                return {
                    ...block,
                    normalizedIsolationZone: index
                }
            })
        }));

        // For islands, we'll use Manhattan distance for bridge connections
        // let connections = this.generateManhattanBridgeConnections(isolationZones, terrain);

        // Find connections
        let connections = {};
        isolationZones.forEach((isolationZone) => {
            let { x, y, isolationZone: index } = isolationZone[0];
            this.findSoftConnections(index, x, y - 30, terrain, [MOUNTAIN], [WATER], connections);
        });
    
        // Clean up connections
        let toDelete = [];
        Object.keys(connections).forEach(key => {
            let {to, from} = connections[key];
    
            // If to delete already contains this entry, don't delete it's counterpart
            if (toDelete.includes(key)) {
                return;
            }
    
            toDelete.push(`${to}:${from}`);
        });
        toDelete.forEach((keyToDelete) => {
            delete connections[keyToDelete];
        })
    
        // Turn object into an array
        connections = Object.values(connections);

        // Flatten the map
        let mapBlocks = terrain.flat().map(({ type }) => type);

        return {mapBlocks, terrain, isolationZones, mountainBorders, mountainRanges: this.groupMountainRanges(mountainBorders, terrain), connections, bridgeData};
    };

    // Group mountain borders into mountain ranges using flood-fill for accurate range detection
    groupMountainRanges = (mountainBorders, terrain) => {
        if (!terrain || !mountainBorders) {
            console.log("Missing terrain or mountain borders for range grouping");
            return [];
        }

        // First, identify all contiguous mountain ranges using flood-fill
        let mountainRanges = [];
        let visited = new Set();
        
        // Convert terrain to a simple lookup for mountain cells
        let mountainCells = new Set();
        for (let y = 0; y < terrain.length; y++) {
            for (let x = 0; x < terrain[0].length; x++) {
                if (terrain[y][x].getType() === MOUNTAIN) {
                    mountainCells.add(`${x},${y + 30}`); // Adjust for coordinate offset
                }
            }
        }
        
        console.log(`Detecting mountain ranges from ${mountainCells.size} mountain cells`);
        
        // Flood-fill to find contiguous mountain ranges
        mountainCells.forEach(cellKey => {
            if (visited.has(cellKey)) return;
            
            let [x, y] = cellKey.split(',').map(Number);
            let range = [];
            let queue = [{x, y}];
            visited.add(cellKey);
            
            // Flood-fill this mountain range
            while (queue.length > 0) {
                let current = queue.shift();
                range.push(current);
                
                // Check 4-directional neighbors (only orthogonal, not diagonal)
                let neighbors = [
                    {x: current.x - 1, y: current.y},
                    {x: current.x + 1, y: current.y},
                    {x: current.x, y: current.y - 1},
                    {x: current.x, y: current.y + 1}
                ];
                
                neighbors.forEach(neighbor => {
                    let neighborKey = `${neighbor.x},${neighbor.y}`;
                    if (!visited.has(neighborKey) && mountainCells.has(neighborKey)) {
                        visited.add(neighborKey);
                        queue.push(neighbor);
                    }
                });
            }
            
            if (range.length > 0) {
                mountainRanges.push(range);
            }
        });
        
        console.log(`Found ${mountainRanges.length} contiguous mountain ranges`);
        mountainRanges.forEach((range, index) => {
            console.log(`  Mountain Range ${index}: ${range.length} mountain cells`);
        });
        
        // Now assign mountain borders to their respective ranges
        let rangesWithBorders = [];
        mountainRanges.forEach((range, rangeIndex) => {
            let rangeBorders = [];
            let rangePositions = new Set(range.map(pos => `${pos.x},${pos.y}`));
            
            mountainBorders.forEach(border => {
                let borderKey = `${border.x},${border.y}`;
                if (rangePositions.has(borderKey)) {
                    rangeBorders.push(border);
                }
            });
            
            if (rangeBorders.length > 0) {
                rangesWithBorders.push(rangeBorders);
                console.log(`  Range ${rangeIndex}: ${rangeBorders.length} usable borders from ${range.length} mountain cells`);
            }
        });
        
        // Sort ranges by border count (most borders first for better cave distribution)
        rangesWithBorders.sort((a, b) => b.length - a.length);
        
        console.log(`Final result: ${rangesWithBorders.length} mountain ranges with borders`);
        return rangesWithBorders;
    };

    // Select terrain type based on distance from center and biome
    selectIslandTerrain = (distance, maxRadius, biome) => {
        let centerRatio = distance / maxRadius;
        
        // Small volcanic core - mountains only in very center (reduced mountain area)
        if (centerRatio < 0.15) { // Reduced from 0.3 to 0.15 for smaller mountain cores
            return MOUNTAIN;
        }
        
        // Biome-specific terrain selection - ensure more accessible terrain
        switch (biome) {
            case "volcanic":
                if (centerRatio < 0.35) return MOUNTAIN; // Reduced mountain area
                if (centerRatio < 0.6) return DESERT; // Ash fields
                return GRASS; // Outer fertile areas
                
            case "tropical":
                if (centerRatio < 0.25) return MOUNTAIN; // Small mountain core
                if (centerRatio < 0.6) return FOREST;
                if (this.randomNumberGenerator() < 0.3) return SWAMP; // Coastal marshes
                return GRASS;
                
            case "temperate":
                if (centerRatio < 0.2) return MOUNTAIN; // Small mountain core
                if (this.randomNumberGenerator() < 0.4) return FOREST;
                if (this.randomNumberGenerator() < 0.2) return SWAMP;
                return GRASS;
                
            case "arid":
                if (centerRatio < 0.25) return MOUNTAIN; // Small mountain core
                if (this.randomNumberGenerator() < 0.7) return DESERT; // Reduced desert probability
                return GRASS;
                
            case "wetland":
                if (centerRatio < 0.2) return MOUNTAIN; // Small mountain core
                if (this.randomNumberGenerator() < 0.5) return SWAMP;
                if (this.randomNumberGenerator() < 0.3) return FOREST;
                return GRASS;
                
            default:
                if (centerRatio < 0.2) return MOUNTAIN; // Small mountain core
                return GRASS;
        }
    };

    // Add biodiversity across islands for more realism
    addIslandBiodiversity = (terrain, width, height) => {
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                let currentType = terrain[i][j].getType();
                
                // Skip water and bridges
                if (currentType === WATER || currentType === BRIDGE) continue;
                
                // Add random terrain variations for biodiversity
                let rand = this.randomNumberGenerator();
                
                // Graveyard placement for "lived-in" feel (rare but scattered)
                if (rand < 0.02 && currentType !== MOUNTAIN) {
                    terrain[i][j].setType(CEMETARY);
                    continue;
                }
                
                // Terrain transitions based on neighbors
                let forestNeighbors = 0;
                let swampNeighbors = 0;
                let mountainNeighbors = 0;
                let desertNeighbors = 0;
                
                // Count terrain type neighbors
                for (let m = i - 1; m <= i + 1; m++) {
                    for (let l = j - 1; l <= j + 1; l++) {
                        if (m >= 0 && l >= 0 && l < width && m < height && !(m === i && l === j)) {
                            let neighborType = terrain[m][l].getType();
                            if (neighborType === FOREST) forestNeighbors++;
                            else if (neighborType === SWAMP) swampNeighbors++;
                            else if (neighborType === MOUNTAIN) mountainNeighbors++;
                            else if (neighborType === DESERT) desertNeighbors++;
                        }
                    }
                }
                
                // Natural terrain spreading
                if (currentType === GRASS) {
                    if (forestNeighbors >= 3 && rand < 0.4) {
                        terrain[i][j].setType(FOREST);
                    } else if (swampNeighbors >= 2 && rand < 0.3) {
                        terrain[i][j].setType(SWAMP);
                    } else if (desertNeighbors >= 3 && rand < 0.3) {
                        terrain[i][j].setType(DESERT);
                    } else if (mountainNeighbors >= 2 && rand < 0.1) {
                        terrain[i][j].setType(MOUNTAIN); // Mountain foothills
                    }
                } else if (currentType === FOREST) {
                    // Forest can occasionally become swamp (wet forest)
                    if (swampNeighbors >= 2 && rand < 0.2) {
                        terrain[i][j].setType(SWAMP);
                    }
                } else if (currentType === DESERT) {
                    // Desert edges can become grass
                    if (forestNeighbors + swampNeighbors >= 3 && rand < 0.2) {
                        terrain[i][j].setType(GRASS);
                    }
                }
            }
        }
    };

    applyIslandBiomes = (terrain, isolationZones, islandSeeds) => {
        // For each island (isolation zone), determine its dominant biome
        isolationZones.forEach((zone) => {
            // Find the closest island seed to determine biome
            let islandCenter = this.getZoneCenter(zone);
            let closestSeed = null;
            let closestDistance = Infinity;

            islandSeeds.forEach(seed => {
                let distance = Math.sqrt((islandCenter.x - seed.x) ** 2 + (islandCenter.y - seed.y) ** 2);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestSeed = seed;
                }
            });

            if (closestSeed) {
                this.applyBiomeToZone(terrain, zone, closestSeed.biome);
            }
        });
    };

    getZoneCenter = (zone) => {
        let sumX = 0, sumY = 0;
        zone.forEach(cell => {
            sumX += cell.x;
            sumY += cell.y - 30; // Adjust for coordinate offset
        });
        return {
            x: Math.round(sumX / zone.length),
            y: Math.round(sumY / zone.length)
        };
    };

    applyBiomeToZone = (terrain, zone, biomeType) => {
        // Convert zone coordinates to terrain coordinates and apply biome
        zone.forEach(({ x, y }) => {
            let terrainY = y - 30;
            if (terrainY >= 0 && terrainY < terrain.length && x >= 0 && x < terrain[0].length) {
                switch (biomeType) {
                    case "desert":
                        if (this.randomNumberGenerator() < 0.8) {
                            terrain[terrainY][x].setType(DESERT);
                        }
                        break;
                    case "forest":
                        if (this.randomNumberGenerator() < 0.7) {
                            terrain[terrainY][x].setType(FOREST);
                        }
                        break;
                    case "swamp":
                        if (this.randomNumberGenerator() < 0.6) {
                            terrain[terrainY][x].setType(SWAMP);
                        }
                        break;
                    case "grassland":
                    default:
                        // Keep as grass, maybe add some variety
                        if (this.randomNumberGenerator() < 0.2) {
                            terrain[terrainY][x].setType(FOREST);
                        }
                        break;
                }
            }
        });
    };

    placeManhattanBridges = (terrain, isolationZones) => {
        // Calculate island centers
        let islandCenters = isolationZones.map((zone, index) => {
            let center = this.getZoneCenter(zone);
            return {
                index,
                x: center.x,
                y: center.y,
                zone: zone[0].isolationZone
            };
        });

        let bridgeData = [];
        let connectedPairs = new Set(); // Track which island pairs are already connected
        
        // Place bridges between islands using Manhattan routing - be more aggressive
        let bridgeCount = Math.min(islandCenters.length, 8); // Build up to 8 bridges
        
        // Sort islands by distance and connect nearest neighbors
        for (let i = 0; i < islandCenters.length; i++) {
            let island1 = islandCenters[i];
            let nearestIslands = islandCenters
                .filter((island, idx) => idx !== i)
                .map(island => ({
                    ...island,
                    distance: Math.abs(island1.x - island.x) + Math.abs(island1.y - island.y)
                }))
                .sort((a, b) => a.distance - b.distance);
            
            // Connect to 1-2 nearest islands within range
            for (let j = 0; j < Math.min(2, nearestIslands.length); j++) {
                let island2 = nearestIslands[j];
                
                // Create unique pair identifier (smaller zone first to avoid duplicates)
                let pairId = island1.zone < island2.zone ? 
                    `${island1.zone}-${island2.zone}` : 
                    `${island2.zone}-${island1.zone}`;
                
                // Skip if this pair is already connected or if it's the same island
                if (connectedPairs.has(pairId) || island1.zone === island2.zone) {
                    continue;
                }
                
                if (island2.distance <= 30 && bridgeData.length < bridgeCount) {
                    let bridgeBuilt = this.buildManhattanBridge(terrain, island1, island2);
                    if (bridgeBuilt) {
                        bridgeData.push({
                            from: island1,
                            to: island2,
                            distance: island2.distance,
                            type: "manhattan"
                        });
                        
                        // Mark this pair as connected
                        connectedPairs.add(pairId);
                        console.log(`Connected islands ${island1.zone} and ${island2.zone} with bridge`);
                    }
                }
            }
        }

        console.log(`Placed ${bridgeData.length} bridges between islands (${connectedPairs.size} unique connections)`);
        return bridgeData;
    };

    buildManhattanBridge = (terrain, island1, island2) => {
        // Build bridge using Manhattan routing: horizontal first, then vertical
        let startX = island1.x;
        let startY = island1.y;
        let endX = island2.x;
        let endY = island2.y;

        // Find shore points on each island - pass isolation zone information
        let shore1 = this.findNearestShore(terrain, startX, startY, endX, endY, island1.zone, island2.zone);
        let shore2 = this.findNearestShore(terrain, endX, endY, startX, startY, island2.zone, island1.zone);

        if (!shore1 || !shore2) {
            console.log(`Could not find valid shore points for bridge between islands ${island1.zone} and ${island2.zone}`);
            return false; // Couldn't find valid shore points
        }

        // Verify shores are on different islands
        if (shore1.zone === shore2.zone) {
            console.log(`Warning: Both shores found on same island ${shore1.zone}, skipping bridge`);
            return false;
        }

        console.log(`Building bridge from island ${shore1.zone} shore (${shore1.x}, ${shore1.y}) to island ${shore2.zone} shore (${shore2.x}, ${shore2.y})`);
        
        let bridgeBuilt = false;
        let bridgeTiles = [];
        
        // Build horizontal segment first
        let currentX = shore1.x;
        let currentY = shore1.y;
        
        // Move horizontally toward target
        while (currentX !== shore2.x) {
            if (currentX < shore2.x) {
                currentX++;
            } else {
                currentX--;
            }
            
            if (currentX >= 0 && currentX < terrain[0].length && 
                currentY >= 0 && currentY < terrain.length &&
                terrain[currentY][currentX].getType() === WATER) {
                terrain[currentY][currentX].setType(BRIDGE);
                bridgeTiles.push({x: currentX, y: currentY});
                bridgeBuilt = true;
            }
        }
        
        // Move vertically toward target
        while (currentY !== shore2.y) {
            if (currentY < shore2.y) {
                currentY++;
            } else {
                currentY--;
            }
            
            if (currentX >= 0 && currentX < terrain[0].length && 
                currentY >= 0 && currentY < terrain.length &&
                terrain[currentY][currentX].getType() === WATER) {
                terrain[currentY][currentX].setType(BRIDGE);
                bridgeTiles.push({x: currentX, y: currentY});
                bridgeBuilt = true;
            }
        }
        
        // Only ensure shore connections if we built a bridge and need minimal connections
        if (bridgeBuilt && bridgeTiles.length > 0) {
            // Connect only if the bridge doesn't already touch the shores
            let shore1HasConnection = bridgeTiles.some(tile => 
                Math.abs(tile.x - shore1.x) <= 1 && Math.abs(tile.y - shore1.y) <= 1
            );
            let shore2HasConnection = bridgeTiles.some(tile => 
                Math.abs(tile.x - shore2.x) <= 1 && Math.abs(tile.y - shore2.y) <= 1
            );
            
            // Only add connection if bridge doesn't naturally connect to shore
            if (!shore1HasConnection) {
                let connected = this.ensureShoreConnection(terrain, shore1.x, shore1.y);
                if (!connected) {
                    console.log(`Warning: Could not connect bridge to shore1 at (${shore1.x}, ${shore1.y})`);
                }
            }
            if (!shore2HasConnection) {
                let connected = this.ensureShoreConnection(terrain, shore2.x, shore2.y);
                if (!connected) {
                    console.log(`Warning: Could not connect bridge to shore2 at (${shore2.x}, ${shore2.y})`);
                }
            }
        }
        
        return bridgeBuilt;
    };

    // Ensure bridge connects properly to shore by placing minimal bridge tiles adjacent to land
    ensureShoreConnection = (terrain, shoreX, shoreY) => {
        let connected = false;
        
        // Check only the 4 cardinal directions (not diagonal) to prevent spreading
        const directions = [
            {dx: 0, dy: -1}, // North
            {dx: 1, dy: 0},  // East
            {dx: 0, dy: 1},  // South
            {dx: -1, dy: 0}  // West
        ];
        
        // Only add ONE bridge tile in the most appropriate direction
        let bestDirection = null;
        let bestScore = -1;
        
        for (let {dx, dy} of directions) {
            let checkX = shoreX + dx;
            let checkY = shoreY + dy;
            
            if (checkX >= 0 && checkX < terrain[0].length && 
                checkY >= 0 && checkY < terrain.length) {
                
                let terrainType = terrain[checkY][checkX].getType();
                
                // If we find water adjacent to shore, score this direction
                if (terrainType === WATER) {
                    // Prefer directions that don't already have bridge neighbors
                    let bridgeNeighbors = 0;
                    for (let ndy = -1; ndy <= 1; ndy++) {
                        for (let ndx = -1; ndx <= 1; ndx++) {
                            let nx = checkX + ndx;
                            let ny = checkY + ndy;
                            if (nx >= 0 && nx < terrain[0].length && 
                                ny >= 0 && ny < terrain.length &&
                                terrain[ny][nx].getType() === BRIDGE) {
                                bridgeNeighbors++;
                            }
                        }
                    }
                    
                    let score = 10 - bridgeNeighbors; // Higher score for fewer bridge neighbors
                    if (score > bestScore) {
                        bestScore = score;
                        bestDirection = {x: checkX, y: checkY};
                    }
                }
            }
        }
        
        // Only place one bridge tile in the best direction
        if (bestDirection && bestScore > 0) {
            terrain[bestDirection.y][bestDirection.x].setType(BRIDGE);
            connected = true;
        }
        
        return connected;
    };

    findNearestShore = (terrain, islandX, islandY, targetX, targetY, sourceIslandZone, targetIslandZone) => {
        // Find the shore point closest to the target island, ensuring it's on the correct island
        let bestShore = null;
        let bestDistance = Infinity;
        
        // Search in a larger radius around the island center
        for (let dy = -15; dy <= 15; dy++) {
            for (let dx = -15; dx <= 15; dx++) {
                let x = islandX + dx;
                let y = islandY + dy;
                
                if (x >= 0 && x < terrain[0].length && y >= 0 && y < terrain.length) {
                    let terrainType = terrain[y][x].getType();
                    let cellIsolationZone = terrain[y][x].isolationZone;
                    
                    // CRITICAL: Only consider shore points that belong to the correct island
                    if (cellIsolationZone !== sourceIslandZone) {
                        continue; // Skip points not on the source island
                    }
                    
                    // Check if this is a shore point (land adjacent to water)
                    if (terrainType === GRASS || terrainType === FOREST || 
                        terrainType === DESERT || terrainType === SWAMP || 
                        terrainType === CEMETARY || terrainType === MOUNTAIN) {
                        
                        let hasWaterNeighbor = false;
                        let waterNeighborCount = 0;
                        
                        // Check all 8 directions for water
                        for (let ndy = -1; ndy <= 1; ndy++) {
                            for (let ndx = -1; ndx <= 1; ndx++) {
                                if (ndx === 0 && ndy === 0) continue; // Skip center
                                
                                let nx = x + ndx;
                                let ny = y + ndy;
                                if (nx >= 0 && nx < terrain[0].length && 
                                    ny >= 0 && ny < terrain.length &&
                                    terrain[ny][nx].getType() === WATER) {
                                    hasWaterNeighbor = true;
                                    waterNeighborCount++;
                                }
                            }
                        }
                        
                        // Prefer shores with more water neighbors (better connection points)
                        if (hasWaterNeighbor && waterNeighborCount >= 2) {
                            let distance = Math.abs(x - targetX) + Math.abs(y - targetY);
                            // Bonus for shores closer to the target direction
                            let directionBonus = waterNeighborCount * 0.5;
                            distance -= directionBonus;
                            
                            if (distance < bestDistance) {
                                bestDistance = distance;
                                bestShore = {x, y, zone: cellIsolationZone};
                            }
                        }
                    }
                }
            }
        }
        
        // If no ideal shore found, try again with relaxed criteria
        if (!bestShore) {
            for (let dy = -10; dy <= 10; dy++) {
                for (let dx = -10; dx <= 10; dx++) {
                    let x = islandX + dx;
                    let y = islandY + dy;
                    
                    if (x >= 0 && x < terrain[0].length && y >= 0 && y < terrain.length) {
                        let terrainType = terrain[y][x].getType();
                        let cellIsolationZone = terrain[y][x].isolationZone;
                        
                        // CRITICAL: Only consider points on the correct island
                        if (cellIsolationZone !== sourceIslandZone) {
                            continue;
                        }
                        
                        if (terrainType !== WATER && terrainType !== BRIDGE) {
                            // Check for any water neighbor
                            for (let ndy = -1; ndy <= 1; ndy++) {
                                for (let ndx = -1; ndx <= 1; ndx++) {
                                    if (ndx === 0 && ndy === 0) continue;
                                    
                                    let nx = x + ndx;
                                    let ny = y + ndy;
                                    if (nx >= 0 && nx < terrain[0].length && 
                                        ny >= 0 && ny < terrain.length &&
                                        terrain[ny][nx].getType() === WATER) {
                                        
                                        let distance = Math.abs(x - targetX) + Math.abs(y - targetY);
                                        if (distance < bestDistance) {
                                            bestDistance = distance;
                                            bestShore = {x, y, zone: cellIsolationZone};
                                        }
                                        break;
                                    }
                                }
                                if (bestShore && Math.abs(x - islandX) + Math.abs(y - islandY) <= Math.abs(bestShore.x - islandX) + Math.abs(bestShore.y - islandY)) break;
                            }
                        }
                    }
                }
            }
        }
        
        return bestShore;
    };

    generateManhattanBridgeConnections = (isolationZones, terrain) => {
        let connections = [];
        let connectedPairs = new Set(); // Track unique connections
        
        // Calculate center points of each island
        let islandCenters = isolationZones.map((zone, index) => {
            let sumX = 0, sumY = 0;
            zone.forEach(cell => {
                sumX += cell.x;
                sumY += cell.y - 30; // Adjust for coordinate offset
            });
            return {
                index,
                x: Math.round(sumX / zone.length),
                y: Math.round(sumY / zone.length),
                zone: zone[0].isolationZone
            };
        });

        // Connect each island to its nearest neighbor using Manhattan distance
        // But only connect some islands to create interesting connectivity
        let connectedIslands = new Set();
        let connectionChances = 0.7; // 70% chance to create a connection

        for (let i = 0; i < islandCenters.length; i++) {
            if (this.randomNumberGenerator() > connectionChances && connectedIslands.size > 0) {
                continue; // Skip some connections for interesting topology
            }

            let currentIsland = islandCenters[i];
            let nearestDistance = Infinity;
            let nearestIsland = null;

            // Find nearest unconnected island
            for (let j = 0; j < islandCenters.length; j++) {
                if (i === j) continue;
                
                let otherIsland = islandCenters[j];
                
                // Create unique pair identifier
                let pairId = currentIsland.zone < otherIsland.zone ? 
                    `${currentIsland.zone}-${otherIsland.zone}` : 
                    `${otherIsland.zone}-${currentIsland.zone}`;
                
                // Skip if already connected
                if (connectedPairs.has(pairId)) continue;
                
                let manhattanDistance = Math.abs(currentIsland.x - otherIsland.x) + 
                                      Math.abs(currentIsland.y - otherIsland.y);
                
                if (manhattanDistance < nearestDistance) {
                    nearestDistance = manhattanDistance;
                    nearestIsland = otherIsland;
                }
            }

            if (nearestIsland && nearestDistance < 25) { // Max bridge distance
                // Create unique pair identifier
                let pairId = currentIsland.zone < nearestIsland.zone ? 
                    `${currentIsland.zone}-${nearestIsland.zone}` : 
                    `${nearestIsland.zone}-${currentIsland.zone}`;
                
                connections.push({
                    from: currentIsland.zone,
                    to: nearestIsland.zone,
                    blockers: [WATER], // Bridges cross water
                    distance: nearestDistance
                });
                connectedPairs.add(pairId);
                connectedIslands.add(currentIsland.zone);
                connectedIslands.add(nearestIsland.zone);
            }
        }

        // Ensure all islands are eventually connected by adding minimum spanning connections
        let unconnectedIslands = islandCenters.filter(island => !connectedIslands.has(island.zone));
        unconnectedIslands.forEach(island => {
            let nearestConnected = null;
            let nearestDistance = Infinity;
            
            islandCenters.filter(other => connectedIslands.has(other.zone)).forEach(connectedIsland => {
                // Create unique pair identifier
                let pairId = island.zone < connectedIsland.zone ? 
                    `${island.zone}-${connectedIsland.zone}` : 
                    `${connectedIsland.zone}-${island.zone}`;
                
                // Skip if already connected
                if (connectedPairs.has(pairId)) return;
                
                let distance = Math.abs(island.x - connectedIsland.x) + Math.abs(island.y - connectedIsland.y);
                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearestConnected = connectedIsland;
                }
            });

            if (nearestConnected) {
                // Create unique pair identifier
                let pairId = island.zone < nearestConnected.zone ? 
                    `${island.zone}-${nearestConnected.zone}` : 
                    `${nearestConnected.zone}-${island.zone}`;
                
                connections.push({
                    from: island.zone,
                    to: nearestConnected.zone,
                    blockers: [WATER],
                    distance: nearestDistance
                });
                connectedPairs.add(pairId);
                connectedIslands.add(island.zone);
            }
        });

        return connections;
    };

    generateContinents = (biomeType = "cellular") => {
        let westHyrule, eastHyrule;
        
        if (biomeType === "islands") {
            westHyrule = this.generateIslandContinent(64, 64);
            eastHyrule = this.generateIslandContinent(64, 64);
        } else {
            // Default cellular automata generation
            westHyrule = this.generateContinent(64, 64);
            eastHyrule = this.generateContinent(64, 64);
        }

        let maps = [...vanillaMap];
        maps[0] = westHyrule.mapBlocks;
        maps[2] = eastHyrule.mapBlocks;

        let continents = [];
        continents.push(westHyrule);
        continents.push({});
        continents.push(eastHyrule);
        continents.push({});

        let template = this.generateTemplate(continents);

        // Generate text dumps with node placement information
        westHyrule.textDump = this.generateTerrainTextDump(westHyrule.terrain, template, 0);
        eastHyrule.textDump = this.generateTerrainTextDump(eastHyrule.terrain, template, 2);

        return {maps, template, continents};
    }
}