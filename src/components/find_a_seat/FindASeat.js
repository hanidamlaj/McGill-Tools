import React from "react";
import {} from "@material-ui/core";

import CourseSubscriptionsContainer from "../../containers/find_a_seat/CourseSubscriptionsContainer";
import SubscribeToCourse from "./SubscribeToCourse";

function FindASeat() {
	return (
		<React.Fragment>
			<SubscribeToCourse />
			<CourseSubscriptionsContainer />
		</React.Fragment>
	);
}

export default FindASeat;
