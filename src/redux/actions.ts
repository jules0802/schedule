import {GET_EVENTS , CHANGE_MODE, GET_TABLE_COLORS, HIDE_LOADER , SHOW_ERROR , SHOW_LOADER} from "./types";
import { urlApi } from "../data/const";
import { Dispatch } from "redux";

export const showLoader = () => {
    return {
        type: SHOW_LOADER,
    }
}

export const hideLoader = () => {
    return {
        type: HIDE_LOADER,
    }
}

export const showError = () => {
    return {
        type: SHOW_ERROR,
    }
}

export const getEventsData = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(showLoader());
            const res = await fetch(`${urlApi}/events`);
            const data = await res.json();
            dispatch({ type: GET_EVENTS, payload: data});
            dispatch(hideLoader());
        } catch (e) {
            const errorText = `Error request: ${e}`;
            dispatch({ type: SHOW_ERROR, payload: errorText});
        }
    }
}

export const getTableColors = () => {
    return {
        type: GET_TABLE_COLORS,
    }
}

export const changeMode = (mode: string) => {
    return {
        type: CHANGE_MODE,
        payload: mode,
    }
}
