import React from "react";
import { useNavigate } from "react-router-dom";

import InsightsIcon from "@mui/icons-material/Insights";

import { useFileController } from "contexts/FileContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ListItemText from "@mui/material/ListItemText";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import DescriptionIcon from "@mui/icons-material/Description";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

import MDBox from "components/MDBox";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import MDTypography from "components/MDTypography";
const steps = [
  "Select Field Formatting Method",
  "Select Fields and Types",
  "Set Constraints",
  "Generate Prediction",
];

function HorizontalLinearAlternativeLabelStepper() {
  return (
    <MDBox sx={{ width: "100%", position: "absolute", bottom: "0" }}>
      <Stepper activeStep={0} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </MDBox>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "relative",
  backgroundColor: "#000055",
}));

const StyledListItem = styled(ListItemText)(({ theme }) => ({
  padding: theme.spacing(1), // Adjust the padding value as needed
}));

const StyledListItemContainer = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1), // Adjust the padding value as needed
}));

const MlAction = ({ fileName }) => {
  const { dispatch, viewFile } = useFileController();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const onClickHandler = () => {
    viewFile(dispatch, fileName);
    setOpen(true);
  };
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <StyledAppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="white"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>

            <MDTypography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Select Field Formatting Method for{" "}
              <span style={{ color: "#9AE6B4" }}>Combined_logs.csv</span>{" "}
              Prediction
            </MDTypography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </StyledAppBar>
        <List>
          <StyledListItemContainer button>
            <StyledListItem
              primary="Selection out of saved past formats "
              secondary="If any saved format exists for this file, you can use it"
            />
          </StyledListItemContainer>
          <Divider />
          <StyledListItemContainer ListItem button>
            <StyledListItem
              primary="Manual Field Format Specification "
              secondary="Set the fields for yourself"
            />
          </StyledListItemContainer>
          <Divider />
          <StyledListItemContainer button>
            <StyledListItem
              primary="Automatic Field Format Specification "
              secondary="Let the system set the fields for you"
            />
          </StyledListItemContainer>
        </List>
        <HorizontalLinearAlternativeLabelStepper />
      </Dialog>
      <IconButton onClick={onClickHandler} size="medium">
        <InsightsIcon color="white" />
      </IconButton>
    </>
  );
};

export default MlAction;
