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

class Cell {
  type;

  constructor(type) {
    this.type = type;
  }

  getType = () => {
    return this.type;
  };

  setType = (type) => {
    this.type = type;
  };
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
    // TODO Randomly choose the number of passes, live neighbor threshold, and rate for each.

    let terrain = createEmptyMatrix(width, height);
    terrain = placeAndGrow(MOUNTAIN, GRASS, [], GRASS_RATE, 3, 4, terrain);
    terrain = placeAndGrow(WATER, GRASS, [MOUNTAIN], WATER_RATE, 3, 2, terrain);
    terrain = placeAndGrow(FOREST, GRASS, [MOUNTAIN, WATER], FOREST_RATE, 3, 2, terrain);
    terrain = placeAndGrow(DESERT, GRASS, [MOUNTAIN, WATER, FOREST], DESERT_RATE, 3, 2, terrain);
    terrain = placeAndGrow(SWAMP, GRASS, [MOUNTAIN, WATER, FOREST, DESERT], SWAMP_RATE, 4, 2, terrain);
    terrain = placeAndGrow(CEMETARY, GRASS, [MOUNTAIN, WATER, FOREST, DESERT, SWAMP], CEMETARY_RATE, 4, 2, terrain);

    let mapBlocks = terrain.flat().map(({ type }) => type);

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
};
