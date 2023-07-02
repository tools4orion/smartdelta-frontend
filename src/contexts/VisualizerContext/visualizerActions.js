import {TOGGLE_SIDE_PANEL, SELECT_NODE} from "./actionTypes";

export const toggleSidePanel = (dispatch, value) => dispatch({ type:TOGGLE_SIDE_PANEL, payload: value});

export const selectNode = (dispatch, value) => dispatch({ type:SELECT_NODE, payload: value});
