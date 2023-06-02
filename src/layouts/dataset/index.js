// import React, { useState } from 'react';
// import axios from 'axios';
import { useLocation } from "react-router-dom";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import FlowChart from "../reactFlow";

function Dataset() {
  const location = useLocation();

  // eslint-disable-next-line no-console
  console.log(location.state?.result);
  // TODO: async await ekleyip bu sayfada file upload loading eklemeliyim diğer sayfaya
  // TODO: sonra da buraya react flow ekleyerek data göstermeliyim.
  const data = location.state?.result;

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
                  Dataset
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pl={10} pb={5}>
                {/* {location.state?.result.owner || `There is no solution, yet`} */}
                {data ? <FlowChart data={data} /> : `There is no data to investigate`}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dataset;
