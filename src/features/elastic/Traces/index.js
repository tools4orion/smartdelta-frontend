import { useEffect, useState } from "react";
import {
  Card,
  Box,
  CircularProgress,
  Autocomplete,
  TextField,
} from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import TracesList from "./TracesList";
import getTraces from "../actions/getTraces";

const Traces = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getTraces();
        setData(data);
      } catch (error) {
        console.error("Error fetching traces:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = [
    { label: "Last 5 Minutes", value: 1 },
    { label: "Last 1 Hour", value: 2 },
    { label: "Last 1 Day", value: 3 },
    { label: "Last 1 Week", value: 4 },
    { label: "Last 1 Month", value: 5 },
    { label: "Last 1 Year", value: 6 },
    { label: "Last 5 Years", value: 7 },
  ];

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        {data === null || loading ? (
          <Box display="flex" justifyContent="center" sx={{ p: 36 }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <MDBox mt={12}>
            <Card
              sx={{
                mt: -8,
                py: 2,
                px: 2,
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
              >
                <Box display="flex" alignItems="center"></Box>
                <Box>
                  <Autocomplete
                    options={options}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select a date range"
                        variant="standard"
                      />
                    )}
                    sx={{ width: 250 }}
                  />
                </Box>
              </Box>

              {/* Render the data table */}
              {data !== null && <TracesList data={data} />}
            </Card>
          </MDBox>
        )}
      </DashboardLayout>
    </>
  );
};

export default Traces;
