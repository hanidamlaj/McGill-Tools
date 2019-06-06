// adds a key to the loader array
export const ADD_LOADER = "ADD_LOADER";
export function addLoaderKey(key) {
	return {
		type: ADD_LOADER,
		payload: key
	};
}

// removes a key from the loader array
export const REMOVE_LOADER = "REMOVE_LOADER";
export function removeLoaderKey(key) {
	return {
		type: REMOVE_LOADER,
		payload: key
	};
}
