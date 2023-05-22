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
    DIGISHAKE_CREDIT_OFFSET} = require("./Z2MemoryMappings");

export const WIDTH_OF_SCREEN  = 16;
export const HEIGHT_OF_SCREEN = 16;

export const CHARACTER_MAP = {0x32: '*', 0x34: '?', 0x36: '!', 0x9C: ',', 0xCE: '/', 0xCF: '.', 0xF7: 'l', 0xF8: 't', 0xF9: 'm', 0xFC: 'x', 0xFD: '\n', 0xFE: '\n', 0xF4: ' ', 0xF5: ' '};

export const ITEM_MAP      = ["candle", "glove", "raft", "boots", "recorder", "cross", "hammer", "magic key", "key", "", "50p bag", "100p bag", "200p bag", "500p bag", "magic container", "heart container", "blue jar", "red jar", "1up", "child", "trophy", "medicine"];

export const OVERWORLD_SPRITE_SYMBOLS = [
    {name: "Town", c: "T", color: "white", backgroundColor: "red"},
    {name: "Cave", c: " ", color: "white", backgroundColor: "black"},
    {name: "Palace", c: "P", color: "white", backgroundColor: "red"},
    {name: "Bridge", c: "=", color: "black", backgroundColor: "yellow"},
    {name: "Desert", c: " ", color: "white", backgroundColor: "sandybrown"},
    {name: "Grass", c: " ", color: "white", backgroundColor: "lightgreen"},
    {name: "Forest", c: " ", color: "white", backgroundColor: "green"},
    {name: "Swamp", c: "~", color: "white", backgroundColor: "purple"},
    {name: "Cemetary", c: "+", color: "white", backgroundColor: "purple"},
    {name: "Road", c: " ", color: "white", backgroundColor: "peachpuff"},
    {name: "Lava", c: " ", color: "white", backgroundColor: "crimson"},
    {name: "Mountains", c: "^", color: "white", backgroundColor: "brown"},
    {name: "Water", c: "~", color: "white", backgroundColor: "blue"},
    {name: "Shallow Water", c: "~", color: "white", backgroundColor: "lightblue"},
    {name: "Boulder", c: "O", color: "white", backgroundColor: "brown"},
    {name: "Spider", c: "*", color: "white", backgroundColor: "red"}
]

export const OVERWORLD_SPRITE_SYMBOLS_ASCII = [
    "T",
    "C",
    "P",
    "=",
    ".",
    ",",
    ":",
    "s",
    "+",
    " ",
    ">",
    "^",
    "~",
    "~",
    "O",
    "*"
]

let textMappings = {
    '*': 0x32,
    '?': 0x34,
    '!': 0x36,
    ',': 0x9C,
    '/': 0xCE,
    '.': 0xCF,
    '0': 0xD0,
    '1': 0xD1,
    '2': 0xD2,
    '3': 0xD3,
    '4': 0xD4,
    '5': 0xD5,
    '6': 0xD6,
    '7': 0xD7,
    '8': 0xD8,
    '9': 0xD9,
    'A': 0xDA,
    'B': 0xDB,
    'C': 0xDC,
    'D': 0xDD,
    'E': 0xDE,
    'F': 0xDF,
    'G': 0xE0,
    'H': 0xE1,
    'I': 0xE2,
    'J': 0xE3,
    'K': 0xE4,
    'L': 0xE5,
    'M': 0xE6,
    'N': 0xE7,
    'O': 0xE8,
    'P': 0xE9,
    'Q': 0xEA,
    'R': 0xEB,
    'S': 0xEC,
    'T': 0xED,
    'U': 0xEE,
    'V': 0xEF,
    'W': 0xF0,
    'X': 0xF1,
    'Y': 0xF2,
    'Z': 0xF3,
    ' ': 0xF4,
    'l': 0xF7,
    '†': 0xF8,
    'm': 0xF9,
    'x': 0xFC,
    '\n': 0xFF
}

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

export const printSpriteMap = (mapObject) => {
    if (process) {
        let i = 0;
        for (let sprite of mapObject) {
            for (let j = 0; j < sprite.length + 1; j++) {
                if (i++ % 64 === 0) {
                    console.log();
                }
        
                let c = OVERWORLD_SPRITE_SYMBOLS_ASCII[sprite.type];
                process.stdout.write(c ? c : ' ');
            }
        }
        console.log();
    }
}

export const readUint16 = (buffer, offset) => {
    let bytes = buffer.slice(offset, offset + 2);
    return littleEndianConvert(bytes);
}

export const printDebugMap = (mapObject) => {
    if (process) {
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
        let newBank = hexArrayExtractor(LEVEL_EXITS_MAPPING, buffer, 63, offset);

        if (bank < 2) {
            newBank = newBank.map((levelEntry, mapNumber) => {
                if (mapNumber < 29) {
                    return {...levelEntry, editable: true};
                } else {
                    return {...newBank[0], editable: true};
                }
            });
        }

        mapSets.push(newBank);

        if (bank === 2 || bank === 4) {
            continue;
        }
        
        offset = LEVEL_EXITS_BANK_OFFSETS2[bank];
        newBank = hexArrayExtractor(LEVEL_EXITS_MAPPING, buffer, 63, offset);

        if (bank < 2) {
            newBank = newBank.map((levelEntry, mapNumber) => {
                if (mapNumber < 29) {
                    return {...levelEntry, editable: true};
                } else {
                    return {...newBank[0], editable: true};
                }
            });
        }

        mapSets.push(newBank);
    }

    return mapSets;
}

export const combineLevelData = (sideViewMapSets, levelExits) => {
    return sideViewMapSets.map((sideViewMapSet, i) => {
        return createLevelData(sideViewMapSet, levelExits[i]);
    });
}

export const createLevelData = (sideViewMapSet, levelExits) => {
    return sideViewMapSet.map((sideViewMap, i) => {
        let exits = levelExits[i];
        return {
            ...sideViewMap,
            exits
        };
    });
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

export const stringToZ2Bytes = (s) => {
    let bytes = [];
    for (let i = 0; i < s.length; i++) {
        bytes.push(textMappings[s.charAt(i)]);
    }
    return bytes;
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

        if (drawWall) {
            for (let i = 0; i < xSpace; i++) {
                vLine2D(map, mapWidth, 0, 12, x + i, {name: "wall", solid: true});
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
                rectangle2D(fg, mapWidth, newX, 10, newX + size, 13, {name: "lava"});
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

export const getItemType = (item) => {
    let itemType = "SMALL_ITEM";
    if (["CANDLE", "HANDY_GLOVE", "RAFT", "BOOTS", "RECORDER", "CROSS", "HAMMER", "MAGIC_KEY"].includes(item)) {
        itemType = "LARGE_ITEM";
    } else if (item === "BAGU_SAUCE") {
        itemType = "BAGU_SAUCE";
    }

    return itemType;
}

export const createVanillaNodeMapping = (graphData, mapData) => {
    let mapping = {};
    let template = {};
    Object.keys(graphData).forEach((nodeName, i) => {
        mapping[nodeName] = `NODE${i}`;
    });
    Object.keys(graphData).forEach((nodeName, i) => {
        let {x: x1, y: y1, map, connections} = graphData[nodeName];
        
        map = map || 0;
        connections = connections || [];

        let {x, y, mapNumber, mapSet} = mapData[map][nodeName] || {x: 0, y: 0};
        
        if (x1) {
            x = x1;
        }
        if (y1) {
            y = y1;
        }

        connections = connections.map(connection => mapping[connection]);
        template[`NODE${i}`] = {locationKey: nodeName, x, y, continent: map, mapSet, mapNumber, connections};
    });
    return template;
}

export const isDigiShakeRando = (rom) => {
    let creditsLine2 = extractTextDataFromOffset(rom, DIGISHAKE_CREDIT_OFFSET);

    console.log("CREDITS: " + creditsLine2);

    return creditsLine2.trim() === "DIGSHAKE" || creditsLine2.trim() === "TKOS";
}

export const explore = (maps, mapSet, mapNumber, explored = []) => {
    let items = [];
    if (mapNumber === 63 || explored.includes(mapNumber)) {
        return [];
    }

    let currentMap = maps[mapSet][mapNumber];
    let levelExits = currentMap.exits;

    currentMap.levelElements.forEach((levelElement) => {
        let {collectableObjectNumber, _metadata} = levelElement;
        if (collectableObjectNumber !== undefined) {
            items.push({name: ITEM_MAP[collectableObjectNumber], levelElement, number: collectableObjectNumber, mapNumber, mapSet, _metadata: _metadata["collectableObjectNumber"]});
        }
    });

    const {upExit, downExit, leftExit, rightExit} = levelExits;
    explored.push(mapNumber);

    // Explore up
    if (upExit.mapNumber > 0 || upExit.xCoord > 0) {
        items = [...items, ...explore(maps, mapSet, upExit.mapNumber, explored)];
    }
    // Explore down
    if (downExit.mapNumber > 0 || downExit.xCoord > 0) {
        items = [...items, ...explore(maps, mapSet, downExit.mapNumber, explored)];
    }
    // Explore left
    if (leftExit.mapNumber > 0 || leftExit.xCoord > 0) {
        items = [...items, ...explore(maps, mapSet, leftExit.mapNumber, explored)];
    }
    // Explore right
    if (rightExit.mapNumber > 0 || rightExit.xCoord > 0) {
        items = [...items, ...explore(maps, mapSet, rightExit.mapNumber, explored)];
    }

    return items;
}

export const getLocationByKey = (romData, locationKey) => {
    let location = [null, null];
    for (let i in romData.overworld) {
        let map = romData.overworld[i].locations;
        let found = Object.keys(map).find(key => key === locationKey);

        if (found) {
            location = [map[found], parseInt(i)];
            break;
        }
    }

    return location;
}

export const getMapByKey = (romData, locationKey) => {
    let [foundLocation, continent] = getLocationByKey(romData, locationKey);

    let {mapSet, continent: worldNumber, mapNumber} = foundLocation;
    if (mapSet === 0 && worldNumber === 0) {        // Overworld
        mapSet = continent;
    } else if (mapSet === 1 || mapSet === 2) {      // Towns
        mapSet = 4;
    } else if (mapSet > 2) {
        mapSet = mapSet + 2;                        // Palaces
    }

    return romData.sideViewMaps[mapSet][mapNumber];
}