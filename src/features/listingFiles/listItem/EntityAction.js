import React from "react";
import { useNavigate } from "react-router-dom";
import MDButton from "../../../components/MDButton";
import ConstructionIcon from '@mui/icons-material/Construction';
import { useFileController } from "contexts/FileContext";
import { IconButton } from "@mui/material";

const EntityAction = ({fileName}) => {
	const { dispatch, viewFile } = useFileController();

	const navigate = useNavigate();

	const onClickHandler = () => {
	
		viewFile(dispatch, fileName);
		navigate("/feature-discovery");
	}
	return (
		<IconButton onClick={onClickHandler} size='medium'   >
		<ConstructionIcon color='white'  />
      </IconButton>
	)
}

export default EntityAction;