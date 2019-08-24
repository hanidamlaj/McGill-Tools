import { connect } from "react-redux";
import FindASeat from "../../components/find_a_seat/FindASeat";

const mapStateToProps = state => ({ user: state.auth.user });

const mapDispatchToProps = null;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FindASeat);
