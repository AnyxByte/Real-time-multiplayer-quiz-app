import React, { useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button } from "@/components/ui/button";

const QuestionDisplay = ({
  question = "Which planet is known as the Red Planet?",
  options = ["Earth", "Mars", "Jupiter"],
  duration = 10,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const key = useRef(0);

  const [isPlaying, setIsPlaying] = useState(true);
  const [remainingTime, setRemainingTime] = useState(10);

  const handleSubmit = () => {
    setIsPlaying(false);
    console.log(remainingTime);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-lg text-center">
        {/* Timer Circle */}
        <div className="flex justify-center mb-6">
          <CountdownCircleTimer
            key={key.current}
            isPlaying={isPlaying}
            duration={duration}
            colors={["#4f46e5", "#facc15", "#f97316", "#ef4444"]}
            colorsTime={[10, 6, 3, 0]}
            size={80}
            strokeWidth={8}
            onUpdate={(remainingTime) => setRemainingTime(remainingTime)}
            onComplete={() => ({ shouldRepeat: false })}
          >
            {({ remainingTime }) => (
              <span className="text-lg font-semibold text-gray-800">
                {remainingTime}s
              </span>
            )}
          </CountdownCircleTimer>
        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {question || "Loading question..."}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {options?.map((opt, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedOption(idx)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-all
                ${
                  selectedOption === idx
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                    : "bg-white/90 hover:bg-indigo-50 border-gray-200"
                }`}
            >
              {opt}
            </motion.button>
          ))}
        </div>

        {/* Submit */}
        <div className="mt-8">
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl"
            disabled={selectedOption === null}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;
