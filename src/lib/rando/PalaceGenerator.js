import roomMetaData from '../zelda2/templates/z2-rooms.meta';

let palaceRanges = [
    {
        palace: 1,
        mapSet: 5,
        startRoom: 0,
        endRoom: 13
    },{
        palace: 2,
        mapSet: 5,
        startRoom: 14,
        endRoom: 34
    },{
        palace: 3,
        mapSet: 6,
        startRoom: 0,
        endRoom: 14
    },{
        palace: 4,
        mapSet: 6,
        startRoom: 15,
        endRoom: 35
    },{
        palace: 5,
        mapSet: 5,
        startRoom: 35,
        endRoom: 62
    },{
        palace: 6,
        mapSet: 6,
        startRoom: 36,
        endRoom: 62
    },{
        palace: 7,
        mapSet: 7,
        startRoom: 0,
        endRoom: 62
    },
]

let modified = {};
Object.keys(roomMetaData).forEach((roomKey) => {
    let [mapSet, mapNumber] = roomKey.split(":");
    mapSet = parseInt(mapSet);
    mapNumber = parseInt(mapNumber);
    let {palace} = palaceRanges.find(({mapSet: roomMapSet, startRoom, endRoom}) => {
        return roomMapSet === mapSet && mapNumber >= startRoom && mapNumber <= endRoom;
    }) || {palace: -1};

    modified[roomKey] = {
        type: !roomMetaData[roomKey].type ? "ROOM" : roomMetaData[roomKey].type,
        mapSet,
        mapNumber,
        palace,
        ...roomMetaData[roomKey]
    };
});

console.log("export default " + JSON.stringify(modified, null, 5));