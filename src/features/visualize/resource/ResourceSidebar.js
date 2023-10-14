import { Box, IconButton } from '@mui/material';
import MDAlertCloseIcon from 'components/MDAlert/MDAlertCloseIcon';
import MDTypography from 'components/MDTypography';
import ResourceLinearPrediction from 'features/analyse/reports/resource/ResourceLinearPredciton';
import CloseIcon from '@mui/icons-material/Close';
import { Panel } from  'reactflow';
import { useVisualizerController } from 'contexts/VisualizerContext';

const ResourceSidebar = ()=>{
	 const { dispatch, toggleResourceSidebar } = useVisualizerController();

	const handleCloseSidePanel = () => {
		toggleResourceSidebar(dispatch, false);
	  };
	
	return (
		<Panel
      position="top-right"
      style={{
        backgroundColor: '#1f283e',
        paddingLeft: '8px',
        paddingRight: '4px',
        paddingTop: '4px',
		height:800,
		width:404
      }}
    >
	  <Box  paddingTop={2} paddingLeft={4} paddingRight={4} sx={{ color: 'white'}}>
		<IconButton onClick={handleCloseSidePanel} sx={{ position: 'absolute', right: 4, top:0 }}>
		  <CloseIcon  color="white" />
		</IconButton>

		<MDTypography variant="h6" color="white">
		  Resource Usage Insights
		</MDTypography>
		<ResourceLinearPrediction />
		</Box>
	</Panel>
	)
}

export default ResourceSidebar;