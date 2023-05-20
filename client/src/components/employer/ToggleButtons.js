import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ToggleButtons = ({ timePeriod, setTimePeriod }) => {
  const handleTimePeriod = (event, newTimePeriod) => {
    if (newTimePeriod !== null) {
      setTimePeriod(newTimePeriod);
    }
  };

  return (
    <div className="toggle-button">
      <ToggleButtonGroup
        value={timePeriod}
        exclusive
        onChange={handleTimePeriod}
        aria-label="text"
      >
        <ToggleButton value="week" aria-label="">
          Week
        </ToggleButton>
        <ToggleButton value="2 weeks" aria-label="">
          2 Weeks
        </ToggleButton>
        <ToggleButton value="month" aria-label="">
          Month
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default ToggleButtons;