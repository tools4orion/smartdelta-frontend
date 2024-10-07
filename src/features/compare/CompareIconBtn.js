import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useFileController } from "contexts/FileContext";
import useSnackbar from "hooks/useSnackbar";
import MDSnackbar from "components/MDSnackbar";

const CompareIconBtn = ({ pathName, darkMode = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch, selectToCompare, toggleComparisonBox, state } =
    useFileController();
  const { selectedFilesToCompare } = state;
  const snackbar = useSnackbar();
  const { isOpen, closeSnackbar, message, icon, title, type } = snackbar;

  const handleClickOpen = async () => {
    setIsLoading(true);

    // Set loading state to true before the async operation
    if (selectedFilesToCompare.length !== 2) {
      await selectToCompare(dispatch, pathName);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      snackbar.openSnackbar(
        "Hover on a file icon to delete. Click on trash icon",
        "error",
        "Please remove one of the files to add this!"
      );
    }

    toggleComparisonBox(dispatch, true);
  };

  return (
    <>
      <IconButton
        className="compare"
        sx={navbarIconButton}
        onClick={handleClickOpen}
      >
        <CompareArrowsIcon color={darkMode ? "white" : "#344767"} />
      </IconButton>
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

export default CompareIconBtn;
