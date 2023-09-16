import { TOGGLE_SIDE_PANEL, SELECT_NODE, TOGGLE_LATENCY_SIDEBAR } from "./actionTypes";

export const toggleSidePanel = (dispatch, value) => dispatch({ type:TOGGLE_SIDE_PANEL, payload: value});

export const toggleLatencySidebar = (dispatch, value) =>
  dispatch({ type: TOGGLE_LATENCY_SIDEBAR, payload: value });

export const selectNode = (dispatch, value) => dispatch({ type:SELECT_NODE, payload: value});
