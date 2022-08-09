import { useState, useEffect } from "react";

export function useUserMedia(requestedMedia) {
  const [mediaStream, setMediaStream] = useState(null);

  navigator.getUserMedia =
    navigator.mediaDevices.getUserMedia ||
    navigator.mediaDevices.mozGetUserMedia ||
    navigator.mediaDevices.msGetUserMedia ||
    navigator.mediaDevices.webkitGetUserMedia;

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          requestedMedia
        );
        setMediaStream(stream);
        const localVideo = document.getElementById("local-video");
        console.log(`[FROM USEUSERMEDIA] ${localVideo}`)
        if (localVideo) {
          console.log(`[FROM USEUSERMEDIA] ${localVideo}`)
                localVideo.srcObject = stream;
              }

      } catch (err) {
                console.log(`Error while fetching media stream.. ${err}`);
      }
    }

    if (!mediaStream) {
      enableStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      };
    }
  }, [mediaStream, requestedMedia]);

  return mediaStream;
}
