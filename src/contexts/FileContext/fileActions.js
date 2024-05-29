import attachmentEndpoints from "../../network/endpoints/attachment";
import {UPLOAD_FILE, LIST_FILES, VIEW_FILE, GET_CSV, SELECT_TO_COMPARE, REMOVE_COMPARE_FILE, TOGGLE_COMPARISON_BOX, DISPLAY_COMPARISON_RESULT} from "./actionTypes";

const fetchFiles = async (dispatch) => {
  try {
    const response = await attachmentEndpoints.list();
    const attachments = response.data;
    // Dispatch action to update state with retrieved attachments
    dispatch({ type: LIST_FILES, payload: attachments });
  } catch (error) {
    // Handle the error
	console.log(error);
  }
};
const getCsv = async (dispatch, name) => {
	try {
	  const response = await attachmentEndpoints.getCsv(name);
	  const data = response.data;
	  console.log(data)
	  // Dispatch action to update state with retrieved attachments
	  dispatch({ type: GET_CSV, payload: data });
	} catch (error) {
	  // Handle the error
	  console.log(error);
	}
  }


const uploadFile = async (dispatch, attachmentData, onProgress) => {
	try {
	  const { data } = await attachmentEndpoints.upload(attachmentData, {
		onUploadProgress: (progressEvent) => {
		  const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
		  onProgress(progress);
		},
	  });
  
	  // Dispatch action to update state with uploaded attachment
	  dispatch({ type: UPLOAD_FILE, payload: data });
	  return data;
	} catch (error) {
	  // Handle the error
	  console.log(error);
	}
  };
  
const viewFile = async (dispatch, name) => {
	const response = await attachmentEndpoints.getMeta(name);
    const dataToView = response.data;
	dispatch({ type: VIEW_FILE, payload: dataToView  });
 }

 const selectToCompare = async (dispatch, name) => {
	const response = await attachmentEndpoints.getMeta(name);
    const dataToView = response.data;
	dispatch({ type: SELECT_TO_COMPARE, payload: dataToView  });
 }

 const removeCompareFile = (dispatch, name) => {
	dispatch({ type: REMOVE_COMPARE_FILE, payload: name });
 };
 
 const toggleComparisonBox = (dispatch, value) => {
	dispatch({ type: TOGGLE_COMPARISON_BOX , payload:value});
 };

 const displayComparisonResult = (dispatch, value) => {
	dispatch({ type: DISPLAY_COMPARISON_RESULT , payload:value});
 };

export { fetchFiles, uploadFile, viewFile, selectToCompare, getCsv, removeCompareFile, toggleComparisonBox, displayComparisonResult };
