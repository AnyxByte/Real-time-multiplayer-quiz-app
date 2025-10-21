import React from "react";
import { Button } from "@/components/ui/button";
import ParticipantLobby from "../quizRoom/lobby/ParticipantLobby";
import { Plus } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

export default function Room() {
  const { setActiveTab, rooms } = useDashboard();

  const addRoom = () => {
    setActiveTab("createRoom");
  };

  const handleJoinRoom = (id) => {
    alert("joined " , id);
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Rooms</h2>
      <Button
        onClick={addRoom}
        size="lg"
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        <Plus size={18} />
        Create Room
      </Button>
      {rooms.map((room) => (
        <div
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
          key={room._id}
        >
          <div className="bg-white shadow rounded-xl p-4 text-gray-800 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">
                Room Code: {room.roomCode}
              </h3>
              <p className="text-sm text-gray-600">
                Max Players Allowed: {room.maxPlayers}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white transition-all duration-200"
                onClick={() => handleJoinRoom(room._id)}
                size="sm"
              >
                Join
              </Button>

              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
                // onClick={() => handleDeleteRoom(room._id)}
                size="sm"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
