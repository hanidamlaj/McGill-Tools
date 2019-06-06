import { combineReducers } from "redux";
import auth from "./auth";
import loaders from "./loaders";

const mtoolsApp = combineReducers({ auth, loaders });

export default mtoolsApp;
