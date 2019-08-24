import { combineReducers } from "redux";
import auth from "./auth";
import loaders from "./loaders";
import snackbar from "./snackbar";

const mtoolsApp = combineReducers({ auth, loaders, snackbar });

export default mtoolsApp;
