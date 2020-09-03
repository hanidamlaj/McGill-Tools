import { SET_TOKEN, SET_USER, SET_LOGIN, SET_LOGOUT } from "../actions/auth";
import { SET_SECTION_SUBSCRIPTIONS } from "../actions/courses";

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
	photoURL: "/static/images/avatar.png",
	displayName: "",
	email: "",
	phoneNumber: "",
	subscribedSections: [],
};

/**
 * @const {Object} initialState
 */
const initialState = {
	token: null,
	user: initialUser,
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
		case SET_SECTION_SUBSCRIPTIONS:
			return {
				...state,
				user: { ...state.user, subscribedSections: action.payload },
			};
		case SET_LOGIN:
			return {
				...state,
				token: action.payload.token,
				user: { ...action.payload.user },
			};
		case SET_LOGOUT:
			return {
				...initialState,
			};
		default:
			return state;
	}
}

export default auth;
