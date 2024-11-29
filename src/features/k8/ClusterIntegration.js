import React, { useState } from "react";
import { Card, Grid } from "@mui/material";

import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

import authenticateK8S from "./actions/auth.action";
import getClusterInfo from "./actions/cluster.action";
import getPodMetrics from "./actions/podmetrics.action";
import useSnackbar from "hooks/useSnackbar";
import { useNavigate } from "react-router-dom";

import awsEks from "../../assets/svgs/awsEks.svg";
import google_cloud from "../../assets/svgs/google_cloud.svg";
import microsoftAzure from "../../assets/svgs/microsoftAzure.png";
import bareMetal from "../../assets/svgs/bareMetal.svg";
import local from "../../assets/images/local.png";

import AuthFormInputs from "./components/AuthFormInputs";

const ClusterIntegration = () => {
  const tabNames = ["GCloud", "AWS", "Azure", "Bare Metal Server", "Local"];
  const [value, setValue] = useState(0);
  const snackbar = useSnackbar();
  const { isOpen, closeSnackbar, message, icon, title, type } = snackbar;
  const navigate = useNavigate();

  const [formInputs, setFormInputs] = useState({
    authMethod: "kubeconfig",
    kubeconfig: "",
    serviceToken: "",
  });

  const submitForm = async () => {
    // authenticate with the provided details
    const { isAuthenticated, provider, credentials, authMethod } =
      await authenticateK8S(
        tabNames[value],
        formInputs.kubeconfig,
        formInputs.authMethod,
        snackbar
      );

    if (isAuthenticated) {
      try {
        const clusterInfo = await getClusterInfo(
          provider,
          credentials,
          authMethod
        );
        console.log("Cluster Info:", clusterInfo);

        // fetch pod metrics right after retrieving cluster info
        const namespace = "default"; // to find needed microservices
        const podMetrics = await getPodMetrics(
          provider,
          credentials,
          authMethod,
          namespace
        );
        console.log("Pod Metrics:", podMetrics);
      } catch (error) {
        snackbar.openSnackbar(
          "Error fetching cluster info or pod metrics",
          "error"
        );
      }

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFormInputChange = (inputName, inputValue) => {
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: inputValue,
    }));
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
              <MDTypography variant="h6" py={3} px={4}>
                Select Your Provider
              </MDTypography>
              <MDBox px={2}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="icon label tabs example"
                >
                  <Tab icon={<img width="150" src={google_cloud} />} />
                  <Tab icon={<img width="50" height="50" src={awsEks} />} />
                  <Tab
                    icon={<img width="200" height="100" src={microsoftAzure} />}
                  />
                  <Tab
                    icon={<img width="250" height="150" src={bareMetal} />}
                  />
                  <Tab icon={<img width="50" height="50" src={local} />} />
                </Tabs>
              </MDBox>
              <MDBox display="flex" flexDirection="column" px={4} py={6}>
                <AuthFormInputs
                  selectedTab={value}
                  formInputs={formInputs}
                  handleFormInputChange={handleFormInputChange}
                />
                {tabNames[value] !== "Local" && (
                  <MDButton
                    variant="outlined"
                    size="small"
                    color={"success"}
                    onClick={submitForm}
                    style={{ marginTop: "1rem" }}
                  >
                    Connect To {tabNames[value]}
                  </MDButton>
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
