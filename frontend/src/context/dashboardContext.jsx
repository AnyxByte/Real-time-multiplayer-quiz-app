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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboard = () => useContext(DashboardContext);
