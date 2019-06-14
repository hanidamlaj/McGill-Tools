import React, { useState } from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";

import CourseSearch from "./CourseSearch";
import CourseSelection from "./CourseSelection";

function SubscribeToCourse({ requestCourse, requestCourseSuggestions }) {
	const [activeStep, setActiveStep] = useState(0);
	const [selectedCourse, setSelectedCourse] = useState({});

	const steps = ["Search for a course", "Select a course section"];
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
		setActiveStep(curStep => curStep - 1);
	};

	/**
	 * contains the react element to render for a given step
	 */
	const stepContent = [
		<CourseSearch
			handleNext={handleNext}
			requestCourse={requestCourse}
			requestCourseSuggestions={requestCourseSuggestions}
			setSelectedCourse={setSelectedCourse}
		/>,
		<CourseSelection course={selectedCourse} handleBack={handleBack} />
	];

	return (
		<Card style={{ overflow: "visible" }}>
			<CardHeader title="Subscribe To Course Notifications" />
			<CardContent>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<Stepper
						activeStep={activeStep}
						style={{ width: "65%", minWidth: 300, marginBottom: 32 }}
					>
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
		</Card>
	);
	// return <CourseSearch token={token} />;
}

SubscribeToCourse.propTypes = {
	requestCourseSuggestions: PropTypes.func.isRequired
};

export default SubscribeToCourse;
