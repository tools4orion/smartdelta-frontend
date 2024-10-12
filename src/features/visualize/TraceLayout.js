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

function TraceLayoutTopology({ elasticData }) {
  const responseData = useLocation(); // OR YOU CAN TAKE THE RESPONSE FROM "TraceVisualizer" INSTEAD OF react-router-dom
  const traceName = responseData.state?.traceName; // just an example (option chaining)

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
