// @flow
import type { User, State, AuthReducerState } from "./../reducers/types.js";

// Actions for auth.js file.

// Action type for user profile.
export type SetUserAction = { type: "SET_USER", payload: User };

// Action type for jwtToken holding user claims.
export type SetTokenAction = { type: "SET_TOKEN", payload: string };

// Action type for data retrieved from login request.
export type SetLoginAction = { type: "SET_LOGIN", payload: AuthReducerState };

// Action type to sign the current user out.
export type SetLogoutAction = { type: "SET_LOGOUT", payload: null };

// Actions for courses.js file.
export type SetSubscribedSectionsAction = {
	type: "SET_SUBSCRIBED_SECTIONS",
	payload: Array<string>,
};

// course interface
// e.g. course = {faculty: "COMP", course: "202", year: "2020", semester: "FALL"}
export type CourseQuery = {
	faculty: string,
	course: string,
	year: string,
	semester: string,
};

// Actions for loader.js file.
export type LoaderAction = {
	type: string,
	payload: string,
};

// Actions for snackbar.js file.
export type SnackbarAction = {
	type: string,
	payload: string,
};

type Action = {
	+type: string,
};

export type GetState = () => State;
export type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type Dispatch = (
	action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;
