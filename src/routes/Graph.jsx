import React, { useEffect } from "react";
import "@react-sigma/core/lib/react-sigma.min.css";
import { MultiDirectedGraph } from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import graphData from '../lib/zelda2/z2-vanilla.graph';
import { useAtom } from "jotai";
import { romAtom } from "../atoms/rom.atom";
import { useNavigate } from "react-router";

const connectToDistantNeighbors = (parentNode, childNode, nodes) => {
    let edges = [];
    let node = nodes[childNode];
    if (!node || !node.connections || node.bottleneck) {
        return edges;
    }
    node.connections.forEach(connection => {
        console.log(`${parentNode} -> ${connection}`);
        edges.push({from: parentNode, to: connection});
        edges = [...edges, ...connectToDistantNeighbors(parentNode, connection, nodes)];
    });
    return edges;
}

const generateEdgeList = (nodeName, nodes) => {
    let edges = [];
    let node = nodes[nodeName];
    if (!node || !node.connections) {
        return edges;
    }
    node.connections.forEach((connection => {
        console.log(`${nodeName} => ${connection}`);
        edges.push({from: nodeName, to: connection});
        edges = [...edges, ...generateEdgeList(connection, nodes), ...connectToDistantNeighbors(nodeName, connection, nodes)];
    }));
    return edges;
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

        const {westHyruleMap} = romData;

        // Create the graph
        const graph = new MultiDirectedGraph();
        Object.keys(graphData).forEach(nodeName => {
            let {x, y} = westHyruleMap[nodeName] || {x: 0, y: 0};
            let {x: x1, y: y1} = graphData[nodeName];
            if (x1) {
                x = x1;
            }
            if (y1) {
                y = y1;
            }
            graph.addNode(nodeName, {x: x, y: -y, label: nodeName, size: 10});
        });
        let edges = generateEdgeList(Object.keys(graphData)[0], graphData);
        edges.forEach(edge => {
            try {
                graph.addEdgeWithKey(`${edge.from}=>${edge.to}`, edge.from, edge.to, {label: `${edge.from}=>${edge.to}`});
            } catch (e) {
                console.error(e);
            }
        });
        loadGraph(graph);
    }, [loadGraph]);

    return null;
};

export default ({locations}) => {
    return (
        <SigmaContainer
            graph={MultiDirectedGraph}
            style={{ height: "1000px" }}
            settings={{ renderEdgeLabels: true, defaultEdgeType: "line" }}
        >
            <MyGraph locations={locations} />
        </SigmaContainer>
    )
}