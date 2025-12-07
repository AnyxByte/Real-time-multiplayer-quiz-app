import axios from "axios";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useDashboard } from "@/context/dashboardContext";

export default function Leaderboard() {
  const { scores } = useDashboard();

  console.log(scores, "user scores");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ul className="space-y-2">
        {scores.map((userScore) => (
          <li
            className="flex justify-between bg-white shadow p-3 rounded-lg"
            key={userScore._id}
          >
            <span>{userScore.userId}</span>
            <span>{userScore.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
