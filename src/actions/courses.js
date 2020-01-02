import { addLoaderKey, removeLoaderKey } from "./loaders";
import { setSnackbarError } from "./snackbar";

// ––––––––––––––––––––– ACTION CREATORS –––––––––––––––––––––

/**
 * action creator for the subscribed sections of a user
 */
export const SET_SECTION_SUBSCRIPTIONS = "SET_SECTION_SUBSCRIPTIONS";
const setSubscribedSections = subscribedSections => ({
	type: SET_SECTION_SUBSCRIPTIONS,
	payload: subscribedSections
});

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// ––––––––––––––––––––– LOADER KEYS FOR ASYNC ACTIONS –––––––––––––––––––––

const REQUEST_COURSE = "REQUEST_COURSE";
const REQUEST_COURSE_SUGGESTIONS = "REQUEST_COURSE_SUGGESTIONS";
const REQUEST_SUBSCRIBE = "REQUEST_SUBSCRIBE";
const REQUEST_UNSUBSCRIBE = "REQUEST_UNSUBSCRIBE";

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// ––––––––––––––––––––– ASYNC ACTIONS –––––––––––––––––––––

/**
 * retrieve course information
 * @param {{faculty: string, course: string, year: string, semester: string}} param
 * @returns {Promise<object>}
 */
export const requestCourse = ({ faculty, course, year, semester }) => (
	dispatch,
	getState
) => {
	// request parameters
	const token = getState().auth.token;
	const query = [faculty, course, year, semester].join("/");

	dispatch(addLoaderKey(REQUEST_COURSE));
	return fetch(`https://mcgilltools.com/courses/${query}`, {
		headers: {
			"x-access-token": token
		}
	})
		.then(res => res.json())
		.then(json => {
			if (json.error) throw new Error(json.message);
			return json;
		})
		.catch(err => {
			dispatch(setSnackbarError(err.message));
			return err;
		})
		.finally(() => {
			dispatch(removeLoaderKey(REQUEST_COURSE));
		});
};

/**
 * retrieve course name suggestions for user input (i.e. autocomplete feature)
 * @param {string} searchKey the search key
 */
export const requestCourseSuggestions = searchKey => (dispatch, getState) => {
	const token = getState().auth.token;
	dispatch(addLoaderKey(REQUEST_COURSE_SUGGESTIONS));
	return fetch(`https://mcgilltools.com/courses/autocomplete/${searchKey}`, {
		headers: {
			"x-access-token": token
		}
	})
		.then(res => res.json())
		.then(json => {
			if (json.error) throw new Error(json.message);
			return json;
		})
		.catch(err => {
			dispatch(setSnackbarError(err.message));
			return err;
		})
		.finally(() => {
			dispatch(removeLoaderKey(REQUEST_COURSE_SUGGESTIONS));
		});
};

/**
 * subscribe user to notifications for a course & section
 * @param {{faculty: string, course: string, year: string, semester: string, section: string}} param
 */
export const requestSectionSubscribe = ({
	faculty,
	course,
	year,
	semester,
	section
}) => (dispatch, getState) => {
	const token = getState().auth.token;
	const query = [faculty, course, year, semester, section].join("/");

	dispatch(addLoaderKey(REQUEST_SUBSCRIBE));
	fetch(`https://mcgilltools.com/notify/subscribe/${query}`, {
		headers: {
			"x-access-token": token
		},
		method: "POST"
	})
		.then(res => res.json())
		.then(json => {
			if (json.error) throw new Error(json.message);
			dispatch(setSubscribedSections(json.subscribedSections));
		})
		.catch(err => {
			dispatch(setSnackbarError(err.message));
		})
		.finally(() => {
			dispatch(removeLoaderKey(REQUEST_SUBSCRIBE));
		});
};

/**
 * unsubscribe user to notifications for a course & section
 * @param {{faculty: string, course: string, year: string, semester: string, section: string}} param
 */
export const requestSectionUnsubscribe = ({
	faculty,
	course,
	year,
	semester,
	section
}) => (dispatch, getState) => {
	const token = getState().auth.token;
	const query = [faculty, course, year, semester, section].join("/");

	dispatch(addLoaderKey(REQUEST_UNSUBSCRIBE));
	fetch(`https://mcgilltools.com/notify/unsubscribe/${query}`, {
		headers: {
			"x-access-token": token
		},
		method: "POST"
	})
		.then(res => res.json())
		.then(json => {
			if (json.error) throw new Error(json.message);
			dispatch(setSubscribedSections(json.subscribedSections));
		})
		.catch(err => {
			dispatch(setSnackbarError(err.message));
		})
		.finally(() => {
			dispatch(removeLoaderKey(REQUEST_UNSUBSCRIBE));
		});
};

/**
 * retrieve sections subscribed to by user
 * @param {Function} dispatch
 * @param {Function} getState
 */
export const requestSubscribedSections = (dispatch, getState) => {
	const token = getState().auth.token;
	dispatch(addLoaderKey(REQUEST_SUBSCRIBE));
	fetch("https://mcgilltools.com/user/profile/subscribedSections", {
		headers: {
			"x-access-token": token
		}
	})
		.then(res => res.json())
		.then(json => {
			if (json.error) throw new Error(json.message);
			dispatch(setSubscribedSections(json));
		})
		.catch(err => {
			dispatch(setSnackbarError(err.message));
		})
		.finally(() => dispatch(removeLoaderKey(REQUEST_SUBSCRIBE)));
};

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
