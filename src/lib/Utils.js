const objectDig = (o, transform) => {
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

const getValueFromMap = (obj, path) => {
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

const colorize = (color, output) => {
    return output;
}

console.json = (value) => {
    console.log(JSON.stringify(value, null, 5));
}

console.hexTable = (obj) => {
    console.table(objectDig(obj, (value) => "0x" + value.toString(16)));
}

console.binTable = (obj) => {
    console.table(objectDig(obj, (value) => "0b" + value.toString(2)));
}

const snakeCaseToCamelCase = (value) => {
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

const create2D = (width, height) => {
    return new Array(width * height);
}

const plot2D = (buffer, width, x, y, value) => {
    let oldValue = buffer[y*width + x];
    buffer[y*width + x] = value;
    return oldValue;
}

const rectangle2D = (buffer, width, x1, y1, x2, y2, c) => {
    let yStart = Math.min(y1, y2);
    let yEnd = Math.max(y1, y2);
    for (let y = yStart; y < yEnd; y++) {
        hLine2D(buffer, width, x1, x2, y, c);
    }
}

const hLine2D = (buffer, width, x1, x2, y, c) => {
    let start = Math.min(x1, x2);
    let end = Math.max(x1, x2);

    for (let x = start; x <= end; x++) {
        plot2D(buffer, width, x, y, c);
    }
}

const vLine2D = (buffer, width, y1, y2, x, c) => {
    let start = Math.min(y1, y2);
    let end = Math.max(y1, y2);

    for (let y = start; y <= end; y++) {
        plot2D(buffer, width, x, y, c);
    }
}

const layer2D = (...layerBuffers) => {
    let buffer = new Array(layerBuffers[0].length);
    for (let i = 0; i < layerBuffers.length; i++) {
        let layer = layerBuffers[i];
        layer.forEach((block, j) => {
            buffer[j] = block;
        })
    }

    return buffer;
}

const draw2D = (buffer, width) => {
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

exports.snakeCaseToCamelCase = snakeCaseToCamelCase;
exports.getValueFromMap = getValueFromMap;
exports.objectDig = objectDig;
exports.colorize = colorize;

exports.create2D = create2D;
exports.plot2D = plot2D;
exports.draw2D = draw2D;
exports.layer2D = layer2D;
exports.hLine2D = hLine2D;
exports.vLine2D = vLine2D;
exports.rectangle2D = rectangle2D;