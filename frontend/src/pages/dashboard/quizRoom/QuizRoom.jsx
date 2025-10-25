import React from "react";
import ParticipantLobby from "./lobby/ParticipantLobby";
import HostLobby from "./lobby/HostLobby";
import RoomLeaderboard from "./roomLeaderboard/RoomLeaderboard";
import QuestionDisplay from "./questionDisplay/QuestionDisplay";
import { io } from "socket.io-client";
import { useEffect } from "react";

export default function QuizRoom() {
  const socket = io(import.meta.env.VITE_WS_URL);

  const handleMsg = (msg) => {
    console.log(msg);
  };

  useEffect(() => {
    socket.on("message", handleMsg);

    return () => {
      socket.off("message", handleMsg);
    };
  }, []);

  return (
    <div>
      <div className="h-screen w-full">
        <HostLobby />
      </div>
    </div>
  );
}
