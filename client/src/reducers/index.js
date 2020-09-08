// @flow

import { combineReducers } from "redux";
import auth from "./auth";
import loaders from "./loaders";
import snackbar from "./snackbar";

const rootReducer = combineReducers({ auth, loaders, snackbar });

export default rootReducer;
