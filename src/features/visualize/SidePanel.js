import React, { useState, useEffect } from 'react';

import  {
Panel, useReactFlow
  } from 'reactflow';
  import {
	Box,
	InputLabel,
	IconButton
  } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MDTypography from 'components/MDTypography';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';

import { useVisualizerController } from 'contexts/VisualizerContext';
import DetailPanel from './DetailPanel';

const SidePanel = () => {
	const {state, dispatch, toggleSidePanel, selectNode} = useVisualizerController();
	const { isAnyNodeSelected } = state;
	const { getNodes, getEdges} = useReactFlow();
	const [selected, setSelected] = useState('');
	const [selectBool, setSelectBool] = useState(false);
	const [helperText, setHelperText] =
	useState(" Select Node and Display Interaction ");

	 // Sort nodes 
	 const sortedNodes = [...getNodes()];
	 sortedNodes.sort((a, b) => a.id.localeCompare(b.id));

	const handleCloseSidePanel = () => {
		toggleSidePanel(dispatch,false);
		selectNode(dispatch, false);
		}
		  const handleChange = (event) => {
			setSelected(event.target.value);
		
		  };
		  const getIntereactions = (node) => {
			const edges = getEdges();
			const sentMessages = [];
			const incomingMessages = [];
			console.log(node);
		  
			for (const edge of edges) {
				
			  if (edge.source === node || edge.target === node) {
		
				if (edge.source === node) {
				  sentMessages.push(edge);
				} else {
				  incomingMessages.push(edge);
				}
			  }
			}
		  
			console.log(sentMessages);
			return { sentMessages, incomingMessages }
		  };
		
		  useEffect(()=>{
			setSelected(isAnyNodeSelected)
		  },[isAnyNodeSelected])

	return(
<Panel
            position="top-right"
            style={{
              backgroundColor: '#1f283e',
              paddingLeft: '4px',
              paddingRight: '0px',
              paddingTop: '4px',
              height: '100%',
            }}
          >
            <Box paddingTop={2} paddingLeft={2} paddingRight={0} sx={{ color: 'white' }}>
			<IconButton onClick={handleCloseSidePanel} sx={{position:'absolute', right:1}} >
			<KeyboardTabIcon color='white' />
			</IconButton>
			
              <MDTypography variant="h6" color="white">
                Node Interaction Insights
              </MDTypography>
              <div>
                <FormControl sx={{ m: 2, minWidth: 200 }}>
                  <InputLabel shrink={!!selected}  sx={{ color: 'white' }} id="demo-simple-select-helper-label">
                    Node
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selected} // <-- Pass the selected node's 
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
              {/* Step 4: Pass the selected node's data to the right panel */}
              <DetailPanel data={getIntereactions(selected)} />
            </Box>
          </Panel>
	)
}

export default SidePanel;