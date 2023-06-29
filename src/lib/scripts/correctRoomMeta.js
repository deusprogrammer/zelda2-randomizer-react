import roomMeta from '../zelda2/templates/z2-room.meta';

let newRoomData = {};
Object.keys(roomMeta).forEach(mapSet => {
    Object.keys(roomMeta[mapSet]).forEach(mapNumber => {
        newRoomData[`${mapSet}:${mapNumber}`] = roomMeta[mapSet][mapNumber];
    })
})

console.log("export default " + JSON.stringify(newRoomData, null, 4));