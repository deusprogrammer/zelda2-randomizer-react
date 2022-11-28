import originalGraphData from './corrected';
import locationMetaData from '../zelda2/templates/z2-location.meta';

const getBaseName = (locationMetaKey) => {
    const connectingRegex = /^(.*)_(W|E|N|S|(W|E|N|S|D)_(BR|BL|TR|TL)|A|K|ENTRANCE|EXIT)$/;
    const match = connectingRegex.exec(locationMetaKey);

    if (!match) {
        return null;
    }

    return match[1];
}

const getAllNeighbors = (locationMeta, node, traversed=[]) => {
    let location = locationMeta[node];
    let neighbors = [];
    if (traversed.includes(node)) {
        console.log("GOING BACK FROM " + node);
        return neighbors;
    }

    traversed.push(node);
    location.connections.filter(connection => location.linkedTo && !location.linkedTo.includes(connection)).forEach((connection) => {
        console.log("GOING TO " + connection + " FROM " + node);
        neighbors = [...neighbors, ...getAllNeighbors(locationMeta, connection, traversed)];
    });
    return [...neighbors, node];
}

const doubleLink = (graphData) => {
    let newGraphData = {...graphData};
    Object.keys(newGraphData).forEach(key => {
        if (!newGraphData[key].connections) {
            newGraphData[key].connections = [];
        }
    
        if (!newGraphData[key].linkedTo) {
            newGraphData[key].linkedTo = newGraphData[key].connections.filter(connection => getBaseName(connection) && getBaseName(connection) === getBaseName(key));
        }
        newGraphData[key].bottleneck = undefined;
    
        newGraphData[key].connections.forEach(connection => {
            if (!newGraphData[connection]) {
                return;
            }

            if (!newGraphData[connection].connections) {
                newGraphData[connection].connections = [];
            }
    
            if (newGraphData[connection].connections.includes(key)) {
                return;
            }
    
            newGraphData[connection].connections.push(key);
        });
    });

    return newGraphData;
}

const expandedNames = (name) => {
    return [`${name}_1`, `${name}_2`];
}

const expand = (graphData, locationMetaData) => {
    let newGraphData = {...graphData};
    Object.keys(graphData).forEach(oldKey => {
        if ((!locationMetaData[oldKey] || !locationMetaData[oldKey] || !locationMetaData[oldKey].passThrough) && oldKey !== "RIVER_DEMON" && !oldKey.includes("BOULDER")) {
            return;
        }

        let [key1, key2] = expandedNames(oldKey);
    
        newGraphData[key1] = {...newGraphData[oldKey]};
        newGraphData[key1].linkedTo = [key2];
        newGraphData[key1].connections = [key2];
        newGraphData[key2] = {...newGraphData[oldKey]};
        newGraphData[key2].linkedTo = [key1];
        if (!newGraphData[key2].connections) {
            newGraphData[key2].connections = [];
        }
        newGraphData[key2].connections.push(key1);
        delete newGraphData[oldKey];

        // Rename any connections to new name
        Object.keys(newGraphData).forEach(key => {
            if (!newGraphData[key].connections) {
                return;
            }
            newGraphData[key].connections = newGraphData[key].connections.map(connection => {
                return connection === oldKey ? key1 : connection;
            });
        });
    });

    return newGraphData;
}

// let newGraphData = expand(originalGraphData, locationMetaData);
// newGraphData = doubleLink(newGraphData);

// let newLocationMeta = {}
// for (let key in originalGraphData) {
//     newLocationMeta[key] = {...originalGraphData[key]};
//     newLocationMeta[key].connections = getAllNeighbors(originalGraphData, key).filter(n => n !== key);
// }

let newLocationMeta = getAllNeighbors(originalGraphData, "NORTH_CASTLE");

console.log("export default " + JSON.stringify(newLocationMeta, null, 5));