import redis = require("redis");
import rp = require("request-promise");

import admin from "./firebase";
import { AutoCompleteData, Course, CourseQuery, UserInfo } from "./types";
import { courseToString } from "../scripts";

// extract environment variables
const redis_url = process.env["REDIS_URL"];
const worker_url = process.env["worker_url"];

// connect to redis client
const client = redis.createClient({
	url: redis_url || "redis://127.0.0.1:6379/0",
});
client.on("connect", function () {
	console.log("redis connected.");
});

// All methods that interact with the database are implemented here.
abstract class Database {
	// private variable declaration
	private static db = admin.firestore();
	private static coursesCollection = Database.db.collection("courses");
	private static courseDetailsCollection = Database.db.collection(
		"courseDetails"
	);
	private static usersCollection = Database.db.collection("users");
	private static apiRequests = Database.db.collection("apiRequests");
	private static accessTokens = Database.db.collection("accessTokens");

	// public API

	/**
	 * Creates an application for api access and ties it to the given uid
	 * @param uid unique id of the user
	 * @param {name: string, purpose: string} requestData
	 */
	public static async createAPITokenRequest(
		uid: string,
		requestData: { name: string; purpose: string }
	) {
		// Get user with associated uid.
		const user: UserInfo = await this.getUser(uid);

		// Retrieve document from apiRequests collection indexed by uid.
		const docRef = this.apiRequests.doc(uid);
		const doc = await docRef.get();

		// If document does not exist, create an entry.
		if (!doc.exists) {
			const docData = { email: user.email, status: "pending", ...requestData };
			await docRef.set(docData);
			return docData;
		}

		return doc.data();
	}

	/**
	 * Returns the status of the application for api access.
	 * @param {string} uid unique id of the user
	 */
	public static async getAPITokenRequestStatus(uid: string): Promise<object> {
		// create docRef and fetch it
		const docRef = this.apiRequests.doc(uid);
		const doc = await docRef.get();

		// return the status if it exists, null status otherwise
		return doc.exists ? doc.data() : { status: null };
	}

	/**
	 * Approves the application for api access and associates the token with user.
	 * @param {string} uid unique id of the user
	 * @param {string} token the api access token signed by the server
	 * @
	 */
	public static async approveTokenRequest(uid: string, accessToken: string) {
		// Create docRef for the api request.
		const docRef = this.apiRequests.doc(uid);

		// Update the status of the request to approved.
		await docRef.update({ status: "approved", accessToken });

		// Create a new entry in AccessTokens collection and link the application filled for this token.
		await this.accessTokens
			.doc(accessToken)
			.set({ accessToken, requestRef: docRef });
	}

	// Verify access token for /api endpoint.
	public static async verifyAccessToken(accessToken: string) {
		// create docRef for the api request
		const docRef = this.accessTokens.doc(accessToken);

		// fetch document data
		const data = await docRef.get();

		if (!data.exists) throw Error("Invalid access token!");
		return;
	}

	/**
	 * Subscribes a user to the provided section.
	 * @param {string} uid unique id of the user
	 * @param {CourseQuery} course details of the section the user wishes to subscribe to
	 * @returns {void}
	 */
	public static async subscribeUserToSection(
		uid: string,
		{ subject, course, year, semester, section }: CourseQuery
	): Promise<string[]> {
		// query user profile
		const docRef = this.usersCollection.doc(uid);

		// string id (string representation) of course & section
		const sectionId = [subject, course, year, semester, section]
			.join("_")
			.toUpperCase();

		try {
			// retrieve user profile to verify if phoneNumber is valid
			const updatedUser = await docRef.get();
			const { subscribedSections, phoneNumber } = updatedUser.data();

			if (!phoneNumber)
				throw new Error("Invalid number! Cannot subscribe user to section.");

			// add the section to the user's profile
			await docRef.update({
				subscribedSections: admin.firestore.FieldValue.arrayUnion(sectionId),
			});

			// add to the set of all subscribed courses
			client.sadd("subscribedSections", sectionId);

			//
			const updatedSubscribedSections = new Set([
				...subscribedSections,
				sectionId,
			]);

			return [...updatedSubscribedSections.values()];
		} catch (err) {
			throw err;
		}
	}

	/**
	 * returns a list of auto-suggested courses given a string (i.e. autocomplete feature)
	 * @param {string} str user input to match against potential course codes (e.g. COMP2, MATH24)
	 */
	public static async autocomplete(str: string): Promise<AutoCompleteData[]> {
		try {
			const query = await this.coursesCollection
				.where("courseCode", ">=", str)
				.where("courseCode", "<=", str.padEnd(9, "Z"))
				.limit(5)
				.get();

			return Promise.resolve(
				query.docs.map((doc) => <AutoCompleteData>doc.data())
			);
		} catch (err) {
			throw { error: err.message || err.toString() };
		}
	}

	/**
	 * method to retrieve the profile of a given user
	 * @param {string} uid unique user id
	 * @returns {UserInfo} information belonging to user
	 */
	public static async getUser(uid: string): Promise<UserInfo> {
		// get reference to document of uid
		const docRef = this.usersCollection.doc(uid);
		try {
			// fetch the reference/doc
			const userDoc = await docRef.get();
			return userDoc.exists ? <UserInfo>userDoc.data() : null;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * method to handle user login
	 * –– returns the user if they exist, otherwise creates a new profile for the user ––
	 * @param uid unique user id
	 */
	public static async login(uid: string): Promise<UserInfo> {
		try {
			let user: UserInfo = await this.getUser(uid);
			// if the user does not exist, create
			if (!user) {
				// retrieves data from the sign-in provider and defaults the remaining values to empty
				const {
					displayName = "",
					email = "",
					photoURL = "",
					phoneNumber = "",
				}: admin.auth.UserRecord = await admin.auth().getUser(uid);

				// retrieves data from the sign-in provider and defaults the remaining values to empty
				user = {
					uid,
					displayName,
					email,
					photoURL,
					phoneNumber,
					subscribedSections: [],
				};
				await this.usersCollection.doc(uid).set(user);
			}

			return user;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * queries course information either from cache or real-time
	 * @param {CourseQuery} queryParams course query data
	 * @param {boolean} forceRefresh boolean flag to force real-time data refresh
	 */
	public static async queryCourse(
		queryParams: CourseQuery,
		forceRefresh: boolean = false
	): Promise<Course> {
		if (forceRefresh) return this.addCourseDetails(queryParams);
		else {
			const course: Course = await this.getCourseFromDB(queryParams);
			return course ? course : await this.addCourseDetails(queryParams);
		}
	}

	/**
	 * unsubscribes a user from notifications regarding this course
	 * @param uid the unique user id
	 * @param course data to identify the course to be unsubscribed
	 */
	public static async removeNotificationCourse(
		uid: string,
		{ subject, course, year, semester, section }: CourseQuery
	): Promise<string[]> {
		const docRef = this.usersCollection.doc(uid);
		const sectionId = [subject, course, year, semester, section]
			.join("_")
			.toUpperCase();
		try {
			await docRef.update({
				subscribedSections: admin.firestore.FieldValue.arrayRemove(sectionId),
			});
			const updatedUser = await docRef.get();
			const updatedSubscribedSections: string[] = updatedUser.data()
				.subscribedSections;

			// TODO: skip the extra read query by adding this query to previously returned result
			return updatedSubscribedSections;
		} catch (err) {
			throw { error: err.message || err.toString() };
		}
	}

	/**
	 *
	 * @param uid uid of user
	 * @param data user data to update
	 */
	public static async updateUser(
		uid: string,
		data: UserInfo
	): Promise<UserInfo> {
		const docRef = this.usersCollection.doc(uid);
		try {
			await docRef.update(data);
			const updatedData = await docRef.get();
			return <UserInfo>updatedData.data();
		} catch (err) {
			throw { error: err.message || err.toString() };
		}
	}

	// private API
	/**
	 * retrieves course from firestore db, returns null if not present
	 * @param {CourseQuery} courseQuery query data
	 * @returns {Course} details of the course
	 */
	private static async getCourseFromDB(
		courseQuery: CourseQuery
	): Promise<Course> {
		const key = courseToString(courseQuery);
		try {
			const doc = await this.courseDetailsCollection.doc(key).get();
			const needsRenew =
				!doc.exists ||
				new Date().getTime() -
					(doc.data().updated as admin.firestore.Timestamp).toMillis() >
					300000;
			return needsRenew ? null : <Course>{ ...doc.data(), updated: undefined };
		} catch (err) {
			throw { error: err.message || err.toString() };
		}
	}

	/**
	 * retrieves the details for a given course and adds it to the database
	 * @param {CourseQuery} courseQuery query data
	 * @returns {Course} the course added
	 */
	private static async addCourseDetails({
		course,
		subject,
		semester,
		year,
	}: CourseQuery): Promise<Course> {
		const key: string = courseToString({ course, subject, year, semester });

		// send parameters to uppercase
		course = course.toUpperCase();
		subject = subject.toUpperCase();
		semester = semester.toUpperCase();
		year = year.toUpperCase();

		return rp({
			uri: `${worker_url}/${subject}/${course}/${year}/${semester}`,
			json: true,
		})
			.then((course) => {
				this.courseDetailsCollection.doc(key).set({
					...course,
					updated: admin.firestore.FieldValue.serverTimestamp(),
				});
				return course;
			})
			.catch((err) => {
				return err;
			});
	}
}

export default Database;
