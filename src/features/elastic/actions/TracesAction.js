import React from "react";
import { useNavigate } from "react-router-dom";

import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import { IconButton } from "@mui/material";
import MDTypography from "components/MDTypography";

const TracesAction = ({ name }) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/elastic-services-trace/${name}`, { state: { traceName: name } });
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
