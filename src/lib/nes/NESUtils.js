import { extractFields, hexExtractor } from "../memory/HexTools";
import { NES_HEADER_MAP } from "./NESMemoryMappings";

export const extractNESHeaders = (rom) => {
    return hexExtractor(NES_HEADER_MAP, rom, 0x0);
}

export const calculateNESOffsets = (headers) => {
    let trainerSize = headers.trainer === 1 ? 0x0200 : 0;
    let prgRomSize = headers.prgRomSize * 0x4000;
    let chrRomSize = headers.chrRomSize * 0x2000;

    return {
        HEADER: {
            size: 0x10,
            offset: 0x00
        },
        TRAINER: {
            size: trainerSize,
            offset: 0x10
        },
        PRG_ROM: {
            size: prgRomSize,
            offset: 0x10 + trainerSize
        },
        CHR_ROM: {
            size: chrRomSize,
            offset: 0x10 + trainerSize + prgRomSize
        }
    };
}

export const CDL_MAPPING = [
    {
        name: 'codeAccess',
        relOffset: 0x00,
        mask: 0b00000001
    },
    {
        name: 'dataAccess',
        relOffset: 0x00,
        mask: 0b00000010
    },
    {
        name: 'romBank',
        relOffset: 0x00,
        mask: 0b00001100
    },
    {
        name: 'indirectCodeAccess',
        relOffset: 0x00,
        mask: 0b00010000
    },
    {
        name: 'indirectDataAccess',
        relOffset: 0x00,
        mask: 0b00100000
    },
    {
        name: 'pcmAudioData',
        relOffset: 0x00,
        mask: 0b01000000
    },
    {
        name: 'unused',
        relOffset: 0x00,
        mask: 0b10000000
    }
];

export const extractCDLEntries = (cdlData) => {
    let entries = [];
    for (let i = 0; i < cdlData.byteLength; i++) {
        let entry = extractFields(CDL_MAPPING, cdlData, i);
        entry.noAccess = cdlData[i] === 0x0;
        entries.push({...entry, cdlData});
    }

    return entries;
}