import React, { useState } from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, Button, CardActions } from "@material-ui/core";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";

import CourseSearchContainer from "../../containers/find_a_seat/CourseSearchContainer";
import SectionSelectionContainer from "../../containers/find_a_seat/SectionSelectionContainer";

const useStyles = makeStyles(theme => ({
	root: {
		overflow: "visible"
	},
	stepper: {
		width: "100%",
		maxWidth: 1000,
		minWidth: 300
	}
}));

function SubscribeToCourse() {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const [selectedCourse, setSelectedCourse] = useState(null);

	const steps = ["Search for a course", "Subscribe"];
	/**
	 * handles moving forward one step
	 */
	const handleNext = () => {
		setActiveStep(curStep => curStep + 1);
	};

	/**
	 * handles going back one step
	 */
	const handleBack = () => {
		setSelectedCourse(null);
		setActiveStep(curStep => curStep - 1);
	};

	/**
	 * contains the react element to render for a given step
	 */
	const stepContent = [
		<CourseSearchContainer
			handleNext={handleNext}
			setSelectedCourse={setSelectedCourse}
		/>,
		<SectionSelectionContainer
			course={selectedCourse}
			handleBack={handleBack}
		/>
	];

	return (
		<Card className={classes.root}>
			<CardHeader title="Subscribe To Course Notifications" />
			<CardContent>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map(label => {
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
