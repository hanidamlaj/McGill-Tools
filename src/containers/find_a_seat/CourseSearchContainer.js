import { connect } from "react-redux";
import CourseSearch from "../../components/find_a_seat/CourseSearch";
import { requestCourse, requestCourseSuggestions } from "../../actions/courses";
import { setSnackbar } from "../../actions/snackbar";

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
	requestCourse(courseQuery) {
		return dispatch(requestCourse(courseQuery));
	},
	requestCourseSuggestions(searchKey) {
		return dispatch(requestCourseSuggestions(searchKey));
	},
	setSnackbar(message) {
		dispatch(setSnackbar(message));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CourseSearch);
