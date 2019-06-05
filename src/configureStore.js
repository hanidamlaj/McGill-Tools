import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import loggerMiddleware from "./middleware/logger";
import rootReducer from "./reducers";

export default function configureStore(preloadedState) {
	const middlewares = [loggerMiddleware, thunkMiddleware];
	const middlewareEnhancer = applyMiddleware(...middlewares);

	// const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
	// const composedEnhancers = compose(...enhancers)

	const store = createStore(rootReducer, preloadedState, middlewareEnhancer);

	return store;
}
