import { addLoaderKey, removeLoaderKey } from "./loaders";

export const GET_COURSE = "GET_COURSE";
export const SET_COURSE = "SET_COURSE";

// action creator for getting course
const setCourse = payload => ({ type: SET_COURSE, payload });

export const requestCourse = ({ faculty, course, year, semester }) => (
	dispatch,
	getState
) => {
	dispatch(addLoaderKey(GET_COURSE));
	const token = getState().auth.token;
	const query = [faculty, course, year, semester].join("/");
	console.log(query);
	fetch(`http://localhost:8080/courses/${query}`, {
		headers: {
			"x-access-token": token
		}
	})
		.then(res => res.json())
		.then(json => {
			if (json.error) throw json;
			console.log(json);
		})
		.catch(err => {
			console.error(err);
		})
		.finally(() => {
			dispatch(removeLoaderKey(GET_COURSE));
		});
};
