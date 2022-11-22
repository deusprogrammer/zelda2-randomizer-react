const { hexExtractor, extractElements, hexArrayExtractor, littleEndianConvert, extractFields, maskBits } = require("../memory/HexTools");
const { colorize, create2D, draw2D, hLine2D, vLine2D, plot2D, rectangle2D, layer2D } = require("../Utils");
const { LARGE_OBJECT_SETS, SMALL_OBJECTS } = require("./Z2Data");
const { 
    toFileAddr,
    WEST_HYRULE_LOCATION_MAPPINGS, 
    WEST_HYRULE_MAP_VANILLA_OFFSET, 
    WEST_HYRULE_MAP_RANDO_OFFSET, 
    EAST_HYRULE_MAP_VANILLA_OFFSET, 
    EAST_HYRULE_MAP_RANDO_OFFSET, 
    EAST_HYRULE_LOCATION_MAPPINGS, 
    WEST_HYRULE_OVERWORLD_SPRITE_MAPPING, 
    EAST_HYRULE_OVERWORLD_SPRITE_MAPPING,
    LEVEL_HEADER_MAPPING,
    MAP_POINTER_BANK_OFFSETS1,
    MAP_POINTER_BANK_OFFSETS2,
    LEVEL_OBJECT,
    LEVEL_OBJECT_3B,
    LEVEL_EXITS_BANK_OFFSETS1,
    LEVEL_EXITS_BANK_OFFSETS2,
    LEVEL_EXITS_MAPPING,
    DEATH_MOUNTAIN_LOCATION_MAPPINGS,
    MAZE_ISLAND_LOCATION_MAPPINGS,
    DEATH_MOUNTAIN_MAP_VANILLA_OFFSET,
    DEATH_MOUNTAIN_MAP_RANDO_OFFSET,
    MAZE_ISLAND_MAP_VANILLA_OFFSET,
    MAZE_ISLAND_MAP_RANDO_OFFSET,
    MAZE_ISLAND_OVERWORLD_SPRITE_MAPPING,
    DEATH_MOUNTAIN_OVERWORLD_SPRITE_MAPPING,
    TEXT_DATA_OFFSET,
    TEXT_DATA_LENGTH,
    BACKMAP_POINTER_BANK_OFFSETS} = require("./Z2MemoryMappings");

const WIDTH_OF_SCREEN  = 16;
const HEIGHT_OF_SCREEN = 16;

const DRAWING_OP = {
    0xD: "CHANGE FLOOR LEVEL",
    0xE: "SKIP",
    0xF: "EXTRA OBJECT"
}

const SUB_OP_MAP = {
    F: "FLOOR",
    C: "CEILING",
    W: "WALL"
}

// const debugElement = (element, type, objectSet = 0) => {
//     let v = {
//         ...element,
//         yPosition: "0x" + element.yPosition.toString(16),
//         objectNumber: "0x" + (element.objectNumber & 0b00001111).toString(16)
//     };

//     if (element.yPosition > 0xC) {
//         let opData = element.objectNumber & 0b00001111;
//         let subOp = null;
//         [opData, subOp] = getFloorPosition(opData);
//         subOp = SUB_OP_MAP[subOp];
//         v.noCeiling = maskBits(element.objectNumber, 0b10000000) !== 0;
//         v.op = DRAWING_OP[element.yPosition];
//         v.subOp = subOp;
//         v.opData = opData;
//     } else {
//         let objectNumber = element.objectNumber;
//         let object = null;
//         if (type === "LARGE") {
//             objectNumber = objectNumber & 0b00001111;
//             object = OVERWORLD_LARGE_OBJECTS[objectSet][objectNumber].name;
//         } else if (type === "SMALL") {
//             object = OVERWORLD_SMALL_OBJECTS[objectNumber].name;
//         }
//         v.object = object;
//     }

//     return v;
// }

const readUint16 = (buffer, offset) => {
    let bytes = buffer.slice(offset, offset + 2);
    return littleEndianConvert(bytes);
}

const printDebugMap = (mapObject) => {
    let legend = {};
    Object.keys(mapObject).forEach((key, index) => {
        legend[key] = index;
    })

    console.box("Legend");
    console.table(legend);

    console.log();
    for (let y = 0; y < 82; y++) {
        for (let x = 0; x < 82; x++) {
            let found = Object.keys(mapObject).find(key => {
                return mapObject[key].x === x && mapObject[key].y - 29 === y
            });
    
            if (Object.keys(mapObject).includes(found)) {
                process.stdout.write(legend[found].toString().padStart(2, "0"));
            } else {
                process.stdout.write("  ");
            }
        }
        console.log("\n");
    }
    console.log();
}

const extractWestHyruleMapLocations = (buffer) => {
    return hexExtractor(WEST_HYRULE_LOCATION_MAPPINGS, buffer)[0];
}

const extractEastHyruleMapLocations = (buffer) => {
    return hexExtractor(EAST_HYRULE_LOCATION_MAPPINGS, buffer)[0];
}

const extractDeathMountainMapLocations = (buffer) => {
    return hexExtractor(DEATH_MOUNTAIN_LOCATION_MAPPINGS, buffer)[0];
}

const extractMazeIslandMapLocations = (buffer) => {
    return hexExtractor(MAZE_ISLAND_LOCATION_MAPPINGS, buffer)[0];
}

const extractWestHyruleSpriteMap = (buffer, mode) => {
    let offset = WEST_HYRULE_MAP_VANILLA_OFFSET;
    if (mode === "RANDO") {
        offset = WEST_HYRULE_MAP_RANDO_OFFSET;
    }
    return extractElements(WEST_HYRULE_OVERWORLD_SPRITE_MAPPING, buffer, offset);
}

const extractEastHyruleSpriteMap = (buffer, mode) => {
    let offset = EAST_HYRULE_MAP_VANILLA_OFFSET;
    if (mode === "RANDO") {
        offset = EAST_HYRULE_MAP_RANDO_OFFSET;
    }
    return extractElements(EAST_HYRULE_OVERWORLD_SPRITE_MAPPING, buffer, offset);
}

const extractDeathMountainSpriteMap = (buffer, mode) => {
    let offset = DEATH_MOUNTAIN_MAP_VANILLA_OFFSET;
    if (mode === "RANDO") {
        offset = DEATH_MOUNTAIN_MAP_RANDO_OFFSET;
    }
    return extractElements(DEATH_MOUNTAIN_OVERWORLD_SPRITE_MAPPING, buffer, offset);
}

const extractMazeIslandSpriteMap = (buffer, mode) => {
    let offset = MAZE_ISLAND_MAP_VANILLA_OFFSET;
    if (mode === "RANDO") {
        offset = MAZE_ISLAND_MAP_RANDO_OFFSET;
    }
    return extractElements(MAZE_ISLAND_OVERWORLD_SPRITE_MAPPING, buffer, offset);
}

const extractSideViewMapData = (buffer) => {
    let mapSets = [];
    for (let bank = 0; bank < 5; bank++) {
        let maps = [];
        let offset = MAP_POINTER_BANK_OFFSETS1[bank];
        for (let i = 0; i < 63; i++, offset += 0x2) {
            let mapPointer = readUint16(buffer, offset);
            mapPointer = toFileAddr(mapPointer, bank + 1);

            let header = extractFields(LEVEL_HEADER_MAPPING, buffer, mapPointer);
            let levelElements = [];
            let read = 0x4;
            while (read < header.sizeOfLevel) {
                let levelObject = extractFields(LEVEL_OBJECT, buffer, mapPointer + read);
                if (levelObject.objectNumber === 0xF && levelObject.yPosition < 13) {
                    levelObject = extractFields(LEVEL_OBJECT_3B, buffer, mapPointer + read);
                    read += 3;
                } else {
                    read += 2;
                }
                levelElements.push(levelObject);
            }
            maps.push({header, levelElements, mapSetNumber: mapSets.length, offset: mapPointer});
        }

        mapSets.push(maps);

        if (bank === 2 || bank === 4) {
            continue;
        }
        
        maps = [];
        offset = MAP_POINTER_BANK_OFFSETS2[bank];
        for (let i = 0; i < 63; i++, offset += 0x2) {
            let mapPointer = readUint16(buffer, offset);
            mapPointer = toFileAddr(mapPointer, bank + 1);
            
            let header = extractFields(LEVEL_HEADER_MAPPING, buffer, mapPointer);
            let levelElements = [];
            let read = 0x4;
            while (read < header.sizeOfLevel) {
                let levelObject = extractFields(LEVEL_OBJECT, buffer, mapPointer + read);
                if (levelObject.objectNumber === 0xF && levelObject.yPosition < 0xd) {
                    levelObject = extractFields(LEVEL_OBJECT_3B, buffer, mapPointer + read);
                    read += 3;
                } else {
                    read += 2;
                }
                levelElements.push(levelObject);
            }
            maps.push({header, levelElements, mapSetNumber: mapSets.length, offset: mapPointer});
        }

        mapSets.push(maps);
    }

    return mapSets;
}

const extractBackMapData = (buffer) => {
    let mapSets = [];
    for (let bank = 0; bank < 5; bank++) {
        let maps = [];
        let offset = BACKMAP_POINTER_BANK_OFFSETS[bank];
        for (let i = 0; i < 7; i++, offset += 0x2) {
            let mapPointer = readUint16(buffer, offset);
            mapPointer = toFileAddr(mapPointer, bank + 1);

            let header = extractFields(LEVEL_HEADER_MAPPING, buffer, mapPointer);
            let levelElements = [];
            let read = 0x4;
            while (read < header.sizeOfLevel) {
                let levelObject = extractFields(LEVEL_OBJECT, buffer, mapPointer + read);
                if (levelObject.objectNumber === 0xF && levelObject.yPosition < 13) {
                    levelObject = extractFields(LEVEL_OBJECT_3B, buffer, mapPointer + read);
                    read += 3;
                } else {
                    read += 2;
                }
                levelElements.push(levelObject);
            }
            maps.push({header, levelElements, mapSetNumber: mapSets.length, offset: mapPointer});
        }

        mapSets.push(maps);
    }

    return mapSets;
}

const extractLevelExits = (buffer) => {
    let mapSets = [];
    for (let bank = 0; bank < 5; bank++) {
        let offset = LEVEL_EXITS_BANK_OFFSETS1[bank];
        let newBank = hexArrayExtractor(LEVEL_EXITS_MAPPING, buffer, 63, offset);

        mapSets.push(newBank);

        if (bank === 2 || bank === 4) {
            continue;
        }
        
        offset = LEVEL_EXITS_BANK_OFFSETS2[bank];
        newBank = hexArrayExtractor(LEVEL_EXITS_MAPPING, buffer, 63, offset);

        mapSets.push(newBank);
    }

    return mapSets;
}

const extractTextData = (buffer) => {
    const CHARACTER_MAP = {0x32: '*', 0x34: '?', 0x36: '!', 0x9C: ',', 0xCE: '/', 0xCF: '.', 0xF7: 'l', 0xF8: 't', 0xF9: 'm', 0xFC: 'x', 0xFD: '\n', 0xFE: '\n', 0xF4: ' ', 0xF5: ' '};
    let texts = [];
    let text = "";
    let startingOffset = TEXT_DATA_OFFSET;
    for (let offset = TEXT_DATA_OFFSET; offset < TEXT_DATA_OFFSET + TEXT_DATA_LENGTH; offset++) {
        if (buffer[offset] === 0xFF) {
            texts.push({text, offset: startingOffset, size: offset - startingOffset});
            text = "";
            startingOffset = offset + 1;
            continue;
        }

        let h = buffer[offset];
        let c = "";
        if (h >= 0xD0 && h <= 0xD9) {
            c = h - 0xD0;
        } else if (h >= 0xDA && h <= 0xF3) {
            c = String.fromCharCode('A'.charCodeAt(0) + (h - 0xDA));
        }else {
            c = CHARACTER_MAP[h];
        }

        text += c;
    }

    return texts;
}

const debugMap = (mapSets, mapSetNumber, mapNumber) => {
    let mapSet = mapSets[mapSetNumber];
    let level = mapSet[mapNumber];
    console.box("MAP " + mapSetNumber + "-" + mapNumber);
    console.box("HEADER");
    console.table(level.header);
    console.box("METADATA");
    console.table({mapSetNumber: level.mapSetNumber});
    console.box("DATA");
    console.log("OFFSET: 0x" + level.offset.toString(16));
    console.table(level.levelElements.map((element) => {
        let {objectNumber, yPosition} = element;
        let originalObjectNumber = objectNumber;
        let object = "unknown";
        let size = 1;
        if (yPosition === 0xD) {
            object = "CHANGE FLOOR POSITION";
        } else if (yPosition === 0xE) {
            object = "SKIP";
        } else if (yPosition === 0xF) {
            object = "Extra Object";
        } else {
            if (objectNumber === 0xF && yPosition < 13) {
                object = "Collectible Object";
            } else if (objectNumber > 0xF) {
                size = objectNumber & 0b00001111;
                objectNumber = objectNumber >> 4;
                let {name, type, width, height} = LARGE_OBJECT_SETS[mapSetNumber][level.header.objectSet][objectNumber];
                object = `${name} [${type}] ${width}X${height}`;
            } else if (objectNumber <= 0xF) {
                let {name, type, width, height} = SMALL_OBJECTS[mapSetNumber][objectNumber];
                object = `${name} [${type}] ${width}X${height}`;
            }
        }
        return {
            ...element,
            objectNumber: "0x" + originalObjectNumber.toString(16),
            object,
            size
        }
    }));
}

const debugLevelExits = (mapSets, mapSetNumber, mapNumber) => {
    let mapSet = mapSets[mapSetNumber];
    let level = mapSet[mapNumber];
    console.box("MAP " + mapSetNumber + "-" + mapNumber);
    console.table(level);
}

const debugMapBank = (banks, mapSetNumber) => {
    let levels = banks[mapSetNumber];
    levels.forEach((mapNumber) => {
        debugMap(banks, mapSetNumber, mapNumber);
    });
}

const getFloorPosition = (floorLevel) => {
    if (floorLevel >= 0 && floorLevel <= 7) {
        return [floorLevel + 2, 'F'];
    } else if (floorLevel > 7 && floorLevel <= 14) {
        return [floorLevel - 6, 'C'];
    } else {
        return [15, 'W'];
    }
}

const sleep = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {resolve()}, ms);
    });
}

const drawMap = async (level, backMaps) => {
    let mapWidth = 4 * WIDTH_OF_SCREEN;
    
    let objectSet = level.header.objectSet;
    let noCeiling = level.header.noCeiling;
    let bushes = level.header.bushes;
    let grass = level.header.grass;
    let backMap; 
    let backMapLayer = create2D(mapWidth, HEIGHT_OF_SCREEN);
    if (backMaps) {
        let backMapBank = 0;
        if (level.mapSetNumber === 0 || level.mapSetNumber === 1) {
            backMapBank = 0;
        } else if (level.mapSetNumber === 1 || level.mapSetNumber === 2) {
            backMapBank = 1;
        } else if (level.mapSetNumber === 2 || level.mapSetNumber === 3) {
            backMapBank = 2;
        } else if (level.mapSetNumber === 4) {
            backMapBank = 3;
        } else if (level.mapSetNumber === 5 || level.mapSetNumber === 6) {
            backMapBank = 4;
        } else if (level.mapSetNumber === 7) {
            backMapBank = 5;
        }
        backMap = backMaps[backMapBank][level.header.backMap];
        backMapLayer = await drawMap(backMap);
    }

    let largeObjects = LARGE_OBJECT_SETS[level.mapSetNumber][objectSet];
    let smallObjects = SMALL_OBJECTS[level.mapSetNumber];
    
    let map = create2D(mapWidth, HEIGHT_OF_SCREEN);
    let fg = create2D(mapWidth, HEIGHT_OF_SCREEN);
    let bg = create2D(mapWidth, HEIGHT_OF_SCREEN);
    
    let [newLevel, c] = getFloorPosition(level.header.initialFloorPosition);
    let floorLevel = 2;
    let ceilingLevel = 1;
    let drawWall = false;
    let size = 1;


    if (c === "F") {
        floorLevel = newLevel;
        ceilingLevel = 1;
    } else if (c === "C") {
        newFloorLevel = 2;
        ceilingLevel = newLevel;
    } else {
        drawWall = true;
    }

    if (noCeiling) {
        ceilingLevel = 0;
    }

    if (grass) {
        hLine2D(bg, mapWidth, 0, mapWidth, 0xA, colorize(32, "█"));
    }
    if (bushes) {
        hLine2D(bg, mapWidth, 0, mapWidth, 0xB, colorize(2, colorize(32, "█")));
    }

    let x = 0;

    for (let element of level.levelElements) {
        let {yPosition: y, advanceCursor: xSpace, objectNumber, collectableObjectNumber} = element;
        let newX = 0;
        let newFloorLevel = floorLevel;
        let newCeilingLevel = ceilingLevel;
        
        if (drawWall) {
            for (let i = 0; i < xSpace; i++) {
                vLine2D(map, mapWidth, 0, 12, newX + i, "█");
            }
            drawWall = false;
        } 

        newX = x + xSpace;
        if (y === 0xD) {
            let [newLevel, c] = getFloorPosition(objectNumber & 0b00001111);
            noCeiling = maskBits(objectNumber, 0b10000000);
            if (c === "F") {
                newFloorLevel = newLevel;
                newCeilingLevel = 1;
            } else if (c === "C") {
                newFloorLevel = 2;
                newCeilingLevel = newLevel;
            } else if (c === "W") {
                drawWall = true;
            }
        } else if (y === 0XE) {
            // SKIP
            newX = xSpace * 16;
        } else if (y === 0xF) {
            // EXTRA OBJECT
            size = objectNumber & 0b00001111;
            objectNumber = objectNumber >> 4;
            if (objectNumber === 0x2 || objectNumber === 0x1) {
                rectangle2D(fg, mapWidth, newX, 10, newX + size, 13, colorize(31, "█"));
            }
        } else {
            if (objectNumber === 0xF && y < 13) {
                // SPECIAL OBJECT
                plot2D(fg, mapWidth, newX, y, "!");
            } else if (objectNumber > 0xF) {
                // LARGE OBJECT
                size = objectNumber & 0b00001111;
                objectNumber = objectNumber >> 4;
                let {width, height, solid, clear, breakable, collapsing, type, toGround} = largeObjects[objectNumber];
                let print = solid ? "█" : colorize(2, "█");
                print = clear ? " " : print;
                print = breakable ? "X" : print;
                print = collapsing ? ":" : print;
                let y2 = toGround ? 13 : y + height;
                if (type === "wide") {
                    rectangle2D(map, mapWidth, newX, y, newX + (size * width), y2, print);
                } else if (type === "tall") {
                    rectangle2D(map, mapWidth, newX, y, newX + width - 1, y2 + (size * height), print);
                }
            } else {
                let {width, height, solid, clear, toGround} = smallObjects[objectNumber];
                let print = solid ? "█" : colorize(2, "█");
                print = clear ? " " : print;
                let y2 = toGround ? 10 : y + height;
                rectangle2D(fg, mapWidth, newX, y, newX + width - 1, y2, print);
            }
        }
        
        if (xSpace !== 0) {
            rectangle2D(bg, mapWidth, x, 13 - floorLevel,  newX - 1, 13,           "█");
            rectangle2D(bg, mapWidth, x, 0,                newX - 1, ceilingLevel, "█");
        }

        x = newX;
        ceilingLevel    = newCeilingLevel;
        floorLevel      = newFloorLevel;
        if (noCeiling) {
            ceilingLevel = 0;
        }

        // let f = plot2D(map, mapWidth, x, 13 - floorLevel, colorize(5, "^"));
        // let c = plot2D(map, mapWidth, x, ceilingLevel, colorize(5, "v"));
        // let p = plot2D(map, mapWidth, x, y, colorize(5, "*"));
        // draw2D(map, mapWidth);
        // plot2D(map, mapWidth, x, 13 - floorLevel, f);
        // plot2D(map, mapWidth, x, ceilingLevel, c);
        // plot2D(map, mapWidth, x, y, p);
        // await sleep(1000);
    };
    if (x < mapWidth) {
        if (drawWall) {
            rectangle2D(map, mapWidth, x, 0, mapWidth - 1, 13, "█");
        }
        rectangle2D(map, mapWidth, x, 13 - floorLevel,  mapWidth - 1, 13,           "█");
        rectangle2D(map, mapWidth, x, 0,                mapWidth - 1, ceilingLevel, "█");
    }
    let layers = layer2D(backMapLayer, bg, map, fg);
    draw2D(layers, mapWidth);

    return layers;
}

exports.printDebugMap = printDebugMap;
exports.extractWestHyruleMapLocations = extractWestHyruleMapLocations;
exports.extractEastHyruleMapLocations = extractEastHyruleMapLocations;
exports.extractWestHyruleSpriteMap = extractWestHyruleSpriteMap;
exports.extractEastHyruleSpriteMap = extractEastHyruleSpriteMap;
exports.extractDeathMountainMapLocations = extractDeathMountainMapLocations;
exports.extractMazeIslandMapLocations = extractMazeIslandMapLocations;
exports.extractDeathMountainSpriteMap = extractDeathMountainSpriteMap;
exports.extractMazeIslandSpriteMap = extractMazeIslandSpriteMap;
exports.extractSideViewMapData = extractSideViewMapData;
exports.extractBackMapData = extractBackMapData;
exports.extractLevelExits = extractLevelExits;
exports.extractTextData = extractTextData;
exports.debugMap = debugMap;
exports.debugLevelExits = debugLevelExits;
exports.debugMapBank = debugMapBank;
exports.drawMap = drawMap;