import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useDashboard } from "../../../context/DashboardContext";
import DisplayQuestion from "./displayQuestion";
import { Button } from "../../../components/ui/button";

export default function Question() {
  const { setActiveTab } = useDashboard();

  const [questions, setQuestions] = useState([
    { id: 1, text: "What is the capital of France?" },
    { id: 2, text: "Who developed the theory of relativity?" },
    { id: 3, text: "What is 2 + 2?" },
  ]);

  const addQuestion = () => {
    setActiveTab("createQuestion");
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Questions</h2>
        <Button
          onClick={addQuestion}
          size="lg"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus size={18} />
          Create Question
        </Button>
      </div>

      <div>
        <DisplayQuestion
          questions={questions}
          deleteQuestion={deleteQuestion}
        />
      </div>
    </div>
  );
}
