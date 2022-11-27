import React, { useEffect } from "react";
import { MultiDirectedGraph } from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import { Sigma } from 'sigma';

import { useAtom } from "jotai";
import { useNavigate } from "react-router";

import saveAsPNG from "../utils/GraphUtils"
import { romAtom } from "../atoms/rom.atom";
import graphData from '../lib/zelda2/templates/z2-vanilla.template';

import "@react-sigma/core/lib/react-sigma.min.css";

const generateEdgeList = (nodeName, nodes, traversed = []) => {
    let edges = [];
    let node = nodes[nodeName];
    if (!node || !node.connections || traversed.includes(nodeName)) {
        return edges;
    }
    traversed.push(nodeName);
    node.connections.forEach((connection => {
        console.log(`CREATING EDGE: ${nodeName} => ${connection}`)
        edges.push({from: nodeName, to: connection});
        edges = [...edges, ...generateEdgeList(connection, nodes, traversed)];
    }));
    return edges;
}

const templateToEdges = (graphData, romData) => {
    // Create the graph
    const graph = new MultiDirectedGraph();
    const areaSubAreaMap = [
        [0, 0],
        [0, 1],
        [1, 0],
        [2, 0]
    ];
    Object.keys(graphData).forEach((nodeName) => {
        let {locationKey, x, y, continent: map} = graphData[nodeName];

        let [area, subArea] = areaSubAreaMap[map];
        
        console.log(`CREATING NODE: ${nodeName}`);
        graph.addNode(nodeName, {x: x + area * 100, y: -y - subArea * 100, label: locationKey, size: 10});
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