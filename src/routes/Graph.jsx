import React, { useEffect } from "react";
import "@react-sigma/core/lib/react-sigma.min.css";
import { MultiDirectedGraph } from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import { Sigma } from 'sigma';
import graphData from '../lib/zelda2/z2-vanilla.graph';
import { useAtom } from "jotai";
import { romAtom } from "../atoms/rom.atom";
import { useNavigate } from "react-router";
import saveAsPNG from "../utils/GraphUtils";

const generateEdgeList = (nodeName, nodes, traversed = []) => {
    let edges = [];
    let node = nodes[nodeName];
    if (!node || !node.connections || traversed.includes(nodeName)) {
        return edges;
    }
    traversed.push(nodeName);
    node.connections.forEach((connection => {
        console.log(`${nodeName} => ${connection}`);
        edges.push({from: nodeName, to: connection});
        edges = [...edges, ...generateEdgeList(connection, nodes, traversed)];
    }));
    return edges;
}

const createVanillaNodeMapping = (graphData, mapData) => {
    let mapping = {};
    let template = {};
    Object.keys(graphData).forEach((nodeName, i) => {
        mapping[nodeName] = `NODE${i}`;
    });
    Object.keys(graphData).forEach((nodeName, i) => {
        let {x: x1, y: y1, area, subArea, map, connections, requirements, items, spells, bottleneck} = graphData[nodeName];
        
        area = area || 0;
        subArea = subArea || 0;
        map = map || 0;
        connections = connections || [];
        requirements = requirements || [];
        items = items || [];
        spells = spells || [];

        let {x, y} = mapData[map][nodeName] || {x: 0, y: 0};
        
        if (x1) {
            x = x1;
        }
        if (y1) {
            y = y1;
        }

        connections = connections.map(connection => mapping[connection]);
        template[`NODE${i}`] = {locationName: nodeName, x, y, map, area, subArea, bottleneck, connections, requirements, items, spells};
    });
    return template;
}

const templateToEdges = (graphData, romData) => {
    const {mapData} = romData;

    // Create the graph
    const graph = new MultiDirectedGraph();
    let vanillaTemplate = createVanillaNodeMapping(graphData, mapData);
    console.log("VANILLA TEMPLATE: " + JSON.stringify(vanillaTemplate, null, 5));

    Object.keys(graphData).forEach((nodeName, i) => {
        let {x: x1, y: y1, area, subArea, map, connections, requirements, items, spells} = graphData[nodeName];
        
        area = area || 0;
        subArea = subArea || 0;
        map = map || 0;
        connections = connections || [];
        requirements = requirements || [];
        items = items || [];
        spells = spells || [];

        let {x, y} = mapData[map][nodeName] || {x: 0, y: 0};
        
        if (x1) {
            x = x1;
        }
        if (y1) {
            y = y1;
        }

        graphData[nodeName] = {...graphData[nodeName], x, y, map, area, subArea, connections, requirements, items, spells};
        graph.addNode(nodeName, {x: x + area * 100, y: -y - subArea * 100, label: nodeName, size: 10});
    });
    let edges = generateEdgeList(Object.keys(graphData)[0], graphData);
    edges.forEach(edge => {
        try {
            graph.addEdgeWithKey(`${edge.from}=>${edge.to}`, edge.from, edge.to, {label: `${edge.from}=>${edge.to}`});
        } catch (e) {
            console.error(e);
        }
    });

    return graph;
}

const save = (romData) => {
    let container = document.getElementById("z2-graph");
    let graph = templateToEdges(graphData, romData);
    const renderer = new Sigma(graph, container, {
        renderEdgeLabels: true,
    });

    saveAsPNG(renderer);
}

const MyGraph = () => {
    const loadGraph = useLoadGraph();
    const [romData] = useAtom(romAtom);
    const navigate = useNavigate();

    useEffect(() => {
        if (!romData) {
            navigate(`${process.env.PUBLIC_URL}/`);
            return;
        }

        let graph = templateToEdges(graphData, romData);
        loadGraph(graph);
    }, [loadGraph]);

    return null;
};

export default ({locations}) => {
    const [romData] = useAtom(romAtom);

    return (
        <div>
            <SigmaContainer
                id="z2-graph"
                graph={MultiDirectedGraph}
                style={{ height: "1000px" }}
                settings={{ renderEdgeLabels: true, defaultEdgeType: "line" }}
            >
                <MyGraph locations={locations} />
            </SigmaContainer>
            <button onClick={() => {save(romData)}}>Save as Image</button>
        </div>
    )
}