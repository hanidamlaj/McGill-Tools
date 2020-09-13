// @flow

export type User = {
	photoURL: string,
	displayName: string,
	email: string,
	phoneNumber: string,
	subscribedSections: Array<string>,
	isAdmin?: boolean,
};

export type AuthReducerState = {
	user: User,
	token: string | null,
};

export type SnackbarReducerState = {
	success: string,
	error: string,
};

export type State = {
	auth: AuthReducerState,
	loaders: Array<string>,
	snackbar: SnackbarReducerState,
};
