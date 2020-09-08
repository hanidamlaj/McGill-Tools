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

// e.g. course_query = {faculty: "COMP", course: "202", year: "2020", semester: "FALL"}
export type CourseQuery = {
	faculty: string,
	course: string,
	year: string,
	semester: string,
};

// course data fetched from the server
// e.g. mcgilltools.com/courses/comp/202/2020/fall returns the following
// {
//     "faculty": "Faculty of Science",
//     "description": "Introduction to computer programming in a high level language: variables, expressions, primitive types, methods, conditionals, loops. Introduction to algorithms, data structures (arrays, strings), modular software design, libraries, file input/output, debugging, exception handling. Selected topics.",
//     "title": "Foundations of Programming",
//     "subject": "COMP",
//     "course": "202",
//     "sections": [
//         {
//             "CRN": "18260",
//             "type": "Lec",
//             "days": "MWF",
//             "time": "10:35AM-11:25AM",
//             "credits": "3.0",
//             "location": "MCMED 522",
//             "openSeats": "14",
//             "section": "001",
//             "instructor": "Alberini, Giulia; Campbell, Jonathan",
//             "waitlistCapacity": "20",
//             "waitlistOpenSeats": "20"
//         },
//         {
//             "CRN": "18261",
//             "type": "Lec",
//             "days": "MWF",
//             "time": "11:35AM-12:25PM",
//             "credits": "3.0",
//             "location": "STBIO ",
//             "openSeats": "1",
//             "section": "003",
//             "instructor": "Alberini, Giulia; Campbell, Jonathan",
//             "waitlistCapacity": "20",
//             "waitlistOpenSeats": "20"
//         }
//     ]
// }

export type Course = {
	faculty: string,
	description: string,
	title: string,
	subject: string,
	course: string,
	sections: Array<Section>,
};

export type Section = {
	CRN: string,
	type: string,
	days: string,
	time: string,
	credits: string,
	location: string,
	openSeats: string,
	section: string,
	instructor: string,
	waitlistCapacity: string,
	waitlistOpenSeats: string,
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
