const GRASS = 0x5;
const MOUNTAIN = 0xb;
const WATER = 0xd;
const FOREST = 0x6;
const DESERT = 0x4;

const GRASS_RATE = 0.45;
const WATER_RATE = 0.20;
const FOREST_RATE = 0.20;
const DESERT_RATE = 0.20;

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
      row.push(new Cell(MOUNTAIN));
    }
    terrain.push(row);
  }

  return terrain;
};

// TODO Generalize
// NOTES: higher numbers of passes will cause more growth.
// NOTES: higher live neighbor requirements cause fewer mountains for the first phase.
export const generateContinentCelluar = (width, height) => {
    // Place mountains and grass
    let terrain = [];
    for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            if (Math.random() < GRASS_RATE) {
                row.push(new Cell(GRASS));
            } else {
                row.push(new Cell(MOUNTAIN));
            }
        }
        terrain.push(row);
    }
    for (
        let pass = 0;
        pass < 3;
        pass++
    ) {
        let workingTerrain = createEmptyMatrix(width, height);
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

                        if (terrain[l][m].getType() === MOUNTAIN) {
                            liveNeighbors++;
                        }
                    }
                }

                if (liveNeighbors > 4) {
                    workingTerrain[i][j] = new Cell(GRASS);
                } else {
                    workingTerrain[i][j] = new Cell(MOUNTAIN);
                }
            }
        }
        terrain = workingTerrain;
    }

    // Place some water in the grassy areas
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (terrain[i][j].getType() === GRASS && Math.random() < WATER_RATE) {
                terrain[i][j] = new Cell(WATER);
            }
        }
    }
    for (
        let pass = 0;
        pass < 3;
        pass++
    ) {
        let workingTerrain = createEmptyMatrix(width, height);
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

                        if (terrain[l][m].getType() === WATER) {
                            liveNeighbors++;
                        }
                    }
                }

                if (terrain[i][j].getType() === MOUNTAIN) {
                    workingTerrain[i][j] = new Cell(terrain[i][j].getType());
                    continue;
                }

                if (liveNeighbors > 2) {
                    workingTerrain[i][j] = new Cell(WATER);
                } else {
                    workingTerrain[i][j] = new Cell(GRASS);
                }
            }
        }
        terrain = workingTerrain;
    }

    // Place some forests in the grassy areas
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (terrain[i][j].getType() === GRASS && Math.random() < FOREST_RATE) {
                terrain[i][j] = new Cell(FOREST);
            }
        }
    }
    for (
        let pass = 0;
        pass < 3;
        pass++
    ) {
        let workingTerrain = createEmptyMatrix(width, height);
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

                        if (terrain[l][m].getType() === FOREST) {
                            liveNeighbors++;
                        }
                    }
                }

                if ([MOUNTAIN, WATER].includes(terrain[i][j].getType())) {
                    workingTerrain[i][j] = new Cell(terrain[i][j].getType());
                    continue;
                }

                if (liveNeighbors > 2) {
                    workingTerrain[i][j] = new Cell(FOREST);
                } else {
                    workingTerrain[i][j] = new Cell(GRASS);
                }
            }
        }
        terrain = workingTerrain;
    }

    // Place some deserts in the grassy areas
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (terrain[i][j].getType() === GRASS && Math.random() < DESERT_RATE) {
                terrain[i][j] = new Cell(DESERT);
            }
        }
    }
    for (
        let pass = 0;
        pass < 3;
        pass++
    ) {
        let workingTerrain = createEmptyMatrix(width, height);
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

                        if (terrain[l][m].getType() === DESERT) {
                            liveNeighbors++;
                        }
                    }
                }

                if ([MOUNTAIN, WATER, FOREST].includes(terrain[i][j].getType())) {
                    workingTerrain[i][j] = new Cell(terrain[i][j].getType());
                    continue;
                }

                if (liveNeighbors > 2) {
                    workingTerrain[i][j] = new Cell(DESERT);
                } else {
                    workingTerrain[i][j] = new Cell(GRASS);
                }
            }
        }
        terrain = workingTerrain;
    }

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
