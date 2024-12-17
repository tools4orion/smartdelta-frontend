import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Chip,
  Grid,
  Pagination,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import vercel_favicon from "../../../assets/svgs/vercel_favicon.svg";
import vercel_logo_thumbnail from "../../../assets/svgs/vercel_logo_thumbnail.svg";
import { useMaterialUIController } from "contexts/UIContext";

const PAGE_SIZE = 10;

const VercelProjectsPanel = () => {
  const location = useLocation();
  const { vercelProjects } = location.state || {};
  const allProjects = vercelProjects.projects || [];
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(allProjects);
  const [currentPage, setCurrentPage] = useState(1);

  const formatDate = (timestamp) =>
    new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const truncateCommitSha = (sha) => sha?.slice(0, 7) || "";

  // Debounced Search Logic
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = useCallback(
    debounce((term) => {
      setLoading(true);
      const filtered = allProjects.filter((project) =>
        project.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProjects(filtered);
      setCurrentPage(1);
      setLoading(false);
    }, 300),
    [allProjects]
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  // Pagination Logic
  const handlePageChange = (_, page) => setCurrentPage(page);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              {/* Header */}
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
                  Vercel Projects Overview
                </MDTypography>
                <img
                  src={vercel_favicon}
                  alt="Vercel Logo"
                  style={{ height: 35 }}
                />
              </MDBox>
              {/* Search Bar */}
              <Box
                px={8}
                pt={4}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Deployed Vercel Projects
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <TextField
                    label="Search Projects"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    placeholder="Search by project name..."
                  />
                </Box>
              </Box>
              {/* Loading Indicator */}
              {loading && (
                <Box display="flex" justifyContent="center" m={6}>
                  <CircularProgress />
                </Box>
              )}
              {/* Projects */}
              <Box px={2}>
                {paginatedProjects.map((project) => {
                  const deployment = project.latestDeployments?.[0] || {};
                  const meta = deployment.meta || {};

                  return (
                    <Card
                      key={project.id}
                      sx={{
                        m: 4,
                        boxShadow: 6,
                        border: "1px solid #1976d2",
                        borderRadius: 2,
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          boxShadow: "0px 0px 10px 2px #1976d2",
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <CardContent>
                        <Grid container spacing={2} alignItems="center">
                          {/* Left Section: Logo and Project Name */}
                          <Grid item xs={3} sm={2}>
                            <Box
                              sx={{
                                border: "1px solid",
                                borderColor: darkMode ? "#444" : "#ccc",
                                borderRadius: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                p: 1,
                                backgroundColor: "#fff",
                              }}
                            >
                              <img
                                src={vercel_logo_thumbnail}
                                alt="Vercel Thumbnail"
                                style={{ width: "100%", maxHeight: "50px" }}
                              />
                            </Box>
                          </Grid>
                          {/* Middle Section: Project Details */}
                          <Grid item xs={9} sm={6}>
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              color={darkMode ? "white" : "text.primary"}
                            >
                              {meta.githubRepo || project.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color={darkMode ? "#ddd" : "text.secondary"}
                            >
                              <strong>Owner:</strong> {meta.githubOrg || "N/A"}
                            </Typography>
                            <Typography
                              variant="body2"
                              color={darkMode ? "#ddd" : "text.secondary"}
                            >
                              <strong>Branch:</strong>{" "}
                              {meta.githubCommitRef || "N/A"}
                            </Typography>
                            <Typography
                              variant="body2"
                              color={darkMode ? "#ddd" : "text.secondary"}
                            >
                              <strong>Commit ID:</strong>{" "}
                              {truncateCommitSha(meta.githubCommitSha)}
                            </Typography>
                            <Typography
                              variant="body2"
                              color={darkMode ? "#ddd" : "text.secondary"}
                            >
                              <strong>Latest Commit:</strong>{" "}
                              {meta.githubCommitMessage || "No Message"}
                            </Typography>
                          </Grid>
                          {/* Right Section: Metadata and Status */}
                          <Grid item xs={12} sm={4} textAlign="right">
                            <Typography
                              variant="body2"
                              color={darkMode ? "#bbb" : "text.secondary"}
                            >
                              <strong>Created:</strong>{" "}
                              {formatDate(project.createdAt)}
                            </Typography>
                            <Typography
                              variant="body2"
                              color={darkMode ? "#bbb" : "text.secondary"}
                            >
                              <strong>Build At:</strong>{" "}
                              {deployment.buildingAt
                                ? formatDate(deployment.buildingAt)
                                : "N/A"}
                            </Typography>
                            <Typography
                              variant="body2"
                              color={darkMode ? "#bbb" : "text.secondary"}
                            >
                              <strong>Repo Visibility:</strong>{" "}
                              {meta.githubRepoVisibility || "N/A"}
                            </Typography>

                            <Box mt={1}>
                              <Chip
                                icon={
                                  deployment.readyState === "READY" ? (
                                    <CheckCircleIcon />
                                  ) : (
                                    <ErrorOutlineIcon />
                                  )
                                }
                                label={
                                  deployment.readyState === "READY"
                                    ? "Deployment Ready"
                                    : "Not Ready"
                                }
                                color={
                                  deployment.readyState === "READY"
                                    ? "success"
                                    : "error"
                                }
                                sx={{ fontWeight: "bold" }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  );
                })}

                {filteredProjects.length === 0 && (
                  <Typography
                    variant="body2"
                    color={darkMode ? "#ddd" : "text.secondary"}
                    textAlign="center"
                    margin={6}
                  >
                    No projects available to display.
                  </Typography>
                )}
                {/* Pagination */}
                <Box display="flex" justifyContent="right" my={3} mx={2}>
                  <Pagination
                    count={Math.ceil(filteredProjects.length / PAGE_SIZE)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="info"
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default VercelProjectsPanel;
