import roomMetaData from '../zelda2/templates/z2-rooms.meta';

const EXIT_DIRECTIONS = {
    DOWN: "UP",
    LEFT: "RIGHT",
    RIGHT: "LEFT",
    UP: "DOWN"
}

const ENTRANCE_DIRECTIONS = {
    DOWN: "UP",
    UP: "DOWN",
    RIGHT: "LEFT",
    LEFT: "RIGHT"
}

const PALACE_ROOM_COUNT = [
    14,
    21,
    13,
    21,
    27,
    27,
    60
]

/**
 * Choose a random node from a list deterministically based on seed
 * @param {Array} nodes
 * @returns
 */
const chooseRandomNode = (nodes) => {
    let r = Math.trunc(Math.random() * nodes.length);
    return nodes[r];
};

let rooms = Object.values(roomMetaData);
for (let bank = 5; bank <= 7; bank++) {
    for (let p = 1; p <= 7; p++) {
        let entrance = rooms.find(({palace, type}) => palace === p && type === "ENTRANCE");
        let boss = rooms.find(({palace, type}) => palace === p && type === "BOSS");
        let item = rooms.find(({palace, items}) => palace === p && items && items.length > 0);
        let deadEnds = rooms.filter(({exits, items}) => exits.length === 1 && items.length === 0);
        let availableRooms = rooms.filter(({exits, items, mapSet, type}) => bank === mapSet && exits.length > 1 && type !== "ENTRANCE" && type !== "BOSS" && items.length === 0);

        // Build palace starting with entrance
        let currentRoom = entrance;
        let currentRooms = [entrance];
        currentRoom.exits = currentRoom.exits.filter((exit) => exit !== "LEFT");
        for (let roomCount = 0; roomCount < PALACE_ROOM_COUNT[p - 1] - 2; roomCount++) {
            // Pick a connecting room and remove it from the pool
            let randomExit = chooseRandomNode(currentRoom.exits);
            let nextEntrance = ENTRANCE_DIRECTIONS[randomExit];
            let nextRoom = availableRooms.filter(({exits}) => exits.includes(nextEntrance));

            // Filter out used exits
            currentRoom.exits = currentRoom.exits.filter((exit) => exit !== randomExit);
            nextRoom.exits = nextRoom.exits.filter((exit) => exit !== randomExit);

            // Push next room into currentRooms we are still assigning exits for
            currentRooms.push(nextRoom);

            // Clear out any rooms that have all of their exits consumed
            currentRooms = currentRooms.filter(({exits}) => exits.length > 0);

            // Choose which room we will be connecting a room to next
            currentRoom = chooseRandomNode(currentRooms);
        }

        // Connect boss room to a room with available right exit
        // Connect item room to a room with matching exit to entrance
        // Cap off other rooms
    }
}