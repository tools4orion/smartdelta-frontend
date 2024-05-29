import React from "react";
import { useNavigate } from "react-router-dom";

import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import { useFileController } from "contexts/FileContext";
import { IconButton } from "@mui/material";
import MDTypography from "components/MDTypography";


const ServiceAction = ({name}) => {


	const navigate = useNavigate();
	const onClickHandler = () => {
		navigate(`/elastic-dashboard/${name}`);
		

	}

	return (
	  <IconButton onClick={onClickHandler}>
		<MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          Open
        </MDTypography>
      </IconButton>
	)
}


export default ServiceAction;