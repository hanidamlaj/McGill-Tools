import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./containers/appContainer";

import { Provider } from "react-redux";
import configureStore from "./configureStore";
import throttle from "lodash.throttle";
import { saveState, loadState } from "./localStorage";

const store = configureStore(loadState());

store.subscribe(
	throttle(() => {
		saveState(store.getState());
	}, 1000)
);

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById("root")
);
