import React, { useEffect, useMemo, useState } from "react";
import { Box, FormLabel, Grid, Slider, Stack, Typography } from "@mui/material";

import ReactFlow, {
  Background,
  ControlButton,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
  useStore,
} from "reactflow";

// Import custom components and styles
import useForceLayout from "./useForceLayout";
import CustomNode from "./CustomNode";
import FloatingEdge from "./FloatingEdge";
import "./styles/index.css";
import "reactflow/dist/style.css";
import { generateRandomColor } from "./helpers/generateRandomColors";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import RemoveIcon from "@mui/icons-material/Remove";
import FormControl from "@mui/material/FormControl";

import { useVisualizerController } from "contexts/VisualizerContext";
import SidePanel from "./SidePanel";
import LatencySidebar from "./latency/LatencySidebar";

import UserGuideTour from "features/userTours/UserGuideTour";
import ResourceSidebar from "./resource/ResourceSidebar";
import { useFileController } from "contexts/FileContext";
import { useRawData } from "features/featureDiscovery/useRawData";
import { useMaterialUIController } from "contexts/UIContext";

// Define default viewport
const defaultViewport = { x: 200, y: -200, zoom: 0.6 };

// Define edge and node types
const edgeTypes = {
  floating: FloatingEdge,
};

const nodeTypes = {
  selectorNode: CustomNode,
};

function generateRandomSource() {
  return Math.random() < 0.5 ? "s1" : "s2";
}

function generateRandomTarget() {
  return Math.random() < 0.5 ? "t1" : "t2";
}

function ForceLayoutTopology({ csvData }) {
  const { setNodes, setEdges, zoomIn, zoomOut, getNodes } = useReactFlow();
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const [strength, setStrength] = useState(-1000);
  const [distance, setDistance] = useState(350);
  const [simulationFrozen, setSimulationFrozen] = useState(false);
  //
  const { state: stateFile } = useFileController();
  const { fileStateToView } = stateFile ?? {};
  const directions = fileStateToView?.directions;
  const { tableData } = useRawData(directions, "", "", "");

  //

  const currentZoom = useStore((store) => store.transform[2]);

  // Sort nodes
  const sortedNodes = [...getNodes()];
  sortedNodes.sort((a, b) => a.id.localeCompare(b.id));

  const { state } = useVisualizerController();
  const {
    isSidePanelOpen,
    isLatencySidebarOpen,
    isResourceSidebarOpen,
    isUserGuideOpen,
  } = state;
  console.log("isResourceSidebarOpen:" + isResourceSidebarOpen);
  // Zoom handlers
  const handleZoomIn = () => {
    zoomIn({ duration: 800 });
  };

  const handleZoomOut = () => {
    zoomOut({ duration: 800 });
  };

  // Event handlers
  const handleOnNodeMouseMove = (event, node) => {
    setSimulationFrozen(true);
  };

  const handleStrengthChange = (event, newValue) => {
    setStrength(newValue);
    setSimulationFrozen(false);
  };

  const handleDistanceChange = (event, newValue) => {
    setDistance(newValue);
    setSimulationFrozen(false);
  };

  // Calculate nodes and edges initial positions
  const calculateNodes = () => {
    return csvData.nodes.map((node, index) => {
      const angle = (index / csvData.nodes.length) * 2 * Math.PI;
      const radius = 100;
      const x = (2 * window.innerWidth) / 2 + radius * Math.cos(angle) - 1000;
      const y = (2 * window.innerHeight) / 2 + radius * Math.sin(angle);

      return {
        id: node.id,
        type: "default",
        position: { x, y },
        data: {
          label: <CustomNode data={node.data.label} tableData={tableData} />,
        },
      };
    });
  };

  const calculateEdges = () => {
    return csvData.directions.map((direction) => ({
      id: `${direction.source}-${direction.target}`,
      source: direction.source,
      sourceHandle: generateRandomSource(),
      targetHandle: generateRandomTarget(),
      animated: true,
      target: direction.target,
      data: { count: direction.count },
      style: {
        strokeWidth: direction.count * 0.1,
        stroke: generateRandomColor(),
      },
      type: "floating",
      data: {
        endLabel: direction.count,
      },
      markerEnd: {
        type: MarkerType.Arrow,
      },
    }));
  };

  const nodes = useMemo(() => calculateNodes(), [csvData]);
  const edges = useMemo(() => calculateEdges(), [csvData]);

  const updateNodesAndEdges = () => {
    const nodes = calculateNodes();
    const edges = calculateEdges();

    setNodes(nodes);
    setEdges(edges);
  };

  useEffect(() => {
    updateNodesAndEdges();
  }, [csvData, setNodes, setEdges]);

  // Apply force layout
  useForceLayout({ strength, distance, simulationFrozen });
  // Event handler for clicking on the canvas (outside elements)

  const miniMapStyles = {
    nodeStrokeColor: (node) => (darkMode ? "#1f283e" : "#000000"),
    nodeColor: (node) => (darkMode ? "#1f283e" : "#ffffff"),
    maskColor: darkMode ? "#1f283e" : "rgba(255,255,255,0.3)",
    maskStrokeColor: darkMode ? "#111111" : "#e0e0e0",
    nodeBorderRadius: 2,
  };

  return (
    <div style={{ height: "500px" }}>
      <UserGuideTour guideKey="visualizer-tools" />
      <ReactFlow
        minZoom={0.3}
        defaultNodes={nodes}
        defaultEdges={edges}
        elementsSelectable={true}
        edgeTypes={edgeTypes}
        defaultViewport={defaultViewport}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        onNodeMouseMove={handleOnNodeMouseMove}
      >
        <Background color="#ccc" variant="dots" />
        <Stack sx={{ marginTop: "20px", borderRadius: "8px", p: 2 }}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormControl>
                  <FormLabel component="legend">
                    <Typography variant="subtitle2">Strength</Typography>
                  </FormLabel>
                </FormControl>
                <Slider
                  className="strength"
                  size="small"
                  value={strength}
                  onChange={handleStrengthChange}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  min={-2000}
                  max={0}
                  defaultValue={-1000}
                  sx={{ width: 100, marginLeft: "10px" }}
                />
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormControl>
                  <FormLabel component="legend">
                    <Typography variant="subtitle2">Distance</Typography>
                  </FormLabel>
                </FormControl>
                <Slider
                  className="distance"
                  size="small"
                  value={distance}
                  onChange={handleDistanceChange}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  min={0}
                  defaultValue={350}
                  max={1000}
                  sx={{ width: 100, marginLeft: "10px" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Stack>
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
        {isLatencySidebarOpen && <LatencySidebar />}
        {isResourceSidebarOpen && <ResourceSidebar />}
        {isSidePanelOpen && <SidePanel />}
        <Controls>
          <ControlButton onClick={handleZoomIn} title="another action">
            <AddTwoToneIcon fontSize="large" />
          </ControlButton>
          <ControlButton onClick={handleZoomOut} title="another action">
            <RemoveIcon fontSize="large" />
          </ControlButton>
        </Controls>
      </ReactFlow>
    </div>
  );
}

function ReactFlowWrapper(props) {
  return (
    <ReactFlowProvider>
      <ForceLayoutTopology {...props} />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
