import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "@devexpress/dx-react-chart-material-ui";

const tooltipContentTitleStyle = {
  fontWeight: "bold",
  paddingBottom: 0
};
const tooltipContentBodyStyle = {
  paddingTop: 0
};

const TooltipContent = props => {
  const {title, text, unit, date, time } = props; //eslint-disable-line
  return (
    <div>
      <Tooltip.Content style={tooltipContentTitleStyle} text={title} />
      <Tooltip.Content
        style={tooltipContentBodyStyle}
        text={`${text} ${unit}`}
      />
      {date && time && (
        <>
          <Tooltip.Content style={tooltipContentBodyStyle} text={date} />
          <Tooltip.Content style={tooltipContentBodyStyle} text={time} />
        </>
      )}
    </div>
  );
};

TooltipContent.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  unit: PropTypes.string.isRequired,
  date: PropTypes.string,
  time: PropTypes.string
};

export default React.memo(TooltipContent);
