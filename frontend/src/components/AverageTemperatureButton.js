import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {
  FaThermometerFull,
  FaThermometerHalf,
  FaThermometerEmpty
} from "react-icons/fa";
import withDataSource from "./wrapper/withDataSource";
import {
  AVG_MAX_TEMP_MONTH,
  AVG_MIN_TEMP_MONTH,
  AVG_TEMP_MONTH,
  FMI_AVG_GRAPH_CONTAINER_ID
} from "../utils/constants";

const AverageTemperaturButton = ({ location, getData }) => {
  const avgTypes = [
    {
      type: AVG_TEMP_MONTH,
      icon: <FaThermometerHalf style={{ color: "#ffcc00", fontSize: 30 }} />,
      name: "Average Temperature",
      value: 0.0
    },
    {
      type: AVG_MAX_TEMP_MONTH,
      icon: <FaThermometerFull style={{ color: "#dd0000", fontSize: 30 }} />,
      name: "Average Maximum Temperature",
      value: 0.0
    },
    {
      type: AVG_MIN_TEMP_MONTH,
      icon: <FaThermometerEmpty style={{ color: "#1b85b8", fontSize: 30 }} />,
      name: "Average Minimum Temperature",
      value: 0.0
    }
  ];
  const unit = "\xB0C.";
  const date = new Date();
  const maxDate = new Date(date.getFullYear(), date.getMonth(), 0);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (!selectedDate || selectedDate > maxDate) return;
    getData({
      startTime: new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      ),
      endTime: new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
      ),
      types: avgTypes.map(item => item.type),
      location
    }).then(res => {
      setData(
        avgTypes.map(item => {
          return { ...item, value: res[item.type] };
        })
      );
    });
  }, [selectedDate]);

  const handleShow = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleShow}>
        Show average Temperature
      </Button>
      <Dialog
        disableEnforceFocus
        aria-labelledby="average-temperature-dialog"
        open={open}
        fullWidth={true}
      >
        <DialogTitle id="average-temperature-title">
          Average Temperature
        </DialogTitle>
        <DialogContent>
          <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid item xs={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  views={["year", "month"]}
                  label="Year and Month"
                  maxDate={maxDate}
                  value={selectedDate}
                  onChange={setSelectedDate}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={9}>
              <List className="average-temperature-list">
                {data.map(item => (
                  <ListItem key={item.type}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography style={{ fontSize: 30 }}>
                          {!item.value
                            ? item.value
                            : `${item.value.toFixed(2)} ${unit}`}
                        </Typography>
                      }
                      secondary={item.name}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AverageTemperaturButton.propTypes = {
  location: PropTypes.string,
  getData: PropTypes.func.isRequired
};

export default withDataSource(
  AverageTemperaturButton,
  FMI_AVG_GRAPH_CONTAINER_ID
);
