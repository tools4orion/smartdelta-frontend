import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import { Box, Typography, Link, TextField, Button } from "@mui/material";
import { useMaterialUIController } from "contexts/UIContext";

const TokenInputModal = ({
  styles,
  inputVercelToken,
  inputVercelUsername,
  inputVercelEmail,
  setInputVercelUsername,
  setInputVercelEmail,
  setInputVercelToken,
  handleToken,
}) => {
  const [controller, _] = useMaterialUIController();
  const { darkMode } = controller;

  useEffect(() => {
    setInputVercelToken("");
    setInputVercelUsername("");
    setInputVercelEmail("");
  }, []);

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
              onChange={(e) => setInputVercelUsername(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Email"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) => setInputVercelEmail(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Vercel Token"
              type="password"
              fullWidth
              variant="outlined"
              onChange={(e) => setInputVercelToken(e.target.value)}
            />
          </Box>
          <Box mt={4} mb={1}>
            <Button
              onClick={() => handleToken(inputVercelEmail)}
              variant="contained"
              color={darkMode ? "primary" : "info"}
              fullWidth
              disabled={
                !inputVercelToken || !inputVercelUsername || !inputVercelEmail
              }
            >
              Integrate
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
    </Card>
  );
};

export default TokenInputModal;
