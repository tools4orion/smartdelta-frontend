import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import k8slogo from "../../../assets/svgs/kubernetes-logo.svg";
import useSnackbar from "hooks/useSnackbar";
import MDSnackbar from "components/MDSnackbar";
import SelectPodsPrometheus from "./SelectPodsPrometheus";
import local from "../../../assets/images/local.png";
import MonitoringSystemsInputs from "./MonitoringSystemInputs";

import prometheus from "../../../assets/svgs/prometheus_logo.svg";
import opentelemetry from "../../../assets/images/opentelemetry.png";
import zabbix from "../../../assets/images/zabbix_logo.png";
import datadog from "../../../assets/svgs/datadog-logo.svg";

const LocalInputs = ({
  monitoringSysCards,
  handleMonitoringSysChange,
  monitoringSysValue,
}) => {
  const [apiUrl, setApiUrl] = useState("");
  const [apiToken, setApiToken] = useState("");

  const snackbar = useSnackbar();
  const { isOpen, closeSnackbar, message, icon, title, type } = snackbar;

  const getMonitoringSysName = () => {
    const monitoringSysNames = [
      "Prometheus",
      "OpenTelemetry",
      "Zabbix",
      "Datadog",
    ];
    return monitoringSysNames[monitoringSysValue] || "Local";
  };

  const getMonitoringSysIcon = () => {
    const monitoringsysname = getMonitoringSysName();
    if (monitoringsysname === "Prometheus") {
      return prometheus;
    } else if (monitoringsysname === "OpenTelemetry") {
      return opentelemetry;
    } else if (monitoringsysname === "Zabbix") {
      return zabbix;
    } else if (monitoringsysname === "Datadog") {
      return datadog;
    } else return local;
  };

  return (
    <>
      <MonitoringSystemsInputs
        monitoringSysCards={monitoringSysCards}
        handleMonitoringSysChange={handleMonitoringSysChange}
        monitoringSysValue={monitoringSysValue}
      />
      {monitoringSysValue !== 0 ? (
        <>
          <MDBox px={3} py={4}>
            <Box
              display="flex"
              flexDirection="column"
              px={6}
              py={6}
              gap={2}
              sx={{ border: "1px solid #1A73E8", borderRadius: 2 }}
            >
              <MDBox
                mx={1}
                mt={-3}
                py={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6">
                  {`Please Enter Your ${getMonitoringSysName()} Monitoring System Details`}
                </MDTypography>
                <img
                  src={getMonitoringSysIcon()}
                  alt="Kubernetes Logo"
                  style={{ height: 30 }}
                />
              </MDBox>
              <TextField
                label={`${getMonitoringSysName()} API Server URL`}
                variant="outlined"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label={`${getMonitoringSysName()} API Token`}
                variant="outlined"
                type="password"
                value={apiToken}
                onChange={(e) => setApiToken(e.target.value)}
                fullWidth
                required
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  snackbar.openSnackbar(
                    "There is a problem occured while connecting to the Kubernetes Cluster",
                    "error",
                    "Authentication & Connection Error"
                  )
                }
                disabled={!apiUrl || !apiToken}
                sx={{
                  "&.Mui-disabled": {
                    color: "white",
                    backgroundColor: "gray",
                  },
                }}
              >
                Authenticate & Connect
              </Button>
            </Box>
          </MDBox>
        </>
      ) : (
        <SelectPodsPrometheus />
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
    </>
  );
};
export default LocalInputs;
