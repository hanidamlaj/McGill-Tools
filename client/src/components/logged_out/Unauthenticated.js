// @flow

import * as React from 'react';

import Divider from '@material-ui/core/Divider';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import AggregateSections from './AggregateSections';
import ContinueWithDialog from './ContinueWithDialog';

import { SmallViewAppbar, BigViewAppbar } from './Navbar';

import { IsSmallContext } from '../../shared';

import firebase from './../../firebase';

/**
 * firebase authentication providers (Google and Facebook)
 */
const GOOGLE_PROVIDER = new firebase.auth.GoogleAuthProvider();
const FACEBOOK_PROVIDER = new firebase.auth.FacebookAuthProvider();
FACEBOOK_PROVIDER.addScope('email');

const useStyles = makeStyles((theme) => ({
        navbarContainer: {
                [theme.breakpoints.up('lg')]: {
                        paddingTop: theme.spacing(8),
                },

                [theme.breakpoints.down('md')]: {
                        paddingTop: theme.spacing(10),
                },
        },
        footer: {
                padding: theme.spacing(2),
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

function Unauthenticated(props: UnauthenticatedProps) {
        const {
                addLoaderKey,
                history,
                isLoading,
                login,
                removeLoaderKey,
                setSnackbarError,
        } = props;

        const classes = useStyles();

        const isSmallDevice = React.useContext(IsSmallContext);

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
         * handles authentication based on chosen provider
         * implemented using redirect for small devices and popup for desktop
         * @param {Object} provider the identity provider
         */
        function handleAuth(provider) {
                setContinueWithProvider(false);
                addLoaderKey('beginAuth');

                if (isSmallDevice) {
                        history.push(
                                `/auth/${provider.providerId.replace(
                                        '.com',
                                        '',
                                )}`,
                        );
                } else
                        firebase.auth()
                                .signInWithPopup(provider)
                                .then(async (result) => {
                                        if (result.user) {
                                                const idToken = await result.user.getIdToken(
                                                        true,
                                                );
                                                login(idToken);
                                        }
                                })
                                .catch((err) => {
                                        if (
                                                err.code ===
                                                'auth/account-exists-with-different-credential'
                                        ) {
                                                setSnackbarError(
                                                        'This email address is already in use with another sign-in method.',
                                                );
                                        }
                                })
                                .finally(() => {
                                        removeLoaderKey('beginAuth');
                                });
        }

        /**
         * handle authentication with specified providers
         */
        function handleGoogleAuth() {
                handleAuth(GOOGLE_PROVIDER);
        }

        function handleFacebookAuth() {
                handleAuth(FACEBOOK_PROVIDER);
        }

        return (
                !isLoading && (
                        <>
                                {/* continue with provider dialog*/}
                                <ContinueWithDialog
                                        fullWidth
                                        handleFacebookAuth={handleFacebookAuth}
                                        handleGoogleAuth={handleGoogleAuth}
                                        maxWidth="xs"
                                        onClose={handleDialogClose}
                                        open={continueWithProvider}
                                />
                                {/*
                    Top navigation bar for both desktop and mobile.
                    We wrap component in box with paddingTop to
                    account for height of AppBar.
                */}
                                <div className={classes.navbarContainer}>
                                        {isSmallDevice ? (
                                                <SmallViewAppbar
                                                        handleGetStarted={
                                                                handleGetStarted
                                                        }
                                                />
                                        ) : (
                                                <BigViewAppbar
                                                        handleGetStarted={
                                                                handleGetStarted
                                                        }
                                                />
                                        )}
                                </div>

                                {/* feature sections */}
                                <AggregateSections
                                        handleClick={handleGetStarted}
                                />
                                <Divider variant="fullWidth" />

                                <Grid container className={classes.footer}>
                                        <Grid item xs={12}>
                                                <Typography
                                                        align="center"
                                                        variant="body2"
                                                >
                                                        <Link
                                                                href="https://mail.google.com/mail/?view=cm&fs=1&to=mcgilltools@gmail.com"
                                                                target="_blank"
                                                        >
                                                                © 2020 McGill
                                                                Tools | Hani
                                                                Damlaj
                                                        </Link>
                                                </Typography>
                                        </Grid>
                                </Grid>
                        </>
                )
        );
}

export default Unauthenticated;
