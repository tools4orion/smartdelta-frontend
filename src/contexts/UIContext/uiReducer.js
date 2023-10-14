import * as actionTypes from './actionTypes';

const { MINI_SIDENAV, WHITE_SIDENAV, SIDENAV_COLOR, FIXED_NAVBAR, OPEN_CONFIGURATOR, DIRECTION, LAYOUT, DARKMODE, TOGGLE_APP_SIDEBAR  } = actionTypes;

const uiReducer = (state, action) => {
	const { type, value } = action;

	// Object mapping of action types to their corresponding state updates
	const stateUpdates = {
	  [MINI_SIDENAV]: { miniSidenav: value },
	  [WHITE_SIDENAV]: { whiteSidenav: value },
	  [SIDENAV_COLOR]: { sidenavColor: value },
	  [FIXED_NAVBAR]: { fixedNavbar: value },
	  [OPEN_CONFIGURATOR]: { openConfigurator: value },
	  [DIRECTION]: { direction: value },
	  [LAYOUT]: { layout: value },
	  [DARKMODE]: { darkMode: value },
	  [TOGGLE_APP_SIDEBAR]: { expanded: value }
	};

	//Check if the action type exists in the stateUpdates object and apply the corresponding state update
	return stateUpdates[type] ? { ...state, ...stateUpdates[type] } : state;
  };
  
export default uiReducer;