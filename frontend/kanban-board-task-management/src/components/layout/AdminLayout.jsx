import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import "../../assets/styles/admin/adminlayout.css";

function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitial = () => {
    return (user?.name || "Admin").charAt(0).toUpperCase();
  };

  return (
    <div className="admin-layout">
      {/* =====================================================
          ADMIN NAVBAR
          ===================================================== */}

      <header className="admin-navbar">
        {/* Brand */}

        <Link to="/admin/dashboard" className="admin-brand">
          <div className="admin-brand-icon">✓</div>

          <div className="admin-brand-text">
            <span className="admin-brand-name">Taskly</span>
            <span className="admin-brand-label">ADMIN</span>
          </div>
        </Link>

        {/* Navigation */}

        <nav className="admin-navigation">
          <Link
            to="/admin/dashboard"
            className={`admin-nav-link ${
              location.pathname === "/admin/dashboard" ? "active" : ""
            }`}
          >
            Overview
          </Link>

          <Link
            to="/admin/users"
            className={`admin-nav-link ${
              location.pathname === "/admin/users" ? "active" : ""
            }`}
          >
            Users
          </Link>

          <Link
            to="/admin/tasks"
            className={`admin-nav-link ${
              location.pathname === "/admin/tasks" ? "active" : ""
            }`}
          >
            Tasks
          </Link>
        </nav>

        {/* Account */}

        <div className="admin-account">
          <div className="admin-account-avatar">{getInitial()}</div>

          <div className="admin-account-info">
            <span className="admin-account-name">
              {user?.name || "Admin"}
            </span>

            <span className="admin-account-role">Administrator</span>
          </div>

          <button
            type="button"
            className="admin-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* =====================================================
          PAGE CONTENT
          ===================================================== */}

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;