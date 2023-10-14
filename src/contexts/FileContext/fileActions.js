import attachmentEndpoints from "../../network/endpoints/attachment";
import {UPLOAD_FILE, LIST_FILES, VIEW_FILE, GET_CSV} from "./actionTypes";

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

export { fetchFiles, uploadFile, viewFile, getCsv};
