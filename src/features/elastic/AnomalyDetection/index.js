import { useEffect, useState } from "react";
import { Card, Grid } from "@mui/material"
import MDBox from "components/MDBox"
import MDTypography from "components/MDTypography"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import AnomalyList from "./AnomalyList"
import getAnomaliesTable from "./getAnomaliesTable"
import setupMl from "../actions/setupMl";
import AnomalyChart from "./AnomalyChart";

const Anomalies = () => {
	const [data, setData] = useState(null);
	const [text, setText] = useState('');
	useEffect(async() => {
		const {data,result_report}= await setupMl();
		setData(data);
		if(data.length === 0) setText('No anomalies found');
		
}, []);
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
				  <MDTypography variant="h6" color="white">
					Anomalies
				  </MDTypography>
				</MDBox>

				<AnomalyChart data={data} />
				<AnomalyList data={data} />
				<MDTypography variant="h6" color="text" fontWeight="medium" mt={4} mb={2} ml={4}>{text}</MDTypography>
				<MDBox display="flex" flexDirection="column" px={4} py={6}>

				  {/* Render the appropriate form inputs based on the selected tab */}
				</MDBox>
			  </Card>
			</Grid>
		  </Grid>
		</MDBox>
	  </DashboardLayout>
	)
}
export default Anomalies