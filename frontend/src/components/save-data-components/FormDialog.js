import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { updatePreferenceById, addPreference } from "../../services/Api";

const FormDialog = ({
  group,
  location,
  preferences,
  setPreferences,
  startTime,
  endTime,
  data,
  selections
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const initializeState = () => {
    setName("");
    setDescription("");
  };

  const handleClose = () => {
    setOpen(false);
    initializeState();
  };

  const handleSaveButtonClick = () => {
    const savePreferenceObject = {
      name: name.trim() !== "" ? name.trim() : new Date().toISOString(),
      description: description.trim(),
      startTime: !startTime ? new Date() : startTime,
      endTime: !endTime ? new Date() : endTime,
      group,
      descriptor: { types: selections, location: location },
      data
    };
    if (preferences.some(item => item.name === name.trim())) {
      const savedPreference = preferences.find(
        item => item.name === name.trim()
      );
      updatePreferenceById({
        id: savedPreference.id,
        newPreferenceObject: savePreferenceObject
      })
        .then(res =>
          setPreferences(
            preferences.map(item => (item.id === res.id ? res : item))
          )
        )
        // eslint-disable-next-line no-console
        .catch(error => console.log(error));
      setOpen(false);
    } else {
      addPreference({ savePreferenceObject: savePreferenceObject })
        .then(res => setPreferences(preferences.concat(res)))
        // eslint-disable-next-line no-console
        .catch(error => console.log(error));
      initializeState();
      setOpen(false);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Save
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Save Data</DialogTitle>
        <DialogContent>
          <DialogContentText>Add name for saved data below</DialogContentText>
          <TextField
            autoFocus
            id="name-input"
            margin="dense"
            label="Name"
            onChange={event => setName(event.target.value)}
            inputProps={{ maxLength: 20 }}
            fullWidth
          />
          <DialogContentText>Add description (optinonal)</DialogContentText>
          <TextField
            id="description-input"
            label="Description"
            onChange={event => setDescription(event.target.value)}
            multiline
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveButtonClick} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

FormDialog.propTypes = {
  group: PropTypes.string.isRequired,
  location: PropTypes.string,
  preferences: PropTypes.array.isRequired,
  setPreferences: PropTypes.func.isRequired,
  startTime: PropTypes.object,
  endTime: PropTypes.object,
  data: PropTypes.array,
  selections: PropTypes.array.isRequired
};

export default FormDialog;
