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
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Chart from "react-apexcharts";
import axios from "axios";
import DataTable from "examples/Tables/DataTable";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";
import useSnackbar from "hooks/useSnackbar";
import { useLocation } from "react-router-dom";
import k8slogo from "../../assets/svgs/kubernetes-logo.svg";
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

const MicroservicesMonitoring = () => {
  const location = useLocation();
  const {
    selectedPods,
    prometheusIP = "127.0.0.1",
    prometheusPort = "9090",
    imageSizes,
  } = location.state || {};
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const snackbar = useSnackbar();
  const { isOpen, closeSnackbar, message, icon, title, type } = snackbar;

  const [isLoading, setIsLoading] = useState(false);
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
  const [heapTimeRange, setHeapTimeRange] = useState(timeRanges[0].value);
  const [heapUsageData, setHeapUsageData] = useState({});
  const [heapTableData, setHeapTableData] = useState([]);
  const [selectedHeapPods, setSelectedHeapPods] = useState(selectedPods);
  const [loadingHeap, setLoadingHeap] = useState(false);
  const [globalTimeRange, setGlobalTimeRange] = useState(timeRanges[0].value);
  const [globalEntriesPerPage, setGlobalEntriesPerPage] = useState(5);

  const prometheusServer = `http://${prometheusIP}:${prometheusPort}`;
  // action network requests is not used since third party API is used for all requests in this component
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
        snackbar.openSnackbar(
          `Error fetching ${metric} metrics for pod ${pod}:`,
          "error",
          error.message
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
        setIsLoading(true);
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
        setTimeout(() => {
          setIsLoading(false);
        }, 50);
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
        setIsLoading(true);
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
        setTimeout(() => {
          setIsLoading(false);
        }, 50);
      }
    };

    updateMemoryMetrics();
  }, [selectedPods, memoryTimeRange, fetchPodMetrics, memoryUsageData]);

  useEffect(() => {
    const updateHeapMetrics = async () => {
      const podsToFetch = selectedPods.filter(
        (pod) =>
          !heapUsageData[pod]?.timeRange ||
          heapUsageData[pod]?.timeRange !== heapTimeRange
      );

      if (podsToFetch.length > 0) {
        setIsLoading(true);
        setLoadingHeap(true);
        const newMetrics = await Promise.all(
          podsToFetch.map((pod) =>
            fetchPodMetrics(
              pod,
              heapTimeRange,
              "nodejs_heap_size_used_bytes"
            ).then((data) => ({
              pod,
              data,
            }))
          )
        );

        setHeapUsageData((prevData) => {
          const updatedData = { ...prevData };
          newMetrics.forEach(({ pod, data }) => {
            updatedData[pod] = { timeRange: heapTimeRange, data };
          });
          return updatedData;
        });

        setLoadingHeap(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 50);
      }
    };

    updateHeapMetrics();
  }, [selectedPods, heapTimeRange, fetchPodMetrics, heapUsageData]);

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
    setHeapTableData(updateTableData(heapUsageData, selectedHeapPods));
  }, [
    selectedCpuPods,
    selectedMemoryPods,
    cpuUsageData,
    memoryUsageData,
    selectedHeapPods,
    heapUsageData,
  ]);

  useEffect(() => {
    setCpuTimeRange(globalTimeRange);
    setMemoryTimeRange(globalTimeRange);
    setHeapTimeRange(globalTimeRange);
  }, [globalTimeRange]);

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
          } else if (title === "Memory Usage" || title === "Heap Usage") {
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
      {
        Header: "Pod",
        accessor: "pod",
        Cell: ({ value }) => (
          <Tooltip title={value} arrow>
            <span>
              {value.length > 15 ? `${value.slice(0, 15)}...` : value}
            </span>
          </Tooltip>
        ),
      },
      {
        Header: "Timestamp",
        accessor: "timestamp",
        Cell: ({ value }) => {
          const datePart = value.split(" ")[0];
          return (
            <Tooltip title={value} arrow>
              <span>{datePart}</span>
            </Tooltip>
          );
        },
      },
      {
        Header:
          metric === "Memory" || metric === "Heap"
            ? `${metric} (MB)`
            : `${metric} (Cores)`,
        accessor: "value",
      },
    ],
    rows: data,
  });

  return (
    <DashboardLayout>
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
                  CPU, Active Memory and Heap Usage Metrics for Microservices
                </MDTypography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    select
                    label="Global Time Range"
                    value={globalTimeRange}
                    onChange={(e) => setGlobalTimeRange(Number(e.target.value))}
                    sx={{
                      width: 150,
                      "& .MuiOutlinedInput-root": {
                        height: 35,
                        "& fieldset": {
                          borderColor: "#fff",
                          borderWidth: 1,
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#fff",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    {timeRanges.map((range) => (
                      <MenuItem key={range.value} value={range.value}>
                        {range.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Global Entries Per Page"
                    value={globalEntriesPerPage}
                    onChange={(e) =>
                      setGlobalEntriesPerPage(Number(e.target.value))
                    }
                    sx={{
                      width: 150,
                      "& .MuiOutlinedInput-root": {
                        height: 35,
                        "& fieldset": {
                          borderColor: "#fff",
                          borderWidth: 1,
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#fff",
                        fontWeight: "bold",
                      },
                      marginLeft: 1,
                    }}
                  >
                    {[5, 10, 20, 50, 100].map((entry) => (
                      <MenuItem key={entry} value={entry}>
                        {entry}
                      </MenuItem>
                    ))}
                  </TextField>
                  <img
                    src={k8slogo}
                    alt="Kubernetes Logo"
                    style={{ height: 60 }}
                  />
                </Box>
              </MDBox>
              <Grid container spacing={3}>
                {/* CPU Usage Section */}
                <Grid item xs={12} md={4}>
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
                          defaultValue: globalEntriesPerPage,
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
                <Grid item xs={12} md={4}>
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
                          defaultValue: globalEntriesPerPage,
                          entries: [5, 10, 20, 50, 100],
                        }}
                        canSearch
                        showTotalEntries
                        pagination={{ variant: "gradient", color: "info" }}
                      />
                    )}
                  </Box>
                </Grid>
                {/* Heap Usage Section */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ m: 3 }}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      margin={3}
                    >
                      <Typography variant="h5" align="center">
                        Heap Usage
                      </Typography>
                      <Tooltip title="`nodejs_heap_size_used_bytes` metric is used to monitor the heap memory actively used by Node.js applications.">
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
                      label="Heap Time Range"
                      value={heapTimeRange}
                      onChange={(e) => setHeapTimeRange(Number(e.target.value))}
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
                      options={createChartOptions("Heap Usage")}
                      series={createChartData(heapUsageData, selectedPods)}
                      type="line"
                      height={300}
                    />
                    <Autocomplete
                      multiple
                      options={selectedPods}
                      value={selectedHeapPods}
                      onChange={(e, newValue) => setSelectedHeapPods(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Pods for Heap Table"
                        />
                      )}
                      sx={{ mb: 1, mt: 6, minWidth: 300 }}
                    />
                    {loadingHeap ? (
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
                        table={createTableStructure(heapTableData, "Heap")}
                        entriesPerPage={{
                          defaultValue: globalEntriesPerPage,
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
              {/* Image Sizes */}
              {Object.keys(imageSizes).length !== 0 && (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  margin={3}
                >
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="h5"
                      align="center"
                      sx={{ fontWeight: "bold" }}
                    >
                      Image Sizes
                    </Typography>
                    <Tooltip title="The sizes of the images used in the pod / microservices">
                      <IconButton>
                        <HelpOutlineIcon
                          sx={{ color: darkMode ? "#FFF" : "#000" }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box marginTop={2} width="100%" maxWidth="600px">
                    {Object.entries(imageSizes).map(
                      ([name, { imageSize }], index) => (
                        <Box
                          key={index}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          padding={1}
                          borderBottom="1px solid"
                          borderColor={darkMode ? "#444" : "#ddd"}
                          sx={{
                            backgroundColor: darkMode ? "#1a2035" : "#f9f9f9",
                            borderRadius: "4px",
                            marginBottom: 1,
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: "bold",
                              color: darkMode ? "#FFF" : "#000",
                            }}
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: darkMode ? "#FFF" : "#000" }}
                          >
                            {(imageSize / 1048576).toFixed(2)} MB
                          </Typography>
                        </Box>
                      )
                    )}
                  </Box>
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDSnackbar
        open={isOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={message}
        icon={icon}
        close={closeSnackbar}
        title={title}
        color={type}
      >
        <p>{snackbar.message}</p>
      </MDSnackbar>
    </DashboardLayout>
  );
};

export default MicroservicesMonitoring;
