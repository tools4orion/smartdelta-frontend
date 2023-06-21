import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";

import {  fetchFiles, uploadFile } from "./fileActions";
import fileReducer from "./fileReducer";


const FileContext = createContext();
FileContext.displayName = "FileContext";

function FileControllerProvider({ children }) {
	const initialState = {
	  // Define  initial file-related state here
	  attachments: [],
	};
  
	const [controller, dispatch] = useReducer(fileReducer, initialState);
  
	const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  
	return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
  }

  function useFileController() {
	const [state, dispatch] = useContext(FileContext);
  
	if (!state || !dispatch) {
	  throw new Error(
		"useFileController should be used inside the FileControllerProvider."
	  );
	}

	return {
		state,
		dispatch,
		fetchFiles: () => fetchFiles(dispatch),
		uploadFile: uploadFile
	  };
  }
  
  FileControllerProvider.propTypes = {
	children: PropTypes.node.isRequired,
  };
  
  export { FileControllerProvider, useFileController };
