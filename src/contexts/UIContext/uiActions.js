import { TOGGLE_APP_SIDEBAR } from "./actionTypes";
// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });

const setWhiteSidenav = (dispatch, value) => dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });
const setToggleAppSidebar = (dispatch, value) => dispatch({ type:TOGGLE_APP_SIDEBAR, value });

export {
	setMiniSidenav,
	setWhiteSidenav,
	setSidenavColor,
	setFixedNavbar,
	setOpenConfigurator,
	setDirection,
	setLayout,
	setDarkMode,
	setToggleAppSidebar
  };