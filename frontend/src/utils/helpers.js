import { timeFormat, timeParse } from "d3-time-format";
import { POWER_GROUP, WEATHER_GROUP } from "./constants";

export const toISOStringWithoutMiliSec = date =>
  timeFormat("%Y-%m-%dT%H:%M:%SZ")(date);

export const parseTimeFromResponse = res =>
  res.map(r => ({
    ...r,
    time: new Date(r.time)
  }));

export const parseToDate = str => timeParse("%Y-%m-%dT%H:%M")(str);

export const getTimePeriodInDay = (d1, d2) => {
  const date1 = d1 || new Date();
  const date2 = d2 || new Date();

  return (date2 - date1) / 86400000;
};

export const groupSelections = (selections, groupMap) => {
  const result = {};
  selections.forEach(s => {
    const group = groupMap[s];
    if (result[group]) {
      result[group].push(s);
    } else {
      result[group] = [s];
    }
  });

  return result;
};

export const getRequestDescriptor = (selections, location, groupMap) => {
  const groupToTypes = groupSelections(selections, groupMap);

  return Object.entries(groupToTypes).map(([group, types]) => {
    switch (group) {
      case POWER_GROUP:
        return { group, types };
      case WEATHER_GROUP:
        return { group, types, location };
      default:
        return { group, types };
    }
  });
};
