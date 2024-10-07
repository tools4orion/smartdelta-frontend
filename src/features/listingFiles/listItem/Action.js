import React from "react";
import { useNavigate } from "react-router-dom";

import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import { useFileController } from "contexts/FileContext";
import { IconButton } from "@mui/material";

const Action = ({ fileName, darkMode }) => {
  const { dispatch, viewFile } = useFileController();

  const navigate = useNavigate();
  const onClickHandler = () => {
    viewFile(dispatch, fileName);
    navigate("/visualizer");
  };

  return (
    <IconButton onClick={onClickHandler}>
      <VisibilitySharpIcon
        fontSize="medium"
        color={darkMode ? "white" : "#344767"}
      />
    </IconButton>
  );
};

export default Action;
