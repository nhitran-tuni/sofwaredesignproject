import React from "react";
import {
  getAverageTemperature,
  getData,
  getPowerPercentage
} from "../../services/Api";
import {
  FINGRID_AVG_GRAPH_CONTAINER_ID,
  FMI_AVG_GRAPH_CONTAINER_ID,
  GRAPH_CONTAINER_ID
} from "../../utils/constants";

const withDataSource = (WrappedComponent, id) => {
  class WithDataSource extends React.Component {
    constructor(props) {
      super(props);
    }

    getFetchFunction() {
      switch (id) {
        case GRAPH_CONTAINER_ID:
          return getData;
        case FINGRID_AVG_GRAPH_CONTAINER_ID:
          return getPowerPercentage;
        case FMI_AVG_GRAPH_CONTAINER_ID:
          return getAverageTemperature;
        default:
          return getData;
      }
    }

    render() {
      return (
        <WrappedComponent {...this.props} getData={this.getFetchFunction()} />
      );
    }
  }

  WithDataSource.displayName = `${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  }WithDataSource`;

  return WithDataSource;
};

export default withDataSource;
