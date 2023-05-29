import { printSpriteMap } from "../zelda2/Z2Utils";

function diamondSquareAlgorithm(size, m, n) {
  // Calculate the size of the matrix
  const matrixSize = Math.pow(2, size) + 1;

  // Create an empty matrix
  const matrix = Array(matrixSize)
    .fill(null)
    .map(() => Array(matrixSize).fill(0));

  // Set the corner values
  matrix[0][0] = getRandomInt(m, n);
  matrix[0][matrixSize - 1] = getRandomInt(m, n);
  matrix[matrixSize - 1][0] = getRandomInt(m, n);
  matrix[matrixSize - 1][matrixSize - 1] = getRandomInt(m, n);

  // Perform the diamond-square algorithm
  diamondSquare(matrix, matrixSize - 1, n - m);

  // Flatten the matrix into a 1-dimensional array
  const flatMatrix = matrix.flat();

  return flatMatrix;
}

function diamondSquare(matrix, size, range) {
  let stepSize = size;
  let halfSize, x, y;

  while (stepSize >= 2) {
    halfSize = stepSize / 2;

    // Diamond step
    for (y = halfSize; y < matrix.length - 1; y += stepSize) {
      for (x = halfSize; x < matrix.length - 1; x += stepSize) {
        const topLeft = matrix[y - halfSize][x - halfSize];
        const topRight = matrix[y - halfSize][x + halfSize];
        const bottomLeft = matrix[y + halfSize][x - halfSize];
        const bottomRight = matrix[y + halfSize][x + halfSize];

        matrix[y][x] =
          Math.floor((topLeft + topRight + bottomLeft + bottomRight) / 4) +
          getRandomInt(0, range);
      }
    }

    // Square step
    for (y = 0; y < matrix.length - 1; y += halfSize) {
      for (
        x = (y + halfSize) % stepSize;
        x < matrix.length - 1;
        x += stepSize
      ) {
        const topLeft = y - halfSize >= 0 ? matrix[y - halfSize][x] : 0;
        const topRight =
          x + halfSize < matrix.length ? matrix[y][x + halfSize] : 0;
        const bottomLeft =
          y + halfSize < matrix.length ? matrix[y + halfSize][x] : 0;
        const bottomRight = x - halfSize >= 0 ? matrix[y][x - halfSize] : 0;

        matrix[y][x] =
          Math.floor((topLeft + topRight + bottomLeft + bottomRight) / 4) +
          getRandomInt(0, range);
      }
    }

    stepSize = halfSize;
    range /= 2;
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateContinent = (continent) => {
    // Example usage
    const size = 6; // Size of the matrix (2^4 + 1 = 17)
    const mapBlocks = diamondSquareAlgorithm(size, 0, 5);

    let currentBlockType = null;
    let run = 0;
    let compressedMap = [];
    mapBlocks.forEach((mapBlock, index) => {
        mapBlock += 4;

        if (continent !== 2 && mapBlock === 10) {
            mapBlock = 5;
        }

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

console.log("\nWEST CONTINENT");
printSpriteMap(generateContinent(0));
console.log("\nEAST CONTINENT");
printSpriteMap(generateContinent(2));