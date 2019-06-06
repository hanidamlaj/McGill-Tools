import { ADD_LOADER, REMOVE_LOADER } from "../actions/loaders";

function loaders(state = [], action) {
	switch (action.type) {
		case ADD_LOADER:
			return [...state, action.payload];
		case REMOVE_LOADER: {
			const index = state.findIndex(key => key === action.payload);
			return state.filter((_, idx) => idx !== index);
		}
		default:
			return state;
	}
}

export default loaders;
