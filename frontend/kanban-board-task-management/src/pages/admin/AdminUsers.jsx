import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../services/adminService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const pageSize = 5;

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await getAllUsers(page, pageSize, "createdAt", "desc");

      console.log("Users response:", data);

      setUsers(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);

      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  if (loading) {
    return <p>Loading users...</p>;
  }
  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(userId);

      toast.success("User deleted successfully");

      // Refresh the current page
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);

      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };
  return (
    <div>
      <h1>User Management</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
                <td>
                  <button onClick={() => navigate(`/admin/users/${user.id}`)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br />

      <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 0}>
        Previous
      </button>

      <span style={{ margin: "0 10px" }}>
        Page {page + 1} of {totalPages}
      </span>

      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page >= totalPages - 1}
      >
        Next
      </button>
    </div>
  );
}

export default AdminUsers;
