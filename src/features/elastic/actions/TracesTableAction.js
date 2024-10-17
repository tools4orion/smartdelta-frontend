import React from "react";
import { useNavigate } from "react-router-dom";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { IconButton } from "@mui/material";
import MDTypography from "components/MDTypography";

const TracesTableAction = ({ name }) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/elastic-services-traces/${name}`, {
      state: { traceName: name },
    });
  };

  return (
    <IconButton onClick={onClickHandler}>
      <MDTypography variant="caption" color="text" fontWeight="medium">
        <AnalyticsIcon fontSize="medium" />
      </MDTypography>
    </IconButton>
  );
};

export default TracesTableAction;
