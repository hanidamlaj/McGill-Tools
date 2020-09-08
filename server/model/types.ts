import admin from "./firebase";

export interface AutoCompleteData {
	courseCode: string;
	courseName: string;
}

export interface Course {
	subject: string;
	course: string;
	sections: Array<CourseSection>;
	updated?: admin.firestore.Timestamp;
}

export interface CourseQuery {
	subject: string;
	course: string;
	year: string;
	semester: string;
	section?: string;
}

export interface CourseSection {
	actual: string;
	capacity: string;
	course: string;
	credits: string;
	CRN: string;
	date: string;
	days: string;
	instructor: string;
	location: string;
	remaining: string;
	subject: string;
	section: string;
	type: string;
	title: string;
	time: string;
	waitListCapacity: string;
	waitListActual: string;
	waitListRemaining: string;
}

export interface LoginPayload {
	username: string;
	password: string;
}

export interface SubjectCourses {
	courses: Array<string>;
}

export interface UserInfo {
	uid: string;
	displayName: string;
	email: string;
	phoneNumber: string;
	photoURL: string;
	subscribedSections?: Array<string>;
	newUser?: boolean;
	isAdmin?: boolean;
}
