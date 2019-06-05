import { SET_TOKEN, SET_USER } from "../actions/auth";

/**
 * @typedef {Object} Action
 * @property {string} type the type of action
 * @property {string | Object} payload the data (payload) contained in the action
 */

/**
 *
 * @param {Object} state current state of app
 * @param {Action} action the dispatched action
 */

function auth(state = {}, action) {
	switch (action.type) {
		case SET_TOKEN:
			return { ...state, token: action.payload };
		case SET_USER:
			return { ...state, user: action.payload };
		default:
			return state;
	}
}

export default auth;
