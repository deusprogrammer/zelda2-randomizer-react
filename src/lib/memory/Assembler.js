const opPatterns = {
    implied:        /^([A-Z]{3})(?:\s*#[^\$]+)*$/,
    accumulator:    /^([A-Z]{3}) A(?:\s*#.+)*$/,
    immediate:      /^([A-Z]{3}) #\$([0-9a-fA-F]{2})(?:\s*#.+)*$/,
    zeroPage:       /^([A-Z]{3}) \$([0-9a-fA-F]{2})(?:\s*#.+)*$/,
    zeroPageX:      /^([A-Z]{3}) \$([0-9a-fA-F]{2}),X(?:\s*#.+)*$/,
    zeroPageY:      /^([A-Z]{3}) \$([0-9a-fA-F]{2}),Y(?:\s*#.+)*$/,
    absolute:       /^([A-Z]{3}) \$([0-9a-fA-F]{2})([0-9a-fA-F]{0,2})(?:\s*#.+)*$/,
    absoluteX:      /^([A-Z]{3}) \$([0-9a-fA-F]{2})([0-9a-fA-F]{0,2}),X(?:\s*#.+)*$/,
    absoluteY:      /^([A-Z]{3}) \$([0-9a-fA-F]{2})([0-9a-fA-F]{0,2}),Y(?:\s*#.+)*$/,
    indirect:       /^([A-Z]{3}) \(\$([0-9a-fA-F]{2})([0-9a-fA-F]{0,2})(?:\s*#.+)*$/,
    indirectX:      /^([A-Z]{3}) \((\$[0-9a-fA-F]{2})([0-9a-fA-F]{0,2}),X\)(?:\s*#.+)*$/,
    indirectY:      /^([A-Z]{3}) \(\$([0-9a-fA-F]{2})([0-9a-fA-F]{0,2})\),Y(?:\s*#.+)*$/
}

const opCodes = {
    ADC: {
        variants: {
            immediate: {
                hex: 0x69,
                length: 2
            },
            zeroPage: {
                hex: 0x65,
                length: 2
            },
            zeroPageX: {
                hex: 0x75,
                length: 2
            },
            absolute: {
                hex: 0x6d,
                length: 3
            },
            absoluteX: {
                hex: 0x7d,
                length: 3
            },
            absoluteY: {
                hex: 0x79,
                length: 3
            },
            indirectX: {
                hex: 0x61,
                length: 2
            },
            indirectY: {
                hex: 0x71,
                length: 2
            }
        }
    },
    AND: {
        variants: {
            immediate: {
                hex: 0x29,
                length: 1
            },
            zeroPage: {
                hex: 0x25,
                length: 2
            },
            zeroPageX: {
                hex: 0x35,
                length: 2
            },
            absolute: {
                hex: 0x2d,
                length: 3
            },
            absoluteX: {
                hex: 0x3d,
                length: 3
            },
            absoluteY: {
                hex: 0x39,
                length: 3
            },
            indirectX: {
                hex: 0x21,
                length: 2
            },
            indirectY: {
                hex: 0x31,
                length: 2
            }
        }
    },
    ASL: {
        variants: {
            accumulator: {
                hex: 0x0a,
                length: 1
            },
            zeroPage: {
                hex: 0x06,
                length: 2
            },
            zeroPageX: {
                hex: 0x16,
                length: 2
            },
            absolute: {
                hex: 0x0e,
                length: 3
            },
            absoluteX: {
                hex: 0x1e,
                length: 3
            }
        }
    },
    BIT: {
        variants: {
            zeroPage: {
                hex: 0x65,
                length: 2
            },
            absolute: {
                hex: 0x6d,
                length: 3
            }
        }
    },
    BRK: {
        variants: {
            implied: {
                hex: 0x00,
                length: 1
            }
        }
    },
    CMP: {
        variants: {
            immediate: {
                hex: 0x69,
                length: 2
            },
            zeroPage: {
                hex: 0x65,
                length: 2
            },
            zeroPageX: {
                hex: 0x75,
                length: 2
            },
            absolute: {
                hex: 0x6d,
                length: 3
            },
            absoluteX: {
                hex: 0x7d,
                length: 3
            },
            absoluteY: {
                hex: 0x79,
                length: 3
            },
            indirectX: {
                hex: 0x61,
                length: 2
            },
            indirectY: {
                hex: 0x71,
                length: 2
            }
        }
    },
    CPX: {
        variants: {
            immediate: {
                hex: 0xe0,
                length: 2
            },
            zeroPage: {
                hex: 0xe4,
                length: 2
            },
            absolute: {
                hex: 0xec,
                length: 3
            }
        }
    },
    CPY: {
        variants: {
            immediate: {
                hex: 0xc0,
                length: 2
            },
            zeroPage: {
                hex: 0xc4,
                length: 2
            },
            absolute: {
                hex: 0xcc,
                length: 3
            }
        }
    },
    DEC: {
        variants: {
            zeroPage: {
                hex: 0xc6,
                length: 2
            },
            zeroPageX: {
                hex: 0xd6,
                length: 2
            },
            absolute: {
                hex: 0xce,
                length: 3
            },
            absoluteX: {
                hex: 0xde,
                length: 3
            }
        }
    },
    EOR: {
        variants: {
            immediate: {
                hex: 0x49,
                length: 2
            },
            zeroPage: {
                hex: 0x45,
                length: 2
            },
            zeroPageX: {
                hex: 0x55,
                length: 2
            },
            absolute: {
                hex: 0x4d,
                length: 3
            },
            absoluteX: {
                hex: 0x5d,
                length: 3
            },
            absoluteY: {
                hex: 0x59,
                length: 3
            },
            indirectX: {
                hex: 0x41,
                length: 2
            },
            indirectY: {
                hex: 0x51,
                length: 2
            }
        }
    },
    INC: {
        variants: {
            zeroPage: {
                hex: 0xe6,
                length: 2
            },
            zeroPageX: {
                hex: 0xf6,
                length: 2
            },
            absolute: {
                hex: 0xee,
                length: 3
            },
            absoluteX: {
                hex: 0xfe,
                length: 3
            }
        }
    },
    JMP: {
        variants: {
            absolute: {
                hex: 0x4c,
                length: 3
            },
            indirect: {
                hex: 0x6c,
                length: 3
            }
        }
    },
    JSR: {
        variants: {
            absolute: {
                hex: 0x20,
                length: 3
            }
        }
    },
    LDA: {
        variants: {
            immediate: {
                hex: 0xa9,
                length: 2
            },
            zeroPage: {
                hex: 0xa5,
                length: 2
            },
            zeroPageX: {
                hex: 0xb5,
                length: 2
            },
            absolute: {
                hex: 0xad,
                length: 3
            },
            absoluteX: {
                hex: 0xbd,
                length: 3
            },
            absoluteY: {
                hex: 0xb9,
                length: 3
            },
            indirectX: {
                hex: 0xa1,
                length: 2
            },
            indirectY: {
                hex: 0xb1,
                length: 2
            }
        }
    },
    LDX: {
        variants: {
            immediate: {
                hex: 0xa2,
                length: 2
            },
            zeroPage: {
                hex: 0xa6,
                length: 2
            },
            zeroPageY: {
                hex: 0xb6,
                length: 2
            },
            absolute: {
                hex: 0xae,
                length: 3
            },
            absoluteY: {
                hex: 0xbe,
                length: 3
            }
        }
    },
    LDY: {
        variants: {
            immediate: {
                hex: 0xa0,
                length: 2
            },
            zeroPage: {
                hex: 0xa4,
                length: 2
            },
            zeroPageX: {
                hex: 0xb4,
                length: 2
            },
            absolute: {
                hex: 0xac,
                length: 3
            },
            absoluteX: {
                hex: 0xbc,
                length: 3
            }
        }
    },
    ADC: {
        variants: {
            immediate: {
                hex: 0x69,
                length: 2
            },
            zeroPage: {
                hex: 0x65,
                length: 2
            },
            zeroPageX: {
                hex: 0x75,
                length: 2
            },
            absolute: {
                hex: 0x6d,
                length: 3
            },
            absoluteX: {
                hex: 0x7d,
                length: 3
            },
            absoluteY: {
                hex: 0x79,
                length: 3
            },
            indirectX: {
                hex: 0x61,
                length: 2
            },
            indirectY: {
                hex: 0x71,
                length: 2
            }
        }
    },
    NOP: {
        variants: {
            implied: {
                hex: 0xea,
                length: 1
            }
        },
    },
    ORA: {
        variants: {
            immediate: {
                hex: 0x09,
                length: 2
            },
            zeroPage: {
                hex: 0x05,
                length: 2
            },
            zeroPageX: {
                hex: 0x15,
                length: 2
            },
            absolute: {
                hex: 0x0d,
                length: 3
            },
            absoluteX: {
                hex: 0x1d,
                length: 3
            },
            absoluteY: {
                hex: 0x19,
                length: 3
            },
            indirectX: {
                hex: 0x01,
                length: 2
            },
            indirectY: {
                hex: 0x11,
                length: 2
            }
        }
    },
    ROL: {
        variants: {
            accumulator: {
                hex: 0x2a,
                length: 2
            },
            zeroPage: {
                hex: 0x26,
                length: 2
            },
            zeroPageX: {
                hex: 0x36,
                length: 2
            },
            absolute: {
                hex: 0x2e,
                length: 3
            },
            absoluteX: {
                hex: 0x3e,
                length: 3
            }
        }
    },
    ROR: {
        variants: {
            accumulator: {
                hex: 0x6a,
                length: 2
            },
            zeroPage: {
                hex: 0x66,
                length: 2
            },
            zeroPageX: {
                hex: 0x76,
                length: 2
            },
            absolute: {
                hex: 0x6e,
                length: 3
            },
            absoluteX: {
                hex: 0x7e,
                length: 3
            }
        }
    },
    RTI: {
        variants: {
            implied: {
                hex: 0x40,
                length: 1
            }
        }
    },
    RTS: {
        variants: {
            implied: {
                hex: 0x60,
                length: 1
            }
        }
    },
    SUBC: {
        variants: {
            immediate: {
                hex: 0xe9,
                length: 2
            },
            zeroPage: {
                hex: 0xe5,
                length: 2
            },
            zeroPageX: {
                hex: 0xf5,
                length: 2
            },
            absolute: {
                hex: 0xed,
                length: 3
            },
            absoluteX: {
                hex: 0xfd,
                length: 3
            },
            absoluteY: {
                hex: 0xf9,
                length: 3
            },
            indirectX: {
                hex: 0xe1,
                length: 2
            },
            indirectY: {
                hex: 0xf1,
                length: 2
            }
        }
    },
    STA: {
        variants: {
            zeroPage: {
                hex: 0x85,
                length: 2
            },
            zeroPageX: {
                hex: 0x95,
                length: 2
            },
            absolute: {
                hex: 0x8d,
                length: 3
            },
            absoluteX: {
                hex: 0x9d,
                length: 3
            },
            absoluteY: {
                hex: 0x99,
                length: 3
            },
            indirectX: {
                hex: 0x81,
                length: 2
            },
            indirectY: {
                hex: 0x91,
                length: 2
            }
        }
    },
    STX: {
        variants: {
            zeroPage: {
                hex: 0x86,
                length: 2
            },
            zeroPageY: {
                hex: 0x96,
                length: 2
            },
            absolute: {
                hex: 0x8e,
                length: 3
            }
        }
    },
    STY: {
        variants: {
            zeroPage: {
                hex: 0x84,
                length: 2
            },
            zeroPageX: {
                hex: 0x94,
                length: 2
            },
            absolute: {
                hex: 0x8c,
                length: 3
            }
        }
    },
    TAX: {
        hex: 0xaa,
        length: 1
    },
    TXA: {
        hex: 0x8a,
        length: 1
    },
    DEX: {
        hex: 0xca,
        length: 1
    },
    INX: {
        hex: 0xe8,
        length: 1
    },
    TAY: {
        hex: 0xa8,
        length: 1
    },
    TYA: {
        hex: 0x98,
        length: 1
    },
    DEY: {
        hex: 0x88,
        length: 1
    },
    INY: {
        hex: 0xc8,
        length: 1
    },
    TXS: {
        hex: 0x9a,
        length: 1
    },
    TSX: {
        hex: 0xba,
        length: 1
    },
    PHA: {
        hex: 0x48,
        length: 1
    },
    PLA: {
        hex: 0x68,
        length: 1
    },
    PHP: {
        hex: 0x08,
        length: 1
    },
    PLP: {
        hex: 0x28,
        length: 1
    },
    CLC: {
        hex: 0x18,
        length: 1
    },
    SEC: {
        hex: 0x38,
        length: 1
    },
    CLI: {
        hex: 0x58,
        length: 1
    },
    SEI: {
        hex: 0x78,
        length: 1
    },
    CLV: {
        hex: 0xb8,
        length: 1
    },
    CLD: {
        hex: 0xd8,
        length: 1
    },
    SED: {
        hex: 0xf8,
        length: 1
    },
    BPL: {
        hex: 0x10,
        length: 1
    },
    BMI: {
        hex: 0x30,
        length: 1
    },
    BVC: {
        hex: 0x50,
        length: 1
    },
    BVS: {
        hex: 0x70,
        length: 1
    },
    BCC: {
        hex: 0x90,
        length: 1
    },
    BCS: {
        hex: 0xb0,
        length: 1
    },
    BNE: {
        hex: 0xd0,
        length: 1
    },
    BEQ: {
        hex: 0xf0,
        length: 1
    }
}

const parseLine = (line) => {
    line = line.trim();

    if (!line) {
        return [];
    }

    let type = Object.keys(opPatterns).find((key) => {
        let pattern = opPatterns[key];
        return pattern.test(line);
    });

    if (!type) {
        console.log("NO TYPE");
        return [];
    }

    let [, op, ...bytes] = opPatterns[type].exec(line);

    if (!op || !opCodes[op]) {
        console.log("NO OP " + op);
        return [];
    }

    let opHex = !opCodes[op].hex ? opCodes[op].variants[type].hex : opCodes[op].hex;
    bytes = bytes.map(byte => byte ? parseInt(byte, 16) : null).filter(byte => byte !== null);
    console.log(`${op} ${type.padEnd(16)} [0x${opHex.toString(16)}] ${bytes.map(byte => "0x" + byte.toString(16))}`);

    if (bytes.length === 1) {
        return [opHex, ...bytes];
    }

    let reversedBytes = [];
    let byte;
    while (byte = bytes.pop()) {
        reversedBytes.push(byte);
    }
    
    return [opHex, ...reversedBytes];
}

export const assembleCode = (code) => {
    let bytes = [];
    code.split('\n').forEach((line) => {
        bytes = [...bytes, ...parseLine(line)];
    });
    return bytes;
}