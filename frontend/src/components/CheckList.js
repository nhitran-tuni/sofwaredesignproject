/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const CheckList = ({ selections, setSelections, dataMap }) => {
  const handleToggle = value => {
    const currentIndex = selections.indexOf(value);
    const newSelection =
      currentIndex === -1
        ? selections.concat(value)
        : selections.filter(sec => sec !== value);

    setSelections(newSelection);
  };

  return (
    <List className="check-list">
      {Object.keys(dataMap).map(feature => (
        <ListItem key={feature} button>
          <Checkbox
            checked={selections.indexOf(feature) > -1}
            onChange={() => handleToggle(feature)}
          />
          <ListItemText
            className="list-item-label"
            primary={dataMap[feature]}
          />
        </ListItem>
      ))}
    </List>
  );
};

CheckList.propTypes = {
  selections: PropTypes.array.isRequired,
  setSelections: PropTypes.func.isRequired,
  dataMap: PropTypes.object.isRequired
};

export default CheckList;
