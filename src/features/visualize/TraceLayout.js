import React, { useState, useMemo, useEffect } from "react";
import { Box } from "@mui/material";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import CustomNodeForTrace from "./CustomNodeForTrace";
import FloatingEdgeForTrace from "./FloatingEdgeForTrace";
import useTraceLayout from "./useTraceLayout";
import { times } from "lodash";

const edgeTypes = {
  floating: FloatingEdgeForTrace,
};

const nodeTypes = {
  CustomNodeForTrace: CustomNodeForTrace,
};

function TraceLayoutTopology({ traceData }) {
  // Use useNodesState and useEdgesState to manage the nodes and edges states
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [strength, setStrength] = useState(-1000);
  const [distance, setDistance] = useState(350);
  const [simulationFrozen, setSimulationFrozen] = useState(false);

  // Convert traceData to nodes and edges for React Flow
  const convertTraceDataToElements = (traceData) => {
    const nodes = [];
    const edges = [];

    Object.values(traceData).forEach((span, index) => {
      const parentX = (index % 5) * 200;
      const parentY = Math.floor(index / 5) * 200;

      // scenario 1: Handle parent with child spans
      if (span.type === "parentWithChild") {
        const parentNode = {
          id: span.id,
          type: "CustomNodeForTrace",
          position: { x: parentX, y: parentY },
          data: {
            label: span.name,
            type: "parentWithChild",
            duration: span.duration,
            outcome: span.outcome,
            timestamp: span.timestamp,
            cloudProvider: span.cloudProvider,
            region: span.cloudRegion,
            coldStart: span.coldStart,
          },
        };
        nodes.push(parentNode);

        if (Array.isArray(span.childSpans)) {
          span.childSpans.forEach((childSpan, childIndex) => {
            const childX = parentX + 100 + (childIndex % 2) * 150;
            const childY = parentY + 150 + Math.floor(childIndex / 2) * 150;

            const childNode = {
              id: childSpan.id,
              type: "CustomNodeForTrace",
              position: { x: childX, y: childY },
              data: {
                label: childSpan.destinationServiceAddress,
                type: "childWithParent",
                duration: childSpan.duration,
                outcome: childSpan.outcome,
                timestamp: childSpan.timestamp,
                httpMethod: childSpan.httpMethod,
                httpStatus: childSpan.httpStatus,
                destinationServicePort: childSpan.destinationServicePort,
              },
            };
            nodes.push(childNode);

            // Create edge from parent to child
            edges.push({
              id: `edge-${span.id}-${childSpan.id}`,
              source: span.id,
              target: childSpan.id,
              sourceHandle: "source",
              targetHandle: "target",
              type: "floating",
              markerEnd: { type: "arrowclosed" },
              animated: true,
            });
          });
        }
      }

      // scenario 2: Handle child span with unknown parent (skip unknown parent and only show child)
      else if (
        span.name === "Unknown Parent Span" &&
        span.duration === 0 &&
        span.faasExecution === null &&
        span.outcome === "Unknown Outcome"
      ) {
        span.childSpans.forEach((childSpan, childIndex) => {
          const childX = (index % 5) * 200;
          const childY = Math.floor(index / 5) * 200;

          const childNode = {
            id: childSpan.id,
            type: "CustomNodeForTrace",
            position: { x: childX, y: childY },
            data: {
              label: childSpan.destinationServiceAddress,
              type: "childWithoutParent",
              duration: childSpan.duration,
              outcome: childSpan.outcome,
              timestamp: childSpan.timestamp,
              httpMethod: childSpan.httpMethod,
              httpStatus: childSpan.httpStatus,
              destinationServicePort: childSpan.destinationServicePort,
            },
          };
          nodes.push(childNode);
        });
      }

      // scenario 3: Handle parent span without any child
      else if (span.type === "parentWithoutChild") {
        const parentNode = {
          id: span.id,
          type: "CustomNodeForTrace",
          position: { x: parentX, y: parentY },
          data: {
            label: span.name,
            type: "parentWithoutChild",
            duration: span.duration,
            outcome: span.outcome,
            timestamp: span.timestamp,
            cloudProvider: span.cloudProvider,
            region: span.cloudRegion,
            coldStart: span.coldStart,
          },
        };
        nodes.push(parentNode);
      }
    });

    return { nodes, edges };
  };

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => convertTraceDataToElements(traceData),
    [traceData]
  );

  // set nodes and edges on initial load only
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setSimulationFrozen(true);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  // call the layout hook with control over simulation freezing
  useTraceLayout({ strength, distance, simulationFrozen });

  // Event handlers for drag start and end to freeze/unfreeze the simulation
  // const onNodeDragStart = (_, node) => {
  //   setSimulationFrozen(true);
  // };

  // const onNodeDragStop = (_, node) => {
  //   setSimulationFrozen(false);
  // };

  return (
    <Box sx={{ height: "600px", width: "100%", position: "relative" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        // onNodeDragStart={onNodeDragStart} // Freeze simulation on drag start
        // onNodeDragStop={onNodeDragStop} // Unfreeze simulation on drag stop
        fitView={true}
        panOnDrag={true}
        nodesDraggable={true}
        elementsSelectable={true}
        nodesConnectable={true}
      >
        <Background color="#aaa" gap={16} />
        <MiniMap nodeColor={() => "blue"} />
        <Controls />
      </ReactFlow>
    </Box>
  );
}

export default TraceLayoutTopology;
