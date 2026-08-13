import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function ProtectedRoute({ allowedRoles }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Logged in but wrong role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "ADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
