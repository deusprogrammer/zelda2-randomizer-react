export const objectDig = (o, transform) => {
    if (o instanceof Object || o instanceof Array) {
        let modified = o instanceof Object ? {} : [];
        for (const key in o) {
            let value = o[key];
            modified[key] = objectDig(value, transform);
        }
        return modified;
    } else {
        return transform(o);
    }
}

export const getValueFromMap = (obj, path) => {
    let pathSegments = path.split(".");
    let objPtr = obj;
    for (let pathSegment of pathSegments) {
        if (!objPtr[pathSegment]) {
            return null;
        }
        objPtr = objPtr[pathSegment];
    }

    return objPtr;
}

export const colorize = (color, output) => {
    return output;
}

export const snakeCaseToCamelCase = (value) => {
    let newName = "";
    let state = "LOWER";
    for (let c of value) {
        if (c === "_") {
            state = "UPPER";
            continue;
        }

        switch (state) {
            case "LOWER":
                c = c.toLowerCase();
                break;
            case "UPPER":
                c = c.toUpperCase();
                state = "LOWER";
                break;
        }

        newName += c;
    }

    return newName;
}

export const create2D = (width, height) => {
    let buffer = [];

    for (let i = 0; i < width * height; i++ ) {
        buffer.push(null);
    }

    return buffer;
}

export const plot2D = (buffer, width, x, y, value) => {
    let oldValue = buffer[y*width + x];
    buffer[y*width + x] = value;
    return oldValue;
}

export const rectangle2D = (buffer, width, x1, y1, x2, y2, c) => {
    let yStart = Math.min(y1, y2);
    let yEnd = Math.max(y1, y2);
    for (let y = yStart; y < yEnd; y++) {
        hLine2D(buffer, width, x1, x2, y, c);
    }
}

export const hLine2D = (buffer, width, x1, x2, y, c) => {
    let start = Math.min(x1, x2);
    let end = Math.max(x1, x2);

    for (let x = start; x <= end; x++) {
        plot2D(buffer, width, x, y, c);
    }
}

export const vLine2D = (buffer, width, y1, y2, x, c) => {
    let start = Math.min(y1, y2);
    let end = Math.max(y1, y2);

    for (let y = start; y <= end; y++) {
        plot2D(buffer, width, x, y, c);
    }
}

export const layer2D = (...layerBuffers) => {
    console.log("LENGTH: " + layerBuffers[0].length);
    let buffer = [];
    for (let i = 0; i < layerBuffers[0].length; i++) {
        buffer.push(null);
    }
    for (let i = 0; i < layerBuffers.length; i++) {
        let layerBlocks = layerBuffers[i];
        for (let j = 0; j < layerBuffers[0].length; j++) {
            let layerBlock = layerBlocks[j];
            if (layerBlock) {
                buffer[j] = layerBlock;
            }
        }
    }

    return buffer;
}

export const draw2D = (buffer, width) => {
    process.stdout.write(' ');
    for (let i = 0; i < width; i++) {
        process.stdout.write((i % 16).toString(16));
    }
    for (let i = 0; i < buffer.length; i++) {
        let element = buffer[i] || ' ';
        if (i % width === 0) {
            console.log();
            process.stdout.write(((i / width) % 16).toString(16));
        }
        process.stdout.write(element);
    };
    console.log();
    console.log();
}

export const sleep = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {resolve()}, ms);
    });
}