import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function Question() {
  const [questions, setQuestions] = useState([
    { id: 1, text: "What is the capital of France?" },
    { id: 2, text: "Who developed the theory of relativity?" },
    { id: 3, text: "What is 2 + 2?" },
  ]);

  const addQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([...questions, { id: newId, text: `New Question ${newId}` }]);
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Questions</h2>
        <button
          onClick={addQuestion}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus size={18} />
          Create Question
        </button>
      </div>

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
