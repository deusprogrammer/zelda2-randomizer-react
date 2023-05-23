import parse from "../Z2Parser";
import { assembleCode } from "../memory/Assembler";
import { stringToZ2Bytes } from "../zelda2/Z2Utils";

const LAST_BIT_MASK = 1 >>> 0;

export class ROM {
    rom;
    romData;

    constructor(rom) {
        this.rom = rom;
        this.romData = parse(rom);
    }

    /**
     * Assemble byte list from assembly code and write to rom address
     * @param {number} romAddress 
     * @param {string} asmCode 
     * @returns 
     */
    writeAsmToROM = (romAddress, asmCode) => {
        let bytes = assembleCode(asmCode);
        console.log(bytes.map(byte => `0x${byte.toString(16)}`));
        return this.writeBytesToROM(romAddress, bytes);
    }
    
    /**
     * Write multiple bytes to the given rom address
     * @param {number} romAddress 
     * @param {Array} bytes 
     */
    writeBytesToROM = (romAddress, bytes) => {
        for (let i = 0; i < bytes.length; i++) {
            console.log(`WRITING 0x${bytes[i].toString(16)} TO 0x${romAddress.toString(16)}`);
            this.rom[romAddress + i] = bytes[i];
        }
    }
    
    /**
     * Writes a single byte to the given rom address
     * @param {number} romAddress 
     * @param {number} byte 
     */
    writeByteToROM = (romAddress, byte) => {
        console.log(`WRITING 0x${byte.toString(16)} TO 0x${romAddress.toString(16)}`);
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
    }

    /**
     * Disable palaces turning to stone by placing nop slides over the instructions  (lifted from digshake's randomizer)
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
        console.log("Extending map size");

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
     * Get the rom bytes
     * @returns 
     */
    getRom = () => {
        return this.rom;
    }

    /**
     * Replace game text with new text
     * @param {string} oldText 
     * @param {string} newText 
     */
    replaceText = (oldText, newText) => {
        let {offset, size} = this.romData.textData.find(({text}) => text === oldText);
        let replacement = stringToZ2Bytes(newText.slice(0, size - 1) + "\0");
        this.writeBytesToROM(offset, replacement);
    }
}