import React, { useEffect, useMemo, useState } from "react";
import { Box, FormLabel, Grid, Slider, Stack, Typography } from "@mui/material";

import { useLocation } from "react-router-dom";
// import { useFileController } from "contexts/FileContext";

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

function TraceLayoutTopology({ traceData }) {
  const traceNameResponse = useLocation();
  const traceName = traceNameResponse.state?.traceName;

  console.log("elasticData", traceData);

  return (
    <div style={{ padding: "500px" }}>
      <h1>TODO:: TraceLayout with React Flow {traceName}</h1>
    </div>
  );
}

function ReactFlowWrapperTraceVisualizer(props) {
  return (
    <ReactFlowProvider>
      <TraceLayoutTopology {...props} />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapperTraceVisualizer;
