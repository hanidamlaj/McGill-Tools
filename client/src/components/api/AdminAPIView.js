// @flow

import React from "react";
import { useEffect, useState, useMemo } from "react";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";

import Controller from "../../actions/Controller";
import type { AccessTokenRequest, ApplicationStatus } from "./API";

const useStyles = makeStyles((theme) => ({}));

type Props = {
	fetchAccessTokenApplications: () => Promise<Array<AccessTokenRequest>>,
	approveAccessTokenApplication: (uid: string) => Promise<void>,
};

const ACTIONS = ["approve", "reject"];

function statusPrecedence(status: ApplicationStatus) {
	switch (status) {
		case "pending":
			return 1;
		case "rejected":
			return 2;
		case "approved":
			return 3;
		default:
			return 4;
	}
}

function applicationComparator(a: AccessTokenRequest, b: AccessTokenRequest) {
	return statusPrecedence(a.status) - statusPrecedence(b.status);
}

export default function AdminAPIView({
	fetchAccessTokenApplications,
	approveAccessTokenApplication,
}: Props) {
	const classes = useStyles();

	const [applications, setApplications] = useState<Array<AccessTokenRequest>>(
		[]
	);

	// On component mount, fetch all applications for API access.
	// "approved", "pending" or "rejected".
	useEffect(() => {
		fetchAccessTokenApplications().then((res) => {
			if (!(res instanceof Error)) {
				setApplications(res);
			}
		});
	}, []);

	return (
		<Card>
			<CardHeader title="Access Token Requests" />
			<Grid className={classes.root} item xs={12}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Email</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Purpose</TableCell>
							<TableCell>Date</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{/* Sort by ascending order of "pending", "rejected" and "approved". */}
						{applications.sort(applicationComparator).map((application) => (
							<TableRow key={application.email}>
								<TableCell>{application.email}</TableCell>
								<TableCell>{application.name}</TableCell>
								<TableCell>{application.purpose}</TableCell>
								<TableCell>{application.date}</TableCell>
								<TableCell>{application.status}</TableCell>
								<TableCell>
									{/* Rejecting tokens has not been implemented yet. */}
									<Button disabled>Reject</Button>
									<Button
										disabled={application.status === "approved"}
										color="primary"
										onClick={() => {
											approveAccessTokenApplication(application.uid ?? "");
										}}
									>
										Approve
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Grid>
		</Card>
	);
}
