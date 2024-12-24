/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import AgoraRTC, {
  AgoraRTCProvider,
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import { useState, useEffect } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";

function Call(props: { appId: string; channelName: string }) {
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );
  return (
    <AgoraRTCProvider client={client}>
      <Videos channelName={props.channelName} AppID={props.appId} />
      <div className="fixed z-10 bottom-0 left-0 right-0 flex justify-center pb-4">
        <a
          className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40"
          href="/"
        >
          End Call
        </a>
      </div>
    </AgoraRTCProvider>
  );
}

function Videos(props: { channelName: string; AppID: string }) {
  const { AppID, channelName } = props;
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack(micOn);
  const { isLoading: isLoadingCam, localCameraTrack } =
    useLocalCameraTrack(cameraOn);
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);
  usePublish([localMicrophoneTrack, localCameraTrack]);
  useJoin({
    appid: AppID,
    channel: channelName,
    token: null,
  });

  // This is important to ensure that the track's state is updated when the button is clicked.
  useEffect(() => {
    if (localMicrophoneTrack) {
      localMicrophoneTrack.setEnabled(micOn);
    }
  }, [micOn, localMicrophoneTrack]);

  useEffect(() => {
    if (localCameraTrack) {
      localCameraTrack.setEnabled(cameraOn);
    }
  }, [cameraOn, localCameraTrack]);

  audioTracks.map((track) => track.play());
  const deviceLoading = isLoadingMic || isLoadingCam;
  if (deviceLoading)
    return (
      <div className="flex flex-col items-center pt-40">Loading devices...</div>
    );
  const unit = "minmax(0, 1fr) ";

  return (
    <div className="flex flex-col justify-between w-full h-screen p-1">
      {/* Video grid layout */}
      <div
        className={`grid gap-1 flex-1`}
        style={{
          gridTemplateColumns:
            remoteUsers.length > 9
              ? unit.repeat(4)
              : remoteUsers.length > 4
              ? unit.repeat(3)
              : remoteUsers.length > 1
              ? unit.repeat(2)
              : unit,
        }}
      >
        <LocalVideoTrack
          track={localCameraTrack}
          play={true}
          className="w-full h-full"
        />
        {remoteUsers.map((user) => (
          <RemoteUser key={user.uid} user={user} />
        ))}
      </div>

      {/* Controls section */}
      <div className="absolute bottom-15 left-0 right-0 flex justify-center items-center gap-4 z-10">
        <div className="flex gap-4 bg-gray-800 bg-opacity-50 p-3 rounded-full">
          {/* Microphone Control */}
          <button
            className={`hover:font-semibold rounded-2xl p-2 ${
              micOn ? "bg-green-500" : "bg-red-500"
            }`}
            onClick={() => setMic((prev) => !prev)} // State toggle
          >
            {micOn ? (
              <FaMicrophone className="text-white" />
            ) : (
              <FaMicrophoneSlash className="text-gray-400" />
            )}
          </button>
          {/* Camera Control */}
          <button
            className={`hover:font-semibold rounded-2xl p-2 ${
              cameraOn ? "bg-green-500" : "bg-red-500"
            }`}
            onClick={() => setCamera((prev) => !prev)} // State toggle
          >
            {cameraOn ? (
              <FaVideo className="text-white" />
            ) : (
              <FaVideoSlash className="text-gray-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Call;
