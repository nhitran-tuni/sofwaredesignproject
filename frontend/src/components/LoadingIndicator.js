import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

const LoadingIndicator = ({ text, open }) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <Grid container alignItems="center" direction="column" spacing={2}>
        <Grid item>
          <CircularProgress color="inherit" />
        </Grid>
        <Grid item>{text}</Grid>
      </Grid>
    </Backdrop>
  );
};

LoadingIndicator.propTypes = {
  text: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired
};

export default LoadingIndicator;
