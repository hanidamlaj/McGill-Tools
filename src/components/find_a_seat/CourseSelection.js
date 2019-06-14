import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
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
		justifyContent: "center"
	},
	table: {
		width: "80%",
		minWidth: 500
	},
	button: {
		marginTop: theme.spacing(4)
	},
	card: {
		border: "2px solid #eeeeee",
		margin: `32px auto`,
		minWidth: 280
	}
}));
function CourseSelection({ course, handleBack }) {
	const classes = useStyles();
	const isSmallDevice = React.useContext(IsSmallContext);
	const bigViewport = (
		<React.Fragment>
			<Typography gutterBottom variant="h4">{`${course.subject}-${
				course.course
			}`}</Typography>
			<div className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Section Number</TableCell>
							<TableCell>Instructor(s)</TableCell>
							<TableCell>Location</TableCell>
							<TableCell>Days</TableCell>
							<TableCell>Time</TableCell>
							<TableCell>Subscribe</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{course.sections.map(section => (
							<TableRow key={section.section}>
								<TableCell>{section.section}</TableCell>
								<TableCell>{section.instructor}</TableCell>
								<TableCell>{section.location}</TableCell>
								<TableCell>{section.days}</TableCell>
								<TableCell>{section.time}</TableCell>
								<TableCell>
									<Button color="primary">Subscribe</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<Button className={classes.button} onClick={handleBack}>
				Choose Another Course
			</Button>
		</React.Fragment>
	);

	const smallViewport = (
		<React.Fragment>
			<Typography variant="h4">{`${course.subject}-${
				course.course
			}`}</Typography>
			{course.sections.map(section => {
				return (
					<div key={section.section}>
						<Card className={classes.card} elevation={0}>
							<CardHeader title={`Section ${section.section}`} />
							<CardContent>
								<Typography>Instructor(s): {section.instructor}</Typography>
								<Typography>Location: {section.location}</Typography>
								<Typography>Days: {section.days}</Typography>
								<Typography>Time: {section.time}</Typography>
							</CardContent>
							<CardActions>
								<Button color="primary">Subscribe</Button>
							</CardActions>
						</Card>
					</div>
				);
			})}
			<Button className={classes.button} onClick={handleBack}>
				Choose Another Course
			</Button>
		</React.Fragment>
	);

	return isSmallDevice ? smallViewport : bigViewport;
}

CourseSelection.propTypes = {
	course: PropTypes.object.isRequired,
	handleBack: PropTypes.func.isRequired
};
export default CourseSelection;
