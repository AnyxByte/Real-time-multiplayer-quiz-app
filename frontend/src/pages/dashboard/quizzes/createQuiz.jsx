import { useDashboard } from "@/context/DashboardContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateQuiz() {
  const { questions, setActiveTab } = useDashboard();
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          Create Quiz
        </h1>

        <Input
          id="title"
          type="text"
          placeholder="Enter quiz title..."
          className="rounded-lg border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Available Questions */}
          <div className="bg-white rounded-xl shadow p-4 space-y-4">
            <h2 className="text-lg font-semibold">Available Questions</h2>
            <div
              className="max-h-[350px] md:max-h-[450px] overflow-y-auto space-y-3 
                            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
            >
              {[...questions].map((q, i) => (
                <div
                  key={i}
                  className="p-3 border rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
                >
                  <p className="text-sm md:text-base flex-1">
                    Question {i + 1}: {q.title}
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    className="bg-indigo-600 text-white hover:bg-indigo-700 "
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Questions */}
          <div className="bg-white rounded-xl shadow p-4 space-y-4">
            <h2 className="text-lg font-semibold">Selected Questions</h2>
            <div
              className="min-h-[100px] max-h-[350px] md:max-h-[450px] overflow-y-auto space-y-3 
                            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
            >
              {/* Example selected */}
              <div className="p-3 border rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <p className="text-sm md:text-base flex-1">
                  Question 2: Example selected
                </p>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="text-white"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100"
            onClick={() => setActiveTab("quizzes")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
