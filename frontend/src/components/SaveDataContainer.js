import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import DropDownList from "./save-data-components/DropDownList";
import FormDialog from "./save-data-components/FormDialog";
import PropTypes from "prop-types";
import { getAllPreferences } from "../services/Api";

const SaveDataContainer = ({
  group,
  location,
  startTime,
  endTime,
  data,
  selections,
  selectedPreference,
  setSelectedPreference
}) => {
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    getAllPreferences().then(res => {
      setPreferences(res.filter(item => item.group === group));
    });
  }, []);

  return (
    <>
      <Grid container item justify="flex-end" xs={6}>
        <DropDownList
          preferences={preferences}
          setPreferences={setPreferences}
          selectedPreference={selectedPreference}
          setSelectedPreference={setSelectedPreference}
        />
      </Grid>
      <Grid container item justify="flex-start" xs={6}>
        <FormDialog
          group={group}
          location={location}
          preferences={preferences}
          setPreferences={setPreferences}
          startTime={startTime}
          endTime={endTime}
          data={data}
          selections={selections}
        />
      </Grid>
    </>
  );
};

SaveDataContainer.propTypes = {
  group: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  startTime: PropTypes.object,
  endTime: PropTypes.object,
  data: PropTypes.array.isRequired,
  selections: PropTypes.array.isRequired,
  selectedPreference: PropTypes.object,
  setSelectedPreference: PropTypes.func
};

export default SaveDataContainer;
