// @flow

import type {
	CourseQuery,
	SetSubscribedSectionsAction,
	ThunkAction,
} from "./types.js";
import Controller from "./Controller.js";
import { addLoaderKey, removeLoaderKey } from "./loaders";
import { setSnackbarError } from "./snackbar";

import { getAnalytics, logEvent } from "firebase/analytics";

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
export const requestCourse =
	({ faculty, course, year, semester }: CourseQuery): ThunkAction =>
	(dispatch, getState) => {
		// request parameters
		const token = getState().auth.token;
		const query = [faculty, course, year, semester].join("/");

		dispatch(addLoaderKey(REQUEST_COURSE));
		return new Controller(`/courses/${query}`, token ?? "")
			.setMethod("GET")
			.send()
			.then((json) => {
				// log request
				logEvent(getAnalytics(), "course_search", {
					faculty,
					course,
					year,
					semester,
				});

				return json;
			})
			.catch((err: Error) => {
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
export const requestCourseSuggestions =
	(searchKey: string): ThunkAction =>
	(dispatch, getState) => {
		const token = getState().auth.token;
		dispatch(addLoaderKey(REQUEST_COURSE_SUGGESTIONS));

		return new Controller(`/courses/autocomplete/${searchKey}`, token ?? "")
			.setMethod("GET")
			.send()
			.catch((err: Error) => {
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
export const requestSectionSubscribe =
	({
		faculty,
		course,
		year,
		semester,
		section,
	}: {
		...CourseQuery,
		section: string,
	}): ThunkAction =>
	(dispatch, getState) => {
		const token = getState().auth.token;
		const query = [faculty, course, year, semester, section].join("/");

		dispatch(addLoaderKey(REQUEST_SUBSCRIBE));
		return new Controller(`/notify/subscribe/${query}`, token ?? "")
			.setMethod("POST")
			.send()
			.then((json) => {
				// log request
				logEvent(getAnalytics(), "section_subscribe", {
					faculty,
					course,
					year,
					semester,
					section,
				});

				dispatch(setSubscribedSections(json.subscribedSections));
				return json;
			})
			.catch((err: Error) => {
				dispatch(setSnackbarError(err.message));
				return err;
			})
			.finally(() => {
				dispatch(removeLoaderKey(REQUEST_SUBSCRIBE));
			});
	};

/**
 * Unsubscribe user to notifications for a course & section.
 */
export const requestSectionUnsubscribe =
	({
		faculty,
		course,
		year,
		semester,
		section,
	}: {
		...CourseQuery,
		section: string,
	}): ThunkAction =>
	(dispatch, getState) => {
		const token = getState().auth.token;
		const query = [faculty, course, year, semester, section].join("/");

		dispatch(addLoaderKey(REQUEST_UNSUBSCRIBE));
		return new Controller(`/notify/unsubscribe/${query}`, token ?? "")
			.setMethod("POST")
			.send()
			.then((json) => {
				dispatch(setSubscribedSections(json.subscribedSections));
				return json;
			})
			.catch((err: Error) => {
				dispatch(setSnackbarError(err.message));
				return err;
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

	return new Controller("/user/profile/subscribedSections", token ?? "")
		.setMethod("GET")
		.send()
		.then((json) => {
			dispatch(setSubscribedSections(json));
			return json;
		})
		.catch((err: Error) => {
			dispatch(setSnackbarError(err.message));
			return err;
		})
		.finally(() => {
			dispatch(removeLoaderKey(REQUEST_SUBSCRIBE));
		});
};

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
