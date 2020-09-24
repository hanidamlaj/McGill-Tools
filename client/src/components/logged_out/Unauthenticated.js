// @flow

/* eslint-disable no-unused-expressions */

import * as React from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import CodeIcon from "@material-ui/icons/Code";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationIcon from "@material-ui/icons/NotificationsActive";
import PeopleIcon from "@material-ui/icons/People";
import SignInIcon from "@material-ui/icons/VpnKey";

import AggregateSections from "./AggregateSections";
import ContinueWithDialog from "./ContinueWithDialog";

import { IsSmallContext } from "../../shared";

import firebase from "./../../firebase";

const useStyles = makeStyles((theme) => ({
    // navigation bar styles
    appbar: {
        backgroundColor: "white",
        left: 0,
        right: 0,
    },
    toolbar: {
        position: "relative",
        display: "flex",
        alignItems: "center",

        [theme.breakpoints.up("lg")]: {
            padding: theme.spacing(0, 8),
            justifyContent: "end",
        },

        [theme.breakpoints.down("md")]: {
            padding: theme.spacing(0, 2),
            justifyContent: "center",
        },
    },
    menuIcon: {
        [theme.breakpoints.up("lg")]: {
            display: "none",
        },

        [theme.breakpoints.down("md")]: {
            display: "block",
            position: "absolute",
            left: theme.spacing(2),
        },
    },
    logo: {
        fontSize: 24,
        fontFamily: "Pacifico, cursive",
        textTransform: "uppercase",
        color: "black",
    },
    links: {
        [theme.breakpoints.up("lg")]: {
            display: "flex",
            justifyContent: "flex-end",
            padding: theme.spacing(0, 4),
            flex: 1,
            "& > button": {
                marginRight: 32,
            },
        },

        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
    signIn: {
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
    footer: {
        padding: theme.spacing(2, 2),
        "& > p": {
            margin: theme.spacing(0, 1),
        },
    },
}));

type UnauthenticatedProps = {
    addLoaderKey: (string) => void,
    history: Object,
    isLoading: boolean,
    login: (string) => Promise<void>,
    removeLoaderKey: (string) => void,
    setSnackbarError: (string) => void,
};

function Unauthenticated({
    addLoaderKey,
    history,
    isLoading,
    login,
    removeLoaderKey,
    setSnackbarError,
}: UnauthenticatedProps) {
    const classes = useStyles();

    const isSmallDevice = React.useContext(IsSmallContext);

    /**
     * state of the navigation bar for mobile
     * @type {[boolean], Function}
     */
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    /**
     * the id of the dom element to scroll to
     * due to the limitations of scrolling when mobile drawer is open
     */
    const [scrollIntoView, setScrollIntoView] = React.useState<string>("");

    React.useEffect(() => {
        if (scrollIntoView) {
            // optional chaining not supported by flow
            // document
            // 	.getElementById(scrollIntoView)
            // 	?.scrollIntoView({ behavior: "smooth", block: "center" });

            const el = document.getElementById(scrollIntoView);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [scrollIntoView]);

    /**
     * controls the state of the modal that allows user to continue with preferred provider
     */
    const [
        continueWithProvider,
        setContinueWithProvider,
    ] = React.useState<boolean>(false);

    // handles clicks to get users started
    function handleGetStarted() {
        setContinueWithProvider(true);
    }

    // handles closing dialogs when user clicks away
    function handleDialogClose() {
        setContinueWithProvider(false);
    }

    /**
     * firebase authentication providers (Google and Facebook)
     */
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    facebookProvider.addScope("email");

    /**
     * handles authentication based on chosen provider
     * implemented using redirect for small devices and popup for desktop
     * @param {Object} provider the identity provider
     */
    function handleAuth(provider) {
        setContinueWithProvider(false);
        addLoaderKey("beginAuth");

        if (isSmallDevice) {
            history.push(`/auth/${provider.providerId.replace(".com", "")}`);
        } else
            firebase
                .auth()
                .signInWithPopup(provider)
                .then(async (result) => {
                    if (result.user) {
                        const idToken = await result.user.getIdToken(true);
                        login(idToken);
                    }
                })
                .catch((err) => {
                    if (
                        err.code ===
                        "auth/account-exists-with-different-credential"
                    ) {
                        setSnackbarError(
                            "This email address is already in use with another sign-in method."
                        );
                    }
                })
                .finally(() => {
                    removeLoaderKey("beginAuth");
                });
    }

    /**
     * handle authentication with specified providers
     */
    function handleGoogleAuth() {
        handleAuth(googleProvider);
    }

    function handleFacebookAuth() {
        handleAuth(facebookProvider);
    }

    /**
     * array of tuples containing [buttonName, targetSectionId, icon]
     */
    const menuButtons: Array<[string, string, React.MixedElement]> = [
        ["find a seat", "find_a_seat", <NotificationIcon />],
        ["McWorks", "mcworks", <NotificationIcon />],
        ["developers", "developers", <CodeIcon />],
        ["join us", "join_us", <PeopleIcon />],
    ];

    return (
        !isLoading && (
            <React.Fragment>
                {/* continue with provider dialog*/}
                <ContinueWithDialog
                    fullWidth
                    handleFacebookAuth={handleFacebookAuth}
                    handleGoogleAuth={handleGoogleAuth}
                    maxWidth='xs'
                    onClose={handleDialogClose}
                    open={continueWithProvider}
                />
                {/* top navigation bar for both desktop and mobile */}
                <div className={classes.root}>
                    <AppBar className={classes.appbar} position='fixed'>
                        <Toolbar className={classes.toolbar}>
                            <IconButton
                                className={classes.menuIcon}
                                onClick={() => setNavbarOpen(!navbarOpen)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography className={classes.logo}>
                                mcgill tools
                            </Typography>
                            <div className={classes.links}>
                                {menuButtons.map((arr) => (
                                    <Button
                                        className={classes.menuButton}
                                        key={arr[1]}
                                        onClick={() =>
                                            setScrollIntoView(arr[1])
                                        }
                                    >
                                        {arr[0]}
                                    </Button>
                                ))}
                            </div>
                            <div className={classes.signIn}>
                                <Button
                                    color='primary'
                                    onClick={handleGetStarted}
                                    variant='outlined'
                                >
                                    Sign In
                                </Button>
                            </div>
                        </Toolbar>
                    </AppBar>

                    <Drawer
                        anchor='top'
                        className={classes.drawer}
                        open={navbarOpen}
                        onClose={() => setNavbarOpen(false)}
                    >
                        <div className={classes.list}>
                            <List>
                                {menuButtons.map((item) => (
                                    <ListItem
                                        button
                                        key={item[1]}
                                        onClick={() => {
                                            setNavbarOpen(false);
                                            setScrollIntoView(item[1]);
                                        }}
                                    >
                                        <ListItemIcon>{item[2]}</ListItemIcon>
                                        <ListItemText
                                            primaryTypographyProps={{
                                                variant: "button",
                                            }}
                                        >
                                            {item[0]}
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                            <Divider />
                            <List>
                                <ListItem
                                    button
                                    onClick={() => {
                                        setNavbarOpen(false);
                                        setContinueWithProvider(true);
                                    }}
                                >
                                    <ListItemIcon>
                                        <SignInIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primaryTypographyProps={{
                                            color: "primary",
                                            variant: "button",
                                        }}
                                    >
                                        Sign In
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                </div>
                {/* feature sections */}
                <AggregateSections
                    handleClick={handleGetStarted}
                    isSmallDevice={isSmallDevice}
                />
                <Divider variant='fullWidth'></Divider>
                <Grid container className={classes.footer}>
                    <Grid item xs={12}>
                        <Typography align='center' variant='body2'>
                            <Link
                                href='https://mail.google.com/mail/?view=cm&fs=1&to=mcgilltools@gmail.com'
                                target='_blank'
                            >
                                © 2020 McGill Tools | Hani Damlaj
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    );
}

export default Unauthenticated;
