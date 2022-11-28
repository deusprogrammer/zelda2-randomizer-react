import React, { useEffect } from "react";
import { MultiDirectedGraph } from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import { Sigma } from 'sigma';

import { useAtom } from "jotai";
import { useNavigate } from "react-router";

import saveAsPNG from "../utils/GraphUtils"
import { romAtom } from "../atoms/rom.atom";
import graphData from '../lib/zelda2/templates/z2-vanilla-2w.graph';
import locationData from '../lib/zelda2/templates/z2-vanilla.template';

import "@react-sigma/core/lib/react-sigma.min.css";

const generateEdgeList = (nodeName, nodes, traversed = []) => {
    let edges = [];
    let node = nodes[nodeName];
    if (!node || !node.connections || traversed.includes(nodeName)) {
        return edges;
    }
    traversed.push(nodeName);
    node.connections.forEach((connection => {
        edges.push({from: nodeName, to: connection, type: "open"});
        edges = [...edges, ...generateEdgeList(connection, nodes, traversed)];
    }));
    if(node.linkedTo){
        node.linkedTo.forEach(link => {
            edges.push({from: nodeName, to: link, type: "link"});
            edges = [...edges, ...generateEdgeList(link, nodes, traversed)];
        });
    }
    return edges;
}

const templateToEdges = (graphData) => {
    // Create the graph
    const graph = new MultiDirectedGraph();

    Object.keys(graphData).forEach((nodeName) => {
        let {x, y, map, area, subArea} = graphData[nodeName];
        let locationKey = Object.keys(locationData).find(key => locationData[key].locationKey === nodeName);
        let location = locationData[locationKey];
        map = map || 0;
        area = area || 0;
        subArea = subArea || 0;
 
        if (location && !x && !y) {
            let {x: x1, y: y1} = location;
            x = x1;
            y = y1;
        }

        console.log(`CREATING NODE: ${nodeName} ${x},${y} ${area} ${subArea}`);
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