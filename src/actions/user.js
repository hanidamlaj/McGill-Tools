import { addLoaderKey, removeLoaderKey } from "./loaders";

/**
 * action type for user object retrieved from server
 * @type {string} SET_USER
 */
export const SET_USER = "SET_USER";
export const setUser = user => ({ type: SET_USER, payload: user });

export function getUser() {}

export function getToken() {}
