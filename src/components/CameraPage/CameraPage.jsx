import React, { version, useState, useEffect } from "react";

import DeviceMenu from "./components/DeviceMenu";
import Camera from "./components/Camera";
import ControlsBar from "./components/ControlsBar/ControlsBar";
const CameraPage = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [cameraState, setCameraState] = useState(false);

  const TitleDiv = () => {
    return (
      <div className="titleDiv">
        <h1> Camera Webapp, WebRTC API</h1>
      </div>
    );
  };

  // const onDeviceSelected = (selectedDevice) => {
  //   setSelectedDevice(selectedDevice);
  // };

  // const onCameraToggle = () => {
  //   if (selectedDevice == null) {
  //     setCameraState(false);
  //     return;
  //   }
  //   setCameraState(!cameraState);
  //   console.log(`show Camera State: ${cameraState}`);
  // };
  
  
  // const renderCamera = () => {
  //   if (selectedDevice != null && cameraState) {
  //     return <Camera deviceId={selectedDevice} />;
  //   }
  // };



  return (
    <div className="CameraPage">
      {TitleDiv()}
      {/* <DeviceMenu onDeviceSelected={onDeviceSelected} /> */}

      {/* <ControlsBar onCameraToggle={onCameraToggle} cameraState={cameraState} /> */}
      {/* {renderCamera()} */}
      <Camera/>
    </div>
  );
};

export default CameraPage;
