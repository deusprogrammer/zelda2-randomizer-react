import fs from 'fs';
import {extractFields} from '../memory/HexTools';

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
        if (cdlData[i] !== 0x0) {
            let entry = extractFields(CDL_MAPPING, cdlData, i);
            entries.push(entry);
        }
    }

    return entries;
}