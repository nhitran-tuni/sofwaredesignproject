/* eslint-disable no-console */
import React, { useState } from "react";
import "./App.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PowerGraphContainer from "./components/PowerGraphContainer";
import WeatherGraphContainer from "./components/WeatherGraphContainer";
import TabPanel from "./components/TabPanel";
import {
  POWER_SELECTION_TITLES,
  WEATHER_SELECTION_TITLES,
  LOCATIONS
} from "./utils/constants";
import CombineGraphContainer from "./components/CombineGraphContainer";

const App = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <div id="logo"></div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Electricity" />
        <Tab label="Weather" />
        <Tab label="Combine" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <PowerGraphContainer
          title="Power Data"
          itemList={POWER_SELECTION_TITLES}
          graphTitle="Electricity"
          maxGraph={3}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WeatherGraphContainer
          title="Weather Data"
          itemList={WEATHER_SELECTION_TITLES}
          graphTitle="Weather"
          maxGraph={3}
          allLocations={LOCATIONS}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CombineGraphContainer
          title="Combine Data"
          itemList={{ ...POWER_SELECTION_TITLES, ...WEATHER_SELECTION_TITLES }}
          graphTitle="Combination"
          allLocations={LOCATIONS}
        />
      </TabPanel>
    </div>
  );
};

export default App;
