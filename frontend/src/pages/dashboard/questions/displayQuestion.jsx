import { Trash2 } from "lucide-react";
import React from "react";

export default function DisplayQuestion({ questions, deleteQuestion }) {
  return (
    <div>
      {questions.length === 0 ? (
        <p className="text-gray-600">No questions available.</p>
      ) : (
        <ul className="space-y-3">
          {questions.map((q) => (
            <li
              key={q.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow border"
            >
              <span>{q.text}</span>
              <button
                onClick={() => deleteQuestion(q.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
