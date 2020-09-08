import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

// import loggerMiddleware from "./middleware/logger";
import rootReducer from "./reducers";

export default function configureStore(preloadedState) {
	const middlewares = [thunkMiddleware];
	// const middlewares = [loggerMiddleware, thunkMiddleware];
	const middlewareEnhancer = applyMiddleware(...middlewares);
	const store = createStore(rootReducer, preloadedState, middlewareEnhancer);

	return store;
}
