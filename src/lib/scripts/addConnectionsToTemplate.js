import templateData from '../zelda2/templates/z2-vanilla.v3.template';
import graphData from '../zelda2/templates/z2-vanilla.v3.graph';

const createVanillaNodeMapping = (graphData, templateData) => {
    let template = {};
    Object.keys(templateData).forEach((nodeName) => {
        let {connections} = graphData[nodeName];
        let templateNode = templateData[nodeName];

        template[nodeName] = {...templateNode, connections};
    });
    return template;
}

let corrected = createVanillaNodeMapping(graphData, templateData);
console.log(JSON.stringify(corrected, null, 5));