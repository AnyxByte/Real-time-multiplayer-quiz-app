import React from "react";

export default function Leaderboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ul className="space-y-2">
        <li className="flex justify-between bg-white shadow p-3 rounded-lg">
          <span>🥇 Alice</span>
          <span>50 pts</span>
        </li>
        <li className="flex justify-between bg-white shadow p-3 rounded-lg">
          <span>🥈 Bob</span>
          <span>40 pts</span>
        </li>
      </ul>
    </div>
  );
}
