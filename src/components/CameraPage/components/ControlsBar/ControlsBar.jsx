import React from "react";
import Button from "@mui/material/Button";
import "./ControlsBar.css";
const ControlsBar = ({ onCameraToggle, cameraState }) => {
  return (
    <>
      <div className="controlsBar">
        <Button
          variant="contained"
          size="small"
          color= {cameraState == true? "secondary": "primary"}
          onClick={onCameraToggle }
        >
          {cameraState == true ? "Stop Recording" : "Start Recording"}
        </Button>
      </div>
    </>
  );
};

export default ControlsBar;
