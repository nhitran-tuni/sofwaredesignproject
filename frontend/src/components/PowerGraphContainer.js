import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import MultiDateTimePicker from "./date-time/MultiDateTimePicker";
import AlertBar from "./AlertBar";
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  makeStyles
} from "@material-ui/core";
import PowerPercentButton from "./PowerPercentButton";
import { FormControlLabel, Switch } from "@material-ui/core";
import GraphItem from "./GraphItem";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150
  }
}));

const PowerGraphContainer = ({ title, itemList, graphTitle, maxGraph }) => {
  const classes = useStyles();
  const [times, setTimes] = useState([null, null]);
  const [updateRealtime, setUpdateRealTime] = useState(false);
  const [isTimeLong, setIsTimeLong] = useState(false);
  const [graphNum, setGraphNum] = useState(1);

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
          <Grid item>
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
          <Grid item>
            <PowerPercentButton id="power-percentage-btn" times={times} />
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
        {Array(graphNum)
          .fill(0)
          .map((_, item) => (
            <GraphItem
              key={`power-graph-item-${item}`}
              itemList={itemList}
              startTime={times[0]}
              endTime={times[1]}
              setTimes={setTimes}
              graphTitle={graphTitle}
              autoUpdate={updateRealtime}
              group="power"
              graphNum={graphNum}
              setIsTimeLong={setIsTimeLong}
            />
          ))}
      </Grid>
    </div>
  );
};

PowerGraphContainer.propTypes = {
  title: PropTypes.string.isRequired,
  itemList: PropTypes.object.isRequired,
  graphTitle: PropTypes.string.isRequired,
  maxGraph: PropTypes.number.isRequired
};

export default PowerGraphContainer;
