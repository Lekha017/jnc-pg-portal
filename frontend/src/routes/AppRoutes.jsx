import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Faculty from "../pages/Faculty/Faculty";
import FacultyDetails from "../pages/Faculty/FacultyDetails";
import AddFaculty from "../pages/Faculty/AddFaculty";
import EditFaculty from "../pages/Faculty/EditFaculty";
import FacultyDashboard from "../pages/Faculty/FacultyDashboard";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import DepartmentDetails from "../pages/Department/DepartmentDetails";

import Library from "../pages/Library";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* ================= PROTECTED HOME ================= */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* ================= LIBRARY ================= */}

      <Route
        path="/library"
        element={
          <ProtectedRoute>
            <Library />
          </ProtectedRoute>
        }
      />

      {/* ================= FACULTY PUBLIC ================= */}

      <Route
        path="/faculty"
        element={<Faculty />}
      />

      <Route
        path="/faculty/:id"
        element={<FacultyDetails />}
      />

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/faculty/add"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AddFaculty />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/faculty/edit/:id"
        element={
          <ProtectedRoute roles={["admin"]}>
            <EditFaculty />
          </ProtectedRoute>
        }
      />

      {/* ================= FACULTY ================= */}

      <Route
        path="/faculty/profile"
        element={
          <ProtectedRoute roles={["faculty"]}>
            <EditFaculty />
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/edit-profile"
        element={
          <ProtectedRoute roles={["faculty"]}>
            <EditFaculty />
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/dashboard"
        element={
          <ProtectedRoute roles={["faculty"]}>
            <FacultyDashboard />
          </ProtectedRoute>
        }
      />

      <Route
  path="/departments/:slug"
  element={<DepartmentDetails />}
/>
    </Routes>
  );
};

export default AppRoutes;