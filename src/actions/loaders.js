// @flow

import type { LoaderAction } from "./types.js";

// adds a key to the loader array
export const ADD_LOADER: string = "ADD_LOADER";
export function addLoaderKey(key: string): LoaderAction {
	return {
		type: ADD_LOADER,
		payload: key,
	};
}

// removes a key from the loader array
export const REMOVE_LOADER: string = "REMOVE_LOADER";
export function removeLoaderKey(key: string): LoaderAction {
	return {
		type: REMOVE_LOADER,
		payload: key,
	};
}
