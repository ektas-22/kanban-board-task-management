import { Route } from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/task/Dashboard";
import CreateTask from "../pages/task/CreateTask";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import { Navigate } from "react-router-dom";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        {/* User Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks/create" element={<CreateTask />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
            </AdminRoute>
          }
        />
        {/* Fallback Routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
