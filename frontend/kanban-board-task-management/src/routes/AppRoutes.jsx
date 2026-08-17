import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/task/Dashboard";
import CreateTask from "../pages/task/CreateTask";
import EditTask from "../pages/task/EditTask";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import UserDetails from "../pages/admin/UserDetails";
import AdminTasks from "../pages/admin/AdminTasks";
import TaskDetails from "../pages/admin/TaskDetails";
import AdminLayout from "../components/layout/AdminLayout";

import ProtectedRoute from "./ProtectedRoutes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER Routes */}
        <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks/create" element={<CreateTask />} />
          <Route path="/tasks/edit/:taskId" element={<EditTask />} />
        </Route>

        {/* ADMIN Routes */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/users/:userId" element={<UserDetails />} />
            <Route path="/admin/tasks" element={<AdminTasks />} />
            <Route path="/admin/tasks/:taskId" element={<TaskDetails />} />
          </Route>
        </Route>

        {/* Unknown URL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
