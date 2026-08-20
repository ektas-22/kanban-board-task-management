import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { getAdminDashboard } from "../../services/adminService";
import { toast } from "react-toastify";

import "../../assets/styles/admin/admindashboard.css";

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getAdminDashboard();

        setDashboard(data);
      } catch (error) {
        console.error("Error fetching admin dashboard:", error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load admin dashboard",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="admin-dashboard-loading">
        <div className="admin-dashboard-spinner"></div>
        <p>Loading workspace...</p>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="admin-dashboard-error">
        <div className="admin-error-icon">!</div>

        <h2>Unable to load workspace</h2>

        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-content">

        {/* =================================================
            PAGE HEADER
            ================================================= */}

        <section className="admin-page-heading">
          <div>
            <p className="admin-page-eyebrow">
              ADMIN WORKSPACE
            </p>

            <h1>Workspace overview</h1>

            <p className="admin-page-description">
              Keep track of your Taskly workspace and manage
              users and tasks from one place.
            </p>
          </div>

          <div className="admin-welcome">
            <span className="admin-welcome-label">
              Signed in as
            </span>

            <strong>
              {user?.name || "Admin"}
            </strong>
          </div>
        </section>

        {/* =================================================
            STATISTICS
            ================================================= */}

        <section className="admin-statistics">

          <div className="admin-stat-card admin-stat-card-accent">
            <div className="admin-stat-top">
              <span className="admin-stat-label">
                Total users
              </span>

              <span className="admin-stat-icon">
                👥
              </span>
            </div>

            <strong>
              {dashboard.totalUsers}
            </strong>

            <span className="admin-stat-description">
              Registered accounts
            </span>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span className="admin-stat-label">
                Total tasks
              </span>

              <span className="admin-stat-icon">
                ✓
              </span>
            </div>

            <strong>
              {dashboard.totalTasks}
            </strong>

            <span className="admin-stat-description">
              Across the workspace
            </span>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span className="admin-stat-label">
                To do
              </span>

              <span className="admin-stat-icon">
                ○
              </span>
            </div>

            <strong>
              {dashboard.toDoTasks}
            </strong>

            <span className="admin-stat-description">
              Waiting to start
            </span>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span className="admin-stat-label">
                In progress
              </span>

              <span className="admin-stat-icon">
                ◐
              </span>
            </div>

            <strong>
              {dashboard.inProgressTasks}
            </strong>

            <span className="admin-stat-description">
              Currently active
            </span>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span className="admin-stat-label">
                Completed
              </span>

              <span className="admin-stat-icon">
                ✓
              </span>
            </div>

            <strong>
              {dashboard.completedTasks}
            </strong>

            <span className="admin-stat-description">
              Finished tasks
            </span>
          </div>

        </section>

        {/* =================================================
            MANAGEMENT
            ================================================= */}

        <section className="admin-management-section">

          <div className="admin-section-heading">
            <div>
              <p className="admin-section-eyebrow">
                WORKSPACE
              </p>

              <h2>Manage your workspace</h2>

              <p>
                Choose an area to continue.
              </p>
            </div>
          </div>

          <div className="admin-management-grid">

            {/* Users */}

            <button
              type="button"
              className="admin-management-card"
              onClick={() => navigate("/admin/users")}
            >
              <div className="admin-management-icon">
                👥
              </div>

              <div className="admin-management-content">
                <span className="admin-management-label">
                  USERS
                </span>

                <h3>
                  Manage users
                </h3>

                <p>
                  View registered users and manage
                  their accounts.
                </p>
              </div>

              <span className="admin-management-arrow">
                →
              </span>
            </button>

            {/* Tasks */}

            <button
              type="button"
              className="admin-management-card"
              onClick={() => navigate("/admin/tasks")}
            >
              <div className="admin-management-icon">
                ✓
              </div>

              <div className="admin-management-content">
                <span className="admin-management-label">
                  TASKS
                </span>

                <h3>
                  Manage tasks
                </h3>

                <p>
                  Review and manage tasks across
                  the workspace.
                </p>
              </div>

              <span className="admin-management-arrow">
                →
              </span>
            </button>

          </div>
        </section>

      </div>
    </div>
  );
}

export default AdminDashboard;