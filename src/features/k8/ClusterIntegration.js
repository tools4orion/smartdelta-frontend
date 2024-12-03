import React, { useState } from "react";
import { Card, Grid, Tooltip } from "@mui/material";

import MDBox from "components/MDBox";
import useSnackbar from "hooks/useSnackbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MDSnackbar from "components/MDSnackbar";

import k8s from "../../assets/images/kubernetesFullLofo.png";
import cloud from "../../assets/images/cloud.png";
import local from "../../assets/images/local.png";

import prometheus from "../../assets/svgs/prometheus_logo.svg";
import signoz from "../../assets/svgs/signoz.svg";
import zabbix from "../../assets/images/zabbix_logo.png";
import datadog from "../../assets/svgs/datadog-logo.svg";

import DirectlyK8Sinputs from "./components/DirectlyK8Sinputs";
import CloudProviderInputs from "./components/CloudProviderInputs";
import LocalInputs from "./components/LocalInputs";

const monitoringSysCards = [
  { src: prometheus, alt: "Prometheus" },
  { src: signoz, alt: "SigNoz" },
  { src: zabbix, alt: "Zabbix" },
  { src: datadog, alt: "Datadog" },
];

const ClusterIntegration = () => {
  const [providerValue, setProviderValue] = useState(0);
  const [cloudProviderValue, setCloudProviderValue] = useState(0);
  const [monitoringSysValue, setMonitoringSysValue] = useState(null);
  const snackbar = useSnackbar();
  const { isOpen, closeSnackbar, message, icon, title, type } = snackbar;

  const handleProviderChange = (event, newValue) => {
    setProviderValue(newValue);
    setCloudProviderValue(0);
    setMonitoringSysValue(null);
  };
  const handleCloudProviderChange = (event, newValue) => {
    setCloudProviderValue(newValue);
  };
  const handleMonitoringSysChange = (index) => {
    setMonitoringSysValue((prevIndex) => (prevIndex === index ? null : index));
  };

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
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Enable Kubernetes Cluster Monitoring
                </MDTypography>
              </MDBox>
              <MDTypography variant="h6" py={3} px={8}>
                How would you like to integrate your Kubernetes monitoring?
              </MDTypography>
              <MDBox px={8}>
                <Tabs
                  value={providerValue}
                  onChange={handleProviderChange}
                  aria-label="icon label tabs"
                >
                  <Tooltip title="Directly from Kubernetes Cluster" arrow>
                    <Tab
                      icon={
                        <img width="135" height="100" src={k8s} alt="k8s img" />
                      }
                    />
                  </Tooltip>
                  <Tooltip title="Via a Cloud Provider" arrow>
                    <Tab
                      icon={
                        <img
                          width="90"
                          height="60"
                          src={cloud}
                          alt="cloud img"
                        />
                      }
                    />
                  </Tooltip>
                  <Tooltip title="Via Localhost" arrow>
                    <Tab
                      icon={
                        <img
                          width="75"
                          height="75"
                          src={local}
                          alt="localhost img"
                        />
                      }
                    />
                  </Tooltip>
                </Tabs>
              </MDBox>
              <MDBox display="flex" flexDirection="column" px={4} pb={4}>
                {providerValue === 0 && <DirectlyK8Sinputs />}
                {providerValue === 1 && (
                  <CloudProviderInputs
                    cloudProviderValue={cloudProviderValue}
                    monitoringSysCards={monitoringSysCards}
                    handleCloudProviderChange={handleCloudProviderChange}
                    handleMonitoringSysChange={handleMonitoringSysChange}
                    monitoringSysValue={monitoringSysValue}
                  />
                )}
                {providerValue === 2 && (
                  <LocalInputs
                    monitoringSysCards={monitoringSysCards}
                    handleMonitoringSysChange={handleMonitoringSysChange}
                    monitoringSysValue={monitoringSysValue}
                  />
                )}
              </MDBox>
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

export default ClusterIntegration;
