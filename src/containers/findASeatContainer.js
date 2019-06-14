import { connect } from "react-redux";
import FindASeat from "../components/find_a_seat/findASeat";
import { requestCourse, requestCourseSuggestions } from "../actions/courses";

const mapStateToProps = state => ({
	token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
	requestCourse(courseQuery) {
		return dispatch(requestCourse(courseQuery));
	},
	requestCourseSuggestions(searchKey) {
		return dispatch(requestCourseSuggestions(searchKey));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FindASeat);
