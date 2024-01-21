import { createContext, useContext, useReducer, useMemo } from "react";
import visualizerReducer from "./visualizerReducer";
import PropTypes from "prop-types";
import { toggleSidePanel, selectNode, toggleLatencySidebar, showUserGuide, toggleResourceSidebar } from "./visualizerActions";

const VisualizerContext = createContext();
VisualizerContext.displayName = "VisualizerContext";

function VisualizerControllerProvider({ children }){
	const initialState = {
		isSidePanelOpen: false,
		isAnyNodeSelected: null,
		isLatencySidebarOpen: false,
		isResourceSidebarOpen: false,
		isUserGuideOpen: false
	  };
	  const [controller, dispatch] = useReducer(visualizerReducer, initialState);
  
	  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
	
	  return <VisualizerContext.Provider value={value}>{children}</VisualizerContext.Provider>;
}

function useVisualizerController() {
	const [state, dispatch] = useContext(VisualizerContext);
  
	if (!state || !dispatch) {
	  throw new Error(
		"useFileController should be used inside the FileControllerProvider."
	  );
	}

	return {
		state,
		dispatch,
		toggleSidePanel : (dispatch,value) => toggleSidePanel(dispatch, value),
		toggleLatencySidebar:(dispatch,value) => toggleLatencySidebar(dispatch, value),
		toggleResourceSidebar:(dispatch,value) => toggleResourceSidebar(dispatch, value),
		selectNode : (dispatch,value) => selectNode(dispatch, value),
		showUserGuide : (dispatch,value) => showUserGuide(dispatch, value)
	  };
  }
  
  VisualizerControllerProvider.propTypes = {
	children: PropTypes.node.isRequired,
  };
  
  export {
	VisualizerControllerProvider,
	useVisualizerController
  };