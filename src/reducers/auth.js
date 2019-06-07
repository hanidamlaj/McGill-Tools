import { SET_TOKEN, SET_USER } from "../actions/auth";

/**
 * @typedef {Object} User
 * @property {string} photoURL
 * @property {string} displayName
 * @property {string} email
 * @property {string} phoneNumber
 */

/**
 * @const {User} initialUser
 */
export const initialUser = {
	photoUrl: "/avatar.png",
	displayName: "",
	email: "",
	phoneNumber: ""
};

/**
 * @const {Object} initialState
 */
const initialState = {
	token: null,
	user: initialUser
};

/**
 * @typedef {Object} Action
 * @property {string} type the type of action
 * @property {string | User} payload the data (payload) contained in the action
 */

/**
 * reducer
 * @param {Object} state current state of app
 * @param {Action} action the dispatched action
 */
function auth(state = initialState, action) {
	switch (action.type) {
		case SET_TOKEN:
			return { ...state, token: action.payload };
		case SET_USER:
			return { ...state, user: { ...action.payload } };
		default:
			return state;
	}
}

export default auth;
