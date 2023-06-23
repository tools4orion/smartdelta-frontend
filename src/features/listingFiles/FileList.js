import DataTable from '../../examples/Tables/DataTable';
import React, {useEffect} from 'react';
import { useFileController } from "../../contexts/FileContext";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import { getFileTableData } from './FileTableData';

const FileList = () => {
  const { state, fetchFiles }  = useFileController();

  const {attachments,isUploading, sumOfSize}= state;
  console.log(attachments);

  const { columns, rows } = getFileTableData(attachments);

  const quotaInMB = 3072;
  const freeSpaceInMB = quotaInMB - sumOfSize;
  const freeSpaceInGB = parseFloat((freeSpaceInMB / 1024).toFixed(2));

 

   useEffect(() => {
		fetchFiles();
	  }, []);

	return (
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
				<MDBox
				  display="flex"
				  flexDirection="row"
				  alignItems="center"
				  justifyContent="space-between"
				>
				  <MDTypography variant="h6" color="white">
				   Manage Files
				  </MDTypography>
				  <MDTypography variant="h6" color="white">
					Storage Area: {sumOfSize} MB / 3 GB used; {freeSpaceInGB} GB free
				  </MDTypography>
				</MDBox>
			  </MDBox>
			  <MDBox pt={3}>
				<DataTable
				  table={{ columns, rows }}
				  isSorted={false}
				  entriesPerPage={false}
				  showTotalEntries={false}
				  noEndBorder
				/>
			  </MDBox>
			</Card>
		  </Grid>
		</Grid>
	  </MDBox>
	);
}

export default FileList;