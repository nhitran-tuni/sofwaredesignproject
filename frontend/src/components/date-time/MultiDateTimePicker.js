import React from "react";
import PropTypes from "prop-types";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";

const MultiDateTimePicker = ({ labelList, times, setTimeData }) => {
  const setTimeAtIndex = (idx, data) => {
    const newTimes = times.map((t, i) => (i === idx ? data : t));
    setTimeData(newTimes);
  };

  return (
    <>
      {labelList.map((label, i) => (
        <Grid item key={`date-time-${i}`} xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              key={`date-time-picker-subwidget-${i}`}
              variant="inline"
              label={label}
              value={times[i]}
              onChange={data => setTimeAtIndex(i, data)}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      ))}
    </>
  );
};

const shouldUpdate = (prevProps, nextProps) =>
  nextProps.times.every((t, i) => t === prevProps.times[i]);

MultiDateTimePicker.propTypes = {
  labelList: PropTypes.array.isRequired,
  times: PropTypes.array,
  setTimeData: PropTypes.func.isRequired
};

export default React.memo(MultiDateTimePicker, shouldUpdate);
