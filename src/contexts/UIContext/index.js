// This file separated for only Context-related code

import { createContext, useContext, useReducer, useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import uiReducer from "./uiReducer";

// Material Dashboard 2 React main context
const MaterialUI = createContext();

// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = "MaterialUIContext";

// Material Dashboard 2 React context provider
function MaterialUIControllerProvider({ children }) {
	const initialState = {
	  miniSidenav: false,
	  whiteSidenav: false,
	  sidenavColor: "info",
	  fixedNavbar: true,
	  openConfigurator: false,
	  direction: "ltr",
	  layout: "dashboard",
	  darkMode: false,
	  expanded: true
	};
  
	const [controller, dispatch] = useReducer(uiReducer, initialState);
  
	const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  
	return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
  }
  
  // Material Dashboard 2 React custom hook for using context
function useMaterialUIController() {
	const context = useContext(MaterialUI);

	if (!context) {
	  throw new Error(
		"useMaterialUIController should be used inside the MaterialUIControllerProvider."
	  );
	}
  
	return context;
  }
  
  // Typechecking props for the MaterialUIControllerProvider
  MaterialUIControllerProvider.propTypes = {
	children: PropTypes.node.isRequired,
  };

  export {
	MaterialUIControllerProvider,
	useMaterialUIController
  };