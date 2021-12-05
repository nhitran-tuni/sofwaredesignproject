export const SERVER_URL = "http://localhost:3001";

export const GRAPH_CONTAINER_ID = "graph-container";
export const FINGRID_AVG_GRAPH_CONTAINER_ID = "fingrid-avg-graph-container";
export const FMI_AVG_GRAPH_CONTAINER_ID = "fmi-avg-graph-container";

export const POWER_GROUP = "power";
export const WEATHER_GROUP = "weather";

export const ELECTRICITY_CONSUMPTION_TYPE = "electricity-consumption";
export const ELECTRICITY_FORECAST_TYPE = "electricity-forecast";
export const TENTATIVE_PRODUCTION_PREDICTION_TYPE =
  "tentative-production-prediction";
export const ELECTRICITY_PRODUCTION_TYPE = "electricity-production";
export const WIND_FORECAST_TYPE = "wind-forecast";
export const NUCLEAR_PRODUCTION_TYPE = "nuclear-production";
export const HYDRO_PRODUCTION_TYPE = "hydro-production";

export const TEMPERATURE_TYPE = "temperature";
export const TEMPERATURE_FORECAST_TYPE = "predicted-temperature";
export const OBSERVED_WIND_TYPE = "observed-wind";
export const PREDICTED_WIND_TYPE = "predicted-wind";
export const OBSERVED_CLOUDINESS_TYPE = "observed-cloudiness";

export const AVG_TEMP_MONTH = "average-temperature";
export const AVG_MAX_TEMP_MONTH = "average-temperature-max";
export const AVG_MIN_TEMP_MONTH = "average-temperature-min";

export const POWER_SELECTION_TITLES = {
  [ELECTRICITY_CONSUMPTION_TYPE]: "Electricity consumption in Finland",
  [ELECTRICITY_FORECAST_TYPE]:
    "Electricity consumption forecast for the next 24 hours",
  [TENTATIVE_PRODUCTION_PREDICTION_TYPE]:
    "A tentative production prediction for the next 24 hours as hourly energy",
  [ELECTRICITY_PRODUCTION_TYPE]: "Electricity production in Finland",
  [WIND_FORECAST_TYPE]: "Wind power production forecast",
  [NUCLEAR_PRODUCTION_TYPE]: "Nuclear power production",
  [HYDRO_PRODUCTION_TYPE]: "Hydro power production"
};

export const WEATHER_SELECTION_TITLES = {
  [TEMPERATURE_TYPE]: "Temperature",
  [OBSERVED_WIND_TYPE]: "Observed wind",
  [OBSERVED_CLOUDINESS_TYPE]: "Observed cloudiness",
  [PREDICTED_WIND_TYPE]: "Predicted wind",
  [TEMPERATURE_FORECAST_TYPE]: "Predicted temperature"
};

export const GROUP_MAP = {
  [ELECTRICITY_CONSUMPTION_TYPE]: POWER_GROUP,
  [ELECTRICITY_FORECAST_TYPE]: POWER_GROUP,
  [TENTATIVE_PRODUCTION_PREDICTION_TYPE]: POWER_GROUP,
  [ELECTRICITY_PRODUCTION_TYPE]: POWER_GROUP,
  [WIND_FORECAST_TYPE]: POWER_GROUP,
  [NUCLEAR_PRODUCTION_TYPE]: POWER_GROUP,
  [HYDRO_PRODUCTION_TYPE]: POWER_GROUP,
  [TEMPERATURE_TYPE]: WEATHER_GROUP,
  [OBSERVED_WIND_TYPE]: WEATHER_GROUP,
  [OBSERVED_CLOUDINESS_TYPE]: WEATHER_GROUP,
  [PREDICTED_WIND_TYPE]: WEATHER_GROUP,
  [TEMPERATURE_FORECAST_TYPE]: WEATHER_GROUP
};

export const TYPE_TO_UNIT = {
  [ELECTRICITY_CONSUMPTION_TYPE]: "MWh/h",
  [ELECTRICITY_FORECAST_TYPE]: "MWh/h",
  [TENTATIVE_PRODUCTION_PREDICTION_TYPE]: "MWh/h",
  [ELECTRICITY_PRODUCTION_TYPE]: "MWh/h",
  [WIND_FORECAST_TYPE]: "MWh/h",
  [NUCLEAR_PRODUCTION_TYPE]: "MWh/h",
  [HYDRO_PRODUCTION_TYPE]: "MWh/h",
  [TEMPERATURE_TYPE]: "\xB0C",
  [TEMPERATURE_FORECAST_TYPE]: "\xB0C",
  [OBSERVED_WIND_TYPE]: "m/s",
  [PREDICTED_WIND_TYPE]: "m/s",
  [OBSERVED_CLOUDINESS_TYPE]: "/ 8"
};

export const LOCATIONS = [
  "Helsinki",
  "Tampere",
  "Pirkkala",
  "Turku",
  "Oulu",
  "Vaasa",
  "Lappeenranta"
];

export const FINGRID_AVG_TYPES = [
  "nuclear-production",
  "hydro-production",
  "wind-production",
  "electricity-production"
];
