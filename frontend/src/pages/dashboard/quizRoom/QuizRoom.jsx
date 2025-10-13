import React from "react";
import ParticipantLobby from "./lobby/ParticipantLobby";
import HostLobby from "./lobby/HostLobby";
import RoomLeaderboard from "./roomLeaderboard/RoomLeaderboard";
import QuestionDisplay from "./questionDisplay/QuestionDisplay";

export default function QuizRoom() {
  return (
    <div>
      <div className="h-screen w-full">
        <QuestionDisplay />
      </div>
    </div>
  );
}
