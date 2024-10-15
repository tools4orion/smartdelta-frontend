import { useState, useEffect } from "react";
import { Card, Grid, CircularProgress, Box } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { ReactFlowProvider } from "reactflow";
import { useLocation } from "react-router-dom";
import elasticApmEndpoints from "network/endpoints/elasticApm";
import ReactFlowWrapperTraceVisualizer from "./TraceLayout";
import { useMaterialUIController } from "contexts/UIContext";

const TraceVisualizer = () => {
  const [traceData, setTraceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [controller, _] = useMaterialUIController();

  const location = useLocation();
  const traceName = location.state?.traceName || "defaultTraceName";
  const { darkMode } = controller;

  useEffect(() => {
    const fetchTraceData = async () => {
      setLoading(true);
      try {
        const response = await elasticApmEndpoints.getTraceSpans(traceName);
        const { data } = response;
        console.log("Trace data:", data);
        setTraceData(data);
      } catch (error) {
        console.error("Error fetching trace data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTraceData();
  }, [traceName]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                {loading ? (
                  <Box display="flex" justifyContent="center" sx={{ p: 36 }}>
                    <CircularProgress color="inherit" />
                  </Box>
                ) : traceData ? (
                  <ReactFlowProvider>
                    <ReactFlowWrapperTraceVisualizer traceData={traceData} />
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
