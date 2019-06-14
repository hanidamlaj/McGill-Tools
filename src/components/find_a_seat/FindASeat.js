import React from "react";
import PropTypes from "prop-types";
import {} from "@material-ui/core";

import CourseSubscriptions from "./CourseSubscriptions";
import SubscribeToCourse from "./SubscribeToCourse";

function FindASeat({ requestCourse, requestCourseSuggestions, token }) {
	return (
		<React.Fragment>
			<SubscribeToCourse
				requestCourse={requestCourse}
				requestCourseSuggestions={requestCourseSuggestions}
				token={token}
			/>
			<CourseSubscriptions />
		</React.Fragment>
	);
}

FindASeat.propTypes = {
	requestCourse: PropTypes.func.isRequired,
	requestCourseSuggestions: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired
};

export default FindASeat;
