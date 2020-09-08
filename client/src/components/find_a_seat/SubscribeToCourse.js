// @flow

import React, { useState } from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, Button, CardActions } from "@material-ui/core";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";

import CourseSearchContainer from "../../containers/find_a_seat/CourseSearchContainer";
import SectionSelectionContainer from "../../containers/find_a_seat/SectionSelectionContainer";

const useStyles = makeStyles((theme) => ({
	root: {
		overflow: "visible",
	},
	stepper: {
		width: "100%",
		maxWidth: 1000,
		minWidth: 300,
	},
}));

// This is the component that contains the bottom card on the get-a-seat page
// parent component of both the search and section selection features.
function SubscribeToCourse() {
	const classes = useStyles();

	// state that controls which step the user is currently on (i.e. 0 for course search, 1 for section selection)
	const [activeStep, setActiveStep] = useState(0);

	// state to control which course has been selected
	const [selectedCourse, setSelectedCourse] = useState(null);

	const steps = ["Search for a course", "Subscribe"];

	// handles advancing to the next step
	const handleNext = () => {
		setActiveStep((curStep) => curStep + 1);
	};

	// handles going back to the previous step
	const handleBack = () => {
		setSelectedCourse(null);
		setActiveStep((curStep) => curStep - 1);
	};

	// the react element to render for a given step
	const stepContent = [
		<CourseSearchContainer
			handleNext={handleNext}
			setSelectedCourse={setSelectedCourse}
		/>,
		<SectionSelectionContainer
			course={selectedCourse}
			handleBack={handleBack}
		/>,
	];

	return (
		<Card className={classes.root}>
			<CardHeader title="Subscribe To Course Notifications" />
			<CardContent>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map((label) => {
							return (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							);
						})}
					</Stepper>
				</div>
				{stepContent[activeStep]}
			</CardContent>
			{selectedCourse && (
				<CardActions>
					<Button className={classes.button} onClick={handleBack}>
						Go Back
					</Button>
				</CardActions>
			)}
		</Card>
	);
}

export default SubscribeToCourse;
