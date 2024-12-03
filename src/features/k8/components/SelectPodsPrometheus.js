import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  CircularProgress,
  Checkbox,
  Tooltip,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import k8spm from "../../../assets/images/k8spm.png";
import { useMaterialUIController } from "contexts/UIContext";
import MDSnackbar from "components/MDSnackbar";
import useSnackbar from "hooks/useSnackbar";
import ReplayIcon from "@mui/icons-material/Replay";
import prometheus from "../../../assets/svgs/prometheus_logo.svg";

const SelectPodsPrometheus = () => {
  const [pods, setPods] = useState([]);
  const [filteredPods, setFilteredPods] = useState([]);
  const [selectedPods, setSelectedPods] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [controller, _] = useMaterialUIController();

  const [prometheusIP, setPrometheusIP] = useState("127.0.0.1");
  const [prometheusPort, setPrometheusPort] = useState("9090");
  const [prometheusServer, setPrometheusServer] = useState(
    "http://127.0.0.1:9090"
  );
  const [showCustomPrometheusInput, setShowCustomPrometheusInput] =
    useState(false);
  const [prometheusFetchTrigger, setPrometheusFetchTrigger] = useState(0);

  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { isOpen, closeSnackbar, message, icon, title, type } = snackbar;
  const { darkMode } = controller;
  let debounceTimeout;

  useEffect(() => {
    const fetchPods = async () => {
      setLoading(true);
      try {
        const query = `up{job="kubernetes-pods"}`;
        const response = await axios.get(`${prometheusServer}/api/v1/query`, {
          params: { query },
        });
        const data = response.data;

        if (response.status === 200 && data.status === "success") {
          const podDetails = data.data.result.map((item) => ({
            pod: item.metric.pod,
            app: item.metric.app || "N/A",
            isUp: item.value[1] === "1",
          }));
          setPods(podDetails);
          setFilteredPods(podDetails);
        }
      } catch (err) {
        snackbar.openSnackbar(
          "Please make sure that your Prometheus server is running. Also, check its IP and port.",
          "error",
          "Connection Error"
        );
        setShowCustomPrometheusInput(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPods();
  }, [prometheusServer, prometheusFetchTrigger]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearching(true);

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      setFilteredPods(
        pods.filter((item) =>
          item.pod.toLowerCase().includes(query.toLowerCase())
        )
      );
      setSearching(false);
    }, 500);
  };

  const handleSelectPod = (podName) => {
    setSelectedPods((prevSelected) =>
      prevSelected.includes(podName)
        ? prevSelected.filter((pod) => pod !== podName)
        : [...prevSelected, podName]
    );
  };

  const handleSelectAll = (isSelected) => {
    const visiblePods = filteredPods.map((pod) => pod.pod);
    setSelectedPods(isSelected ? visiblePods : []);
  };

  const handleConnect = () => {
    if (selectedPods.length === 0) {
      snackbar.openSnackbar(
        "Please select at least one pod.",
        "error",
        "Empty selection"
      );
      return;
    }
    navigate("/k8s-cluster-comparisons", {
      state: {
        selectedPods,
        prometheusIP,
        prometheusPort,
      },
    });
  };

  const handleItemsPerPageChange = (event) => {
    const value = event.target.value;
    if (value === "show-all") {
      setItemsPerPage(filteredPods.length);
    } else {
      setItemsPerPage(parseInt(value, 10));
    }
  };

  const handleRetryConnection = () => {
    const sanitizedIP = prometheusIP.trim().replace(/[^0-9.]/g, "");
    const sanitizedPort = prometheusPort.trim().replace(/[^0-9]/g, "");

    if (sanitizedIP && sanitizedPort) {
      const newServer = `http://${sanitizedIP}:${sanitizedPort}`;
      setPrometheusServer(newServer);
      // for retrying the connection 127.0.0.1:9090
      if (newServer === prometheusServer) {
        setPrometheusFetchTrigger((prev) => prev + 1);
      }
      setShowCustomPrometheusInput(false);
    } else {
      snackbar.openSnackbar(
        "Please enter a valid IP and port.",
        "error",
        "Invalid Input"
      );
    }
  };

  const areAllVisiblePodsSelected =
    filteredPods.length > 0 &&
    filteredPods.every((pod) => selectedPods.includes(pod.pod));

  const isSomeVisiblePodsSelected =
    filteredPods.some((pod) => selectedPods.includes(pod.pod)) &&
    !areAllVisiblePodsSelected;

  return (
    <Box px={4} py={4}>
      {showCustomPrometheusInput ? (
        <Box sx={{ mb: 3, p: 2, border: "1px solid red", borderRadius: 2 }}>
          <Typography variant="h5" color="error" gutterBottom sx={{ mb: 1 }}>
            Prometheus Connection Failed
          </Typography>
          <Typography
            variant="h6"
            color={darkMode ? "#FFF" : "#344767"}
            gutterBottom
            sx={{ mb: 2, textAlign: "center" }}
          >
            Please make sure that your Prometheus server is running and the IP &
            the port are correct
          </Typography>
          <Box
            sx={{
              m: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              label="Prometheus IP"
              variant="outlined"
              value={prometheusIP}
              onChange={(e) =>
                setPrometheusIP(e.target.value.replace(/[^0-9.]/g, ""))
              }
              sx={{ mr: 2 }}
            />
            <TextField
              label="Prometheus Port"
              variant="outlined"
              value={prometheusPort}
              onChange={(e) =>
                setPrometheusPort(e.target.value.replace(/[^0-9]/g, ""))
              }
              sx={{ mr: 2 }}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={handleRetryConnection}
              startIcon={<ReplayIcon />}
              sx={{
                color: darkMode ? "#FFF" : "#344767",
                borderColor: "red",
                "&:hover": {
                  borderColor: "#1A73E8",
                },
              }}
            >
              Retry Connection
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              mb: 3,
              gap: 1,
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={prometheus}
                alt="Prometheus logo"
                style={{ height: 50, marginRight: 12 }}
              />
              <Typography variant="h5" style={{ textAlign: "center" }}>
                Kubernetes Cluster Monitoring via Prometheus
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Select Pods & Microservices
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={areAllVisiblePodsSelected}
                      indeterminate={isSomeVisiblePodsSelected}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      disabled={filteredPods.length === 0}
                    />
                  }
                  label="Select All"
                />
                <TextField
                  label="Search..."
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  sx={{ maxWidth: 300 }}
                />
                <TextField
                  select
                  label="Display"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  sx={{
                    width: 72,
                    ".MuiOutlinedInput-root": {
                      height: 44.13,
                    },
                  }}
                >
                  {[6, 12, 24, 48].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                  {filteredPods.length > 48 && (
                    <MenuItem value="show-all">Show All</MenuItem>
                  )}
                </TextField>
              </Box>
            </Box>
          </Box>
          {loading || searching ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 18,
              }}
            >
              <CircularProgress color="secondary" />
            </Box>
          ) : filteredPods.length === 0 ? (
            <Typography variant="h6" align="center" padding={18}>
              There is nothing to show here...
            </Typography>
          ) : (
            <>
              <Grid container spacing={3}>
                {[
                  ...new Map(
                    filteredPods.map((item) => [item.pod, item])
                  ).values(),
                ]
                  .slice(0, itemsPerPage)
                  .map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.pod}>
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          p: 2,
                          boxShadow: selectedPods.includes(item.pod)
                            ? "0px 0px 10px 2px #1976d2"
                            : undefined,
                          border: selectedPods.includes(item.pod)
                            ? "2px solid #1976d2"
                            : "1px solid #e0e0e0",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSelectPod(item.pod)}
                      >
                        <Tooltip
                          title={
                            item.isUp
                              ? "Microservice is up"
                              : "Microservice is down"
                          }
                          arrow
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              backgroundColor: item.isUp ? "green" : "red",
                            }}
                          />
                        </Tooltip>
                        <img
                          src={k8spm}
                          alt={item.pod + " icon"}
                          style={{ height: 140 }}
                        />
                        <CardContent>
                          <Typography
                            variant="h6"
                            align="center"
                            sx={{ fontSize: "1rem" }}
                          >
                            {item.app}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            align="center"
                            color={darkMode ? "#FFF" : "text.primary"}
                            sx={{
                              fontSize: "0.75rem",
                              mt: 1,
                            }}
                          >
                            {item.pod}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
              <Button
                variant="contained"
                color={darkMode ? "primary" : "black"}
                sx={{
                  mt: 3,
                  width: "100%",
                  "&.Mui-disabled": {
                    color: "white",
                    backgroundColor: "gray",
                  },
                }}
                disabled={selectedPods.length === 0}
                onClick={handleConnect}
              >
                Compare Selected Microservices
              </Button>
            </>
          )}
        </>
      )}
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
    </Box>
  );
};

export default SelectPodsPrometheus;
