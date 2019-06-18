import { addLoaderKey, removeLoaderKey } from "./loaders";

// loading key for async action
const REQUEST_COURSE = "REQUEST_COURSE";

/**
 * async action to retrieve a course
 * @param {{faculty: string, course: string, year: string, semester: string}} param
 * @returns {Promise<Object>}
 */
export const requestCourse = ({ faculty, course, year, semester }) => (
	dispatch,
	getState
) => {
	const token = getState().auth.token;
	const query = [faculty, course, year, semester].join("/");
	dispatch(addLoaderKey(REQUEST_COURSE));
	console.log(query);
	return fetch(`http://localhost:8080/courses/${query}`, {
		headers: {
			"x-access-token": token
		}
	})
		.then(res => res.json())
		.then(json => {
			if (json.error) throw json;
			return json;
		})
		.catch(err => {
			console.error(err);
			return err;
		})
		.finally(() => {
			dispatch(removeLoaderKey(REQUEST_COURSE));
		});
};

const REQUEST_COURSE_SUGGESTIONS = "REQUEST_COURSE_SUGGESTIONS";
/**
 * async action to retrieve suggestions for a given search key
 * @param {string} searchKey the search key
 */
export const requestCourseSuggestions = searchKey => (dispatch, getState) => {
	const token = getState().auth.token;
	dispatch(addLoaderKey(REQUEST_COURSE_SUGGESTIONS));
	return fetch(`http://localhost:8080/courses/autocomplete/${searchKey}`, {
		headers: {
			"x-access-token": token
		}
	})
		.then(res => res.json())
		.then(json => {
			if (json.error) throw json;
			return json;
		})
		.catch(err => {
			console.error(err);
			return err;
		})
		.finally(() => {
			dispatch(removeLoaderKey(REQUEST_COURSE_SUGGESTIONS));
		});
};

/**
 * action creator for the courses a user is subscribed to
 */
export const SET_COURSE_SUBSCRIPTIONS = "SET_COURSE_SUBSCRIPTIONS";
const setCourseSubscriptions = courseSubscriptions => ({
	type: SET_COURSE_SUBSCRIPTIONS,
	payload: courseSubscriptions
});

const REQUEST_SUBSCRIBE = "REQUEST_SUBSCRIBE";
/**
 * async action to subscribe to notifications for a given course
 * @param {{faculty: string, course: string, year: string, semester: string, section: string}} param
 */
export const requestCourseSubscribe = ({
	faculty,
	course,
	year,
	semester,
	section
}) => (dispatch, getState) => {
	const token = getState().auth.token;
	const query = [faculty, course, year, semester, section].join("/");

	dispatch(addLoaderKey(REQUEST_SUBSCRIBE));
	fetch(`http://localhost:8080/notify/subscribe/${query}`, {
		headers: {
			"x-access-token": token
		},
		method: "POST"
	})
		.then(res => res.json())
		.then(json => {
			if (json.error) throw json;
			dispatch(setCourseSubscriptions(json.notificationCourses));
		})
		.catch(err => {
			console.error(err);
		})
		.finally(() => {
			dispatch(removeLoaderKey(REQUEST_SUBSCRIBE));
		});
};

const REQUEST_UNSUBSCRIBE = "REQUEST_UNSUBSCRIBE";
/**
 * async action to subscribe to notifications for a given course
 * @param {{faculty: string, course: string, year: string, semester: string, section: string}} param
 */
export const requestCourseUnsubscribe = ({
	faculty,
	course,
	year,
	semester,
	section
}) => (dispatch, getState) => {
	const token = getState().auth.token;
	const query = [faculty, course, year, semester, section].join("/");

	dispatch(addLoaderKey(REQUEST_UNSUBSCRIBE));
	fetch(`http://localhost:8080/notify/unsubscribe/${query}`, {
		headers: {
			"x-access-token": token
		},
		method: "POST"
	})
		.then(res => res.json())
		.then(json => {
			if (json.error) throw json;
			dispatch(setCourseSubscriptions(json.notificationCourses));
		})
		.catch(err => {
			console.error(err);
		})
		.finally(() => {
			dispatch(removeLoaderKey(REQUEST_UNSUBSCRIBE));
		});
};

export const requestSubscribedCourses = (dispatch, getState) => {
	const token = getState().auth.token;
	dispatch(addLoaderKey(REQUEST_SUBSCRIBE));
	fetch("http://localhost:8080/user/profile/notificationCourses", {
		headers: {
			"x-access-token": token
		}
	})
		.then(res => res.json())
		.then(json => {
			if (json.error) throw json;
			dispatch(setCourseSubscriptions(json));
		})
		.catch(err => {
			console.error(err);
		})
		.finally(() => dispatch(removeLoaderKey(REQUEST_SUBSCRIBE)));
};
