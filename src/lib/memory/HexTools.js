const { getValueFromMap } = require("../Utils");

const LAST_BIT_MASK = 1 >>> 0;

const littleEndianConvert = (buffer) => {
    let n = 0;
    for (let i = buffer.length - 1; i >= 0; i--) {
        n = (n << 8) + buffer[i];
    }
    return n;
}

const bigEndianConvert = (buffer) => {
    let n = 0;
    for (let i = 0; i < buffer.length; i++) {
        n = (n << 8) + buffer[i];
    }
    return n;
}

const maskBits = (bytes, mask) => {
    let maskedValue = mask & bytes;
    while ((mask & LAST_BIT_MASK) == 0) {
        maskedValue = maskedValue >> 1;
        mask = mask >> 1;
    }

    return maskedValue;
}

const byteMaskExtractor = (fieldMap, bytes) => {
    let fields = {};
    bytes = bytes >>> 0;
    for (let key in fieldMap) {
        let mask = fieldMap[key];
        fields[key] = maskBits(bytes, mask);
    }
    return fields;
}

const extractFields = (fields, buffer, offset) => {
    let element = {};
    for (let {name, size, relOffset, mask} of fields) {
        let fieldSize = size || 1;
        mask = mask || 0b11111111;
        let fieldOffset = offset + relOffset;

        let fieldBytes = buffer.slice(fieldOffset, fieldOffset + fieldSize);
        fieldBytes = littleEndianConvert(fieldBytes);
        element[name] = maskBits(fieldBytes, mask);
    }
    return element;
}

const extractElements = (objDesc, buffer, start) => {
    let {size, elements: {size: elementSize, fields}} = objDesc;
    let elements = [];
    for (let offset = start, i = 0; offset < start + size; offset += elementSize, i++) {
        elements[i] = extractFields(fields, buffer, offset);
    }
    return elements;
}

const hexExtractor = (map, buffer, start = 0) => {
    let offset = start;
    let extracted = {};
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

        if (fields) {
            data = extractFields(fields, buffer, offset);
        } else if (elements) {
            data = extractElements({size, elements}, buffer, offset);
        }

        offset += size;
        extracted[key] = data;
    }

    return [extracted, offset];
}

const hexArrayExtractor = (map, buffer, nElements, start = 0) => {
    let elements = [];
    for (let i = 0; i < nElements; i++) {
        let [extracted, newOffset] = hexExtractor(map, buffer, start);
        start = newOffset;
        elements.push(extracted);
    }
    return elements;
}

exports.maskBits = maskBits;
exports.hexExtractor = hexExtractor;
exports.hexArrayExtractor = hexArrayExtractor;
exports.extractFields = extractFields;
exports.extractElements = extractElements;
exports.byteMaskExtractor = byteMaskExtractor;
exports.bigEndianConvert = bigEndianConvert;
exports.littleEndianConvert = littleEndianConvert;