import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { getAdminDashboard } from "../../services/adminService";
import { toast } from "react-toastify";

import "../../assets/styles/admin/admindashboard.css";

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getAdminDashboard();

        console.log("Admin dashboard response:", data);

        setDashboard(data);
      } catch (error) {
        console.error("Error fetching admin dashboard:", error);

        toast.error(
          error.response?.data?.message || "Failed to load admin dashboard",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="admin-dashboard-loading">
        <div className="admin-dashboard-spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="admin-dashboard-error">
        <h2>Unable to load dashboard</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      {/* Header */}

      <header className="admin-dashboard-header">
        <div className="admin-dashboard-logo">
          <div className="admin-dashboard-logo-icon">✓</div>

          <div>
            <span>Taskly</span>
            <small>Admin</small>
          </div>
        </div>

        <div className="admin-dashboard-header-actions">
          <span className="admin-dashboard-user">{user?.name || "Admin"}</span>

          <button
            type="button"
            className="admin-dashboard-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}

      <main className="admin-dashboard-content">
        {/* Welcome */}

        <section className="admin-dashboard-welcome">
          <div>
            <p className="admin-dashboard-eyebrow">ADMINISTRATION</p>

            <h1>Admin Dashboard</h1>

            <p>
              Welcome back, {user?.name || "Admin"}. Here's an overview of your
              Taskly workspace.
            </p>
          </div>
        </section>

        {/* Statistics */}

        <section className="admin-dashboard-stats">
          <div className="admin-stat-card">
            <span className="admin-stat-label">Total Users</span>

            <strong>{dashboard.totalUsers}</strong>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-label">Total Tasks</span>

            <strong>{dashboard.totalTasks}</strong>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-label">To Do</span>

            <strong>{dashboard.toDoTasks}</strong>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-label">In Progress</span>

            <strong>{dashboard.inProgressTasks}</strong>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-label">Completed</span>

            <strong>{dashboard.completedTasks}</strong>
          </div>
        </section>

        {/* Management */}

        <section className="admin-management-section">
          <div className="admin-section-heading">
            <h2>Management</h2>

            <p>Manage users and tasks across your Taskly workspace.</p>
          </div>

          <div className="admin-management-grid">
            <button
              type="button"
              className="admin-management-card"
              onClick={() => navigate("/admin/users")}
            >
              <div className="admin-management-icon">👥</div>

              <div>
                <h3>Manage Users</h3>

                <p>View and manage registered users.</p>
              </div>

              <span className="admin-management-arrow">→</span>
            </button>

            <button
              type="button"
              className="admin-management-card"
              onClick={() => navigate("/admin/tasks")}
            >
              <div className="admin-management-icon">✓</div>

              <div>
                <h3>Manage Tasks</h3>

                <p>View and manage all tasks.</p>
              </div>

              <span className="admin-management-arrow">→</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
