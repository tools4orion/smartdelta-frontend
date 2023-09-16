import { SELECT_NODE, TOGGLE_LATENCY_SIDEBAR, TOGGLE_SIDE_PANEL} from "./actionTypes";

const visualizerReducer = (state, action) => {
	switch (action.type) {
	  // ... other cases
	  case TOGGLE_SIDE_PANEL:
		  return {
			...state,
			isSidePanelOpen: action.payload,
			isLatencySidebarOpen: action.payload === true ? false : false
		  };
	  case TOGGLE_LATENCY_SIDEBAR:
		  return {
			...state,
			isLatencySidebarOpen: action.payload,
			isSidePanelOpen: action.payload === true ? false : false
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