import React, { useRef, useState } from "react";
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
  const [status, setStatus] = useState("waiting");
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const roomCode = location.state;

  const socketRef = useRef(null);

  const handleMsg = (msg) => {
    console.log(msg);
  };

  const handleRole = (msg) => {
    console.log(msg, "role");
    setRole(msg);
  };

  const handleQuizStart = (msg) => {
    console.log(msg);
    setStatus(msg);
  };

  const handleUserJoin = (data) => {
    setUsers((prev) => {
      if (prev.includes(data.userName)) return prev;
      return [...prev, data.userName];
    });
  };

  useEffect(() => {
    const socket = io(import.meta.env.VITE_WS_URL, {
      auth: {
        token: token,
        roomCode,
      },
    });

    socketRef.current = socket;

    socket.on("message", handleMsg);
    socket.on("role", handleRole);
    socket.on("status", handleQuizStart);
    socket.on("newUserJoined", handleUserJoin);

    return () => {
      socket.off("message", handleMsg);
      socket.off("role", handleRole);
      socket.off("status", handleQuizStart);
      socket.off("newUserJoined", handleUserJoin);
    };
  }, []);

  function startQuiz() {
    socketRef.current.emit("startQuiz");
  }

  const renderContent = () => {
    if (role === "admin" && status === "waiting") {
      return (
        <HostLobby startQuiz={startQuiz} players={users} roomCode={roomCode} />
      );
    } else if (role === "user" && status === "waiting") {
      return <ParticipantLobby roomCode={roomCode} />;
    } else if (status === "in-progress" && role === "user") {
      return <QuestionDisplay />;
    } else if (status === "in-progress" && role === "admin") {
      return <RoomLeaderboard />;
    } else return <HostLobby startQuiz={startQuiz} />;
  };

  return (
    <div>
      <div className="h-screen w-full">{renderContent()}</div>
    </div>
  );
}
