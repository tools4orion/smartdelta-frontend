import React, { useState } from "react";
import { Tabs, Tab, Box, TextField, Button, Tooltip } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import awsEks from "../../../assets/svgs/awsEks.svg";
import google_cloud from "../../../assets/svgs/google_cloud.svg";
import microsoftAzure from "../../../assets/svgs/microsoftAzure.png";
import MDSnackbar from "components/MDSnackbar";
import MonitoringSystemsInputs from "./MonitoringSystemInputs";

import useSnackbar from "hooks/useSnackbar";

const CloudProviderInputs = ({
  cloudProviderValue,
  monitoringSysCards,
  handleCloudProviderChange,
  handleMonitoringSysChange,
  monitoringSysValue,
}) => {
  const [apiUrl, setApiUrl] = useState("");
  const [apiToken, setApiToken] = useState("");

  const snackbar = useSnackbar();
  const { isOpen, closeSnackbar, message, icon, title, type } = snackbar;

  const getCloudProviderName = () => {
    const cloudProviderNames = ["AWS", "Google Cloud", "Microsoft Azure"];
    return cloudProviderNames[cloudProviderValue] || "AWS";
  };
  const getCloudProviderSysIcon = () => {
    const monitoringsysname = getCloudProviderName();
    if (monitoringsysname === "AWS") {
      return awsEks;
    }
    if (monitoringsysname === "Google Cloud") {
      return google_cloud;
    }
    if (monitoringsysname === "Microsoft Azure") {
      return microsoftAzure;
    }
  };

  return (
    <>
      <MDTypography variant="h6" py={4} px={4}>
        Please select your cloud provider
      </MDTypography>
      <MDBox px={3}>
        <Tabs
          value={cloudProviderValue}
          onChange={handleCloudProviderChange}
          aria-label="icon label tabs"
        >
          <Tooltip title="Amazon Web Services" arrow>
            <Tab icon={<img width="75" height="75" src={awsEks} />} />
          </Tooltip>
          <Tooltip title="Google Cloud" arrow>
            <Tab icon={<img width="150" height="75" src={google_cloud} />} />
          </Tooltip>
          <Tooltip title="Microsoft Azure" arrow>
            <Tab icon={<img width="175" height="100" src={microsoftAzure} />} />
          </Tooltip>
        </Tabs>
      </MDBox>
      <MonitoringSystemsInputs
        monitoringSysCards={monitoringSysCards}
        handleMonitoringSysChange={handleMonitoringSysChange}
        monitoringSysValue={monitoringSysValue}
      />
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
              {`Please enter your ${getCloudProviderName()} Monitoring system details`}
            </MDTypography>
            <img
              src={getCloudProviderSysIcon()}
              alt="Logo"
              style={{ height: 30 }}
            />
          </MDBox>
          <TextField
            label={`${getCloudProviderName()} API Server URL`}
            variant="outlined"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label={`${getCloudProviderName()} API Token`}
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
export default CloudProviderInputs;
