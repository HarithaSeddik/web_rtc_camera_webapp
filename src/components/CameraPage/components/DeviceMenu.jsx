import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

//This component uses the Navigator API to fetch the video devices an make a selection.
// Then pass the selected device through a callback to parent class (component)
function DeviceMenu({ onDeviceSelected }) {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [devicesList, setDevicesList] = useState([]);

  var noop = function () {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
  };

  async function checkCameraPermisson(permissionName, descriptor) {
    let promptCameraPermission;
    try {
      let permission = await navigator.permissions.query(
        Object.assign({ name: permissionName }, descriptor)
      );

      console.log(`${permissionName}'s Permission state: ${permission.state}`);
      if (permission.state == "prompt") {
        console.log("should...  prompt camera permission!");
        promptCameraPermission = true;
        return promptCameraPermission;
      } else {
        console.log("shouldnt... prompt camera permission!!!!!");
        promptCameraPermission = false;
        return promptCameraPermission;
      }
    } catch (e) {
      console.log(`${permissionName}'s Permission error: ${e}`);
    }
    return promptCameraPermission;
  }

  const requestUserMediaPermission = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(
      { video: true },
      noop,
      function (err) {
        console.log("---");
        console.log("# Inside Error Callback");
        console.log(err);
      }
    );
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
  };

  const getHardwareDevices = async () => {
    const tempDeviceList = [];

    let promptCameraPermission = await checkCameraPermisson("camera");
    console.log(
      `from getHardwareDevice()... shouldPromptCameraPermission:${promptCameraPermission}`
    );

    if (promptCameraPermission) {
      console.log("im gonna ask for permission now.. ");
      await requestUserMediaPermission();
    }

    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      devices.forEach(function (device) {
        if (device.kind == "videoinput") {
          tempDeviceList.push(device);
          console.log(
            device.kind + ": " + device.label + " id = " + device.deviceId
          );
        }
      });
      setDevicesList(tempDeviceList);
    });
  };

  useEffect(() => {
    if (devicesList.length > 0) return;
    getHardwareDevices();
  }, [devicesList]);

  return (
    <div className="deviceMenuContainer">
      <div className="deviceMenuDropdown">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">SELECT DEVICE</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedDevice}
            label="selected device"
            onChange={(event) => {
              setSelectedDevice(event.target.value);
               console.log(`selected device: ${event.target.value}`);
              onDeviceSelected(event.target.value);
            }}
          >
            {devicesList.map((device, i) => (

              <MenuItem value={device.deviceId} key={i} >
                {device.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default DeviceMenu;
