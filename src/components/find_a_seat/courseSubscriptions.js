import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

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

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		justifyContent: "center",
		padding: theme.spacing(0, 4)
	},
	table: {
		minWidth: 500,
		width: "100%"
	},
	card: {
		border: "2px solid #eeeeee",
		margin: `32px auto`,
		minWidth: 280
	}
}));

/**
 * finds the index of the target section in a course object
 * @param {{subject: string, course: string, sections: object[]}} course
 * @param {string} section the number of the target section
 */
function getSectionIndex(course, section) {
	if (!course.sections) return -1;
	return course.sections.findIndex(s => s.section === section);
}

function CourseSubscriptions({
	requestCourse,
	requestSubscribedSections,
	subscribedSections,
	requestSectionUnsubscribe
}) {
	const classes = useStyles();

	const isSmall = useContext(IsSmallContext);

	/**
	 * State to control the user's subscribed courseIds
	 */
	const [courseIds, setCourseIds] = useState([]);

	/**
	 * State to control the user's subscribed courses
	 */
	const [courses, setCourses] = useState([]);

	// on component mount, request the user's subscribed courses
	useEffect(() => {
		requestSubscribedSections();
	}, []);

	useEffect(() => {
		// create a set of courseIds to maintain uniqueness and calculate difference
		// between the previous and new courses
		const courseIdsSet = new Set(courseIds);
		const diff = subscribedSections.filter(
			courseId => !courseIdsSet.has(courseId)
		);
		setCourseIds(courseIds => [...courseIds, ...diff]);

		// only request the data in the difference of the two array (the new subscriptions)
		const newSubscriptions = diff.map(courseId => {
			const [faculty, course, year, semester] = courseId.split("_");
			return requestCourse({ faculty, course, year, semester });
		});
		Promise.all(newSubscriptions).then(res =>
			setCourses(courses => [...courses, ...res])
		);
	}, [subscribedSections]);

	/**
	 * Handles unsubscribing the user
	 * @param {Number} index the location of both the course and course identifier
	 */
	const handleUnsubscribe = index => {
		const [faculty, course, year, semester, section] = courseIds[index].split(
			"_"
		);

		// update state to reflect removal of subscription
		setCourseIds(courseIds => courseIds.filter((_, idx) => index !== idx));
		setCourses(courses => courses.filter((_, idx) => index !== idx));

		requestSectionUnsubscribe({ faculty, course, year, semester, section });
	};

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
						{courses.map((course, index) => {
							/**
							 * course identifiers
							 * @type {[string, string, string, string, string]}
							 */
							const [
								faculty,
								courseCode,
								year,
								semester,
								sectionNumber
							] = courseIds[index].split("_");

							const sectionIndex = getSectionIndex(course, sectionNumber);
							if (sectionIndex < 0)
								return <React.Fragment key={courseIds[index]} />;
							const section = course.sections[sectionIndex];
							return (
								<TableRow key={courseIds[index]}>
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
			{courses.map((course, index) => {
				/**
				 * course identifiers
				 * @type {[string, string, string, string, string]}
				 */
				const [faculty, courseCode, year, semester, sectionNumber] = courseIds[
					index
				].split("_");

				const sectionIndex = getSectionIndex(course, sectionNumber);
				if (sectionIndex < 0) return <React.Fragment key={courseIds[index]} />;

				const section = course.sections[sectionIndex];
				return (
					<div key={courseIds[index]}>
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

CourseSubscriptions.propTypes = {
	requestCourse: PropTypes.func.isRequired,
	requestSubscribedSections: PropTypes.func.isRequired,
	subscribedSections: PropTypes.array.isRequired,
	requestSectionUnsubscribe: PropTypes.func.isRequired
};

export default CourseSubscriptions;
