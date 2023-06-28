import React, {useEffect, useMemo, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Slider,
  Stack,
  Typography,
} from '@mui/material';

import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlowProvider,
  useReactFlow
} from 'reactflow';

// Import custom components and styles
import useForceLayout from './useForceLayout';
import CustomNode from './CustomNode';
import FloatingEdge from './FloatingEdge';
import './styles/index.css';
import 'reactflow/dist/style.css';
import { generateRandomColor } from './helpers/generateRandomColors';

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
    return Math.random() < 0.5 ? 's1' : 's2';
  }

  function generateRandomTarget() {
    return Math.random() < 0.5 ? 't1' : 't2';
  }

function ForceLayoutTopology({ csvData }) {
  const { setNodes, setEdges } = useReactFlow();
  const [strength, setStrength] = useState(-1000);
  const [distance, setDistance] = useState(350);
  const [simulationFrozen, setSimulationFrozen] = useState(false);

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

  // Calculate nodes and edges positions
  const calculateNodes = () => {
    return csvData.nodes.map((node, index) => {
      const angle = (index / csvData.nodes.length) * 2 * Math.PI;
      const radius = 100;
      const x = 2 * window.innerWidth / 2 + radius * Math.cos(angle) - 1000;
      const y = 2 * window.innerHeight / 2 + radius * Math.sin(angle);

      return {
        id: node.id,
        type: 'default',
        position: { x, y },
        data: { label: <CustomNode data={node.data.label} /> },
      };
    });
  };

  const calculateEdges = () => {
    return csvData.directions.map((direction) => ({
      id: `${direction.source}-${direction.target}`,
      source: direction.source,
      sourceHandle: generateRandomSource(),
      targetHandle: generateRandomTarget(),
      animated: direction.count > 20,
      target: direction.target,
      data: { count: direction.count },
      style: { strokeWidth: (direction.count % 5) + 2, stroke: generateRandomColor() },
      type: 'floating',
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

  return (
    <div style={{ height: '500px' }}>
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

        <Stack sx={{ marginTop: '20px', borderRadius: '8px', p: 2 }}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControl>
                  <FormLabel component="legend">
                    <Typography variant="subtitle2">Strength</Typography>
                  </FormLabel>
                </FormControl>
                <Slider
                  size="small"
                  value={strength}
				  onChange={handleStrengthChange}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  min={-2000}
                  max={0}
                  defaultValue={-1000}
                  sx={{ width: 100, marginLeft: '10px' }}
                />
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControl>
                  <FormLabel component="legend">
                    <Typography variant="subtitle2">Distance</Typography>
                  </FormLabel>
                </FormControl>
                <Slider
                  size="small"
                  value={distance}
				  onChange={handleDistanceChange}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  min={0}
                  defaultValue={350}
                  max={1000}
                  sx={{ width: 100, marginLeft: '10px' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Stack>

        <MiniMap zoomStep={8} />
        <Controls />
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
