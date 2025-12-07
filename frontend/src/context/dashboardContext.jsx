import axios from "axios";
import { createContext, useContext, useState } from "react";

import Cookies from "js-cookie";
import { useEffect } from "react";

const dashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("rooms");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [scores, setScores] = useState([]);

  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchQuestions = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(`${apiUrl}/question`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuizzes = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(`${apiUrl}/quiz`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuizzes(response.data.quizzes);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRooms = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(`${apiUrl}/room`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setRooms(response.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchScores = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(`${apiUrl}/score`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setScores(response.data.scores);
    } catch (err) {
      console.log("error at handleFetchScore", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchQuizzes();
    fetchRooms();
    handleFetchScores();
  }, []);

  return (
    <dashboardContext.Provider
      value={{
        activeTab,
        setActiveTab,
        sidebarOpen,
        setSidebarOpen,
        questions,
        setQuestions,
        quizzes,
        setQuizzes,
        rooms,
        setRooms,
        scores,
      }}
    >
      {children}
    </dashboardContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboard = () => useContext(dashboardContext);
