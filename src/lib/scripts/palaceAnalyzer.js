import roomMetaData from './z2-rooms.v3.meta.js';

let exitCounts = [{
    LEFT: 0,
    RIGHT: 0,
    UP: 0,
    DOWN: 0
},{
    LEFT: 0,
    RIGHT: 0,
    UP: 0,
    DOWN: 0
},{
    LEFT: 0,
    RIGHT: 0,
    UP: 0,
    DOWN: 0
}];

let exitCombos = [{},{},{}];

let numberOfExits = [
    [0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]
];

let deadEnds = [{
    LEFT: 0,
    RIGHT: 0,
    UP: 0,
    DOWN: 0
},{
    LEFT: 0,
    RIGHT: 0,
    UP: 0,
    DOWN: 0
},{
    LEFT: 0,
    RIGHT: 0,
    UP: 0,
    DOWN: 0
}];

let memoryReferences = [{},{},{}];

Object.keys(roomMetaData).forEach((key) => {
    let bank = parseInt(key.split(":")[0]);
    let {exits, memoryLocation} = roomMetaData[key];
    numberOfExits[bank - 5][exits.length]++;
    if (exits.length === 1) {
        deadEnds[bank - 5][exits[0]]++;
    }

    for (let exit in exitCounts[0]) {
        if (exits.includes(exit)) {
            exitCounts[bank - 5][exit]++;
        }
    }

    let exitsKey = exits.sort().join("_");
    if (!exitCombos[bank - 5][exitsKey]) {
        exitCombos[bank - 5][exitsKey] = 0;
    }

    exitCombos[bank - 5][exitsKey]++;

    if (!memoryReferences[bank - 5][memoryLocation]) {
        memoryReferences[bank - 5][memoryLocation] = [];
    }
    memoryReferences[bank - 5][memoryLocation].push(key);
});

console.log("DEAD ENDS: " + JSON.stringify(deadEnds, null, 5));
console.log("NUMBER OF EXITS:");
numberOfExits.forEach(([, one, two, three, four]) => {
    console.log("ONE:   " + one);
    console.log("TWO:   " + two);
    console.log("THREE: " + three);
    console.log("FOUR   " + four);
    console.log("----------");
});
console.log("EXIT COUNTS: \n" + JSON.stringify(exitCounts, null, 5));
console.log("EXIT COMBOS: \n" + JSON.stringify(exitCombos, null, 5));
console.log("MEMORY REFS: \n" + JSON.stringify(memoryReferences, null, 5));