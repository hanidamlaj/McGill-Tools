// @flow

import type { CourseQuery, Course } from "./../../actions/types";

import React, { useContext, useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import { IsSmallContext } from "../../shared";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
		padding: theme.spacing(0, 4),
	},
	table: {
		minWidth: 500,
		width: "100%",
	},
	card: {
		border: "2px solid #eeeeee",
		margin: `32px auto`,
		minWidth: 280,
	},
}));

/**
 * finds the index of the target section in a course object
 */
function getSectionIndex(course: Course, section: string) {
	// optional chaining not supported by flow
	// const targetCourse = course?.sections?.findIndex(
	// 	(s) => s.section === section
	// );

	if (course && course.sections)
		return course.sections.findIndex((s) => s.section === section);
	else return -1;
}

type Props = {
	requestCourse: (CourseQuery) => Promise<Course>,
	requestSubscribedSections: () => Promise<Array<string>>,
	subscribedSections: Array<string>,
	requestSectionUnsubscribe: ({ ...CourseQuery, section: string }) => void,
};

// This is the component that contains the top card on the get-a-seat page
// contains the feature that displays the currently subscribed to features.
function CourseSubscriptions({
	requestCourse,
	requestSubscribedSections,
	subscribedSections,
	requestSectionUnsubscribe,
}: Props) {
	const classes = useStyles();

	const isSmall = useContext(IsSmallContext);

	/**
	 * state that maps the course_data to the course_info;
	 * e.g. { COMP_202_2019_FALL: {subject, course, faculty, sections} }
	 */
	const [courses, setCourses] = useState<{ [string]: Course }>({});

	// on component mount, request the user's subscribed courses
	useEffect(() => {
		requestSubscribedSections();
	}, [requestSubscribedSections]);

	// on update of subscribedsections prop, re-request course information
	useEffect(() => {
		// extract the courseId from the sectionId (e.g. sectionId: "COMP_202_2019_FALL_001")
		// (e.g. courseId: "COMP_202_2019_FALL")
		const subscribedCourses = subscribedSections.map((sectionId) =>
			sectionId.slice(0, sectionId.lastIndexOf("_"))
		);

		// map each section to a promise that will resolve to course data
		const newCoursesPromises = subscribedCourses.map((courseId) => {
			const [faculty, course, year, semester] = courseId.split("_");
			return requestCourse({ faculty, course, year, semester });
		});

		// when all promises have been resolved, update state accordingly
		Promise.all(newCoursesPromises)
			.then((res) => {
				const newCourses = subscribedCourses.reduce((acc, courseId, index) => {
					// map the courseKey to the courseDetails fetched
					acc[courseId] = res[index];
					return acc;
				}, {});

				// update the data for the courses
				setCourses(newCourses);
			})
			.catch(() => {});
	}, [subscribedSections, requestCourse]);

	/**
	 * This callback function handles unsubscribing the user from a given section.
	 */
	const handleUnsubscribe = (index) => {
		// extract information from the targeted sectionId
		const [faculty, course, year, semester, section] = subscribedSections[
			index
		].split("_");
		requestSectionUnsubscribe({ faculty, course, year, semester, section });
	};

	// TODO: move these into their own component.
	const BigViewport = () => (
		<React.Fragment>
			<div className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Course</TableCell>
							<TableCell>Semester</TableCell>
							<TableCell>Section</TableCell>
							<TableCell>Instructor(s)</TableCell>
							<TableCell>Location</TableCell>
							<TableCell>Days</TableCell>
							<TableCell>Time</TableCell>
							<TableCell>Unsubscribe</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{subscribedSections.map((sectionId, index) => {
							/**
							 * course identifiers
							 * @type {[string, string, string, string, string]}
							 */
							const [
								faculty,
								courseCode,
								year,
								semester,
								sectionNumber,
							] = sectionId.split("_");

							// generate the courseId from the sectionId to lookup the courses object
							const courseId = [faculty, courseCode, year, semester].join("_");
							const course = courses[courseId];

							const sectionIndex = getSectionIndex(course, sectionNumber);
							// should not happen, integrity check
							if (sectionIndex < 0) return null;

							const section = course.sections[sectionIndex];

							return (
								<TableRow key={sectionId}>
									<TableCell>{`${faculty}${courseCode}`}</TableCell>
									<TableCell>{`${semester}-${year}`}</TableCell>
									<TableCell>{section.section}</TableCell>
									<TableCell>{section.instructor}</TableCell>
									<TableCell>{section.location}</TableCell>
									<TableCell>{section.days}</TableCell>
									<TableCell>{section.time}</TableCell>
									<TableCell>
										<Button
											color="primary"
											onClick={() => handleUnsubscribe(index)}
										>
											Unsubscribe
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</React.Fragment>
	);

	const SmallViewPort = () => (
		<React.Fragment>
			{subscribedSections.map((sectionId, index) => {
				// extract course identifiers from id
				const [
					faculty,
					courseCode,
					year,
					semester,
					sectionNumber,
				] = sectionId.split("_");

				// generate the courseId from the sectionId to lookup the courses object
				const courseKey = [faculty, courseCode, year, semester].join("_");
				const course = courses[courseKey];

				const sectionIndex = getSectionIndex(course, sectionNumber);
				if (sectionIndex < 0) return null;

				const section = course.sections[sectionIndex];
				return (
					<div key={sectionId}>
						<Card className={classes.card} elevation={0}>
							<CardHeader
								title={`${faculty}${courseCode}`}
								subheader={`${semester}-${year}`}
							/>
							<CardContent>
								<Typography>Section: {section.section}</Typography>
								<Typography>Instructor(s): {section.instructor}</Typography>
								<Typography>Location: {section.location}</Typography>
								<Typography>Days: {section.days}</Typography>
								<Typography>Time: {section.time}</Typography>
							</CardContent>
							<CardActions>
								<Button
									color="primary"
									onClick={() => handleUnsubscribe(index)}
								>
									Unsubscribe
								</Button>
							</CardActions>
						</Card>
					</div>
				);
			})}
		</React.Fragment>
	);

	return (
		<Card>
			<CardHeader
				title="Course Subscriptions"
				subheader="We will notify you when seats are available for these courses"
			/>
			<CardContent>
				{subscribedSections.length > 0 ? (
					isSmall ? (
						<SmallViewPort />
					) : (
						<BigViewport />
					)
				) : (
					<Typography>
						You are not subscribed to any courses. Please add your courses
						below.
					</Typography>
				)}
			</CardContent>
		</Card>
	);
}

export default CourseSubscriptions;
