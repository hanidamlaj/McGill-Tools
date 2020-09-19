import { connect } from "react-redux";
import ScheduleBuilder from "../../components/schedule_builder/ScheduleBuilder";
import { requestCourse } from "../../actions/courses"

const mapStateToProps = state => ({ user: state.auth.user });

const mapDispatchToProps = dispatch => ({
    requestCourse(courseQuery) {
		return dispatch(requestCourse(courseQuery));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ScheduleBuilder);