import { LIST_FILES, DELETE_FILE, UPLOAD_FILE, RESET_STATUS, VIEW_FILE} from "./actionTypes";

const fileReducer = (state, action) => {
	switch (action.type) {
	  // ... other cases
	  case LIST_FILES:
		  return {
			...state,
			attachments: action.payload,
		  };
	  case UPLOAD_FILE:
		console.log(action.payload.fileSize)
		const sumOfSize = parseFloat((state.sumOfSize + action.payload.fileSize/ 1024).toFixed(1));
		return {
		  ...state,
		  isUploading: true,
		  sumOfSize: sumOfSize
		};
	  case VIEW_FILE:
		return {
		  ...state,
		  fileStateToView: action.payload
		}
	  case RESET_STATUS:
		return {
		  ...state,
		  isUploading: action.payload,
		};
	  default:
		return state;
	}
  };

export default fileReducer;