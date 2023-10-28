import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";

import {  fetchFiles, getCsv, removeCompareFile, selectToCompare, toggleComparisonBox, uploadFile, viewFile } from "./fileActions";
import fileReducer from "./fileReducer";


const FileContext = createContext();
FileContext.displayName = "FileContext";

function FileControllerProvider({ children }) {
	const initialState = {
	  // Define  initial file-related state here
	  attachments: [],
	  isUploading: false,
	  sumOfSize: 0.0,
	  fileStateToView: null,
	  selectedFilesToCompare: [],
	  isPairReady: false,
	  lastSelectedName: null,
	  isComparisonBoxVisible: false
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
		uploadFile: uploadFile,
		viewFile: (dispatch,filePath)=> viewFile(dispatch, filePath),
		selectToCompare: (dispatch, filePath) => selectToCompare(dispatch, filePath),
		getCsv: (dispatch, name) => getCsv(dispatch, name),
		removeCompareFile: (dispatch, name) => removeCompareFile(dispatch, name),
		toggleComparisonBox: (dispatch, value) => toggleComparisonBox(dispatch, value)
	  };
  }
  
  FileControllerProvider.propTypes = {
	children: PropTypes.node.isRequired,
  };
  
  export { FileControllerProvider, useFileController };
