import { connect } from "react-redux";
import CourseSubscriptions from "../../components/find_a_seat/CourseSubscriptions";
import {
	requestCourse,
	requestSectionUnsubscribe,
	requestSubscribedSections
} from "../../actions/courses";

const mapStateToProps = state => ({
	subscribedSections: state.auth.user.notificationCourses || []
});

const mapDispatchToProps = dispatch => ({
	requestCourse(courseQuery) {
		return dispatch(requestCourse(courseQuery));
	},
	requestSubscribedSections() {
		dispatch(requestSubscribedSections);
	},
	requestSectionUnsubscribe(courseQuery) {
		dispatch(requestSectionUnsubscribe(courseQuery));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CourseSubscriptions);
