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
import Popover from '@mui/material/Popover';
import MDTypography from 'components/MDTypography';
import MDBox from 'components/MDBox';
import InfoIcon from '@mui/icons-material/Info';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CircleIcon from '@mui/icons-material/Circle';
import { getServiceData } from 'features/analyse/reports/DistributionErrorRate';
import { calculateMicroserviceMetrics } from 'features/analyse/reports/DistributionErrorRate';
const bgStyles ={
		background: '#360033',  /* fallback for old browsers */
background: '-webkit-linear-gradient(to right, #0b8793, #360033)', /* Chrome 10-25, Safari 5.1-6 */
background: 'linear-gradient(to right, #0b8793, #360033)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

	  }
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

export default memo(({ data, tableData }) => {
	const { getEdges } = useReactFlow();
 const { state,dispatch,toggleSidePanel,  toggleLatencySidebar, selectNode} = useVisualizerController();
 const {isSidePanelOpen, isAnyNodeSelected} = state;
 console.log(isSidePanelOpen);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  //
 
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  //


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

  console.log("DATA");
  console.log(data);
// call a function that gets service summary array as input and filter relevaant service summary based on the node label data so that popover display the relevant service summary
const servicesData =calculateMicroserviceMetrics(tableData);
const serviceData = getServiceData(servicesData, data);
console.log("serviceData");
console.log(serviceData);

  return (
    <>
		 <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
		
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      ><MDBox p={1} mt={4} sx={bgStyles}>
        <MDTypography variant='h6' sx={{ p: 1 }}>Anomaly Detection 	 <InfoIcon fontSize="small" /> </MDTypography>
	
		<MDTypography variant='body2' sx={{ p: 1 }}><CircleIcon sx={{color:'orange'}}  fontSize='small' /> Score(max): 84 </MDTypography>
		<MDTypography variant='body2' sx={{ p: 1 }}>Trans.per minute(avg): {serviceData?.tpmAvg || null}</MDTypography>
		<MDTypography variant='body2' sx={{ p: 1 }}>Req. per min(avg): 334 rpm</MDTypography>
		<MDTypography variant='body2' sx={{ p: 1 }}>Trans. error rate(avg): {serviceData?.latestErrorRate || null}</MDTypography>
		<MDTypography variant='body2' sx={{ p: 1 }}>CPU usage: 21%</MDTypography>
		<MDTypography variant='body2' sx={{ p: 1 }}>Memory usage: 21%</MDTypography>
		</MDBox>
      </Popover>
      <div   aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose} onContextMenu={handleNodeContextMenu}>

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
