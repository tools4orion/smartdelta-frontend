import React from "react";
import { useNavigate } from "react-router-dom";

import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import { useFileController } from "contexts/FileContext";
import { IconButton } from "@mui/material";
import MDTypography from "components/MDTypography";

const TracesAction = ({ name }) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    // TODO:: endpoint for traces will be here
    navigate(`/elastic-services-trace/${name}`, { state: { traceName: name } }); // TODO:: endpoint response data will be sent here
  };

  return (
    <IconButton onClick={onClickHandler}>
      <MDTypography
        // component="a"
        // href="#"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        <VisibilitySharpIcon fontSize="medium" />
      </MDTypography>
    </IconButton>
  );
};

export default TracesAction;
