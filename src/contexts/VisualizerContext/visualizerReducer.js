import { SELECT_NODE, TOGGLE_LATENCY_SIDEBAR, TOGGLE_RESOURCE_SIDEBAR, TOGGLE_SIDE_PANEL} from "./actionTypes";

const visualizerReducer = (state, action) => {
	switch (action.type) {
	  // ... other cases
	  case TOGGLE_SIDE_PANEL:
		  return {
			...state,
			isSidePanelOpen: action.payload,
			isLatencySidebarOpen: false,
            isResourceSidebarOpen: false
		  };
	  case TOGGLE_LATENCY_SIDEBAR:
		  return {
			...state,
			isLatencySidebarOpen: action.payload,
			isSidePanelOpen: false,
			isResourceSidebarOpen: false, 
		  };
	  case TOGGLE_RESOURCE_SIDEBAR:
			return {
			  ...state,
			  isResourceSidebarOpen: action.payload,
			  isSidePanelOpen: false,
			  isLatencySidebarOpen: false
			};
	  case SELECT_NODE:
		  return {
			...state,
			isAnyNodeSelected: action.payload,
		  };
	  case "SHOW_USER_GUIDE":
		  return {
			...state,
			isUserGuideOpen: action.payload,
		  };
	  default:
		return state;
	}
  };

export default visualizerReducer;