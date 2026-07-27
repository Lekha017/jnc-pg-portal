import { Routes, Route } from "react-router-dom";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

import ProtectedRoute from "./ProtectedRoute";

const Dashboard = () => (
  <div className="p-10 text-3xl font-bold">
    Student Dashboard
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;