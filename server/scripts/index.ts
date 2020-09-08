import { CourseQuery } from "../model/types";

export function courseToString(course: CourseQuery) {
	return [course.subject, course.course, course.year, course.semester]
		.join("_")
		.toUpperCase();
}
