import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  MenuItem,
  Autocomplete,
  Grid,
  Card,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Chart from "react-apexcharts";
import axios from "axios";
import DataTable from "examples/Tables/DataTable";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useLocation } from "react-router-dom";
import k8slogo from "../../../assets/svgs/kubernetes-logo.svg";
import { useMaterialUIController } from "contexts/UIContext";

const timeRanges = [
  { label: "Last 30 Minutes", value: 30 * 60 },
  { label: "Last 1 Hour", value: 60 * 60 },
  { label: "Last 1 Day", value: 24 * 60 * 60 },
  { label: "Last 1 Month", value: 30 * 24 * 60 * 60 },
  { label: "Last 6 Months", value: 180 * 24 * 60 * 60 },
  { label: "Last 1 Year", value: 365 * 24 * 60 * 60 },
];

const calculateStep = (timeRange) => {
  // to prevent too many data points (which leads 500 error response from Prometheus)
  const maxPoints = 11000;
  return Math.ceil(timeRange / maxPoints);
};

const MicroserviceMetrics = () => {
  const location = useLocation();
  const { selectedPods } = location.state || { selectedPods: [] };
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;

  const [cpuTimeRange, setCpuTimeRange] = useState(timeRanges[0].value);
  const [memoryTimeRange, setMemoryTimeRange] = useState(timeRanges[0].value);
  const [cpuUsageData, setCpuUsageData] = useState({});
  const [memoryUsageData, setMemoryUsageData] = useState({});
  const [cpuTableData, setCpuTableData] = useState([]);
  const [memoryTableData, setMemoryTableData] = useState([]);
  const [selectedCpuPods, setSelectedCpuPods] = useState(selectedPods);
  const [selectedMemoryPods, setSelectedMemoryPods] = useState(selectedPods);
  const [loadingCpu, setLoadingCpu] = useState(false);
  const [loadingMemory, setLoadingMemory] = useState(false);

  const prometheusServer = "http://127.0.0.1:9090"; // prometheus' most common server URL and port

  const fetchPodMetrics = useCallback(
    async (pod, timeRange, metric) => {
      const endTime = Math.floor(Date.now() / 1000);
      const startTime = endTime - timeRange;
      const step = calculateStep(timeRange);

      // appropriate range for the rate() function based on the selected time range
      let rateRange;
      // 1 hour or less
      if (timeRange <= 60 * 60) {
        rateRange = "1m";
      } // 1 day or less
      else if (timeRange <= 24 * 60 * 60) {
        rateRange = "15m";
      } // 1 month or less
      else if (timeRange <= 30 * 24 * 60 * 60) {
        rateRange = "1h";
      } // more than 1 month
      else {
        rateRange = "6h";
      }

      const query =
        metric === "container_cpu_usage_seconds_total"
          ? `rate(${metric}{pod="${pod}"}[${rateRange}])`
          : `${metric}{pod="${pod}"}`;

      try {
        const response = await axios.get(
          `${prometheusServer}/api/v1/query_range`,
          {
            params: {
              query,
              start: startTime,
              end: endTime,
              step,
            },
          }
        );
        const values =
          response.data.data.result[0]?.values.map(([timestamp, value]) => ({
            x: new Date(timestamp * 1000).toISOString(),
            y: parseFloat(value),
          })) || [];
        return values;
      } catch (error) {
        console.error(
          `Error fetching ${metric} metrics for pod ${pod}:`,
          error
        );
        return [];
      }
    },
    [prometheusServer]
  );
  useEffect(() => {
    const updateCpuMetrics = async () => {
      const podsToFetch = selectedPods.filter(
        (pod) =>
          !cpuUsageData[pod]?.timeRange ||
          cpuUsageData[pod]?.timeRange !== cpuTimeRange
      );

      if (podsToFetch.length > 0) {
        setLoadingCpu(true);
        const newMetrics = await Promise.all(
          podsToFetch.map((pod) =>
            fetchPodMetrics(
              pod,
              cpuTimeRange,
              "container_cpu_usage_seconds_total"
            ).then((data) => ({
              pod,
              data,
            }))
          )
        );

        setCpuUsageData((prevData) => {
          const updatedData = { ...prevData };
          newMetrics.forEach(({ pod, data }) => {
            updatedData[pod] = { timeRange: cpuTimeRange, data };
          });
          return updatedData;
        });

        setLoadingCpu(false);
      }
    };

    updateCpuMetrics();
  }, [selectedPods, cpuTimeRange, fetchPodMetrics, cpuUsageData]);

  useEffect(() => {
    const updateMemoryMetrics = async () => {
      const podsToFetch = selectedPods.filter(
        (pod) =>
          !memoryUsageData[pod]?.timeRange ||
          memoryUsageData[pod]?.timeRange !== memoryTimeRange
      );

      if (podsToFetch.length > 0) {
        setLoadingMemory(true);
        const newMetrics = await Promise.all(
          podsToFetch.map((pod) =>
            fetchPodMetrics(
              pod,
              memoryTimeRange,
              //   "container_memory_usage_bytes" // it includes inactive memory
              "container_memory_working_set_bytes"
            ).then((data) => ({
              pod,
              data,
            }))
          )
        );

        setMemoryUsageData((prevData) => {
          const updatedData = { ...prevData };
          newMetrics.forEach(({ pod, data }) => {
            updatedData[pod] = { timeRange: memoryTimeRange, data };
          });
          return updatedData;
        });

        setLoadingMemory(false);
      }
    };

    updateMemoryMetrics();
  }, [selectedPods, memoryTimeRange, fetchPodMetrics, memoryUsageData]);

  useEffect(() => {
    const updateTableData = (usageData, selectedPods) => {
      return selectedPods.flatMap(
        (pod) =>
          usageData[pod]?.data.map((entry) => ({
            pod,
            timestamp: new Date(entry.x)
              .toISOString()
              .replace("T", " ")
              .substring(0, 19),
            value:
              usageData === cpuUsageData
                ? entry.y.toFixed(6)
                : (entry.y / (1024 * 1024)).toFixed(2), // converts bytes to MB
          })) || []
      );
    };

    setCpuTableData(updateTableData(cpuUsageData, selectedCpuPods));
    setMemoryTableData(updateTableData(memoryUsageData, selectedMemoryPods));
  }, [selectedCpuPods, selectedMemoryPods, cpuUsageData, memoryUsageData]);

  const createChartOptions = (title) => ({
    chart: {
      type: "line",
      zoom: { enabled: true },
      toolbar: { tools: { zoom: true, pan: true } },
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Time",
        style: {
          color: darkMode ? "#FFFFFF" : "#000000",
        },
      },
      labels: {
        style: {
          colors: darkMode ? "#FFFFFF" : "#000000",
        },
      },
    },
    yaxis: {
      title: {
        text: title,
        style: {
          color: darkMode ? "#FFFFFF" : "#000000",
        },
      },
      labels: {
        style: {
          colors: darkMode ? "#FFFFFF" : "#000000",
        },
        formatter: function (val) {
          if (title === "CPU Usage") {
            return `${val.toFixed(6)} cores`;
          } else if (title === "Memory Usage") {
            return `${(val / (1024 * 1024)).toFixed(2)} MB`;
          }
          return val;
        },
      },
    },
    stroke: { curve: "smooth" },
    tooltip: {
      x: { format: "yyyy-MM-dd HH:mm:ss" },
    },
    legend: {
      show: true,
      position: "bottom",
      labels: {
        colors: darkMode ? "#FFFFFF" : "#000000",
      },
    },
  });

  const createChartData = (usageData, selectedPods) =>
    selectedPods.map((pod) => ({
      name: pod,
      data: usageData[pod]?.data || [],
    }));

  const createTableStructure = (data, metric) => ({
    columns: [
      { Header: "Pod", accessor: "pod" },
      { Header: "Timestamp", accessor: "timestamp" },
      {
        Header: metric === "Memory" ? `${metric} (MB)` : `${metric} (Cores)`,
        accessor: "value",
      },
    ],
    rows: data,
  });

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
                py={2}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  CPU & Memory Metrics for Microservices
                </MDTypography>
                <img
                  src={k8slogo}
                  alt="Kubernetes Logo"
                  style={{ height: 60 }}
                />
              </MDBox>
              <Grid container spacing={3}>
                {/* CPU Usage Section */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ m: 3 }}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      margin={3}
                    >
                      <Typography variant="h5" align="center">
                        CPU Usage
                      </Typography>
                      <Tooltip title="`rate(container_cpu_usage_seconds_total)` metric is used to calculate the average CPU utilization per second. It tracks the total CPU time a container has consumed, and rate() calculates how much it increases over a specific range.">
                        <IconButton>
                          <HelpOutlineIcon
                            fontSize="small"
                            sx={{ color: darkMode ? "#FFF" : "#000" }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <TextField
                      select
                      label="CPU Time Range"
                      value={cpuTimeRange}
                      onChange={(e) => setCpuTimeRange(Number(e.target.value))}
                      sx={{
                        width: 150,
                        ".MuiOutlinedInput-root": {
                          height: 35,
                        },
                      }}
                    >
                      {timeRanges.map((range) => (
                        <MenuItem key={range.value} value={range.value}>
                          {range.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Chart
                      options={createChartOptions("CPU Usage")}
                      series={createChartData(cpuUsageData, selectedPods)}
                      type="line"
                      height={300}
                    />
                    <Autocomplete
                      multiple
                      options={selectedPods}
                      value={selectedCpuPods}
                      onChange={(e, newValue) => setSelectedCpuPods(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Pods for CPU Table"
                        />
                      )}
                      sx={{ mb: 1, mt: 6, minWidth: 300 }}
                    />
                    {loadingCpu ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          my: 5,
                        }}
                      >
                        <CircularProgress color="secondary" />
                      </Box>
                    ) : (
                      <DataTable
                        table={createTableStructure(cpuTableData, "CPU")}
                        entriesPerPage={{
                          defaultValue: 5,
                          entries: [5, 10, 20, 50, 100],
                        }}
                        canSearch
                        showTotalEntries
                        pagination={{ variant: "gradient", color: "info" }}
                      />
                    )}
                  </Box>
                </Grid>
                {/* Memory Usage Section */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ m: 3 }}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      margin={3}
                    >
                      <Typography variant="h5" align="center">
                        Memory Usage
                      </Typography>
                      <Tooltip title="`container_memory_working_set_bytes` metric is used, which measures the amount of memory actively used by the container, excluding cached or inactive memory.">
                        <IconButton>
                          <HelpOutlineIcon
                            fontSize="small"
                            sx={{ color: darkMode ? "#FFF" : "#000" }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <TextField
                      select
                      label="Memory Time Range"
                      value={memoryTimeRange}
                      onChange={(e) =>
                        setMemoryTimeRange(Number(e.target.value))
                      }
                      sx={{
                        width: 150,
                        ".MuiOutlinedInput-root": {
                          height: 35,
                        },
                      }}
                    >
                      {timeRanges.map((range) => (
                        <MenuItem key={range.value} value={range.value}>
                          {range.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Chart
                      options={createChartOptions("Memory Usage")}
                      series={createChartData(memoryUsageData, selectedPods)}
                      type="line"
                      height={300}
                    />
                    <Autocomplete
                      multiple
                      options={selectedPods}
                      value={selectedMemoryPods}
                      onChange={(e, newValue) =>
                        setSelectedMemoryPods(newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Pods for Memory Table"
                        />
                      )}
                      sx={{ mb: 1, mt: 6, minWidth: 300 }}
                    />
                    {loadingMemory ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          my: 5,
                        }}
                      >
                        <CircularProgress color="secondary" />
                      </Box>
                    ) : (
                      <DataTable
                        table={createTableStructure(memoryTableData, "Memory")}
                        entriesPerPage={{
                          defaultValue: 5,
                          entries: [5, 10, 20, 50, 100],
                        }}
                        canSearch
                        showTotalEntries
                        pagination={{ variant: "gradient", color: "info" }}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default MicroserviceMetrics;
