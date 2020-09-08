// @flow

import type { LoaderAction } from "./../actions/types.js";

import { ADD_LOADER, REMOVE_LOADER } from "../actions/loaders";

function loaders(
	state: Array<string> = [],
	action: LoaderAction
): Array<string> {
	switch (action.type) {
		case ADD_LOADER:
			return [...state, action.payload];
		case REMOVE_LOADER: {
			// incase of multiple identical values present in state
			const index = state.findIndex((key) => key === action.payload);
			return state.filter((_, idx) => idx !== index);
		}
		default:
			return state;
	}
}

export default loaders;
