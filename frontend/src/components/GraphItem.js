/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import CheckList from "./CheckList";
import DataChart from "./DataChart";
import withDataSource from "./wrapper/withDataSource";
import { parseTimeFromResponse, getTimePeriodInDay } from "../utils/helpers";
import { GRAPH_CONTAINER_ID, TYPE_TO_UNIT } from "../utils/constants";
import AlertBar from "./AlertBar";
import SaveDataContainer from "./SaveDataContainer";
import LoadingIndicator from "./LoadingIndicator";
import { getPreferenceById } from "../services/Api";

const GraphItem = ({
  itemList,
  getData,
  startTime,
  endTime,
  setTimes,
  location = "",
  setLocation,
  graphTitle,
  autoUpdate,
  group,
  graphNum,
  setIsTimeLong = () => {}
}) => {
  const [data, setData] = useState([]);
  const [selections, setSelections] = useState([]);
  const [unit, setUnit] = useState([]);
  const [timerId, setTimerId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState({});

  const setUnitArray = types => {
    const newUnitArray = types.map(t => TYPE_TO_UNIT[t]);
    const uniqueUnits = [...new Set(newUnitArray)];
    setUnit(uniqueUnits);
    return uniqueUnits.length;
  };

  const updateData = () => {
    if (getTimePeriodInDay(startTime, endTime) > 365) {
      setIsTimeLong(true);
      return;
    } else {
      setIsTimeLong(false);
    }

    if (!selections.length || startTime === endTime) {
      setUnit([]);
      setData([]);
      return;
    }

    if (isSelectionPreferenceSame()) {
      updatePreference();
    } else {
      const uniqueUnitsLength = setUnitArray(selections);
      if (uniqueUnitsLength <= 2) {
        setIsLoading(true);
        getData({
          startTime,
          endTime,
          selections,
          location
        }).then(res => {
          setData(parseTimeFromResponse(res));
          setTimeout(() => {
            setIsLoading(false);
          }, 150);
        });
      }
    }
  };

  const updatePreference = () => {
    const selectedTypes = selectedPreference.descriptor.types;
    const selectionPreference = selections.filter(
      selection => !selectedTypes.includes(selection)
    );
    if (setUnitArray(selections) <= 2 && selectionPreference.length > 0) {
      setIsLoading(true);
      getData({
        startTime,
        endTime,
        selections: selectionPreference,
        location
      }).then(res => {
        setData(
          parseTimeFromResponse(selectedPreference.data).concat(
            parseTimeFromResponse(res)
          )
        );
        setTimeout(() => {
          setIsLoading(false);
        }, 150);
      });
    }
  };

  const isSelectionPreferenceSame = () => {
    return (
      Object.keys(selectedPreference).length !== 0 &&
      location === selectedPreference.descriptor.location &&
      startTime.getTime() ===
        new Date(selectedPreference.startTime).getTime() &&
      endTime.getTime() === new Date(selectedPreference.endTime).getTime()
    );
  };

  useEffect(() => {
    if (Object.keys(selectedPreference).length === 0) {
      return;
    }
    getPreferenceById({ id: selectedPreference.id }).then(res => {
      setSelectedPreference(res);
      setSelections(res.descriptor.types);
      setTimes([new Date(res.startTime), new Date(res.endTime)]);
      setLocation && setLocation(res.descriptor.location);
      setData(parseTimeFromResponse(res.data));
    });
  }, [selectedPreference.id]);

  useEffect(() => {
    updateData();
  }, [selections, location, startTime, endTime]);

  useEffect(() => {
    if (autoUpdate) {
      setTimerId(setInterval(updateData, 180000));
    } else {
      clearInterval(timerId);
    }
  }, [autoUpdate]);

  return (
    <Grid
      container
      item
      justify="center"
      alignItems="center"
      spacing={2}
      xs={12}
    >
      {unit.length > 2 && (
        <Grid item xs={12}>
          <AlertBar
            severity="Warning"
            text="Cannot select more than two units in one graph"
          />
        </Grid>
      )}
      <LoadingIndicator text="Loading..." open={isLoading} />
      {(!graphNum || graphNum === 1) && (
        <Grid container item alignItems="center" spacing={3} xs={12}>
          <SaveDataContainer
            group={group}
            location={location}
            startTime={startTime}
            endTime={endTime}
            data={data}
            selections={selections}
            selectedPreference={selectedPreference}
            setSelectedPreference={setSelectedPreference}
          />
        </Grid>
      )}
      <Grid item xs={3}>
        <CheckList
          selections={selections}
          setSelections={setSelections}
          dataMap={itemList}
        />
      </Grid>
      <Grid item xs={9}>
        <DataChart
          data={data}
          selections={selections}
          title={graphTitle}
          unit={unit}
        />
      </Grid>
    </Grid>
  );
};

GraphItem.propTypes = {
  itemList: PropTypes.object.isRequired,
  getData: PropTypes.func.isRequired,
  startTime: PropTypes.object,
  endTime: PropTypes.object,
  setTimes: PropTypes.func.isRequired,
  location: PropTypes.string,
  setLocation: PropTypes.func,
  graphTitle: PropTypes.string.isRequired,
  autoUpdate: PropTypes.bool.isRequired,
  setIsTimeLong: PropTypes.func,
  group: PropTypes.string.isRequired,
  graphNum: PropTypes.number
};

export default withDataSource(GraphItem, GRAPH_CONTAINER_ID);
