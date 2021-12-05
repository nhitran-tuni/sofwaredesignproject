import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import MultiDateTimePicker from "./date-time/MultiDateTimePicker";
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  makeStyles
} from "@material-ui/core";
import GraphItem from "./GraphItem";
import AlertBar from "./AlertBar";
import { getTimePeriodInDay } from "../utils/helpers";
import { FormControlLabel, Switch } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150
  }
}));

const CombineGraphContainer = ({
  title,
  itemList,
  graphTitle,
  allLocations
}) => {
  const classes = useStyles();
  const [times, setTimes] = useState([null, null]);
  const [location, setLocation] = useState("helsinki");
  const [isTimeLong, setIsTimeLong] = useState(false);
  const [updateRealtime, setUpdateRealTime] = useState(false);

  useEffect(() => {
    if (getTimePeriodInDay(times[0], times[1]) > 365) {
      setIsTimeLong(true);
      return;
    } else {
      setIsTimeLong(false);
    }
  }, [times, location]);

  return (
    <div className="graph-container">
      <h2>{title}</h2>
      {isTimeLong && (
        <AlertBar
          severity="Warning"
          text="Time period cannot be greater than 365 days, refine the time selections to see data"
        />
      )}
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid
          container
          item
          direction="column"
          alignItems="center"
          xs={12}
          spacing={1}
        >
          <MultiDateTimePicker
            labelList={["Start time", "End time"]}
            times={times}
            setTimeData={setTimes}
          />
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel id="location-select-label">Location</InputLabel>
              <Select
                labelId="location-select-label"
                id="location-selection"
                value={location}
                onChange={e => setLocation(e.target.value)}
              >
                {allLocations.map(item => (
                  <MenuItem key={`location-${item}`} value={item.toLowerCase()}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={updateRealtime}
                  onChange={() => setUpdateRealTime(!updateRealtime)}
                />
              }
              label="Update data real time"
            />
          </Grid>
        </Grid>
        <GraphItem
          itemList={itemList}
          startTime={times[0]}
          endTime={times[1]}
          setTimes={setTimes}
          location={location}
          setLocation={setLocation}
          graphTitle={graphTitle}
          autoUpdate={updateRealtime}
          group="combine"
        />
      </Grid>
    </div>
  );
};

CombineGraphContainer.propTypes = {
  title: PropTypes.string.isRequired,
  itemList: PropTypes.object.isRequired,
  graphTitle: PropTypes.string.isRequired,
  allLocations: PropTypes.array.isRequired
};

export default CombineGraphContainer;
