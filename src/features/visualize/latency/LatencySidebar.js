import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  InputLabel,
} from '@mui/material';
import { Panel, useReactFlow } from 'reactflow';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MDTypography from 'components/MDTypography';
import { useVisualizerController } from 'contexts/VisualizerContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

import LatencyPanel from './LatencyPanel';
import OutliersPanel from './OutliersPanel';
import SidebarOptions from './SidebarOptions';

const LatencySidebar = () => {
  const { state, dispatch, toggleSidePanel, selectNode } = useVisualizerController();
  const { isAnyNodeSelected } = state;
  const { getNodes } = useReactFlow();

  const [selected, setSelected] = useState('');
  const [selectBool, setSelectBool] = useState(false);
  const [helperText, setHelperText] = useState("Select Node and Display its Latency Insights ");
  const [currentView, setCurrentView] = useState('listView'); // Control view mode
  
  const sortedNodes = [...getNodes()];
  sortedNodes.sort((a, b) => a.id.localeCompare(b.id));

  const handleCloseSidePanel = () => {
    toggleSidePanel(dispatch, false);
    selectNode(dispatch, false);
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const handleChoiceClick = (choice) => {
    setCurrentView(choice);
  };

  const handleBackButtonClick = () => {
    setCurrentView('listView');
  };

  useEffect(() => {
    setSelected(isAnyNodeSelected);
  }, [isAnyNodeSelected]);

  const contentViewMapping = {
    listView: <SidebarOptions onClick={handleChoiceClick}/>,
    VersionServiceLatency: <LatencyPanel node={selected} currentView={currentView} />,
    CorrelationChart: <LatencyPanel node={selected} currentView={currentView} />,
    TopologyOverview: <OutliersPanel />,
  };

  return (
    <Panel
      position="top-right"
      style={{
        backgroundColor: '#1f283e',
        paddingLeft: '8px',
        paddingRight: '4px',
        paddingTop: '4px',
      }}
    >
      <Box paddingTop={2} paddingLeft={2} paddingRight={2} sx={{ color: 'white' }}>
        <IconButton onClick={handleCloseSidePanel} sx={{ position: 'absolute', right: 4, top:0 }}>
          <CloseIcon  color="white" />
        </IconButton>

        <MDTypography variant="h6" color="white">
          Latency Insights
        </MDTypography>
        <div>
			{ (currentView !== 'TopologyOverview') &&
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
			 }
        </div>
        {contentViewMapping[currentView]}
        {currentView !== 'listView' && (
          <IconButton onClick={handleBackButtonClick} sx={{ position: 'absolute', bottom: 0, left: 0 }}>
            <ArrowBackIcon color="white" />
          </IconButton>
        )}
      </Box>
    </Panel>
  );
};

export default LatencySidebar;