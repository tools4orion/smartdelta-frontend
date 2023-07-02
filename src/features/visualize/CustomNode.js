import React, { memo, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PaletteIcon from '@mui/icons-material/Palette';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useVisualizerController } from 'contexts/VisualizerContext';

export default memo(({ data }) => {
	const { getEdges } = useReactFlow();
 const {state,dispatch,toggleSidePanel, selectNode} = useVisualizerController();
 const {isSidePanelOpen, isAnyNodeSelected} = state;
 console.log(isSidePanelOpen);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);


  const handleNodeContextMenu = (event) => {
    event.preventDefault();
    setMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setAnchorEl(null);
  };

  const getIntereactions = (node) => {
	const edges = getEdges();
	const sentMessages = [];
	const incomingMessages = [];
  
	for (const edge of edges) {
	  if (edge.sourceHandle === node || edge.targetHandle === node) {
		if (edge.sourceHandle === node) {
		  sentMessages.push(edge);
		} else {
		  incomingMessages.push(edge);
		}
	  }
	}
  
	return { sentMessages, incomingMessages }
  };

  const handleSidePanel = () => {
    setMenuOpen(false);
    setAnchorEl(null);
	
	toggleSidePanel(dispatch, true);
	selectNode(dispatch, data);
	
	// dispatch action to get interactions
	//getIntereactions(data);

  };

  return (
    <>
      <div onContextMenu={handleNodeContextMenu}>
        {data}

        {/* Your node content goes here */}
        <Handle type="source" position={Position.Top} id="s1" />
        <Handle type="source" position={Position.Right} id="s2" />
        <Handle type="target" position={Position.Bottom} id="t1" />
        <Handle type="target" position={Position.Left} id="t2" />

        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <StyledMenuItem onClick={handleSidePanel}>
            <StyledIcon>
              <AssessmentIcon fontSize="medium" /> {/* Adjust the fontSize here */}
            </StyledIcon>
            <StyledText>Details</StyledText>
          </StyledMenuItem>
          <StyledMenuItem onClick={handleMenuClose}>
            <StyledIcon>
              <PaletteIcon fontSize="medium" />
            </StyledIcon>
            <StyledText>Customize</StyledText>
          </StyledMenuItem>
		  <StyledMenuItem onClick={handleMenuClose}>
       
		  <StyledIcon>
		  <FileDownloadIcon fontSize="medium" /> 
		  </StyledIcon>
		  <StyledText>Export as csv</StyledText> 
		  </StyledMenuItem>
        </Menu>
      </div>
    </>
  );
});

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
  },
}));

const StyledIcon = styled('div')({
  display: 'flex',
  marginRight: '8px',
});

const StyledText = styled('span')({
  fontSize: '14px'
});
