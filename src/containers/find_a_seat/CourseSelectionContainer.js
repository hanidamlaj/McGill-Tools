import { connect } from "react-redux";
import CourseSelection from "../../components/find_a_seat/CourseSelection";
import {
	requestCourseSubscribe,
	requestCourseUnsubscribe
} from "../../actions/courses";

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
	subscribeToCourse(courseQuery) {
		dispatch(requestCourseSubscribe(courseQuery));
	},
	unsubscribeFromCourse(courseQuery) {
		dispatch(requestCourseUnsubscribe(courseQuery));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CourseSelection);
