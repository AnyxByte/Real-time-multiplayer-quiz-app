import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from "./pages/login/login.jsx";
import Signup from "./pages/signup/signup.jsx";
import App from "./App.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import CreateQuestion from "./pages/dashboard/questions/createQuestion.jsx";
import { DashboardProvider } from "./context/DashboardContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: (
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
