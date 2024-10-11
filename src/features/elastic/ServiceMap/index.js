import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { Card, Grid, Breadcrumbs, IconButton} from "@mui/material"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InsightsIcon from '@mui/icons-material/Insights';
import SummarizeIcon from '@mui/icons-material/Summarize';


const  ElasticServiceMap = () => {
    return(
    <DashboardLayout> 
	<DashboardNavbar /> 
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" sx={{color:'#e6ee9c'}} />}
                  aria-label="breadcrumb"
				>
                  {breadcrumbs}
				</Breadcrumbs>
				<Tooltip title='Services Summary'>
		<IconButton onClick={ clickResourcePrediction } sx={{position:'absolute', left:2, bottom:5 }}>
			<SummarizeIcon color='white'/>
		</IconButton>
		</Tooltip>
				<Tooltip title='Help'>
					<IconButton onClick={ handleClickOpen } sx={{position:'absolute', left:32, bottom:5 }}>
					<HelpOutlineIcon color='white'/>
					</IconButton>
				</Tooltip>
		<Tooltip title='Resource Usage'>
		<IconButton onClick={ clickResourcePrediction } sx={{position:'absolute', left:62, bottom:5 }}>
			<InsightsIcon color='white'/>
		</IconButton>
		</Tooltip>
              </MDBox>
              <MDBox pt={3} pl={10} pb={5}>
                {/* {location.state?.result.owner || `There is no solution, yet`} */}
                {data ? <ElasticMapReactFlowWrapper mapData={data} /> : `There is no data to visualize yet`}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
    )
}

export default ElasticServiceMap;