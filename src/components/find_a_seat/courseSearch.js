import React, { useState } from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
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
	suggestions: {
		flex: "1 1 100%",
		position: "relative",
		top: -30
	},
	formControl: {
		display: "block",
		margin: theme.spacing(2, 0)
	}
}));

function CourseSearch({ token }) {
	const classes = useStyles();

	// initial states of components
	const [semester, setSemester] = useState("fall-2019");
	const [courseSearch, setCourseSearch] = useState("");
	const [suggestions, setSuggestions] = useState([]);

	const handleSemesterChange = e => setSemester(e.target.value);
	const handleSearchChange = e => {
		const input = e.target.value;
		if (input.length > 4) {
			fetch(`http://localhost:8080/courses/autocomplete/${input}`, {
				headers: {
					"x-access-token": token
				}
			})
				.then(res => res.json())
				.then(res => setSuggestions(res))
				.catch(err => {
					console.error(err);
				});
		} else setSuggestions([]);
		setCourseSearch(input);
	};
	return (
		<Card>
			<CardHeader title="Subscribe To Course Notifications" />
			<CardContent>
				{/* semester selection */}
				<FormControl className={classes.formControl} component="fieldset">
					<FormLabel component="legend">Semester</FormLabel>
					<RadioGroup onChange={handleSemesterChange} value={semester}>
						<FormControlLabel
							value="fall-2019"
							control={<Radio color="primary" />}
							label="Fall 2019"
						/>
						<FormControlLabel
							value="winter-2020"
							control={<Radio color="primary" />}
							label="Winter 2020"
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
							placeholder="Add a course"
							onChange={handleSearchChange}
							value={courseSearch}
						/>
					</Paper>
					<FormHelperText>e.g. COMP273, MATH240</FormHelperText>
				</FormControl>
				{suggestions.length > 0 && (
					<Paper className={classes.suggestions} elevation={4}>
						<List>
							{suggestions.map(suggestion => (
								<ListItem button key={suggestion}>
									<ListItemText primary={suggestion} />
								</ListItem>
							))}
						</List>
					</Paper>
				)}
			</CardContent>
		</Card>
	);
}

export default CourseSearch;
