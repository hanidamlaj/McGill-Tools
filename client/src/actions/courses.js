// @flow

import type {
	CourseQuery,
	SetSubscribedSectionsAction,
	ThunkAction,
} from "./types.js";
import { BASE_URL } from "./types.js";
import { addLoaderKey, removeLoaderKey } from "./loaders";
import { setSnackbarError } from "./snackbar";

import firebase from "./../firebase";

// ––––––––––––––––––––– ACTION CREATORS –––––––––––––––––––––

/**
 * action creator for the subscribed sections of a user
 */
const setSubscribedSections = (
	subscribedSections: Array<string>
): SetSubscribedSectionsAction => ({
	type: "SET_SUBSCRIBED_SECTIONS",
	payload: subscribedSections,
});

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// ––––––––––––––––––––– LOADER KEYS FOR ASYNC ACTIONS –––––––––––––––––––––

const REQUEST_COURSE: string = "REQUEST_COURSE";
const REQUEST_COURSE_SUGGESTIONS: string = "REQUEST_COURSE_SUGGESTIONS";
const REQUEST_SUBSCRIBE: string = "REQUEST_SUBSCRIBE";
const REQUEST_UNSUBSCRIBE: string = "REQUEST_UNSUBSCRIBE";

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// ––––––––––––––––––––– ASYNC ACTIONS –––––––––––––––––––––

/**
 * Retrieve course information.
 */
export const requestCourse = ({
	faculty,
	course,
	year,
	semester,
}: CourseQuery): ThunkAction => (dispatch, getState) => {
	// request parameters
	const token = getState().auth.token;
	const query = [faculty, course, year, semester].join("/");

	dispatch(addLoaderKey(REQUEST_COURSE));
	return fetch(`${BASE_URL}courses/${query}`, {
		headers: {
			"x-access-token": token ?? "",
		},
	})
		.then((res) => res.json())
		.then((json) => {
			if (json.error) throw new Error(json.message);

			// log request
			firebase
				.analytics()
				.logEvent("course_search", { faculty, course, year, semester });

			return json;
		})
		.catch((err) => {
			dispatch(setSnackbarError(err.message));
			return err;
		})
		.finally(() => {
			dispatch(removeLoaderKey(REQUEST_COURSE));
		});
};

/**
 * Retrieve course name suggestions for user input (i.e. autocomplete feature).
 */
export const requestCourseSuggestions = (searchKey: string): ThunkAction => (
	dispatch,
	getState
) => {
	const token = getState().auth.token;
	dispatch(addLoaderKey(REQUEST_COURSE_SUGGESTIONS));
	return fetch(`${BASE_URL}courses/autocomplete/${searchKey}`, {
		headers: {
			"x-access-token": token ?? "",
		},
	})
		.then((res) => res.json())
		.then((json) => {
			if (json.error) throw new Error(json.message);
			return json;
		})
		.catch((err) => {
			dispatch(setSnackbarError(err.message));
			return err;
		})
		.finally(() => {
			dispatch(removeLoaderKey(REQUEST_COURSE_SUGGESTIONS));
		});
};

/**
 * Subscribe user to notifications for a course & section.
 */
export const requestSectionSubscribe = ({
	faculty,
	course,
	year,
	semester,
	section,
}: {
	...CourseQuery,
	section: string,
}): ThunkAction => (dispatch, getState) => {
	const token = getState().auth.token;
	const query = [faculty, course, year, semester, section].join("/");

	dispatch(addLoaderKey(REQUEST_SUBSCRIBE));
	fetch(`${BASE_URL}notify/subscribe/${query}`, {
		headers: {
			"x-access-token": token ?? "",
		},
		method: "POST",
	})
		.then((res) => res.json())
		.then((json) => {
			if (json.error) throw new Error(json.message);

			// log request
			firebase.analytics().logEvent("section_subscribe", {
				faculty,
				course,
				year,
				semester,
				section,
			});

			dispatch(setSubscribedSections(json.subscribedSections));
		})
		.catch((err) => {
			dispatch(setSnackbarError(err.message));
		})
		.finally(() => {
			dispatch(removeLoaderKey(REQUEST_SUBSCRIBE));
		});
};

/**
 * Unsubscribe user to notifications for a course & section.
 */
export const requestSectionUnsubscribe = ({
	faculty,
	course,
	year,
	semester,
	section,
}: {
	...CourseQuery,
	section: string,
}): ThunkAction => (dispatch, getState) => {
	const token = getState().auth.token;
	const query = [faculty, course, year, semester, section].join("/");

	dispatch(addLoaderKey(REQUEST_UNSUBSCRIBE));
	fetch(`${BASE_URL}notify/unsubscribe/${query}`, {
		headers: {
			"x-access-token": token ?? "",
		},
		method: "POST",
	})
		.then((res) => res.json())
		.then((json) => {
			if (json.error) throw new Error(json.message);

			// log request
			firebase.analytics().logEvent("section_unsubscribe", {
				faculty,
				course,
				year,
				semester,
				section,
			});

			dispatch(setSubscribedSections(json.subscribedSections));
		})
		.catch((err) => {
			dispatch(setSnackbarError(err.message));
		})
		.finally(() => {
			dispatch(removeLoaderKey(REQUEST_UNSUBSCRIBE));
		});
};

/**
 * Retrieve sections subscribed to by user.
 */
export const requestSubscribedSections: ThunkAction = (dispatch, getState) => {
	const token = getState().auth.token;
	dispatch(addLoaderKey(REQUEST_SUBSCRIBE));
	fetch(`${BASE_URL}user/profile/subscribedSections`, {
		headers: {
			"x-access-token": token ?? "",
		},
	})
		.then((res) => res.json())
		.then((json) => {
			if (json.error) throw new Error(json.message);
			dispatch(setSubscribedSections(json));
		})
		.catch((err) => {
			dispatch(setSnackbarError(err.message));
		})
		.finally(() => dispatch(removeLoaderKey(REQUEST_SUBSCRIBE)));
};

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
