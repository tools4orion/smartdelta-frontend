import React, { useState } from "react";
import DataTable from "examples/Tables/DataTable";
import { useGetVercelAccountTableData } from "../hooks/useGetVercelAccountTableData";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import {
  Card,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TokenInputModal from "./TokenInputModal";
import { getEncryptedToken } from "../actions/getEncryptedVercelToken.action";
import { getVercelProjects } from "../actions/getVercelProjects.action";
import vercel_favicon from "../../../assets/images/vercel_icon.jpg";
import { useNavigate } from "react-router-dom";

const styles = {
  width: "50vw",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const VercelAccountList = ({ vercelAccountsData, setLoading }) => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOpenProjects = async (email) => {
    try {
      setLoading(true);
      const encryptedToken = await getEncryptedToken(email);

      const secretKey = process.env.REACT_APP_SECRET_KEY;
      if (!secretKey) {
        throw new Error("Secret key is missing.");
      }
      const projects = await getVercelProjects(encryptedToken);
      console.log("Fetched projects:", projects);

      setSnackbar({
        open: true,
        message: "Projects fetched successfully!",
        severity: "success",
      });

      navigate("/vercel-deployment-management/vercel-projects", {
        state: { vercelProjects: projects },
      });
    } catch (error) {
      console.error("Failed to fetch projects:", error);

      setSnackbar({
        open: true,
        message: "Failed to fetch projects. Please check the token.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const { columns, rows } = useGetVercelAccountTableData(
    vercelAccountsData,
    handleOpenProjects
  );

  return (
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
        <MDBox
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <MDBox display="flex" flexDirection="row" alignItems="center">
            <img
              src={vercel_favicon}
              alt="Vercel Logo"
              style={{ height: 30, borderRadius: "50%" }}
            />
            <MDTypography variant="h6" color="white" paddingLeft={1}>
              Vercel Deployments
            </MDTypography>
          </MDBox>
          <IconButton
            onClick={handleOpen}
            color="white"
            aria-label="add new deployment"
          >
            <Tooltip placement="left" title="Add New Deployment">
              <AddIcon />
            </Tooltip>
          </IconButton>
        </MDBox>
      </MDBox>
      <DataTable
        table={{ columns, rows }}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
        noEndBorder
      />
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <div>
              <TokenInputModal styles={styles} />
            </div>
          </Fade>
        </Modal>
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
      </div>
    </Card>
  );
};

export default VercelAccountList;
