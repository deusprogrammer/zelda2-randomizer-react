import { getValueFromMap }  from "../Utils";
import { assembleCode } from "./assembler";

const LAST_BIT_MASK = 1 >>> 0;

export const writeAsmToROM = (romAddress, rom, asmCode) => {
    return writeBytesToROM(romAddress, rom, assembleCode(asmCode));
}

export const writeBytesToROM = (romAddress, rom, bytes) => {
    for (let i = 0; i < bytes.length; i++) {
        console.log(`WRITING 0x${bytes[i].toString(16)} TO 0x${romAddress.toString(16)}`);
        rom[romAddress + i] = bytes[i];
    }

    return rom;
}

export const writeByteToROM = (romAddress, rom, byte) => {
    console.log(`WRITING 0x${byte.toString(16)} TO 0x${romAddress.toString(16)}`);
    rom[romAddress] = byte;

    return rom;
}

export const writeFieldToROM = (object, field, bytes) => {
    let romDataCopy = new Uint8Array(bytes);
    let {offset: romAddress, bitFields} = object._metadata[field];
    
    let byte = 0x0;
    bitFields.forEach(({mask, name}) => {
        let value = parseInt(object[name]);
        // console.log(name + " => " + value.toString(2) + " " + value);
        while ((mask & LAST_BIT_MASK) === 0) {
            mask = mask >> 1;
            value = value << 1;
        }
        byte += value;
    });

    romDataCopy[romAddress] = byte;

    return romDataCopy;
}

export const writeObjectToROM = (object, fieldMappings, romAddress, bytes) => {
    let romDataCopy = new Uint8Array(bytes);

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
        
        romDataCopy[romAddress++] = byte;
        bitFields = fieldMappings.filter(({relOffset}) => relOffset === currentRelOffset);
    } 

    return [romDataCopy, bytesWritten];
}

export const littleEndianConvert = (buffer) => {
    let n = 0;
    for (let i = buffer.length - 1; i >= 0; i--) {
        n = (n << 8) + buffer[i];
    }
    return n;
}

export const bigEndianConvert = (buffer) => {
    let n = 0;
    for (let i = 0; i < buffer.length; i++) {
        n = (n << 8) + buffer[i];
    }
    return n;
}

export const maskBits = (bytes, mask) => {
    let maskedValue = mask & bytes;
    while ((mask & LAST_BIT_MASK) === 0) {
        maskedValue = maskedValue >> 1;
        mask = mask >> 1;
    }

    return maskedValue;
}

export const byteMaskExtractor = (fieldMap, bytes) => {
    let fields = {};
    bytes = bytes >>> 0;
    for (let key in fieldMap) {
        let mask = fieldMap[key];
        fields[key] = maskBits(bytes, mask);
    }
    return fields;
}

export const extractFields = (fields, buffer, offset) => {
    let element = {};
    let metadata = {};
    for (let {name, size, relOffset, mask} of fields) {
        let fieldSize = size || 1;
        mask = mask || 0b11111111;
        let fieldOffset = offset + relOffset;

        let fieldBytes = buffer.slice(fieldOffset, fieldOffset + fieldSize);
        fieldBytes = littleEndianConvert(fieldBytes);
        element[name] = maskBits(fieldBytes, mask);
        metadata[name] = {
            offset: fieldOffset,
            bitFields: fields.filter(({relOffset: fieldRelOffset}) => fieldRelOffset === relOffset)
        }
    }
    element._offset = offset;
    element._metadata = metadata;
    return element;
}

export const extractElements = (objDesc, buffer, start) => {
    let {size, elements: {size: elementSize, fields}} = objDesc;
    let elements = [];
    for (let offset = start, i = 0; offset < start + size; offset += elementSize, i++) {
        elements[i] = extractFields(fields, buffer, offset);
    }
    return elements;
}

export const calculateOffset = (map, offset, fieldName) => {
    let field = map.find(field => field.name === fieldName);
    return offset + field.relOffset;
}

export const hexExtractor = (map, buffer, start = 0) => {
    let offset = start;
    let extracted = {_metadata: {}};
    for (let key in map) {
        let {fields, elements, size, sizeRef, sizeRefAdjustment, offset: offsetOverride} = map[key];

        if (!sizeRefAdjustment) {
            sizeRefAdjustment = 0;
        }

        if (sizeRef) {
            size = getValueFromMap(extracted, sizeRef) + sizeRefAdjustment;
        } else if (!size) {
            size = 1;
        }

        if (offsetOverride) {
            offset = start + offsetOverride;
        }

        let data = null;
        if (fields) {
            data = extractFields(fields, buffer, offset);
        } else if (elements) {
            data = extractElements({size, elements}, buffer, offset);
        } else {
            data = buffer.slice(offset, offset + size);
            data = littleEndianConvert(data);
        }

        offset += size;
        extracted[key] = data;
        extracted._metadata[key] = {
            offset
        }
    }

    extracted._offset = start;

    return [extracted, offset];
}

export const hexArrayExtractor = (map, buffer, nElements, start = 0) => {
    let elements = [];
    for (let i = 0; i < nElements; i++) {
        let [extracted, newOffset] = hexExtractor(map, buffer, start);
        start = newOffset;
        elements.push(extracted);
    }
    return elements;
}