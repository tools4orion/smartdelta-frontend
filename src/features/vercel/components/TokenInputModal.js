import React, { useState } from "react";
import Card from "@mui/material/Card";
import {
  Box,
  Typography,
  Link,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useMaterialUIController } from "contexts/UIContext";
import { useNavigate } from "react-router-dom";
import { encryptToken } from "../utils/encrpytToken";
import { saveVercelProfile } from "../actions/saveVercelProfile.action";
import { getVercelProjects } from "../actions/getVercelProjects.action";

const TokenInputModal = ({ styles }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [inputVercelUsername, setInputVercelUsername] = useState("");
  const [inputVercelEmail, setInputVercelEmail] = useState("");
  const [inputVercelToken, setInputVercelToken] = useState("");

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleIntegrate = async () => {
    setLoading(true);

    const secretKey = process.env.REACT_APP_SECRET_KEY;
    if (!secretKey) {
      console.error("Secret key is missing.");
      return;
    }

    const encryptedToken = encryptToken(inputVercelToken, secretKey);

    try {
      await saveVercelProfile(
        inputVercelUsername,
        inputVercelEmail,
        encryptedToken
      );

      const projects = await getVercelProjects(inputVercelEmail);

      setSnackbar({
        open: true,
        message: "Integration successful! Redirecting...",
        severity: "success",
      });

      navigate("/vercel-deployment-management/vercel-projects", {
        state: { vercelProjects: projects },
      });
    } catch (error) {
      console.error("Integration failed:", error);

      setSnackbar({
        open: true,
        message: "Vercel integration failed. Please check your credentials.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ ...styles }}>
      <Box
        sx={{
          background: "linear-gradient(to right, #1976d2, #42a5f5)",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          marginX: 2,
          marginTop: -3,
          padding: 2,
          marginBottom: 1,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="medium" color="#fff" mt={1}>
          Access your Vercel Account
        </Typography>
      </Box>
      <Box pt={4} pb={3} px={3}>
        <Box component="form" role="form">
          <Box mb={2}>
            <TextField
              label="Vercel Username"
              type="text"
              fullWidth
              variant="outlined"
              value={inputVercelUsername}
              onChange={(e) => setInputVercelUsername(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Email"
              type="text"
              fullWidth
              variant="outlined"
              value={inputVercelEmail}
              onChange={(e) => setInputVercelEmail(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Vercel Token"
              type="password"
              fullWidth
              variant="outlined"
              value={inputVercelToken}
              onChange={(e) => setInputVercelToken(e.target.value)}
            />
          </Box>
          <Box mt={4} mb={1}>
            <Button
              onClick={handleIntegrate}
              variant="contained"
              color={darkMode ? "primary" : "info"}
              fullWidth
              disabled={
                !inputVercelToken ||
                !inputVercelUsername ||
                !inputVercelEmail ||
                loading
              }
            >
              {loading ? "Integrating..." : "Integrate"}
            </Button>
          </Box>
          <Box mt={3} mb={1} textAlign="center">
            <Typography variant="button" color={darkMode ? "#fff" : "#000"}>
              Don't have a Vercel account?{" "}
              <Link
                href="https://vercel.com/signup"
                variant="button"
                color={darkMode ? "#fff" : "#000"}
                fontWeight="medium"
                sx={{
                  textDecoration: "none",
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          "& .MuiAlert-root": {
            backgroundColor: "rgb(244, 67, 54)",
            color: "#fff",
          },
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            backgroundColor: "rgb(244, 67, 54)",
            color: "#fff",
            "& .MuiAlert-icon": {
              color: "#fff",
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default TokenInputModal;
