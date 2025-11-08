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
  const [role, setRole] = useState("user");

  const location = useLocation();

  const roomCode = location.state;

  const handleMsg = (msg) => {
    console.log(msg);
  };

  const handleRole = (msg) => {
    console.log(msg, "role");
    setRole(msg);
  };

  useEffect(() => {
    const socket = io(import.meta.env.VITE_WS_URL, {
      auth: {
        token: token,
        roomCode,
      },
    });

    socket.on("message", handleMsg);

    socket.on("role", handleRole);

    return () => {
      socket.off("message", handleMsg);
    };
  }, []);

  const renderContent = () => {
    switch (role) {
      case "admin":
        return <HostLobby />;
      case "user":
        return <ParticipantLobby />;

      default:
        return <ParticipantLobby />;
    }
  };

  return (
    <div>
      <div className="h-screen w-full">{renderContent()}</div>
    </div>
  );
}
