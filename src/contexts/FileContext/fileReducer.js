import { LIST_FILES, DELETE_FILE, UPLOAD_FILE} from "./actionTypes";

const fileReducer = (state, action) => {
	switch (action.type) {
	  // ... other cases
	  case LIST_FILES:
		return {
		  ...state,
		  attachments: action.payload,
		}; 
	  case UPLOAD_FILE:
		return {
		  ...state,
		  attachments: [...state.attachments, action.payload],
		};

	  // ... other cases
	  default:
		return state;
	}
  };

export default fileReducer;