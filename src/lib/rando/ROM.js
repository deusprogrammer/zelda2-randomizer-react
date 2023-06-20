import parse from "../Z2Parser";
import { assembleCode } from "../memory/Assembler";
import { CONTINENT_EXIT_MAPPINGS, CREDITS_OFFSET, OVERWORLD_SPRITE_MAPPING, PALACE_PALETTE_LOCATIONS, RANDO_MAP_OFFSETS } from "../zelda2/Z2MemoryMappings";
import { printSpriteMap, stringToZ2Bytes } from "../zelda2/Z2Utils";
import itemMetaData from '../zelda2/templates/z2-items.meta';
import vanillaMapData from '../zelda2/templates/z2-vanilla.map';
import locationMetadata from '../zelda2/templates/z2-location.meta';

const LAST_BIT_MASK = 1 >>> 0;
const ITEM_MAP = {"CANDLE": 0x0, "HANDY_GLOVE": 0x1, "RAFT": 0x2, "BOOTS": 0x3, "RECORDER": 0x4, "CROSS": 0x5, "HAMMER": 0x6, "MAGIC_KEY": 0x7, "KEY": 0x8, "": 0x9, "50PB": 0xA, "100PB": 0xB, "200PB": 0xC, "500PB": 0xD, "MAGIC_CONTAINER": 0xE, "HEART_CONTAINER": 0xF, "BLUE_JAR": 0x10, "RED_JAR": 0x11, "1UP": 0x12, "CHILD": 0x13, "TROPHY": 0x14, "MEDICINE": 0x15};

export class ROM {
    rom;
    romData;

    constructor(rom) {
        this.rom = rom;
        this.romData = parse(rom);
        this.spellItemSpriteData = this.getSpellTownItemSprites();
    }

    /**
     * Get spell town item sprites so we can transplant them where they are needed.
     */
    getSpellTownItemSprites = () => {
        let medSprite = [];
        let trophySprite = [];
        let kidSprite = [];

        for (let i = 0; i < 32; i++) {
            medSprite[i] = this.rom[0x23310 + i];
            trophySprite[i] = this.rom[0x232f0 + i];
            kidSprite[i] = this.rom[0x25310 + i];
        }

        return {
            MEDICINE: medSprite,
            TROPHY: trophySprite,
            CHILD: kidSprite
        }
    }

    /**
     * Fix sprites for palaces
     * @returns 
     */
    fixPalaceHeartSprite = () => {
        // TODO Clean this up and store memory locations in a cleaner fashion.
        // Write heart container to all 7 palaces sprites
        for (let i = 0; i < 64; i++)
        {
            let heartByte = this.rom[0x27810 + i];
            this.writeByteToROM(0x29810 + i, heartByte);
            this.writeByteToROM(0x2B810 + i, heartByte);
            this.writeByteToROM(0x2D810 + i, heartByte);
            this.writeByteToROM(0x33810 + i, heartByte);
            this.writeByteToROM(0x35810 + i, heartByte);
            this.writeByteToROM(0x37810 + i, heartByte);
            this.writeByteToROM(0x39810 + i, heartByte);
        }   
    }

    fixSpellTownSprites = (mappedLocation, mappedItem, continent) => {
        // Fix sprite data
        let spriteData = this.spellItemSpriteData[mappedItem];
        if (["P1", "P2", "P3", "P4", "P5", "P6", "GP"].includes(mappedLocation)) {
            let palacePaletteLocation = PALACE_PALETTE_LOCATIONS[mappedLocation];
            let patchRomAddress;
            switch(mappedItem) {
                case "CHILD":
                    patchRomAddress = 0x1eeb5;
                    break;
                case "TROPHY":
                    patchRomAddress = 0x1eeb7;
                    break;
                case "MEDICINE":
                    patchRomAddress = 0x1eeb9;
                    break;
                }
            if (spriteData && palacePaletteLocation) {
                this.writeBytesToROM(palacePaletteLocation, spriteData);
                this.writeBytesToROM(patchRomAddress, [0xAD, 0xAD]);
            }
        } else if (mappedLocation === "SPELL_TOWN") {
            let paletteLocation;
            let patchRomAddress, patchValue;
            switch(mappedItem) {
            case "CHILD":
                paletteLocation = 0x23570;
                patchRomAddress = 0x1eeb5;
                patchValue = 0x25;
                break;
            case "TROPHY":
                paletteLocation = 0x27250;
                patchRomAddress = 0x1eeb7;
                patchValue = 0x21;
                break;
            case "MEDICINE":
                paletteLocation = 0x27230;
                patchRomAddress = 0x1eeb9;
                patchValue = 0x23;
                break;
            }
            if (paletteLocation && spriteData && patchRomAddress && patchValue) {
                this.writeBytesToROM(paletteLocation, spriteData);
                this.writeBytesToROM(patchRomAddress, [patchValue, patchValue]);
            }
        } else {
            let paletteLocation;
            let patchRomAddress, patchValue;
            switch(mappedItem) {
            case "CHILD":
                if (continent < 2) {
                    paletteLocation = 0x23570;
                    patchRomAddress = 0x1eeb5;
                    patchValue = 0x57;
                }
                break;
            case "TROPHY":
                if (continent > 1) {
                    paletteLocation = 0x25410;
                    patchRomAddress = 0x1eeb7;
                    patchValue = 0x41;
                }
                break;
            case "MEDICINE":
                if (continent > 1) {
                    paletteLocation = 0x25430;
                    patchRomAddress = 0x1eeb9;
                    patchValue = 0x43;
                }
                break;
            }
            if (paletteLocation && spriteData && patchRomAddress && patchValue) {
                this.writeBytesToROM(paletteLocation, spriteData);
                this.writeBytesToROM(patchRomAddress, [patchValue, patchValue]);
            }
        }
    }

    /**
     * Correct dock and bridge locations
     * @param {string} location 
     * @param {number} x 
     * @param {number} y 
     * @returns 
     */
    correctContinentExitLocations = (location, x, y) => {
        if (!CONTINENT_EXIT_MAPPINGS[location]) {
            return;
        }

        let romAddresses = CONTINENT_EXIT_MAPPINGS[location];
        this.writeByteToROM(romAddresses.x, x);
        this.writeByteToROM(romAddresses.y, y);
    }

    /**
     * Assemble byte list from assembly code and write to rom address
     * @param {number} romAddress 
     * @param {string} asmCode 
     * @returns 
     */
    writeAsmToROM = (romAddress, asmCode) => {
        let bytes = assembleCode(asmCode);
        // console.log(bytes.map(byte => `0x${byte.toString(16)}`));
        return this.writeBytesToROM(romAddress, bytes);
    }
    
    /**
     * Write multiple bytes to the given rom address
     * @param {number} romAddress 
     * @param {Array} bytes 
     */
    writeBytesToROM = (romAddress, bytes) => {
        for (let i = 0; i < bytes.length; i++) {
            this.rom[romAddress + i] = bytes[i];
        }
    }
    
    /**
     * Writes a single byte to the given rom address
     * @param {number} romAddress 
     * @param {number} byte 
     */
    writeByteToROM = (romAddress, byte) => {
        this.rom[romAddress] = byte;
    }
    
    /**
     * Write field to rom (gets rom address from object metadata)
     * @param {object} object 
     * @param {string} field 
     */
    writeFieldToROM = (object, field) => {
        let {offset: romAddress, bitFields} = object._metadata[field];
        
        let byte = 0x0;
        bitFields.forEach(({mask, name}) => {
            let value = parseInt(object[name]);
            while ((mask & LAST_BIT_MASK) === 0) {
                mask = mask >> 1;
                value = value << 1;
            }
            byte += value;
        });
    
        this.rom[romAddress] = byte;
    }
    
    /**
     * Write object to rom address
     * @param {object} object 
     * @param {object} fieldMappings 
     * @param {number} romAddress 
     * @returns 
     */
    writeObjectToROM = (object, fieldMappings, romAddress) => {
        fieldMappings = fieldMappings.sort((a, b) => {
            return a.relOffset - b.relOffset;
        });
    
        let currentRelOffset = 0x0;
        let bytesWritten = 0;
        let bitFields = fieldMappings.filter(({relOffset}) => relOffset === currentRelOffset);
        while (bitFields.length > 0) {
            let byte = 0x0;
            bitFields.forEach(({mask, name}) => {
                let value = parseInt(object[name]);
                while ((mask & LAST_BIT_MASK) === 0) {
                    mask = mask >> 1;
                    value = value << 1;
                }
                byte += value;
            });
            bytesWritten++;
            currentRelOffset++;
            
            this.rom[romAddress++] = byte;
            bitFields = fieldMappings.filter(({relOffset}) => relOffset === currentRelOffset);
        } 
    
        return bytesWritten;
    }

    /**
     * Apply various qol improvements (lifted from digshake's randomizer)
     */
    miscPatches = () => {
        //Hacky fix for palace connections
        this.writeByteToROM(0x1074a, 0xfc);
        this.writeByteToROM(0x1477d, 0xfc);

        //Hacky fix for new kasuto
        this.writeByteToROM(0x8660, 0x51);
        this.writeByteToROM(0x924D, 0x00);
        
        //Hack fix for palace 6
        this.writeByteToROM(0x8664, 0xe6);
       
        //Fix for extra battle scene
        this.writeByteToROM(0x8645, 0x00);

        //Disable hold over head animation
        this.writeByteToROM(0x1e54c, 0x0);

        //Make text go fast
        this.writeByteToROM(0xf75e, 0x00);
        this.writeByteToROM(0xf625, 0x00);
        this.writeByteToROM(0xf667, 0x00);

        // Disable magic requirements (for now)
        this.writeByteToROM(0xf539, 0xc9);
        this.writeByteToROM(0xf53a, 0x0);
    }

    /**
     * Disable palaces turning to stone by placing nop slides over the instructions (lifted from digshake's randomizer)
     */
    disablePalaceTurningToStone = () => {
        this.writeBytesToROM(0x87b3, [ 0xea, 0xea, 0xea ]);
        this.writeBytesToROM(0x47ba, [ 0xea, 0xea, 0xea ]);
        this.writeBytesToROM(0x1e02e, [ 0xea, 0xea, 0xea ]);
    }

    /**
     * Change reset button combo to be on controller one (lifted from digshake's randomizer)
     */
    upAController = () => {
        this.writeByteToROM(0x21b0, 0xf7);
        this.writeByteToROM(0x21b2, 0x28);
        this.writeByteToROM(0x21ee, 0xf7);
        this.writeByteToROM(0x21f0, 0x28);
    }

    /**
     * Disable flashing because it's annoying and can hurt people (lifted from digshake's randomizer)
     */
    disableFlashing = () => {
        this.writeByteToROM(0x2a01,  0x12);
        this.writeByteToROM(0x2a02,  0x12);
        this.writeByteToROM(0x2a03,  0x12);
        this.writeByteToROM(0x1c9fA, 0x16);
        this.writeByteToROM(0x1c9fc, 0x16);
    }

    /**
     * Extend the map using the hack developed by cfrantz
     */
    extendMapSize = () => {
        // console.log("Extending map size");

        // Write code to create generalized loop function and NOP slide.
        this.writeAsmToROM(0x1cda8, `
            JMP $cdc6       # jump past our implanted loop
            LDY #$00        # Initialize start index         
            LDA ($02),Y     # load from source       
            STA ($20),Y     # Store to dest        
            INY             
            BPL $f9         # do it 128 times
            DEX             # decrement counter             
            BEQ $0e         # done yet?
            LDA ($02),Y     # load from source     
            STA ($20),Y     # store to dest     
            INY
            BNE $f9         # 128 more times
            INC $03         # increment source pointer      
            INC $21         # increment dest pointer
            DEX             # decrement counter
            BNE $e8         # not done? do it again.
            RTS             # return to caller
        `);
        for (let address = 0x1cdc6; address < 0x1cdd6; address++) {
            this.writeByteToROM(address, 0xea);
        }

        // Copy map data to RAM
        this.writeAsmToROM(0x1cdd6, `
            LDX $0706       # load overworld number into X
            LDA $cd27,X     # overworld to map pointer offset
            TAX             # into index X
            LDA $8508,X     # put ROM pointer into $02-$03
            STA $02
            LDA $8509,X
            STA $03

            LDA #$00        # put destination $7c00 into $20-$21
            STA $20
            LDA #$7c
            STA $21
            LDX #$07        # 7 half-pages == 896 bytes
            JSR $cd9b       # copy
        `);

        // Copy enemy list to RAM
        this.writeAsmToROM(0x1cdf4, `
            LDA #$a0        # load source $88a0 into $02-$03
            STA $02
            LDA #$88
            STA $03
            LDA #$70        # load dest $7000 into $20-$21 (address
            STA $21         #   $20 should still be 0)
            LDX #$08        # 8 half-pages == 1024 bytes
            JSR $cd9b       # copy
        `);

        // Redirect map to be stored into RAM at $7a00
        this.writeAsmToROM(0x1cde7, `
            LDA #$00        # put destination $7a00 into $20-$21
            STA $20
            LDA #$7a
            STA $21
            LDX #$0b        # 11 half-pages == 1408 bytes
            JSR $cd9b       # copy
        `);
        this.writeByteToROM(0x808, 0x7a);

        // Modify the map pointers to point to a larger place in ROM where our map will fit
        this.writeBytesToROM(0x4518, [  // West Continent
            0x70, 0xb4 
        ]);
        this.writeBytesToROM(0x451a, [  // Death Mountain
            0xf0, 0xb9 
        ]);
        this.writeBytesToROM(0x8518, [  // East Continent
            0x70, 0xb4 
        ]);
        this.writeBytesToROM(0x851a, [  // Maze Island
            0xf0, 0xb9 
        ]);
    }

    /**
     * Replace game text with new text
     * @param {string} oldText 
     * @param {string} newText 
     */
    replaceText = (oldText, newText) => {
        // console.log("OLD TEXT: " + oldText);
        let {offset, size} = this.romData.textData.find(({text}) => text === oldText);
        let replacement = stringToZ2Bytes(newText.slice(0, size - 1) + "\0");
        this.writeBytesToROM(offset, replacement);
    }

    /**
     * Modify and compress map
     * @param {Array} spriteMap 
     * @param {number} continent 
     * @returns 
     */
    compressMap = (mapBlocks, continent, graphData) => {
        // Write data to expanded map
        Object.keys(graphData).filter(nodeName => graphData[nodeName].continent === continent).forEach(nodeName => {
            let node = graphData[nodeName];
            let {x, y} = node;
            let {type} = locationMetadata[node.mappedLocation];
            mapBlocks[(y - 30) * 64 + x] = OVERWORLD_SPRITE_MAPPING[type];
        })

        // Recompress map to store
        let currentBlockType = null;
        let run = 0;
        let compressedMap = [];
        mapBlocks.forEach((mapBlock, index) => {
            if (currentBlockType !== mapBlock || run === 0xF || index % 64 === 0) {
                if (currentBlockType !== null) {
                    compressedMap.push({type: currentBlockType, length: run - 1});
                }
                run = 0;
                currentBlockType = mapBlock;
            }
            run++;
        });
        if (run > 0) {
            compressedMap.push({type: currentBlockType, length: run - 1});
        }

        printSpriteMap(compressedMap);

        return compressedMap;
    }

    /**
     * Patch the ROM with the graph
     * @param {string} fileName 
     */
    patchRom = (graphData, mapData) => {
        // Patch ROM here
        console.log("PATCHING ROM...");

        // Apply various patches
        this.extendMapSize();
        this.miscPatches();
        this.disablePalaceTurningToStone();
        this.disableFlashing();
        this.upAController();
        this.fixPalaceHeartSprite();

        // Set locations and items
        Object.keys(graphData).forEach((nodeName) => {
            // Gather all needed information from our location metadata and template
            let targetNode = graphData[nodeName];
            let {x, y, continent, mappedLocation, mappedItems} = targetNode;
            let mappedNode = Object.keys(graphData).find(mappedNodeName => graphData[mappedNodeName].locationKey === mappedLocation);
            let {locationKey} = graphData[mappedNode];

            // Acquire the node we are editting
            let nodeToEdit = this.romData.overworld[continent].locations[locationKey];

            // Modify the x and y position of the area
            nodeToEdit.x = x;
            nodeToEdit.y = y;
            this.writeFieldToROM(nodeToEdit, 'x');
            this.writeFieldToROM(nodeToEdit, 'y');

            // Apply corrections based on special areas
            switch (mappedLocation) {
                case "P6":
                case "SPELL_TOWN":
                    nodeToEdit.external = 1;
                    this.writeFieldToROM(nodeToEdit, 'external');
                    break;
                case "DM_BRIDGE_EXIT_E":
                case "DM_BRIDGE_EXIT_W":
                case "MAZE_ISLAND_BRIDGE":
                case "EAST_HYRULE_BRIDGE":
                case "RAFT_DOCK_E":
                case "RAFT_DOCK_W":
                    // Disable passthrough on these areas (yeah the docks don't have this issue, so sue me I'm lazy)
                    nodeToEdit.passThrough = 0;
                    this.writeFieldToROM(nodeToEdit, 'passThrough');

                    // Correct continent exits for bridges
                    this.correctContinentExitLocations(mappedLocation, x, y);
                    break;
            }

            // Set item locations
            if (mappedItems) {
                itemMetaData[mappedLocation].forEach((romOffset, index) => {
                    // Patch the rom location with the new item
                    romOffset = parseInt(romOffset, 16);
                    this.writeByteToROM(romOffset, ITEM_MAP[mappedItems[index]]);

                    // Correct spell town iteam
                    this.fixSpellTownSprites(mappedLocation, mappedItems[index], continent);
                });
            }
        });
        
        // Compress each sprite map and write it to memory
        for (let continent = 0; continent < 4; continent++) {
            let compressedMap = this.compressMap(vanillaMapData[continent], continent, graphData);
            let mapOffset = RANDO_MAP_OFFSETS[continent];

            compressedMap.forEach(blockRun => {
                let bytesWritten = 0;
                bytesWritten = this.writeObjectToROM(blockRun, [
                        {
                            name: 'length',
                            relOffset: 0x0,
                            mask: 0b11110000
                        },
                        {
                            name: 'type',
                            relOffset: 0x0,
                            mask: 0b00001111
                        }
                    ], mapOffset);
                mapOffset += bytesWritten;
            });
        }

        // Sign the ROM.
        let signature = stringToZ2Bytes("TKOS\0");
        this.writeBytesToROM(CREDITS_OFFSET, signature);
        
        // Do some fun text replacements
        this.replaceText("I AM\nERROR.", "I FARTED.");
        this.replaceText("I CAN GIVE\nYOU MOST\nPOWERFUL\nMAGIC.", "I CAN GIVE\nYOU\nDIARRHEA.");
        this.replaceText("WHEN YOU\nJUMP PRESS\nDOWNWARD\nTO STAB.", "PRESS DOWN\nTO STAB\nIDIOT.");
        this.replaceText("IF ALL\nELSE FAILS\nUSE FIRE.", "I AM\nKEVIN SMITH\nSNOOGINS.");
        this.replaceText("JUMP IN A\nHOLE IN\nTHE PALACE\nIF YOU GO.", "LEAP INTO\nTHE\nPALACUSSY.");
        this.replaceText("THIS MAGIC\nWORD WILL\nGIVE YOU\nPOWER.", "DO NOT SAY\nTHIS WORD\nIN CHURCH.");
        this.replaceText("BAGU IS MY\nNAME. SHOW\nMY NOTE TO\nRIVER MAN.", "YOU ARE\nHERE FOR\nBAGU SAUCE?");
        this.replaceText("ONLY TOWN\nFOLK MAY\nCROSS THIS\nRIVER!", "I WISH\nI HAD\nBAGU SAUCE.");
        this.replaceText("YOU KNOW\nBAGU? THEN\nI CAN HELP\nYOU CROSS.", "DUDE!\nBAGU SAUCE!\nPASTA TIME!");
        this.replaceText("I CANNOT\nHELP YOU\nANYMORE.\nGO NOW.", "DUDE...\nGTFO.");
        this.replaceText("THIS MAGIC\nWILL MAKE\nYOUR SWORD\nSHOOT FIRE", "THIS MAGIC\nIS ALMOST\nUSELESS.");
        this.replaceText("WHEN YOU\nJUMP PRESS\nUP TO STAB.", "USE THIS\nTO STAB\nBATS.");
        this.replaceText("DO YOU\nHAVE THE\n7 MAGIC\nCONTAINERS", "U MID BRO.");
        this.replaceText("YOU\nDESERVE\nMY HELP.\nFOLLOW ME.", "OH GOD!\nA MAN!\nFINALLY!");
        this.replaceText("THERE IS\nA SECRET\nAT EDGE\nOF TOWN.", "I CHANGED\nMY DRESS.\nSEGS?");
        
        return this.rom;
    }
}