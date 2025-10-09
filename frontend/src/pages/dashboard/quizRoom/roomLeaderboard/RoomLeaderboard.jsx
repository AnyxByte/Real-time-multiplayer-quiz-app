import React from "react";

const RoomLeaderboard = () => {
  const players = [
    { name: "Suprodip", score: 1200 },
    { name: "Arjun", score: 950 },
    { name: "Priya", score: 850 },
    { name: "Riya", score: 740 },
    { name: "Karan", score: 600 },
  ];

  // sort players by score (highest first)
  const sorted = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 text-white p-6 relative overflow-hidden">
      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight mb-8 drop-shadow-md">
        🏆 Leaderboard
      </h1>

      {/* Podium for top 3 */}
      <div className="flex items-end justify-center gap-6 mb-12">
        {/* 2nd Place */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-silver-300 flex items-center justify-center text-lg font-semibold">
            {sorted[1].name[0]}
          </div>
          <p className="mt-2 font-medium">{sorted[1].name}</p>
          <div className="bg-gray-300/20 w-16 h-16 rounded-t-lg flex items-center justify-center">
            <span className="text-sm opacity-80">2️⃣</span>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-yellow-400 shadow-lg flex items-center justify-center text-2xl font-bold text-black">
            🏅
          </div>
          <p className="mt-2 font-bold text-lg text-yellow-300">
            {sorted[0].name}
          </p>
          <div className="bg-yellow-300/20 w-20 h-24 rounded-t-lg flex items-center justify-center">
            <span className="text-sm opacity-80">1️⃣</span>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-orange-300 flex items-center justify-center text-lg font-semibold">
            {sorted[2].name[0]}
          </div>
          <p className="mt-2 font-medium">{sorted[2].name}</p>
          <div className="bg-orange-300/20 w-14 h-12 rounded-t-lg flex items-center justify-center">
            <span className="text-sm opacity-80">3️⃣</span>
          </div>
        </div>
      </div>

      {/* Remaining Players */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/20">
        {sorted.slice(3).map((p, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            <span className="font-medium flex items-center gap-2">
              <span className="text-pink-200">{i + 4}.</span> {p.name}
            </span>
            <span className="text-yellow-200 font-semibold">{p.score}</span>
          </div>
        ))}
      </div>

      {/* Decorative floating blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute w-64 h-64 bg-pink-500/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-indigo-400/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse delay-700"></div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-sm text-white/60">👏 Great job everyone!</p>
    </div>
  );
};

export default RoomLeaderboard;
