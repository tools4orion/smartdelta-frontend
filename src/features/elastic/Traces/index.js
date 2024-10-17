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
import elasticsearch_logo from "../../../assets/svgs/elasticsearch_logo.svg";

const Traces = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [selectedRange, setSelectedRange] = useState("now-1y");

  const options = [
    { label: "Last 5 Minutes", value: "now-5m" },
    { label: "Last 1 Hour", value: "now-1h" },
    { label: "Last 1 Day", value: "now-1d" },
    { label: "Last 1 Week", value: "now-1w" },
    { label: "Last 1 Month", value: "now-1M" },
    { label: "Last 6 Months", value: "now-6M" },
    { label: "Last 1 Year", value: "now-1y" },
    { label: "Last 5 Years", value: "now-5y" },
  ];

  const fetchData = async (range) => {
    setLoading(true);
    try {
      const data = await getTraces(range);
      setData(data);
    } catch (error) {
      console.error("Error fetching traces:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRange) {
      fetchData(selectedRange);
    }
  }, [selectedRange]);

  const handleRangeChange = (event, newValue) => {
    if (newValue) {
      setSelectedRange(newValue.value);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {loading ? (
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
              // mb={4}
              m={2}
            >
              <Box display="flex" alignItems="center">
                <img
                  src={elasticsearch_logo}
                  alt="Elasticsearch Logo"
                  style={{ height: 42, marginRight: 16 }}
                />
              </Box>
              <Box>
                <Autocomplete
                  options={options}
                  getOptionLabel={(option) => option.label}
                  value={options.find(
                    (option) => option.value === selectedRange
                  )}
                  onChange={handleRangeChange}
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

            {data !== null && <TracesList data={data} />}
          </Card>
        </MDBox>
      )}
    </DashboardLayout>
  );
};

export default Traces;
