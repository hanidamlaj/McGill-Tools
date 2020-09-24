// @flow

import React from "react";

import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  hidden: {
    height: 1,
    visibility: "hidden",
  },
  section: {
    display: "flex",
    justifyContent: "center",

    [theme.breakpoints.up("lg")]: {
      "&:nth-child(2)": {
        marginTop: theme.spacing(8),
      },
      // alternate background colours
      "&:nth-child(even)": {
        backgroundColor: "white",
      },
    },

    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(4, 0),
      "&:nth-child(2)": {
        marginTop: theme.spacing(10),
      },
      width: "100%",
    },
  },
  sectionButton: {
    [theme.breakpoints.up("lg")]: {
      width: "40%",
    },

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  sectionContent: {
    display: "flex",
    position: "relative",
    // transform section title to uppercase letters
    "& h3": {
      textTransform: "uppercase",
      [theme.breakpoints.down("md")]: {
        fontSize: 22,
        textAlign: "center",
      },
    },

    [theme.breakpoints.up("lg")]: {
      flexWrap: "wrap",
      width: "80%",
      maxWidth: 1800,
      padding: theme.spacing(8),
    },

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "90%",
      maxWidth: 400,
      backgroundColor: "white",
      padding: theme.spacing(4),
      borderRadius: 25,
      boxShadow: [theme.shadows["8"]],
    },
  },
  sectionImageContainer: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  sectionImageOuter: {
    display: "flex",
    position: "relative",
    paddingTop: "71%",
  },
  sectionImage: {
    boxSizing: "border-box",
    position: "absolute",
    display: "block",
    left: "0px",
    top: "0px",
    width: "100%",
    height: "100%",
    padding: theme.spacing(4),
  },
  chipContainer: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
    },

    [theme.breakpoints.up("lg")]: {
      position: "absolute",
      top: 16,
      right: 16,
      "& > div": {
        width: 200,
      },
    },
  },
  sectionText: {
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(8, 0),
      "& > p": { fontSize: "24px" },
      color: "black",
    },

    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2, 0),
      "& > p": {
        fontSize: 16,
        color: "rgba(0, 0, 0, 0.6)",
        textAlign: "center",
      },
      color: "black",
    },
  },
}));

type Section = {
  buttonText: string,
  imgSrc: string,
  sectionBodyText: Array<string>,
  sectionId: string,
  sectionTitle: string,
  comingSoon?: boolean,
};

const sectionsData: Array<Section> = [
  {
    buttonText: "Get Started",
    imgSrc: "/static/images/notification.svg",
    sectionBodyText: [
      "Are you tired of constantly refreshing Minerva to see if a seat has become available?",
      "If so, sign up to get notified immediately!",
    ],
    sectionId: "find_a_seat",
    sectionTitle: "Find A Seat",
  },
  {
    buttonText: "Get Prepping",
    comingSoon: true,
    imgSrc: "/static/images/mcworks.png",
    sectionBodyText: [
      "McWorks is our online system designed to aide students and employers through \
      recruiting process. Login to find a job, schedule interviews and connect!",
    ],
    sectionId: "mcworks",
    sectionTitle: "McWorks",
  },
  {
    buttonText: "Get Coding",
    comingSoon: true,
    imgSrc: "/static/images/developer.svg",
    sectionBodyText: [
      "Are you interested in building your own tools for the McGill community?",
      "Register now and obtain an access token to leverage our existing APIs such as querying course data!",
    ],
    sectionId: "developers",
    sectionTitle: "Developers",
  },
  {
    buttonText: "Start Innovating",
    comingSoon: true,
    imgSrc: "/static/images/community.svg",
    sectionBodyText: [
      "If you’re interested in joining our mission to innovate for the community, we would love to hear from you!",
    ],
    sectionId: "join_us",
    sectionTitle: "Join Us",
  },
];

type SingleSectionProps = {
  classes: { [string]: string },
  section: Section,
  index: number,
  isSmallDevice: boolean,
  handleClick: () => void,
};

/**
 * React component that returns a single section of the landing page
 */
function SingleSection({
  classes,
  handleClick,
  index,
  isSmallDevice,
  section,
}: SingleSectionProps) {
  // half of the section that contains text
  const description = (
    <Grid item lg={6} xs={12}>
      <Typography className={classes.sectionTitle} variant='h3'>
        {section.sectionTitle}
      </Typography>
      <div className={classes.sectionText}>
        {section.sectionBodyText.map((text) => (
          <Typography gutterBottom key={text} variant='body1'>
            {text}
          </Typography>
        ))}
      </div>
      <Button
        className={classes.sectionButton}
        color='primary'
        onClick={handleClick}
        variant='outlined'
      >
        {section.buttonText}
      </Button>
    </Grid>
  );

  // other half of section that contains the image
  const image = (
    <Grid className={classes.sectionImageContainer} item lg={6} xs={12}>
      <div className={classes.sectionImageOuter}>
        <img alt='' className={classes.sectionImage} src={section.imgSrc} />
      </div>
    </Grid>
  );

  return (
    <div
      className={classes.section}
      id={section.sectionId}
      key={section.sectionId}
    >
      <div className={classes.sectionContent}>
        {section.comingSoon && (
          <div className={classes.chipContainer}>
            <Chip label='Coming Soon' variant='outlined'></Chip>
          </div>
        )}
        {isSmallDevice || index % 2 !== 0 ? (
          <React.Fragment>
            {image} {description}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {description} {image}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

type AggregateSectionsProps = {
  handleClick: () => void,
  isSmallDevice: boolean,
};

/**
 * React component that returns the aggregate of all sections
 */
function AggregateSections(props: AggregateSectionsProps) {
  const classes = useStyles();

  // react element for the sections
  return (
    <>
      {sectionsData.map((section, index) => (
        <SingleSection
          {...props}
          classes={classes}
          index={index}
          key={section.sectionId}
          section={section}
        />
      ))}
      {/* for bottom margin purposes */}
      <div className={classes.hidden}></div>
    </>
  );
}

export default AggregateSections;
