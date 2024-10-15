import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { ReactFlowProvider } from "reactflow";
import { useLocation } from "react-router-dom";
import MDTypography from "components/MDTypography";
import elasticApmEndpoints from "network/endpoints/elasticApm";
import ReactFlowWrapperTraceVisualizer from "./TraceLayout";

const TraceVisualizer = () => {
  const [traceData, setTraceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const traceName = location.state?.traceName || "defaultTraceName";

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
    <Box pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <Box
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <Tooltip title="Resource Usage">
                <IconButton>
                  {/* Add icon or action here if needed */}
                </IconButton>
              </Tooltip>
            </Box>
            <Box pt={3} pl={10} pb={5}>
              {loading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress color="inherit" />
                </Box>
              ) : traceData ? (
                <ReactFlowProvider>
                  <ReactFlowWrapperTraceVisualizer traceData={traceData} />
                </ReactFlowProvider>
              ) : (
                <div>No data available for this trace.</div>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TraceVisualizer;
