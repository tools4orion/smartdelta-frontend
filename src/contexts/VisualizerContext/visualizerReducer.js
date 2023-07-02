import { SELECT_NODE, TOGGLE_SIDE_PANEL} from "./actionTypes";

const visualizerReducer = (state, action) => {
	switch (action.type) {
	  // ... other cases
	  case TOGGLE_SIDE_PANEL:
		  return {
			...state,
			isSidePanelOpen: action.payload,
		  };
	  case SELECT_NODE:
		  return {
			...state,
			isAnyNodeSelected: action.payload,
		  };
	  default:
		return state;
	}
  };

export default visualizerReducer;