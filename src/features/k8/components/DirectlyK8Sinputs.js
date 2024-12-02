import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import k8slogo from "../../../assets/svgs/kubernetes-logo.svg";
import useSnackbar from "hooks/useSnackbar";
import MDSnackbar from "components/MDSnackbar";

const DirectlyK8Sinputs = () => {
  const [k8sApiUrl, setK8sApiUrl] = useState("");
  const [apiToken, setApiToken] = useState("");
  const snackbar = useSnackbar();
  const { isOpen, closeSnackbar, message, icon, title, type } = snackbar;

  return (
    <>
      <MDBox px={3} py={6}>
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
              Please Enter Your Kubernetes Cluster Details
            </MDTypography>
            <img src={k8slogo} alt="Kubernetes Logo" style={{ height: 60 }} />
          </MDBox>
          <TextField
            label="K8S API Server URL"
            variant="outlined"
            value={k8sApiUrl}
            onChange={(e) => setK8sApiUrl(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="API Token"
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
            disabled={!k8sApiUrl || !apiToken}
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
export default DirectlyK8Sinputs;
