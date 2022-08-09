import React, { useRef, useState, useEffect } from "react";
import { useUserMedia } from "./UserUserMedia";

const Camera = (deviceId) => {

  const videoRef = useRef();

  

  let cameraW = 1280;
  let cameraH = 720;
  let cameraFR = 25;

  const constraints = {
    audio: false,
    video: true
  };


  var camera1Options = {
    // audio: false,
    // video: { facingMode: "environment" },
    audio: false,
    video: {
      deviceId: deviceId.deviceId,
      width: { min: 100, ideal: cameraW, max: 1920 },
      height: { min: 100, ideal: cameraH, max: 1080 },
      frameRate: { ideal: cameraFR },
    },
  };

    const mediaStream = useUserMedia(constraints);
   


  
 
  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
    window.stream = mediaStream;

  }

  function handleCanPlay() {
    videoRef.current.play();
  }

  return (
    <>
      <div>Camera</div>
      <video  onCanPlay={handleCanPlay} id="local-video" width="520"  height="340" autoPlay playsInline muted>
        
      </video>
    </>
  );
};

export default Camera;
