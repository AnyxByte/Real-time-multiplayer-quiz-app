import React from "react";
import { Button } from "@/components/ui/button";

export default function Quiz() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quizzes</h2>
      <Button className="bg-indigo-600 text-white px-6 py-3 hover:bg-indigo-700"
      size="lg"
      >
        Create Quiz
      </Button>
    </div>
  );
}
