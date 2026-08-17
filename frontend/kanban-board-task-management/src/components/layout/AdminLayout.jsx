import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <header>
        <h2>Kanban Admin</h2>

        <p>Welcome, {user?.name || "Admin"}</p>

        <nav>
          <Link to="/admin/dashboard">Dashboard</Link>

          {" | "}

          <Link to="/admin/users">Users</Link>

          {" | "}

          <Link to="/admin/tasks">Tasks</Link>

          {" | "}

          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <hr />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
