import React from "react";
import PropTypes from "prop-types";
import { Alert, AlertTitle } from "@material-ui/lab";

const AlertBar = ({ severity, text }) => (
  <Alert severity={severity.toLowerCase()}>
    <AlertTitle>
      <strong>{severity}</strong>
    </AlertTitle>
    {text}
  </Alert>
);

AlertBar.propTypes = {
  severity: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default AlertBar;
