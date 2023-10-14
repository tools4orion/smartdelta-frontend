import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  InputLabel,
  IconButton,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from '@mui/material';
import { Panel, useReactFlow } from 'reactflow';
import MDTypography from 'components/MDTypography';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { useVisualizerController } from 'contexts/VisualizerContext';
import DetailPanel from './DetailPanel';

const SidePanel = () => {
  const { state, dispatch, toggleSidePanel, selectNode } = useVisualizerController();
  const { isAnyNodeSelected } = state;
  const { getNodes, getEdges, setViewport } = useReactFlow();

  const handleTransform = useCallback(() => {
    const nodePosition = getNodePositionById(getNodes(), isAnyNodeSelected);
    const { x, y } = nodePosition;

    setViewport({ x: x, y: y }, { duration: 800 });
  }, [getNodes, isAnyNodeSelected, setViewport]);

  const [selected, setSelected] = useState('');
  const [selectBool, setSelectBool] = useState(false);
  const [helperText, setHelperText] = useState("Select Node and Display Interaction");

  // Sort nodes
  const sortedNodes = [...getNodes()];
  sortedNodes.sort((a, b) => a.id.localeCompare(b.id));

  const getNodePositionById = (nodes, targetNodeId) => {
    const targetNode = nodes.find((node) => node.id === targetNodeId);

    if (targetNode) {
      const { x, y } = targetNode.position;
      return { x, y };
    }

    // Return null or any other value to indicate that the node with the given ID was not found.
    return null;
  };

  const handleCloseSidePanel = () => {
    toggleSidePanel(dispatch, false);
    selectNode(dispatch, false);
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const getIntereactions = (node) => {
    const edges = getEdges();
    const sentMessages = [];
    const incomingMessages = [];

    for (const edge of edges) {
      if (edge.source === node || edge.target === node) {
        if (edge.source === node) {
          sentMessages.push(edge);
        } else {
          incomingMessages.push(edge);
        }
      }
    }

    return { sentMessages, incomingMessages };
  };

  useEffect(() => {
    setSelected(isAnyNodeSelected);
  }, [isAnyNodeSelected]);

  return (
    <Panel
      position="top-right"
      style={{
        backgroundColor: '#1f283e',
        paddingLeft: '4px',
        paddingRight: '0px',
        paddingTop: '4px',
      }}
    >

      <Box paddingTop={2} paddingLeft={2} paddingRight={0} sx={{ color: 'white' }}>
        <IconButton onClick={handleCloseSidePanel} sx={{ position: 'absolute', right: 1 }}>
          <KeyboardTabIcon color='white' />
        </IconButton>

        <MDTypography variant="h6" color="white">
          Node Interaction Insights
        </MDTypography>
        <div>
          <FormControl sx={{ m: 2, minWidth: 200 }}>
            <InputLabel
              shrink={!!selected}
              sx={{ color: 'white' }}
              id="demo-simple-select-helper-label"
            >
              Node
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={selected}
              defaultValue={selected}
              label="Node"
              onChange={handleChange}
              style={{ height: '32px' }}
            >
              {sortedNodes.map((node) => (
                <MenuItem key={node.id} value={node.id}>
                  {node.id}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: 'white' }} error={selectBool}>
              {helperText}
            </FormHelperText>
          </FormControl>
        </div>
		
        <DetailPanel data={getIntereactions(selected)} node={selected} />
      </Box>
    </Panel>
  );
};

export default SidePanel;
