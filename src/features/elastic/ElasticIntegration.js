import React from "react";
import { Card, Grid, CircularProgress } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDSnackbar from "components/MDSnackbar";

import IntegrationList from "./IntegrationList";

import useIntegrationCheck from "./useIntegrationCheck";
import useAuthentication from "./useAuthentication";
import ElasticAuthUI from "./AuthUI";

const ElasticIntegration = () => {
  const { isAnyIntegrationExist, integratedData, loading } = useIntegrationCheck();

  const {
    inputRefUsername,
    inputRefPassword,
    inputRefCloudId,
    handleAuthentication,
    snackbar,
  } = useAuthentication();
  const { isOpen, closeSnackbar, message, icon, title, type } = snackbar;

  const renderContent = () => {
    const component = loading ? (
      <CircularProgress />
    ) : isAnyIntegrationExist ? (
      <IntegrationList data={integratedData} />
    ) : (
      <ElasticAuthUI
        inputRefCloudId={inputRefCloudId}
        inputRefUsername={inputRefUsername}
        inputRefPassword={inputRefPassword}
        handleAuthentication={handleAuthentication}
      />
    );

    return component;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>{renderContent()}</Card>
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

export default ElasticIntegration;
