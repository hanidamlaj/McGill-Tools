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

// this is the component that contains the top card on the get-a-seat page
// contains the feature that displays the currently subscribed to features
function CourseSubscriptions({
	requestCourse,
	requestSubscribedSections,
	subscribedSections,
	requestSectionUnsubscribe
}) {
	const classes = useStyles();

	const isSmall = useContext(IsSmallContext);

	/**
	 * state to control the user's subscribed courseIds
	 * (e.g. courseId: "COMP_202_2019_FALL")
	 */
	const [courseIds, setCourseIds] = useState([]);

	/**
	 * state to control the data belonging to the courseIds above
	 * key-value pairs of courseId-data
	 * { COMP_202_2019_FALL: {subject, course, faculty, sections} }
	 */
	const [courses, setCourses] = useState({});

	/**
	 * state duplicate of props
	 */
	const [stateSubscribedSections, setStateSubscribedSections] = useState([]);

	// on component mount, request the user's subscribed courses
	useEffect(() => {
		requestSubscribedSections();
	}, []);

	useEffect(() => {
		// create a set of courseIds to detect which new courses must be queried
		// if course data already exists for the specific section, skip quering
		// the course again
		const courseIdsSet = new Set(courseIds);
		const subscribedCourses = subscribedSections.map(sectionId =>
			// extract the courseId from the sectionId (e.g. sectionId: "COMP_202_2019_FALL_001")
			// (e.g. courseId: "COMP_202_2019_FALL")
			sectionId.slice(0, sectionId.lastIndexOf("_"))
		);

		// find the courseIds that are not in the set (newly added)
		const diff = subscribedCourses.filter(
			courseId => !courseIdsSet.has(courseId)
		);

		// only request the data in the difference of the two array (the new subscriptions)
		const newSubscriptions = diff.map(courseId => {
			const [faculty, course, year, semester] = courseId.split("_");
			return requestCourse({ faculty, course, year, semester });
		});

		Promise.all(newSubscriptions)
			.then(res => {
				// since newSubscriptions is a mapping of diff, the indices match
				const newCourses = diff.reduce(
					(acc, cur, index) => {
						// map the courseKey to the courseDetails fetched
						acc[cur] = res[index];
						return acc;
					},
					{ ...courses }
				);
				// update the data for the courses
				setCourses(newCourses);

				// update the list of courseIds
				setCourseIds(courseIds => [...courseIds, ...diff]);

				// update the list of state managed subscribedSections
				setStateSubscribedSections(subscribedSections);
			})
			.catch(() => {});
	}, [subscribedSections]);

	/**
	 * Handles unsubscribing the user
	 * @param {Number} index the location of both the course and course identifier
	 */
	const handleUnsubscribe = index => {
		// extract information from the targeted sectionId
		const [faculty, course, year, semester, section] = subscribedSections[
			index
		].split("_");
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
						{stateSubscribedSections.map((sectionId, index) => {
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
							] = sectionId.split("_");

							// generate the courseId from the sectionId to lookup the courses object
							const courseId = [faculty, courseCode, year, semester].join("_");
							const course = courses[courseId];

							const sectionIndex = getSectionIndex(course, sectionNumber);
							// should not happen, integrity check
							if (sectionIndex < 0)
								return <React.Fragment key={courseIds[index]} />;

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
			{stateSubscribedSections.map((sectionId, index) => {
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
				] = sectionId.split("_");

				// generate the courseId from the sectionId to lookup the courses object
				const courseKey = [faculty, courseCode, year, semester].join("_");
				const course = courses[courseKey];

				const sectionIndex = getSectionIndex(course, sectionNumber);
				if (sectionIndex < 0) return <React.Fragment key={courseIds[index]} />;

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

CourseSubscriptions.propTypes = {
	requestCourse: PropTypes.func.isRequired,
	requestSubscribedSections: PropTypes.func.isRequired,
	subscribedSections: PropTypes.array.isRequired,
	requestSectionUnsubscribe: PropTypes.func.isRequired
};

export default CourseSubscriptions;
