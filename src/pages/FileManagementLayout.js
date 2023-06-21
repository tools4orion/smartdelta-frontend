import React from 'react';

import DashboardLayout from "../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../examples/Navbars/DashboardNavbar";
import Footer from "../examples/Footer";
import MDBox from "../components/MDBox";
import { Grid } from "@mui/material";

import Tables from "../layouts/file-table";
import UploadFile from "features/uploadFile/UploadFile";

const FileManagementLayout = () => {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
		  <Grid item xs={12}>
		    <UploadFile />
		  </Grid>
        </Grid>
        <Tables />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
  
};

export default FileManagementLayout;