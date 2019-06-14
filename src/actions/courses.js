import { addLoaderKey, removeLoaderKey } from "./loaders";

// loading key for async action
const REQUEST_COURSE = "REQUEST_COURSE";

/**
 * async action to retrieve a course
 * @param {{faculty: string, course: string, year: string, semester: string}} params
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
