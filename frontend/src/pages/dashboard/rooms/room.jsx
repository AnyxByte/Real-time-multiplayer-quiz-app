import React from "react";
import { Button } from "@/components/ui/button";
import ParticipantLobby from "../quizRoom/lobby/ParticipantLobby";
import { Plus } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

export default function Room() {
  const { setActiveTab } = useDashboard();

  const addRoom = () => {
    setActiveTab("createRoom");
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
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-xl p-4 text-gray-800">
          <h3 className="font-semibold text-lg">Room Code: 12345</h3>
          <p className="text-sm text-gray-600">5 users joined</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-gray-800">
          <h3 className="font-semibold text-lg">Room Code: 67890</h3>
          <p className="text-sm text-gray-600">2 users joined</p>
        </div>
      </div>
    </div>
  );
}
