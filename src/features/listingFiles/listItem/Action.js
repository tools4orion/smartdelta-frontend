import React from "react";
import { useNavigate } from "react-router-dom";

import MDButton from "../../../components/MDButton";
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import { useFileController } from "contexts/FileContext";


const Action = ({fileName}) => {
	const { dispatch, viewFile} = useFileController();

	const navigate = useNavigate();
	const onClickHandler = () => {
		viewFile(dispatch, fileName);
		navigate("/visualizer")
	}

	return (
	  <MDButton onClick={onClickHandler} size='large' color='white'  iconOnly >
		<VisibilitySharpIcon fontSize="large" />
      </MDButton>
	)
}


export default Action;