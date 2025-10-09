import React from "react";
import ParticipantLobby from "./lobby/ParticipantLobby";
import HostLobby from "./lobby/HostLobby";
import RoomLeaderboard from "./roomLeaderboard/RoomLeaderboard";

export default function QuizRoom() {
  return (
    <div>
      <div className="h-screen w-full">
        <RoomLeaderboard />
      </div>
    </div>
  );
}
