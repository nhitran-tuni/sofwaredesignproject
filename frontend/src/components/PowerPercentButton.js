import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  PieSeries,
  Title,
  Legend,
  Tooltip
} from "@devexpress/dx-react-chart-material-ui";
import { HoverState, EventTracker } from "@devexpress/dx-react-chart";
import { FINGRID_AVG_GRAPH_CONTAINER_ID } from "../utils/constants";
import withDataSource from "./wrapper/withDataSource";
import TooltipContent from "./TooltipContent";
import LoadingIndicator from "./LoadingIndicator";

export const SERIES = [
  "Nuclear production",
  "Hydro production",
  "Wind production",
  "Other types"
];

const PowerPercentButton = ({ times, getData }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [hover, setHover] = useState(null);
  const [tooltipTarget, setTooltipTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getToolTipComponent = ({ text, targetItem }) => {
    return (
      <TooltipContent title={SERIES[targetItem.point]} text={text} unit="%" />
    );
  };

  const getLegendLabel = ({ text }) => {
    return <Legend.Label text={text.replaceAll("-", " ")} />;
  };

  const handleShowAverage = () => {
    setIsLoading(true);
    getData({
      startTime: times[0],
      endTime: times[1]
    }).then(res => {
      const preprocess = res.map(item => {
        return item.type === "others" ? { ...item, type: "Other types" } : item;
      });
      setData(preprocess);
      setOpen(true);
      setIsLoading(false);
    });
  };

  return (
    <div>
      <LoadingIndicator text="Loading..." open={isLoading} />
      <Button variant="contained" onClick={handleShowAverage} color="primary">
        Show percentage
      </Button>
      <Dialog aria-labelledby="percentage-title" open={open} fullWidth={true}>
        <DialogTitle id="percentage-dialog-title">
          Power production percentage
        </DialogTitle>
        <DialogContent>
          <Paper>
            <Chart data={data}>
              <PieSeries
                valueField="total"
                argumentField="type"
                name="power-percentage"
              >
                <Title text="Power production" />
              </PieSeries>
              <EventTracker />
              <HoverState hover={hover} onHoverChange={e => setHover(e)} />
              <Tooltip
                targetItem={tooltipTarget}
                onTargetItemChange={targetItem => setTooltipTarget(targetItem)}
                contentComponent={getToolTipComponent}
              />
              <Legend labelComponent={getLegendLabel} />
            </Chart>
          </Paper>
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

PowerPercentButton.propTypes = {
  times: PropTypes.array.isRequired,
  getData: PropTypes.func.isRequired
};

export default withDataSource(
  PowerPercentButton,
  FINGRID_AVG_GRAPH_CONTAINER_ID
);
