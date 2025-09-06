import React from "react";

export default function Room() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Rooms</h2>
      <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700">
        Create Room
      </button>
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
