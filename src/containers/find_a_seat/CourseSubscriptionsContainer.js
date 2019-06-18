import { connect } from "react-redux";
import CourseSubscriptions from "../../components/find_a_seat/CourseSubscriptions";
import {
	requestCourse,
	requestCourseUnsubscribe,
	requestSubscribedCourses
} from "../../actions/courses";

const mapStateToProps = state => ({
	subscribedCourses: state.auth.user.notificationCourses || []
});

const mapDispatchToProps = dispatch => ({
	requestCourse(courseQuery) {
		return dispatch(requestCourse(courseQuery));
	},
	requestSubscribedCourses() {
		dispatch(requestSubscribedCourses);
	},
	unsubscribeFromCourse(courseQuery) {
		dispatch(requestCourseUnsubscribe(courseQuery));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CourseSubscriptions);
