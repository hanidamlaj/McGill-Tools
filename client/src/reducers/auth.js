// @flow

import type { User, AuthReducerState } from "./types.js";
import type {
	SetUserAction,
	SetTokenAction,
	SetLoginAction,
	SetLogoutAction,
	SetSubscribedSectionsAction,
} from "../actions/types.js";

export const initialUser: User = {
	photoURL: "/static/images/avatar.png",
	displayName: "",
	email: "",
	phoneNumber: "",
	subscribedSections: [],
};

const initialState: AuthReducerState = {
	token: null,
	user: initialUser,
};

type AuthReducerAction =
	| SetTokenAction
	| SetUserAction
	| SetLoginAction
	| SetLogoutAction
	| SetSubscribedSectionsAction;

function auth(
	state: AuthReducerState = initialState,
	action: AuthReducerAction
): AuthReducerState {
	switch (action.type) {
		case "SET_TOKEN":
			return { ...state, token: action.payload };
		case "SET_USER":
			return { ...state, user: { ...action.payload } };
		case "SET_SUBSCRIBED_SECTIONS":
			return {
				...state,
				user: { ...state.user, subscribedSections: action.payload },
			};
		case "SET_LOGIN":
			return {
				...state,
				token: action.payload.token,
				user: { ...action.payload.user },
			};
		case "SET_LOGOUT":
			return {
				...initialState,
			};
		default:
			return state;
	}
}

export default auth;
