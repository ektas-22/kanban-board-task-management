import { useAuth } from "../../context/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function AdminDashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default AdminDashboard;
