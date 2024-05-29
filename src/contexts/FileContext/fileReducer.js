import { LIST_FILES, DELETE_FILE, UPLOAD_FILE, RESET_STATUS, VIEW_FILE, SELECT_TO_COMPARE, REMOVE_COMPARE_FILE, TOGGLE_COMPARISON_BOX, DISPLAY_COMPARISON_RESULT } from "./actionTypes";

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
	  case SELECT_TO_COMPARE:
		return {
		  ...state,
		  selectedFilesToCompare: state.selectedFilesToCompare.concat(action.payload),
		  isPairReady: state.selectedFilesToCompare.length === 2 ? true : false,
		  lastSelectedName:action.payload?.fileName || null
		};
		case REMOVE_COMPARE_FILE:
			return {
			  ...state,
			  selectedFilesToCompare: state.selectedFilesToCompare.filter(file => file.fileName !== action.payload),
			};
		case TOGGLE_COMPARISON_BOX:
			return {
			  ...state,
			  isComparisonBoxVisible: action.payload
			};
		case DISPLAY_COMPARISON_RESULT:
			return {
			  ...state,
			  comparisonResult: action.payload
			};

	  default:
		return state;
	}
  };

export default fileReducer;