import templateData from '../zelda2/templates/z2-vanilla.v4.template';
import locationData from '../zelda2/templates/z2-location.meta';

let locationTypeMap = {};
for (let key in locationData) {
    let location = locationData[key];
    let type = location.type;

    if (location.links.length > 0) {
        type = "LINKED_" + type;
    }

    if (!locationTypeMap[type]) {
        locationTypeMap[type] = [];
    }

    locationTypeMap[type].push(location);
}

const traverse = (templateData, nodeName, traversed = []) => {
    let nodes = [];
    let links = [];
    let node = templateData[nodeName];
    if (!node || traversed.includes(nodeName)) {
        return [nodes, links];
    }
    traversed.push(nodeName);
    nodes.push(nodeName);
    for (let connection of node.connections) {
        if (node.connectionRequirements && node.connectionRequirements[connection]) {
            continue;
        }
        let [newNodes, newLinks] = traverse(templateData, connection, traversed);
        nodes = [...newNodes, ...nodes];
        links = [...newLinks, ...links];
    }

    return [nodes, links];
}

const findConnectionRoots = (templateData) => {
    return Object.keys(templateData).filter(key => templateData[key] && templateData[key].connections && templateData[key].connections.length > 0);
}

let parentNodes = findConnectionRoots(templateData);
let traversed = [];
let i = 0;
parentNodes.forEach((parentNode) => {
    if (traversed.includes(parentNode)) {
        return;
    }
    let [nodes, links] = traverse(templateData, parentNode);
    traversed = [...traversed, ...nodes];
    
    nodes.forEach(isolatedNode => {
        templateData[isolatedNode].isolationGroup = i;
    });
    i++;
});

console.log("export default " + JSON.stringify(templateData, null, 4));