// @flow

import type { ThunkAction, Action } from "./types.js";
import { addLoaderKey, removeLoaderKey } from "./loaders.js";
import { setSnackbarError } from "./snackbar.js";

export const BASE_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:8080"
		: "https://mcgilltools.com";

type RequestHeader = {
	"Content-Type"?: string,
	"x-access-token": string,
};

type Request = {
	headers: RequestHeader,
	method: "GET" | "POST",
	body: Object,
};

type ErrorResponse = {|
	error: true,
	message: string,
|};

// Class to interface with server API calls.
// This reduces the loads of redudancy across all
// fetch requests (i.e. handling status/request errors, headers, etc.)
// This can be further improved to reduce redudancy across application.
// TODO: implement method that returns a ThunkAction
export default class Controller {
	_url: string;
	_request: Request = {};
	_requestHeader: RequestHeader = {};

	constructor(url: string, jwtToken: string) {
		this._url = `${BASE_URL}${url}`;
		this._requestHeader["x-access-token"] = jwtToken;
	}

	// The two following setters return `this` for chaining purposes.
	setMethod(method: "POST" | "GET") {
		this._request.method = method;

		return this;
	}

	setBody(json: string) {
		if (this._request.method === "POST") {
			this._request.body = json;
			this._requestHeader["Content-Type"] = "application/json";
		}

		return this;
	}

	// Send fetch request with provided request params & headers.
	send<T: { error: false }>(): Promise<T> {
		return fetch(this._url, {
			...this._request,
			headers: { ...this._requestHeader },
		})
			.then((res) => {
				// Validate that we have received an okay from the server.
				if (!res.ok) {
					if (res.status === 401) {
						// If the token is not valid, we should throw an error with a specific message.
						// This will allow us to check and clear the token, allowing the user
						// to relogin rather than having to clear the localStorage manually.
						throw new Error("Invalid token.");
					}
					throw new Error(`An error has occurred! Status code: ${res.status}`);
				}
				return res.json();
			})
			.then((res: T | ErrorResponse) => {
				if (res.error) throw new Error(res.message);
				return res;
			});
	}
}

export class ThunkActionController extends Controller {
	_loaderKey: string = "";

	// eslint-disable-next-line no-useless-constructor
	constructor(url: string, jwtToken: string) {
		super(url, jwtToken);
	}

	addLoaderKey(key: string) {
		this._loaderKey = key;
		return this;
	}

	toThunkAction<T: { error: false }>(
		actionCreator: ((any) => Action) | void
	): ThunkAction {
		return (dispatch, getState) => {
			dispatch(addLoaderKey(this._loaderKey));
			this.send<T>()
				.then((json) => {
					if (actionCreator != null) {
						dispatch(actionCreator(json));
					}
					return json;
				})
				.catch((err: Error) => {
					dispatch(setSnackbarError(err.message));
					return err;
				})
				.finally(() => {
					dispatch(removeLoaderKey(this._loaderKey));
				});
		};
	}
}
