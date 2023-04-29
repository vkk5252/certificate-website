import * as React from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Status = ({ type }) => {
  const { icon, color } = {
    "Sent": {
      icon: <CheckCircleOutlineIcon />,
      color: "green"
    },
    "Not sent": {
      icon: <HighlightOffIcon />,
      color: "red"
    }
  }[type];

  return (
    <div className="status" style={{color: color}}>
      {icon}
      &nbsp;
      {type}
    </div>
  );
};

export default Status;