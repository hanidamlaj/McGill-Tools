import React from "react";
import {} from "@material-ui/core";

import CourseSearch from "./courseSearch";
import CourseSubscriptions from "./courseSubscriptions";

function FindASeat({ token }) {
	return (
		<React.Fragment>
			<CourseSearch token={token} />
			<CourseSubscriptions />
		</React.Fragment>
	);
}

export default FindASeat;
