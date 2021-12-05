import React, { useState } from "react";
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
import { FormControlLabel, Switch } from "@material-ui/core";
import AverageTemperaturButton from "./AverageTemperatureButton";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150
  }
}));

const WeatherGraphContainer = ({
  title,
  itemList,
  graphTitle,
  maxGraph,
  allLocations = []
}) => {
  const classes = useStyles();
  const [times, setTimes] = useState([null, null]);
  const [location, setLocation] = useState("helsinki");
  const [graphNum, setGraphNum] = useState(1);
  const [isTimeLong, setIsTimeLong] = useState(false);
  const [updateRealtime, setUpdateRealTime] = useState(false);

  return (
    <div className="graph-container">
      <h2>{title}</h2>
      {isTimeLong && (
        <AlertBar
          severity="Warning"
          text="Time period cannot be greater than 365 days, refine the time selections to see data"
        />
      )}
      <Grid container justify="center" alignItems="center">
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
          <Grid container item justify="center" spacing={1}>
            <Grid container item xs={6} justify="flex-end">
              <FormControl className={classes.formControl}>
                <InputLabel id="location-select-label">Location</InputLabel>
                <Select
                  labelId="location-select-label"
                  id="location-selection"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  defaultValue="helsinki"
                >
                  {allLocations.map(item => (
                    <MenuItem
                      key={`location-${item}`}
                      value={item.toLowerCase()}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid container item xs={6} justify="flex-start">
              <FormControl className={classes.formControl}>
                <InputLabel id="graph-number-select-label">
                  Number of graph
                </InputLabel>
                <Select
                  labelId="graph-number-select-label"
                  id="graph-number-selection"
                  value={graphNum}
                  onChange={e => setGraphNum(e.target.value)}
                >
                  {Array(maxGraph)
                    .fill(0)
                    .map((_item, i) => (
                      <MenuItem key={`graph-num-${i}`} value={i + 1}>
                        {i + 1}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <AverageTemperaturButton
              id="average-temperature-btn"
              location={location}
            />
          </Grid>
          <Grid item xs={12}>
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
        {Array(graphNum)
          .fill(0)
          .map((_, item) => (
            <GraphItem
              key={`weather-graph-item-${item}`}
              itemList={itemList}
              startTime={times[0]}
              endTime={times[1]}
              setTimes={setTimes}
              location={location}
              setLocation={setLocation}
              graphTitle={graphTitle}
              autoUpdate={updateRealtime}
              group="weather"
              graphNum={graphNum}
              setIsTimeLong={setIsTimeLong}
            />
          ))}
      </Grid>
    </div>
  );
};

WeatherGraphContainer.propTypes = {
  title: PropTypes.string.isRequired,
  itemList: PropTypes.object.isRequired,
  graphTitle: PropTypes.string.isRequired,
  maxGraph: PropTypes.number.isRequired,
  allLocations: PropTypes.array
};

export default WeatherGraphContainer;
