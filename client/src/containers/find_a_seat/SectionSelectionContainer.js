import { connect } from "react-redux";
import SectionSelection from "../../components/find_a_seat/SectionSelection";
import {
	requestSectionSubscribe,
	requestSectionUnsubscribe
} from "../../actions/courses";

const mapStateToProps = state => ({
	subscribedSections: state.auth.user.subscribedSections || []
});

const mapDispatchToProps = dispatch => ({
	requestSectionSubscribe(courseQuery) {
		dispatch(requestSectionSubscribe(courseQuery));
	},
	unsubscribeFromSection(courseQuery) {
		dispatch(requestSectionUnsubscribe(courseQuery));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SectionSelection);
