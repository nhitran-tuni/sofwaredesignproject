/* eslint-disable no-console */
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  Chart,
  LineSeries,
  Title,
  Legend,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
  ZoomAndPan
} from "@devexpress/dx-react-chart-material-ui";
import {
  ArgumentScale,
  ValueScale,
  HoverState,
  EventTracker
} from "@devexpress/dx-react-chart";
import { Plugin } from "@devexpress/dx-react-core";
import { scaleUtc } from "d3-scale";
import { saveAs } from "file-saver";
import * as htmlToImage from "html-to-image";
import TooltipContent from "./TooltipContent";
import deepEqual from "deep-equal";
import { TYPE_TO_UNIT } from "../utils/constants";
import { groupSelections } from "../utils/helpers";
import { Button } from "@material-ui/core";

const scales = [undefined, "second"];

const DataChart = ({ data, selections, title, unit }) => {
  const [hover, setHover] = useState(null);
  const [tooltipTarget, setTooltipTarget] = useState(null);
  const chartRef = useRef(null);

  const entries = Object.values(groupSelections(selections, TYPE_TO_UNIT));

  const makeLeftLabel = ({ text, style, ...restProps }) => (
    // TODO: change unit here
    <ValueAxis.Label
      text={`${text} ${unit[0]}`}
      style={{
        fill: "#41c0f0",
        ...style
      }}
      {...restProps}
    />
  );

  const makeRightLabel = ({ text, style, ...restProps }) => (
    // TODO: change unit here
    <ValueAxis.Label
      text={`${text} ${unit[1]}`}
      style={{
        fill: "#41c0f0",
        ...style
      }}
      {...restProps}
    />
  );

  const getToolTipComponent = props => {
    const { series, point } = props.targetItem; //eslint-disable-line
    const dateTime = data[point].time;
    const date = dateTime.toDateString();
    const time = dateTime.toLocaleTimeString("en-us", {
      timeZone: "UTC",
      hour12: true,
      timeStyle: "long"
    });

    return (
      <TooltipContent
        title={series.replaceAll("-", " ")} //eslint-disable-line
        text={props.text} //eslint-disable-line
        unit={TYPE_TO_UNIT[series]}
        date={date}
        time={time}
      />
    );
  };

  const getLegendLabel = ({ text }) => {
    return <Legend.Label text={text.replaceAll("-", " ")} />; //eslint-disable-line
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper ref={chartRef}>
          <Chart data={data}>
            <ArgumentScale factory={scaleUtc} />
            <ArgumentAxis />
            <ValueAxis labelComponent={makeLeftLabel} />
            <ValueScale name="second" />
            <ValueAxis
              scaleName="second"
              labelComponent={makeRightLabel}
              position="right"
            />
            <Plugin>
              {entries
                .map((a, i) =>
                  a.map(s => (
                    <LineSeries
                      key={`series-${s}`}
                      name={s}
                      scaleName={scales[i]}
                      valueField={s}
                      argumentField="time"
                    />
                  ))
                )
                .flat()}
            </Plugin>
            <Title text={title} />
            <EventTracker />
            <HoverState hover={hover} onHoverChange={e => setHover(e)} />
            <Tooltip
              targetItem={tooltipTarget}
              onTargetItemChange={targetItem => setTooltipTarget(targetItem)}
              contentComponent={getToolTipComponent}
            />
            <Legend labelComponent={getLegendLabel} />
            <ZoomAndPan interactionWithArguments="both" />
          </Chart>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          onClick={() => {
            const chart = chartRef.current;
            htmlToImage.toPng(chart).then(dataUrl => {
              dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
              saveAs(dataUrl, "image.png");
            });
          }}
        >
          Save this graph as image
        </Button>
      </Grid>
    </>
  );
};

const shouldUpdate = (prevProps, nextProps) =>
  deepEqual(prevProps.data, nextProps.data);

DataChart.propTypes = {
  data: PropTypes.array.isRequired,
  selections: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  unit: PropTypes.array.isRequired
};

export default React.memo(DataChart, shouldUpdate);
