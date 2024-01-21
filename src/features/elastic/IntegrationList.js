import DataTable from "examples/Tables/DataTable";
import { getTableData } from "./getIntegrationsTableData";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Card, IconButton, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import Backdrop from '@mui/material/Backdrop';

import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import useAuthentication from "./useAuthentication";
import MDSnackbar from "components/MDSnackbar";
import ElasticAuthUI from "./AuthUI";

const styles = {
  width: '50vw',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

const IntegrationList = ({ data }) => {
  const { columns, rows } = getTableData(data);

  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    inputRefUsername,
    inputRefPassword,
    inputRefCloudId,
    handleAuthentication,
    snackbar
  } = useAuthentication();

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
          <MDTypography variant="h6" color="white">
            Hosted Deployments
          </MDTypography>
          <IconButton onClick={handleOpen} color="white" aria-label="add new deployment">
            <Tooltip placement='left' title='add new deployment' >
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
              <ElasticAuthUI
                styles={styles}
                inputRefCloudId={inputRefCloudId}
                inputRefUsername={inputRefUsername}
                inputRefPassword={inputRefPassword}
                handleAuthentication={handleAuthentication}
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

export default IntegrationList;
