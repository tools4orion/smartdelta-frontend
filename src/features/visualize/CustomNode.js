import React, { memo, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PaletteIcon from '@mui/icons-material/Palette';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useVisualizerController } from 'contexts/VisualizerContext';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const LightTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		background:'linear-gradient(120deg, #182848 0%,  #4b6cb7 100%)'
		
	 
	},
	[`& .${tooltipClasses.arrow}`]: {
		color: '#4b6cb7'
	},
  }));

export default memo(({ data }) => {
	const { getEdges } = useReactFlow();
 const { state,dispatch,toggleSidePanel,  toggleLatencySidebar, selectNode} = useVisualizerController();
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

  const handleLatencySidebar = () => {
	setMenuOpen(false);
	setAnchorEl(null);
  
	toggleLatencySidebar(dispatch, true); // Toggle the LatencySidebar
	selectNode(dispatch, data);
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
		 <LightTooltip placement="left" title="Inspect Sent and Incoming Interactions for This Node">
          <StyledMenuItem onClick={handleSidePanel}>
            <StyledIcon>
              <AssessmentIcon fontSize="medium" /> {/* Adjust the fontSize here */}
            </StyledIcon>
            <StyledText>View Interaction Details</StyledText>
          </StyledMenuItem>
		  </LightTooltip>
		   <LightTooltip placement="left" title="Explore Request Latency Metrics and Insights">
		  <StyledMenuItem onClick={handleLatencySidebar}>
            <StyledIcon>
              <AccessTimeIcon fontSize="medium" /> {/* Adjust the fontSize here */}
            </StyledIcon>
            <StyledText>Analyze Latency</StyledText>
          </StyledMenuItem>
		  </LightTooltip>
          <StyledMenuItem onClick={handleMenuClose}>
            <StyledIcon>
              <PaletteIcon fontSize="medium" />
            </StyledIcon>
            <StyledText>Customization Options</StyledText>
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
  }

}));

const StyledIcon = styled('div')({
  display: 'flex',
  marginRight: '8px',
});

const StyledText = styled('span')({
  fontSize: '14px'
});
