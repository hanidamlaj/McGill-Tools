import { connect } from "react-redux";
import App from "../components/App";

const mapStateToProps = state => ({
	token: state.auth.token,
	loaders: state.loaders
});

export default connect(
	mapStateToProps,
	null
)(App);
