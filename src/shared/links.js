/**
 * @typedef {Object} Link
 * @property {string} name the name of the link/button
 * @property {Object} icon a react element of the icon for button
 * @property {Function} handeClick callback function for when button/link is pressed
 */

/**
 * @type {Link[]} defined links
 */
export const links = [
	{
		name: "Find A Seat",
		icon: <NotificationIcon className={classes.linkIcon} />,
		handeClick() {}
	},
	{
		name: "Develop",
		icon: <CodeIcon className={classes.linkIcon} />,
		handeClick() {}
	},
	{
		name: "Join Us",
		icon: <PeopleIcon className={classes.linkIcon} />,
		handeClick() {}
	},
	{
		name: "Settings",
		icon: <SettingsIcon className={classes.linkIcon} />,
		handeClick() {}
	},
	{
		name: "Log Out",
		icon: <LogoutIcon className={classes.linkIcon} />,
		handleClick: logout
	}
];
