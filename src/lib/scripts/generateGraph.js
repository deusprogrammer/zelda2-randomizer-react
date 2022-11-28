import graphData from '../zelda2/templates/z2-vanilla.graph';
import locationMeta from '../zelda2/templates/z2-location.v2.meta';

const generateNodeMap = (graphData) => {
    let nodeMap = {};
    Object.keys(graphData).forEach((key, index) => {
        nodeMap[key] = `NODE${index}`;
    });
    return nodeMap;
}

let nodeMap = generateNodeMap(graphData);
let newGraph = {};
Object.keys(graphData).forEach(key => {
    if (!locationMeta[key]) {
        console.log("CAN'T FIND KEY " + key);
        return;
    }
    let {
        id,
        type,
        continent, 
        mapSet, 
        mapNumber, 
        passThrough,
        links,
        items, 
        ability, 
        entryRequirements, 
        completionRequirements,
        abilityRequirements, 
        spellRequirements, 
        itemRequirements, 
        linkRequirements } = locationMeta[key];

    let {
        subArea,
        area,
        map,
        connections,
        connectionRequirements
    } = graphData[key];
    
    newGraph[nodeMap[key]] = {
        id, 
        type, 
        continent, 
        mapSet, 
        mapNumber, 
        passThrough: passThrough === 1 ? true : false, 
        ability: ability || "",
        abilityRequirements: abilityRequirements || [],
        spellRequirements: spellRequirements || [],
        items: items || [],
        itemRequirements: itemRequirements || [],
        entryRequirements: entryRequirements || [],
        completionRequirements: completionRequirements || [],
        links: links || [],
        linkRequirements: linkRequirements || {},
        connections: connections || [],
        connectionRequirements: connectionRequirements || {},
        renderData: {
            map: map || 0,
            area: area || 0,
            subArea: subArea || 0
        }
    }
    newGraph[nodeMap[key]].connections = newGraph[nodeMap[key]].connections.filter(connection => !newGraph[nodeMap[key]].links.includes(connection)).map(key => nodeMap[key]);
    newGraph[nodeMap[key]].links = newGraph[nodeMap[key]].links.map(key => nodeMap[key]);

    if (newGraph[nodeMap[key]].connectionRequirements) {
        Object.keys(newGraph[nodeMap[key]].connectionRequirements).forEach(connectionKey => {
            newGraph[nodeMap[key]].connectionRequirements[nodeMap[connectionKey]] = newGraph[nodeMap[key]].connectionRequirements[connectionKey];
            delete newGraph[nodeMap[key]].connectionRequirements[connectionKey];
        });
    }   

    if (newGraph[nodeMap[key]].linkRequirements) {
        Object.keys(newGraph[nodeMap[key]].linkRequirements).forEach(linkKey => {
            newGraph[nodeMap[key]].linkRequirements[nodeMap[linkKey]] = newGraph[nodeMap[key]].linkRequirements[linkKey];
            delete newGraph[nodeMap[key]].linkRequirements[linkKey];
        });

    }
});

console.log("export default " + JSON.stringify(newGraph, null, 5));