import React from "react";
import { useNavigate } from "react-router-dom";


import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import { useFileController } from "contexts/FileContext";
import { IconButton } from "@mui/material";


const Action = ({fileName}) => {
	const { dispatch, viewFile} = useFileController();

	const navigate = useNavigate();
	const onClickHandler = () => {
		viewFile(dispatch, fileName);
		navigate("/visualizer");
	}

	return (
	  <IconButton onClick={onClickHandler}>
		<VisibilitySharpIcon fontSize="medium" color='white' />
      </IconButton>
	)
}


export default Action;