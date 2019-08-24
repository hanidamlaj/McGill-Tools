import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AppContainer from "./containers/AppContainer";

import { Provider } from "react-redux";
import configureStore from "./configureStore";
import throttle from "lodash.throttle";
import { saveState, loadState } from "./localStorage";

const store = configureStore(loadState());

store.subscribe(
	throttle(() => {
		const { auth } = store.getState();
		saveState({ auth });
	}, 1000)
);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<AppContainer />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
