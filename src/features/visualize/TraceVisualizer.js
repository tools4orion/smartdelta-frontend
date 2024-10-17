import React from "react";
import { Card, Grid, Box } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { ReactFlowProvider } from "reactflow";
import { useLocation } from "react-router-dom";
import ReactFlowWrapperTraceVisualizer from "./TraceLayout";
import { useMaterialUIController } from "contexts/UIContext";

const TraceVisualizer = () => {
  const [controller, _] = useMaterialUIController();

  const location = useLocation();
  const traceName = location.state?.traceName || "defaultTraceName";
  const selectedData = location.state?.selectedData || {};
  const { darkMode } = controller;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                {selectedData && traceName ? (
                  <ReactFlowProvider>
                    <ReactFlowWrapperTraceVisualizer
                      selectedData={selectedData}
                    />
                  </ReactFlowProvider>
                ) : (
                  <Box sx={{ color: darkMode ? "#FFFFFF" : "#000000", p: 3 }}>
                    No data available for this trace.
                  </Box>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default TraceVisualizer;
