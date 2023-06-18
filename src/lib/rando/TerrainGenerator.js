const DESERT = 0x4;
const GRASS = 0x5;
const FOREST = 0x6;
const SWAMP = 0x7;
const CEMETARY = 0x8;
const MOUNTAIN = 0xb;
const WATER = 0xd;

const DESERT_RATE = 0.20;
const GRASS_RATE = 0.45;
const FOREST_RATE = 0.20;
const SWAMP_RATE = 0.25;
const CEMETARY_RATE = 0.25;
const WATER_RATE = 0.20;

const ISOLATION_ZONE_MIN_SIZE = 20;

class Cell {
    type;
    x;
    y;
    isolationZone;

    constructor(type) {
        this.type = type;
    }

    getType = () => {
        return this.type;
    };

    setType = (type) => {
        this.type = type;
    };

    setLocation = (x, y, isolationZone) => {
        this.x = x;
        this.y = y;
        this.isolationZone = isolationZone;
    }
}

const floodFill = (x, y, blockingTypes, terrain, visitedNodes, isolationZoneNumber, isolationZone = []) => {
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

    terrain[y][x].setLocation(x, y + 30, isolationZoneNumber);
    isolationZone.push(terrain[y][x]);

    floodFill(x + 1, y, blockingTypes, terrain, visitedNodes, isolationZoneNumber, isolationZone);
    floodFill(x - 1, y, blockingTypes, terrain, visitedNodes, isolationZoneNumber, isolationZone);
    floodFill(x, y + 1, blockingTypes, terrain, visitedNodes, isolationZoneNumber, isolationZone);
    floodFill(x, y - 1, blockingTypes, terrain, visitedNodes, isolationZoneNumber, isolationZone);

    return isolationZone;
}

const findSurroundingWallType = (x, y, blockingTypes, terrain, visitedNodes = []) => {
    console.log(`SEARCHING ${x},${y}`);
    
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

    console.log(`${terrain[y][x].getType()} AT ${x}, ${y}`);

    if (blockingTypes.includes(terrain[y][x].getType())) {
        console.log(`FOUND A BLOCKER ${terrain[y][x].getType()}`);
        return terrain[y][x].getType();
    }

    return  findSurroundingWallType(x + 1, y, blockingTypes, terrain, visitedNodes) ||
            findSurroundingWallType(x - 1, y, blockingTypes, terrain, visitedNodes) ||
            findSurroundingWallType(x, y + 1, blockingTypes, terrain, visitedNodes) ||
            findSurroundingWallType(x, y - 1, blockingTypes, terrain, visitedNodes);
}

const findIsolationZones = (blockingTypes, terrain) => {
    let isolationZones = [];
    let visitedNodes = [];
    for (let y = 0; y < terrain.length; y++) {
        for (let x = 0; x < terrain[0].length; x++) {
            let isolationZone = floodFill(x, y, blockingTypes, terrain, visitedNodes, isolationZones.length);
            if (isolationZone.length > 0) {
                isolationZones.push(isolationZone);
            }
        }
    }

    return isolationZones;
}

const createEmptyMatrix = (width, height) => {
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

const isNeighborNonblocking = (x, y, terrain, blockingTypes, otherBlockingTypes) => {
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

const findBorders = (blockingTypes, otherBlockingTypes, terrain) => {
    let borders = [];
    for (let x = 0; x < terrain.length; x++) {
        for (let y = 0; y < terrain[0].length; y++) {
            let block = terrain[y][x];
            let isolationZones = new Set();
            if (blockingTypes.includes(block.getType())) {
                if (isNeighborNonblocking(x + 1, y, terrain, blockingTypes, otherBlockingTypes)) {
                    isolationZones.add(terrain[y][x + 1].isolationZone);
                }

                if (isNeighborNonblocking(x - 1, y, terrain, blockingTypes, otherBlockingTypes)) {
                    isolationZones.add(terrain[y][x - 1].isolationZone);
                }

                if (isNeighborNonblocking(x, y + 1, terrain, blockingTypes, otherBlockingTypes)) {
                    isolationZones.add(terrain[y + 1][x].isolationZone);
                }

                if (isNeighborNonblocking(x, y - 1, terrain, blockingTypes, otherBlockingTypes)) {
                    isolationZones.add(terrain[y - 1][x].isolationZone);
                }

                if (isolationZones.size > 0) {
                    borders.push({x, y: y + 30, isolationZones: Array.from(isolationZones)});
                }
            }           
        }
    }

    return borders;
}

const placeAndGrow = (type, placeIn, ignore, rate, passes, liveNeighborsThreshold, terrain) => {
    // Place some water in the grassy areas
    for (let i = 0; i < terrain.length; i++) {
        for (let j = 0; j < terrain[0].length; j++) {
            if (terrain[i][j].getType() === placeIn && Math.random() < rate) {
                terrain[i][j] = new Cell(type);
            }
        }
    }
    for (
        let pass = 0;
        pass < passes;
        pass++
    ) {
        let workingTerrain = createEmptyMatrix(terrain.length, terrain[0].length);
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

export const generateContinentCelluar = (width, height) => {
    // Create the terrain
    let terrain = createEmptyMatrix(width, height);
    terrain = placeAndGrow(MOUNTAIN, GRASS, [], GRASS_RATE, 3, 4, terrain);
    terrain = placeAndGrow(WATER, GRASS, [MOUNTAIN], WATER_RATE, 3, 2, terrain);
    terrain = placeAndGrow(FOREST, GRASS, [MOUNTAIN, WATER], FOREST_RATE, 3, 2, terrain);
    terrain = placeAndGrow(DESERT, GRASS, [MOUNTAIN, WATER, FOREST], DESERT_RATE, 3, 2, terrain);
    terrain = placeAndGrow(SWAMP, GRASS, [MOUNTAIN, WATER, FOREST, DESERT], SWAMP_RATE, 4, 2, terrain);
    terrain = placeAndGrow(CEMETARY, GRASS, [MOUNTAIN, WATER, FOREST, DESERT, SWAMP], CEMETARY_RATE, 4, 2, terrain);

    // Detect the isolation zones
    let isolationZones = findIsolationZones([MOUNTAIN, WATER], terrain);

    // Fill in small isolation zones
    isolationZones.filter(isolationZone => isolationZone.length < ISOLATION_ZONE_MIN_SIZE).forEach((isolationZone) => {
        let {x, y} = isolationZone[0];
        let wallType = findSurroundingWallType(x, y - 30, [MOUNTAIN, WATER], terrain);
        isolationZone.forEach(({x, y}) => {
            terrain[y - 30][x].setType(wallType);
            terrain[y - 30][x].setLocation(x, y);
        });
    });

    // Detect mountains that can have caves placed in them
    let mountainBorders = findBorders([MOUNTAIN], [WATER], terrain);

    console.log(JSON.stringify(mountainBorders, null, 5));

    // Flatten the map
    let mapBlocks = terrain.flat().map(({ type }) => type);

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

    return [compressedMap, terrain, isolationZones, mountainBorders];
};
