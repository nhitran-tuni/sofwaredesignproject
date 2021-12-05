import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import { deletePreferenceById } from "../../services/Api";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const DropDownList = ({
  preferences,
  selectedPreference,
  setSelectedPreference,
  setPreferences
}) => {
  const [open, setOpen] = React.useState(false);

  const onNonePreferenceClick = () => {
    setSelectedPreference({});
  };

  const handleChange = event => {
    event.stopPropagation();
    const selectedPreferId = event.target.value;
    if (selectedPreferId === "" && preferences.length !== 0) {
      onNonePreferenceClick();
    } else {
      setSelectedPreference(
        preferences.find(pref => pref.id === selectedPreferId)
      );
    }
  };

  const onDeleteButtonClick = event => {
    event.stopPropagation();
    if (selectedPreference.id === event.target.value) {
      onNonePreferenceClick();
    }
    deletePreferenceById({ id: event.target.value }).then(res =>
      setPreferences(preferences.filter(item => item.id !== res.id))
    );
  };

  return (
    <div>
      <FormControl className="form-control" style={{ minWidth: 200 }}>
        <InputLabel id="controlled-open-select-label">Save Data</InputLabel>
        <Select
          labelId="controlled-open-select-label"
          id="controlled-open-select"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          onChange={handleChange}
          defaultValue=""
          inputProps={{
            style: { width: 50, overflow: "hidden", textOverflow: "ellipsis" }
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {preferences.map(item => (
            <Tooltip
              title={
                <>
                  <Typography>{item.name}</Typography>
                  <em>{`Description: ${item.description}`}</em>
                </>
              }
              key={item.id}
              value={item.id}
            >
              <MenuItem key={item.id}>
                <Grid container>
                  <Grid container item justify="flex-start" xs={10}>
                    {item.name}
                  </Grid>
                  <Grid container item justify="flex-end" xs={2}>
                    <button
                      id="delete-save-btn"
                      value={item.id}
                      onClick={onDeleteButtonClick}
                    >
                      X
                    </button>
                  </Grid>
                </Grid>
              </MenuItem>
            </Tooltip>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

DropDownList.propTypes = {
  preferences: PropTypes.array.isRequired,
  setSelectedPreference: PropTypes.func.isRequired,
  setPreferences: PropTypes.func.isRequired,
  selectedPreference: PropTypes.object.isRequired
};

export default DropDownList;
