import React, { useState, useMemo, useEffect } from "react";
import { Box } from "@mui/material";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ControlButton,
} from "reactflow";
import "reactflow/dist/style.css";

import RemoveIcon from "@mui/icons-material/Remove";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

import CustomNodeForTrace from "./CustomNodeForTrace";
import FloatingEdgeForTrace from "./FloatingEdgeForTrace";
import useTraceLayout from "./useTraceLayout";
import { useMaterialUIController } from "contexts/UIContext";

const edgeTypes = {
  floating: FloatingEdgeForTrace,
};

const nodeTypes = {
  CustomNodeForTrace: CustomNodeForTrace,
};

function TraceLayoutTopology({ traceData }) {
  const [controller, _] = useMaterialUIController();
  const { zoomIn, zoomOut } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [strength, setStrength] = useState(-1000);
  const [distance, setDistance] = useState(350);
  const [simulationFrozen, setSimulationFrozen] = useState(false);

  const { darkMode } = controller;

  // it convert traceData to nodes and edges for React Flow
  const convertTraceDataToElements = (traceData) => {
    const nodes = [];
    const edges = [];

    Object.values(traceData).forEach((span, index) => {
      const parentX = (index % 5) * 200;
      const parentY = Math.floor(index / 5) * 200;

      // parent with child spans
      if (span.type === "parentWithChild") {
        // unwanted spans
        if (
          span.name === "Unknown Parent Span" ||
          span.childSpans.length === 0 ||
          span.duration === 0 ||
          span.faasExecution === null ||
          span.outcome === "Unknown Outcome" ||
          span.type === "parentWithoutChild"
        ) {
          return;
        }

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
            const childX = parentX + 200 + (childIndex % 2) * 200;
            const childY = parentY + 450 + Math.floor(childIndex / 2) * 250;

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

            // it creates edge from parent to child
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

  const handleZoomIn = () => {
    zoomIn({ duration: 800 });
  };

  const handleZoomOut = () => {
    zoomOut({ duration: 800 });
  };

  const defaultViewport = { x: 400, y: 100, zoom: 0.7 };

  const miniMapStyles = {
    nodeStrokeColor: (node) => (darkMode ? "#1f283e" : "#000000"),
    nodeColor: (node) => (darkMode ? "#1f283e" : "#ffffff"),
    maskColor: darkMode ? "#1f283e" : "rgba(255,255,255,0.3)",
    maskStrokeColor: darkMode ? "#111111" : "#e0e0e0",
    nodeBorderRadius: 2,
  };

  return (
    <Box sx={{ height: "600px", width: "100%", position: "relative" }}>
      <ReactFlow
        minZoom={0.3}
        nodes={nodes}
        edges={edges}
        defaultViewport={defaultViewport} // Set an appropriate viewport that shows nodes spaced out
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        panOnDrag={true}
        nodesDraggable={true}
        elementsSelectable={true}
        nodesConnectable={true}
      >
        <Background color="#ccc" variant="dots" />
        <MiniMap
          nodeStrokeColor={miniMapStyles.nodeStrokeColor}
          nodeColor={miniMapStyles.nodeColor}
          maskColor={miniMapStyles.maskColor}
          maskStrokeColor={miniMapStyles.maskStrokeColor}
          nodeBorderRadius={miniMapStyles.nodeBorderRadius}
          style={{
            background: darkMode ? "#344767" : "#ffffff",
          }}
        />
        <Controls>
          <ControlButton onClick={handleZoomIn} title="Zoom In">
            <AddTwoToneIcon fontSize="large" />
          </ControlButton>
          <ControlButton onClick={handleZoomOut} title="Zoom Out">
            <RemoveIcon fontSize="large" />
          </ControlButton>
        </Controls>
      </ReactFlow>
    </Box>
  );
}

export default TraceLayoutTopology;
