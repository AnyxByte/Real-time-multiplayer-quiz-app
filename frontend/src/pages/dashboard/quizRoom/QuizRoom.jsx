import React, { useState } from "react";
import ParticipantLobby from "./lobby/ParticipantLobby";
import HostLobby from "./lobby/HostLobby";
import RoomLeaderboard from "./roomLeaderboard/RoomLeaderboard";
import QuestionDisplay from "./questionDisplay/QuestionDisplay";
import { io } from "socket.io-client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router";

export default function QuizRoom() {
  const token = Cookies.get("token");

  const location = useLocation();

  const roomCode = location.state;
  const socket = io(import.meta.env.VITE_WS_URL, {
    auth: {
      token: token,
      roomCode,
    },
  });

  // const [isAdmin, setIsAdmin] = useState(false);
  // const [normalUser, setNormalUser] = useState(true);

  const handleMsg = (msg) => {
    console.log(msg);
  };

  // const renderContent = () => {

  // }

  useEffect(() => {
    socket.on("message", handleMsg);

    return () => {
      socket.off("message", handleMsg);
    };
  }, []);

  return (
    <div>
      <div className="h-screen w-full">
        <ParticipantLobby />
      </div>
    </div>
  );
}
