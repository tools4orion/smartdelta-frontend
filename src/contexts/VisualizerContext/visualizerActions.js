import { TOGGLE_SIDE_PANEL, SELECT_NODE, TOGGLE_LATENCY_SIDEBAR, TOGGLE_RESOURCE_SIDEBAR ,SHOW_USER_GUIDE } from "./actionTypes";

export const toggleSidePanel = (dispatch, value) => dispatch({ type:TOGGLE_SIDE_PANEL, payload: value});

export const toggleLatencySidebar = (dispatch, value) =>
  dispatch({ type: TOGGLE_LATENCY_SIDEBAR, payload: value });

export const toggleResourceSidebar = (dispatch, value) =>
  dispatch({ type: TOGGLE_RESOURCE_SIDEBAR, payload: value });

export const selectNode = (dispatch, value) => dispatch({ type:SELECT_NODE, payload: value});

export const showUserGuide = (dispatch, value) => dispatch({ type:SHOW_USER_GUIDE, payload: value});
