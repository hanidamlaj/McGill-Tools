import React, { useState } from "react";
import PropTypes from "prop-types";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: theme.spacing(4)
	},
	formGroupLabel: { alignSelf: "flex-start" },
	paper: {
		display: "flex",
		position: "relative",
		alignItems: "center",
		backgroundColor: "#DADADA",
		padding: theme.spacing(1, 1)
	},
	input: {
		flex: "1 1 100%",
		paddingLeft: theme.spacing(2),
		"& > input::placeholder": {
			color: "#333333",
			opacity: 1
		},
		"& :invalid": {
			border: "1px solid red"
		}
	},
	autoCompleteContainer: {
		flex: "1 1 100%",
		position: "relative",
		top: -30
	},
	suggestions: {
		position: "absolute",
		width: "100%"
	},
	formControl: {
		display: "block",
		margin: theme.spacing(2, 0)
	}
}));

function CourseSearch({
	handleNext,
	requestCourse,
	requestCourseSuggestions,
	setSelectedCourse
}) {
	const classes = useStyles();

	// initial states of component

	/**
	 * State to control semester input from user
	 * @type {[string, Function]}
	 */
	const [semester, setSemester] = useState("fall-2019");

	/**
	 * State to control course search input from user
	 * @type {[string, Function]}
	 */
	const [courseSearch, setCourseSearch] = useState("");

	/**
	 * State that contains autocomplete suggestions for the user
	 * @type {[ {courseCode: string, courseName: string}[], Function ]}
	 */
	const [suggestions, setSuggestions] = useState([]);

	/**
	 * State to control display of autocomplete suggestions to user
	 * @type {[boolean, Function]}
	 */
	const [showSuggestions, setShowSuggestions] = useState(false);

	/**
	 * Handles the selection of semester
	 * @param {Event} e
	 */
	const handleSemesterChange = e => setSemester(e.target.value);

	/**
	 * Handles input changes in the search feature
	 * Queries the backend for course suggestions for any input
	 * strictly greater than 4 characters.
	 * @param {Event} e
	 */
	const handleSearchChange = e => {
		const input = e.target.value;
		// only send request if string contains 5 characters
		// faculty + first number of course code (e.g. COMP2)
		if (input.length > 4) {
			requestCourseSuggestions(input).then(res => {
				if (res.error) console.error(res);
				else {
					setSuggestions(res);
					setShowSuggestions(res.length > 0 ? true : false);
				}
			});
		} else {
			setSuggestions([]);
			setShowSuggestions(false);
		}
		setCourseSearch(input);
	};

	/**
	 * handles the focus of the search feature
	 */
	const onFocus = () =>
		setShowSuggestions(suggestions.length > 0 ? true : false);

	/**
	 * handles the blur of the search feature
	 */
	const onBlur = () => setShowSuggestions(false);

	return (
		<div className={classes.root}>
			{/* semester selection */}
			<FormControl className={classes.formControl} component="fieldset">
				<FormLabel component="legend">Semester</FormLabel>
				<RadioGroup onChange={handleSemesterChange} value={semester}>
					<FormControlLabel
						className={classes.formGroupLabel}
						control={<Radio color="primary" />}
						label="Fall 2019"
						value="fall-2019"
					/>
					<FormControlLabel
						className={classes.formGroupLabel}
						control={<Radio color="primary" />}
						label="Winter 2020"
						value="winter-2020"
					/>
				</RadioGroup>
			</FormControl>

			{/* search feature */}
			<FormControl
				className={classes.formControl}
				component="fieldset"
				fullWidth
			>
				<Paper className={classes.paper} elevation={0}>
					<SearchIcon />
					<InputBase
						className={classes.input}
						onBlur={onBlur}
						onChange={handleSearchChange}
						onFocus={onFocus}
						placeholder="Add a course"
						value={courseSearch}
					/>
				</Paper>
				<FormHelperText>e.g. COMP273, MATH240</FormHelperText>
			</FormControl>
			{showSuggestions && (
				<div className={classes.autoCompleteContainer}>
					<Paper className={classes.suggestions} elevation={4}>
						<List>
							{suggestions.map(suggestion => (
								<ListItem
									button
									key={suggestion.courseCode}
									onMouseDown={() => {
										// extract faculty and courseNumber from the courseCode
										const [faculty, courseNumber] = [
											suggestion.courseCode.slice(0, 4),
											suggestion.courseCode.slice(4)
										];
										// extract semester and year from the select input
										const [_semester, year] = semester.split("-");

										// information check
										console.log(faculty, courseNumber, _semester, year);

										requestCourse({
											faculty,
											course: courseNumber,
											year,
											semester: _semester
										}).then(course => {
											if (!course.error) {
												setSelectedCourse(course);
												handleNext();
											}
											console.log(course);
										});
										// clear input and suggestions
										// setCourseSearch("");
										// setSuggestions([]);
									}}
								>
									<ListItemText
										primary={`${suggestion.courseCode} - ${
											suggestion.courseName
										}`}
									/>
								</ListItem>
							))}
						</List>
					</Paper>
				</div>
			)}
		</div>
	);
}
CourseSearch.propTypes = {
	handleNext: PropTypes.func.isRequired,
	requestCourse: PropTypes.func.isRequired,
	requestCourseSuggestions: PropTypes.func.isRequired,
	setSelectedCourse: PropTypes.func.isRequired
};

export default CourseSearch;
