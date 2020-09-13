import React from "react";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		border: "1px solid #61affe",
		backgroundColor: "#ecf6ff",
		borderRadius: "4px",
		margin: theme.spacing(2, 0),
	},
	expansionPanelSummary: {
		padding: theme.spacing(0, 1),
	},
	summaryBlockMethod: {
		backgroundColor: "#1391FF",
		"&:hover": { backgroundColor: "#1391FF" },
	},
	summaryPath: {
		color: "#3b4151",
		fontWeight: 700,
		fontFamily: "monospace",
		padding: theme.spacing(1),
		fontSize: "16px",
	},
	summaryDescription: {
		fontSize: "16px",
		fontFamily: "sans-serif",
	},
	operationDescription: {
		padding: theme.spacing(4, 3),
		"& > p": {
			fontWeight: "bold",
		},
	},
	operationSectionHeader: {
		padding: theme.spacing(2, 3),
	},
	parameterName: {
		"& > p": {
			color: "#3b4151",
		},
	},
	operationTable: {
		padding: theme.spacing(4, 3),
	},
	responseBlock: {
		width: "100%",
		padding: theme.spacing(2),
		backgroundColor: "#41444e",
		fontFamily: "monospace",
		fontWeight: 600,
		color: "white",
	},
}));

// information about the api endpoints (e.g. parameters, responses) that developers can use
const apiEndpoints = [
	{
		method: "GET",
		summaryPath: "/api/{subject}/{course}/{year}/{semester}",
		summaryDescription: "retrieves course information",
		operationDescription:
			"With a valid access token, you can retrieve course information/data",
		exampleRequest:
			"mcgilltools.com/api/comp/202/2020/winter?accessToken=19496eee-23b5-469d-be66-100bb9d8f95f",
		parameters: [
			{
				name: "subject",
				type: "string",
				description: "the course subject (e.g. COMP)",
				in: "path",
			},
			{
				name: "course",
				type: "string",
				description: "the course number (e.g. 202)",
				in: "path",
			},
			{
				name: "year",
				type: "string",
				description: "the year the course is offered (e.g. 2020)",
				in: "path",
			},
			{
				name: "semester",
				type: "string",
				description: "the semester the course is offered (e.g. FALL)",
				in: "path",
			},
			{
				name: "accessToken",
				type: "string",
				description: "the access token issued to your account",
				in: "query",
			},
		],
		response: {
			faculty: "Faculty of Science",
			subject: "COMP",
			course: "202",
			title: "Foundations of Programming",
			description:
				"Introduction to computer programming in a high level language: ...",
			sections: [
				{
					CRN: "689",
					credits: "3.0",
					type: "Lec",
					section: "001",
					instructor: "Alberini, Giulia",
					days: "TR",
					time: "14:35PM-15:55PM",
				},
			],
		},
	},
];

export default function SwaggerViewAggregate() {
	return apiEndpoints.map((ep) => (
		<Grid key={ep.summaryPath} item xs={12}>
			<SwaggerView {...ep}></SwaggerView>
		</Grid>
	));
}

/**
 * returns a swagger-like view of an endpoint
 */
function SwaggerView({
	method,
	summaryPath,
	summaryDescription,
	exampleRequest,
	operationDescription,
	parameters,
	response,
}) {
	const classes = useStyles();

	return (
		<Grid className={classes.root} item xs={12}>
			<ExpansionPanel elevation={0} style={{ backgroundColor: "transparent" }}>
				<ExpansionPanelSummary className={classes.expansionPanelSummary}>
					<Grid container alignItems="center">
						<Button
							className={classes.summaryBlockMethod}
							disableFocusRipple
							disableRipple
							style={{ color: "white", fontWeight: 700 }}
						>
							{method}
						</Button>

						<Typography className={classes.summaryPath}>
							{summaryPath}
						</Typography>
						<Typography className={classes.summaryDescription}>
							{summaryDescription}
						</Typography>
					</Grid>
				</ExpansionPanelSummary>

				<ExpansionPanelDetails style={{ padding: 0 }}>
					<Grid container>
						{/* simple divider */}
						<Grid item xs={12}>
							<Divider
								style={{ backgroundColor: "#61affe", height: "1px" }}
							></Divider>
						</Grid>

						{/* description of the endpoint */}
						<Grid className={classes.operationDescription} item xs={12}>
							<Typography>{operationDescription}</Typography>
							<Typography>example request: {exampleRequest}</Typography>
						</Grid>

						{/* parameter header */}
						<Grid item xs={12}>
							<Paper elevation={1} className={classes.operationSectionHeader}>
								Parameters
							</Paper>
						</Grid>

						{/* table to display parameters required by the endpoint parameters */}
						<Grid className={classes.operationTable} item xs={12}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell>Description</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{parameters.map((param) => (
										<TableRow key={param.name}>
											<TableCell className={classes.parameterName}>
												<Typography
													style={{ fontFamily: "monospace", fontWeight: 700 }}
												>
													{param.name}
												</Typography>
												<Typography style={{ fontSize: 12, fontWeight: 700 }}>
													{param.type}
												</Typography>
												<Typography style={{ color: "grey", fontSize: 12 }}>
													({param.in})
												</Typography>
											</TableCell>
											<TableCell>{param.description}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Grid>

						{/* parameter header */}
						<Grid item xs={12}>
							<Paper elevation={1} className={classes.operationSectionHeader}>
								Responses
							</Paper>
						</Grid>

						{/* table to display server response & codes */}
						<Grid className={classes.operationTable} item xs={12}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Code</TableCell>
										<TableCell>Description</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell>200</TableCell>
										<TableCell>
											<pre className={classes.responseBlock}>
												<code>{JSON.stringify(response, undefined, 2)}</code>
											</pre>
										</TableCell>
									</TableRow>
									{/* <TableRow>
										<TableCell>400</TableCell>
										<TableCell>
											<Typography>Bad input parameter</Typography>
										</TableCell>
									</TableRow> */}
								</TableBody>
							</Table>
						</Grid>
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</Grid>
	);
}
