import { useState } from "react";
import {
  Home,
  Users,
  ClipboardList,
  HelpCircle,
  Trophy,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Room from "./rooms/room";
import Quiz from "./quizzes/quiz";
import Question from "./questions/question";
import Leaderboard from "./leaderboard/leaderboard";
import DashboardSettings from "./settings/settings";
import Sidebar from "./sidebar/sidebar";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("rooms");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "rooms":
        return <Room />;
      case "quizzes":
        return <Quiz />;
      case "questions":
        return <Question />;
      case "leaderboard":
        return <Leaderboard />;
      case "settings":
        return <DashboardSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`
       fixed inset-y-0 left-0 z-50 w-64 h-full bg-gradient-to-b from-indigo-600 to-purple-600
      transform md:relative md:translate-x-0
      transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <h1 className="text-xl font-bold">Quiz Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md border"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Content Area */}
        <main className="p-6 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
