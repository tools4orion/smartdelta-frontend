import { useState } from "react";
import DataTable from "examples/Tables/DataTable";
import { useGetVercelAccountTableData } from "../hooks/useGetVercelAccountTableData";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Card, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Backdrop from "@mui/material/Backdrop";
import useSnackbar from "hooks/useSnackbar";
import MDSnackbar from "components/MDSnackbar";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TokenInputModal from "./TokenInputModal";
import vercel_favicon from "../../../assets/images/vercel_icon.jpg";

const styles = {
  width: "50vw",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const VercelAccountList = ({
  vercelAccountsData,
  setInputVercelEmail,
  setInputVercelUsername,
  setInputVercelToken,
  inputVercelUsername,
  inputVercelEmail,
  inputVercelToken,
  handleToken,
}) => {
  // TODO:: Remove credentials from props
  const { columns, rows } = useGetVercelAccountTableData(
    vercelAccountsData,
    handleToken
  );

  // for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const snackbar = useSnackbar();
  const { isOpen, closeSnackbar, message, icon, title, type } = snackbar;

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
            <Tooltip placement="left" title="add new deployment">
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
              <TokenInputModal
                styles={styles}
                inputVercelToken={inputVercelToken}
                inputVercelUsername={inputVercelUsername}
                inputVercelEmail={inputVercelEmail}
                setInputVercelUsername={setInputVercelUsername}
                setInputVercelEmail={setInputVercelEmail}
                setInputVercelToken={setInputVercelToken}
                handleToken={handleToken}
              />
            </div>
          </Fade>
        </Modal>
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
      </div>
    </Card>
  );
};

export default VercelAccountList;
