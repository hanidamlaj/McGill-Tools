import { combineReducers } from "redux";
import auth from "./auth";

const mtoolsApp = combineReducers({ auth });

export default mtoolsApp;
