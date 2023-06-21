import attachmentEndpoints from "../../network/endpoints/attachment";
import {UPLOAD_FILE, LIST_FILES, DELETE_FILE} from "./actionTypes";
import axios from "axios";

const fetchFiles = async (dispatch) => {
  try {
    const response = await attachmentEndpoints.list();
    const attachments = response.data;
    // Dispatch action to update state with retrieved attachments
    dispatch({ type: LIST_FILES, payload: attachments });
  } catch (error) {
    // Handle the error
  }
};

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
  

export { fetchFiles, uploadFile };
