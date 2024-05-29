import { Card, Grid } from "@mui/material"
import MDBox from "components/MDBox"
import MDTypography from "components/MDTypography"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import DonutComparisonChart from "./DonutComparisonCharts"
import FadeIn from "hooks/FadeIn"
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import MDButton from 'components/MDButton';
import csvFile from 'assets/svgs/csv-fileIcon.webp';
import { useFileController } from "contexts/FileContext"
import fileQuestion from 'assets/svgs/fileQuestion.webp';
import NestedList from "./NestedList"


const ComparisonResult = () => {
	const { dispatch, toggleComparisonBox, displayComparisonResult , removeCompareFile, state } = useFileController();
	const { selectedFilesToCompare } = state;
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
					Comparison Result
				  </MDTypography>
				</MDBox>

				

				<div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',

            }}
          >
            <div style={{  width: '160px' }}>
              <img width="100" src={csvFile} alt="compare" />
              <MDTypography variant="h6" color="white">
                {selectedFilesToCompare[0]?.fileName}
              </MDTypography>
            </div>
            <CompareArrowsIcon fontSize="large" color="white" style={{ marginRight: '48px',  }} />
            <div style={{ position: 'relative', width: '160px' }}>
              <FadeIn>
                <img width="100" src={selectedFilesToCompare.length === 2 ? csvFile : fileQuestion} alt="compare" />
              </FadeIn>

              <MDTypography variant="h6" color="white">
                {selectedFilesToCompare.length === 2
                  ? selectedFilesToCompare[selectedFilesToCompare.length - 1]?.fileName
                  : 'go to file list to select  '}
              </MDTypography>
            </div>
          </div>
		
				<MDBox display="flex" px={8} py={6}>
				<DonutComparisonChart fileNo={1} />
		 		 <DonutComparisonChart fileNo={2}  />


				  {/* Render the appropriate form inputs based on the selected tab */}
				</MDBox>
				<MDBox display="flex" px={8} py={6}>
				<NestedList fileNo={1} />
				<NestedList fileNo={2} />
				  {/* Render the appropriate form inputs based on the selected tab */}
				</MDBox>
			  </Card>
			</Grid>
		  </Grid>
		</MDBox>
	  </DashboardLayout>
	)
}
export default ComparisonResult;