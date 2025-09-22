import axios from "axios";
import { createContext, useContext, useState } from "react";

import Cookies from "js-cookie";
import { useEffect } from "react";

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("rooms");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchQuestions = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(`${apiUrl}/question`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const fetchQuizzes = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(`${apiUrl}/quiz`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setQuizzes(response.data.quizzes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        activeTab,
        setActiveTab,
        sidebarOpen,
        setSidebarOpen,
        questions,
        setQuestions,
        quizzes,
        setQuizzes,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboard = () => useContext(DashboardContext);
