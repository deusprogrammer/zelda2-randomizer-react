import React, { useEffect, useState } from "react";
import { MultiDirectedGraph } from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";

import "@react-sigma/core/lib/react-sigma.min.css";

const templateToEdges = (graphData) => {
    // Create the graph
    const graph = new MultiDirectedGraph();

    Object.keys(graphData).forEach((nodeName) => {
        if (graphData[nodeName].continent === 1) {
            graphData[nodeName].renderData = {area: 0, subArea: 1};
        } else if (graphData[nodeName].continent === 3) {
            graphData[nodeName].renderData = {area: 2, subArea: 0};
        } else if (!graphData[nodeName].renderData) {
            console.log("NODE DOESN'T HAVE RENDER DATA " + nodeName);
            graphData[nodeName].renderData = {area: 3, subArea: 0};
        }

        let {id, x, y, renderData: {area, subArea}} = graphData[nodeName];
        console.log(`CREATING NODE: ${nodeName} ${x},${y} ${area} ${subArea}`);
        graph.addNode(nodeName, {x: x + area * 100, y: -y - subArea * 100, label: id, size: 10});
    });
    Object.keys(graphData).forEach((nodeName) => {
        if (!graphData[nodeName].renderData) {
            return;
        }
        let {connections} = graphData[nodeName];
        connections.forEach(connection => {
            try {
                graph.addEdgeWithKey(`${nodeName}=>${connection}`, nodeName, connection, {label: `${nodeName}=>${connection}`});
            } catch (e) {
                console.error(e);
            }
        });
    });
    // let edges = generateEdgeList(Object.keys(graphData)[0], graphData);
    // edges.forEach(edge => {
    //     try {
    //         graph.addEdgeWithKey(`${edge.from}=>${edge.to}`, edge.from, edge.to, {label: `${edge.from}=>${edge.to}`, color: edge.type === "link" ? "red" : "black"});
    //     } catch (e) {
    //         console.error(e);
    //     }
    // });

    return graph;
}

const MyGraph = ({template}) => {
    const loadGraph = useLoadGraph();

    useEffect(() => {
        let graph = templateToEdges(template);
        loadGraph(graph);
    }, [template]);

    return null;
};

export default ({template}) => {
    const [graphTemplate, setGraphTemplate] = useState(template);

    useEffect(() => {
        setGraphTemplate(template);
    }, [template]);

    return (
        <SigmaContainer
            id="z2-graph"
            graph={MultiDirectedGraph}
            style={{ height: "1000px" }}
            settings={{ renderEdgeLabels: true, defaultEdgeType: "line" }}
        >
            <MyGraph template={graphTemplate} />
        </SigmaContainer>
    )
}