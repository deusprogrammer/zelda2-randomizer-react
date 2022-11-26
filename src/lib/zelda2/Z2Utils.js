const { hexExtractor, extractElements, hexArrayExtractor, littleEndianConvert, extractFields, maskBits } = require("../memory/HexTools");
const { create2D, hLine2D, vLine2D, plot2D, rectangle2D, layer2D } = require("../Utils");
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
    BACKMAP_POINTER_BANK_OFFSETS,
    DIGISHAKE_CREDIT_OFFSET,
    LEVEL_EXIT_BLOCK} = require("./Z2MemoryMappings");

export const WIDTH_OF_SCREEN  = 16;
export const HEIGHT_OF_SCREEN = 16;

const CHARACTER_MAP = {0x32: '*', 0x34: '?', 0x36: '!', 0x9C: ',', 0xCE: '/', 0xCF: '.', 0xF7: 'l', 0xF8: 't', 0xF9: 'm', 0xFC: 'x', 0xFD: '\n', 0xFE: '\n', 0xF4: ' ', 0xF5: ' '};

export const ITEM_MAP      = ["candle", "glove", "raft", "boots", "recorder", "cross", "hammer", "magic key", "key", "", "50p bag", "100p bag", "200p bag", "500p bag", "magic container", "heart container", "blue jar", "red jar", "1up", "medicine", "trophy", "child"];

export const DRAWING_OP = {
    0xD: "CHANGE FLOOR LEVEL",
    0xE: "SKIP",
    0xF: "EXTRA OBJECT"
}

export const SUB_OP_MAP = {
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

export const readUint16 = (buffer, offset) => {
    let bytes = buffer.slice(offset, offset + 2);
    return littleEndianConvert(bytes);
}

export const printDebugMap = (mapObject) => {
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

export const extractWestHyruleMapLocations = (buffer) => {
    return hexExtractor(WEST_HYRULE_LOCATION_MAPPINGS, buffer)[0];
}

export const extractEastHyruleMapLocations = (buffer) => {
    return hexExtractor(EAST_HYRULE_LOCATION_MAPPINGS, buffer)[0];
}

export const extractDeathMountainMapLocations = (buffer) => {
    return hexExtractor(DEATH_MOUNTAIN_LOCATION_MAPPINGS, buffer)[0];
}

export const extractMazeIslandMapLocations = (buffer) => {
    return hexExtractor(MAZE_ISLAND_LOCATION_MAPPINGS, buffer)[0];
}

export const extractWestHyruleSpriteMap = (buffer, mode) => {
    let offset = WEST_HYRULE_MAP_VANILLA_OFFSET;
    if (mode === "RANDO") {
        offset = WEST_HYRULE_MAP_RANDO_OFFSET;
    }
    return extractElements(WEST_HYRULE_OVERWORLD_SPRITE_MAPPING, buffer, offset);
}

export const extractEastHyruleSpriteMap = (buffer, mode) => {
    let offset = EAST_HYRULE_MAP_VANILLA_OFFSET;
    if (mode === "RANDO") {
        offset = EAST_HYRULE_MAP_RANDO_OFFSET;
    }
    return extractElements(EAST_HYRULE_OVERWORLD_SPRITE_MAPPING, buffer, offset);
}

export const extractDeathMountainSpriteMap = (buffer, mode) => {
    let offset = DEATH_MOUNTAIN_MAP_VANILLA_OFFSET;
    if (mode === "RANDO") {
        offset = DEATH_MOUNTAIN_MAP_RANDO_OFFSET;
    }
    return extractElements(DEATH_MOUNTAIN_OVERWORLD_SPRITE_MAPPING, buffer, offset);
}

export const extractMazeIslandSpriteMap = (buffer, mode) => {
    let offset = MAZE_ISLAND_MAP_VANILLA_OFFSET;
    if (mode === "RANDO") {
        offset = MAZE_ISLAND_MAP_RANDO_OFFSET;
    }
    return extractElements(MAZE_ISLAND_OVERWORLD_SPRITE_MAPPING, buffer, offset);
}

export const extractSideViewMapData = (buffer) => {
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

export const extractBackMapData = (buffer) => {
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

export const extractLevelExits = (buffer) => {
    let mapSets = [];
    for (let bank = 0; bank < 5; bank++) {
        let offset = LEVEL_EXITS_BANK_OFFSETS1[bank];
        console.log("OFFSET: " + offset.toString(16));
        let newBank = hexArrayExtractor(LEVEL_EXITS_MAPPING, buffer, 63, offset);

        mapSets.push(newBank);

        if (bank === 2 || bank === 4) {
            continue;
        }
        
        offset = LEVEL_EXITS_BANK_OFFSETS2[bank];
        console.log("OFFSET: " + offset.toString(16));
        newBank = hexArrayExtractor(LEVEL_EXITS_MAPPING, buffer, 63, offset);

        mapSets.push(newBank);
    }

    return mapSets;
}

export const z2BytesToString = (bytes) => {
    let text = "";
    for (let offset = 0; offset < bytes.length && bytes[offset] !== 0xFF; offset++) {
        let h = bytes[offset];
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

    return text;
}

export const extractTextData = (buffer) => {
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

export const extractTextDataFromOffset = (rom, offset) => {
    let text = "";
    for (; rom[offset] !== 0xFF; offset++) {
        let h = rom[offset];
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
    return text;
}

export const debugMap = (mapSets, mapSetNumber, mapNumber) => {
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

export const debugLevelExits = (mapSets, mapSetNumber, mapNumber) => {
    let mapSet = mapSets[mapSetNumber];
    let level = mapSet[mapNumber];
    console.box("MAP " + mapSetNumber + "-" + mapNumber);
    console.table(level);
}

export const debugMapBank = (banks, mapSetNumber) => {
    let levels = banks[mapSetNumber];
    levels.forEach((mapNumber) => {
        debugMap(banks, mapSetNumber, mapNumber);
    });
}

export const getFloorPosition = (floorLevel) => {
    if (floorLevel >= 0 && floorLevel <= 7) {
        return [floorLevel + 2, 'F'];
    } else if (floorLevel > 7 && floorLevel <= 14) {
        return [floorLevel - 6, 'C'];
    } else {
        return [15, 'W'];
    }
}

export const drawMap = (level, backMaps, steps = -1) => {
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
        backMapLayer = drawMap(backMap);
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
        floorLevel = 2;
        ceilingLevel = newLevel;
    } else {
        drawWall = true;
    }

    if (noCeiling) {
        ceilingLevel = 0;
    }

    if (grass) {
        hLine2D(bg, mapWidth, 0, mapWidth, 0xA, {name: "grass", solid: false});
    }
    if (bushes) {
        hLine2D(bg, mapWidth, 0, mapWidth, 0xB,  {name: "bushes", solid: false});
    }

    let x = 0;
    let step = 0;
    for (let element of level.levelElements) {
        let {yPosition: y, advanceCursor: xSpace, objectNumber, collectableObjectNumber} = element;
        let newX = 0;
        let newFloorLevel = floorLevel;
        let newCeilingLevel = ceilingLevel;

        newX = x + xSpace;

        if (drawWall) {
            for (let i = 0; i < xSpace; i++) {
                vLine2D(map, mapWidth, 0, 12, newX + i, {name: "wall", solid: true});
            }
            drawWall = false;
        } 

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
                rectangle2D(fg, mapWidth, newX, 11, newX + size, 13, {name: "lava"});
            }
        } else {
            if (objectNumber === 0xF && y < 13) {
                // SPECIAL OBJECT
                plot2D(fg, mapWidth, newX, y, {name: ITEM_MAP[collectableObjectNumber], collectable: true});
            } else if (objectNumber > 0xF) {
                // LARGE OBJECT
                size = objectNumber & 0b00001111;
                objectNumber = objectNumber >> 4;
                let {width, height, type, toGround} = largeObjects[objectNumber];
                let y2 = toGround ? 13 : y + height;
                if (type === "wide") {
                    rectangle2D(map, mapWidth, newX, y, newX + (size * width), y2, largeObjects[objectNumber]);
                } else if (type === "tall") {
                    rectangle2D(map, mapWidth, newX, y, newX + width - 1, y2 + (size * height), largeObjects[objectNumber]);
                }
            } else {
                let {width, height, toGround} = smallObjects[objectNumber];
                let y2 = toGround ? 10 : y + height;
                rectangle2D(fg, mapWidth, newX, y, newX + width - 1, y2, smallObjects[objectNumber]);
            }
        }
        
        if (xSpace !== 0) {
            rectangle2D(bg, mapWidth, x, 13 - floorLevel,  newX - 1, 13,           {name: "floor", solid: true});
            rectangle2D(bg, mapWidth, x, 0,                newX - 1, ceilingLevel, {name: "ceiling", solid: true});
        }

        x = newX;
        ceilingLevel    = newCeilingLevel;
        floorLevel      = newFloorLevel;
        if (noCeiling) {
            ceilingLevel = 0;
        }

        if (steps >= 0 && ++step > steps) {
            console.log("REACHED END STEP");
            return layer2D(backMapLayer, bg, map, fg);
        }
    };
    if (x < mapWidth) {
        if (drawWall) {
            rectangle2D(bg, mapWidth, x, 0, mapWidth - 1, 13, {name: "wall", solid: true});
        }
        rectangle2D(bg, mapWidth, x, 13 - floorLevel,  mapWidth - 1, 13,           {name: "floor", solid: true});
        rectangle2D(bg, mapWidth, x, 0,                mapWidth - 1, ceilingLevel, {name: "ceiling", solid: true});
    }
    return layer2D(backMapLayer, bg, map, fg);
}

export const isDigiShakeRando = (rom) => {
    let creditsLine2 = extractTextDataFromOffset(rom, DIGISHAKE_CREDIT_OFFSET);

    console.log("CREDIT: " + creditsLine2);

    return creditsLine2.trim() === "DIGSHAKE";
}

export const explore = (maps, levelExits, mapNumber, mapSet, explored = []) => {
    let items = [];
    if (mapNumber === 63 || explored.includes(mapNumber)) {
        return [];
    }

    let currentMap = maps[mapSet][mapNumber];

    currentMap.levelElements.forEach(({collectableObjectNumber}) => {
        if (collectableObjectNumber !== undefined) {
            items.push({name: ITEM_MAP[collectableObjectNumber], number: collectableObjectNumber, mapNumber, mapSet});
        }
    });

    const {upExit, downExit, leftExit, rightExit} = levelExits[mapSet][mapNumber];
    explored.push(mapNumber);

    // Explore up
    if (upExit.mapNumber > 0 || upExit.xCoord > 0) {
        items = [...items, ...explore(maps, levelExits, upExit.mapNumber, mapSet, explored)];
    }
    // Explore down
    if (downExit.mapNumber > 0 || downExit.xCoord > 0) {
        items = [...items, ...explore(maps, levelExits, downExit.mapNumber, mapSet, explored)];
    }
    // Explore left
    if (leftExit.mapNumber > 0 || leftExit.xCoord > 0) {
        items = [...items, ...explore(maps, levelExits, leftExit.mapNumber, mapSet, explored)];
    }
    // Explore right
    if (rightExit.mapNumber > 0 || rightExit.xCoord > 0) {
        items = [...items, ...explore(maps, levelExits, rightExit.mapNumber, mapSet, explored)];
    }

    return items;
}