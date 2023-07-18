import React from 'react';
import { useLocation } from "react-router-dom";

import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { useFileController } from "contexts/FileContext";
import ReactFlowWrapper from './ForceLayout';

function Visualizer() {
  const location = useLocation();
  
    const {state} = useFileController();
	const { fileStateToView } = state;
	const { fileName } = fileStateToView || {};
	const data = location.state?.result || fileStateToView;

	const breadcrumbs = [
	<MDTypography variant="h6" color="white">
		Dataset
	</MDTypography>,
	<MDTypography variant="h6" color="white">
		{fileName}
	</MDTypography>,
	 ];
	//const { getNodes } = useReactFlow();
	//console.log(getNodes());
  return (
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
              </MDBox>
              <MDBox pt={3} pl={10} pb={5}>
                {/* {location.state?.result.owner || `There is no solution, yet`} */}
                {data ? <ReactFlowWrapper csvData={data} /> : `There is no data to visualize yet`}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Visualizer;
