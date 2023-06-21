import vanillaTemplate from '../zelda2/templates/z2-vanilla.template';
import vanillaMap from '../zelda2/templates/z2-vanilla.map';
import { randomSeed } from './util';

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
    
        if (isolationZone != terrain[y][x].isolationZone && terrain[y][x].isolationZone !== undefined) {
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
        let mapBlocks = terrain.flat().map(({ type }) => type);
    
        return {mapBlocks, terrain, isolationZones, mountainBorders, connections};
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
    
    generateTemplate = (continents) => {
        let template = {...vanillaTemplate};
        continents.forEach(({isolationZones, connections}, continentIndex) => {
            // Skip Death Mountain and Maze Island for now
            if (continentIndex === 1 || continentIndex === 3) {
                return;
            }
    
            let continentNodes = Object.keys(template).filter(nodeName => template[nodeName].continent === continentIndex);
    
            // Normalize zone sizes
            let nodesPerZone = [];
            let totalSize = isolationZones.reduce((acc, isolationZone) => {
                return acc + isolationZone.length;
            }, 0);
            isolationZones.forEach((isolationZone, zoneIndex) => {
                nodesPerZone[zoneIndex] = Math.round(isolationZone.length / totalSize * continentNodes.length);
            });
    
            let biggest = 0;
            let adjustment = 0;
            let total = 0;
            nodesPerZone.forEach((nodeCount, index) => {
                if (nodeCount < 2) {
                    adjustment += nodeCount - 2;
                    nodesPerZone[index] = 2;
                }
                if (nodesPerZone[biggest] < nodesPerZone[index]) {
                    biggest = index;
                }
                total++;
            });
            nodesPerZone[biggest] += adjustment + (continentNodes.length - total);
    
            console.log("NODES PER ZONE: " + JSON.stringify(nodesPerZone));
    
            // Randomly place nodes among the isolation zones based on their size, connecting nodes within each zone.
            let firstLocations = {};
            isolationZones.forEach((isolationZone) => {
                let softIsolationZone = isolationZone[0].isolationZone;
                let normalizedZoneIndex = isolationZone[0].normalizedIsolationZone;
                let numberOfNodesToPlace = nodesPerZone[normalizedZoneIndex];
    
                console.log("ISOLATION ZONE: " + softIsolationZone);
    
                for (let i = 0; i < numberOfNodesToPlace && isolationZone.length > 0 && continentNodes.length > 0; i++) {
                    let randomContinentNode = this.chooseRandomNode(continentNodes);
                    let {x, y, hardIsolationZone} = this.chooseRandomNode(isolationZone);
    
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
    
                    // Update the x and y
                    template[randomContinentNode] = this.reorderMapKeys({
                        ...template[randomContinentNode],
                        softIsolationZone,
                        isolationGroup: hardIsolationZone,
                        x,
                        y,
                        renderData: {
                            area: continentIndex === 0 ? 0 : 1,
                            subArea: 0
                        }
                    }, ["locationKey", "type", "x", "y", "isolationGroup", "softIsolationZone", "continent", "continentName", "connections", "connectionRequirements", "renderData"]);
                }
            });
    
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
    
        return template;
    }

    generateContinents = () => {
        let westHyrule = this.generateContinent(64, 64);
        let eastHyrule = this.generateContinent(64, 64);

        let maps = [...vanillaMap];
        maps[0] = westHyrule.mapBlocks;
        maps[2] = eastHyrule.mapBlocks;

        let continents = [];
        continents.push(westHyrule);
        continents.push({});
        continents.push(eastHyrule);
        continents.push({});

        let template = this.generateTemplate(continents);

        return {maps, template, continents};
    }
}