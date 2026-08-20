import { useEffect, useState } from "react";
import {
  getAllUsers,
  getUserById,
  deleteUser,
} from "../../services/adminService";
import { toast } from "react-toastify";

import "../../assets/styles/admin/adminusers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedUser, setSelectedUser] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [deleteUserId, setDeleteUserId] = useState(null);

  const pageSize = 5;

  useEffect(() => {
    let ignore = false;

    const loadUsers = async () => {
      try {
        setLoading(true);

        const data = await getAllUsers(
          page,
          pageSize,
          "createdAt",
          "desc",
        );

        if (!ignore) {
          setUsers(data.content || []);
          setTotalPages(data.totalPages || 0);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching users:", error);

        if (!ignore) {
          toast.error(
            error.response?.data?.message ||
              "Failed to load users",
          );

          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      ignore = true;
    };
  }, [page]);

  const handleView = async (userId) => {
    try {
      setDetailsLoading(true);

      const data = await getUserById(userId);

      setSelectedUser(data);
    } catch (error) {
      console.error("Error fetching user details:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load user details",
      );
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleDelete = (userId) => {
    setDeleteUserId(userId);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(deleteUserId);

      toast.success("User deleted successfully");

      const data = await getAllUsers(
        page,
        pageSize,
        "createdAt",
        "desc",
      );

      setUsers(data.content || []);
      setTotalPages(data.totalPages || 0);

      if (
        data.content?.length === 0 &&
        page > 0
      ) {
        setPage((currentPage) => currentPage - 1);
      }
    } catch (error) {
      console.error("Error deleting user:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete user",
      );
    } finally {
      setDeleteUserId(null);
    }
  };

  const closeUserDetails = () => {
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="admin-users-loading">
        <div className="admin-users-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="admin-users-page">
      <div className="admin-users-content">

        {/* =================================================
            PAGE HEADER
            ================================================= */}

        <section className="admin-users-header">
          <div>
            <p className="admin-users-eyebrow">
              ADMINISTRATION
            </p>

            <h1>User management</h1>

            <p>
              View and manage the people in your
              Taskly workspace.
            </p>
          </div>

          <div className="admin-users-count">
            <strong>{users.length}</strong>
            <span>
              {users.length === 1 ? "user" : "users"} shown
            </span>
          </div>
        </section>

        {/* =================================================
            TABLE
            ================================================= */}

        <section className="admin-users-section">
          {users.length === 0 ? (
            <div className="admin-users-empty">
              <div className="admin-users-empty-icon">
                👥
              </div>

              <h2>No users found</h2>

              <p>
                There are currently no users to display.
              </p>
            </div>
          ) : (
            <div className="admin-users-table-card">
              <div className="admin-users-table-wrapper">
                <table className="admin-users-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th className="users-actions-heading">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="user-name-cell">
                            <div className="user-avatar">
                              {user.name
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </div>

                            <div className="user-name-info">
                              <span>
                                {user.name}
                              </span>

                              <small>
                                #{user.id}
                              </small>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="user-email">
                            {user.email}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`user-role ${
                              user.role === "ADMIN"
                                ? "user-role-admin"
                                : "user-role-user"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td>
                          <div className="user-actions">
                            <button
                              type="button"
                              className="user-view-button"
                              onClick={() =>
                                handleView(user.id)
                              }
                            >
                              View
                            </button>

                            <button
                              type="button"
                              className="user-delete-button"
                              onClick={() =>
                                handleDelete(user.id)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}

              <div className="admin-users-pagination">
                <button
                  type="button"
                  className="pagination-button"
                  onClick={() =>
                    setPage((prev) => prev - 1)
                  }
                  disabled={page === 0}
                >
                  ← Previous
                </button>

                <span className="pagination-info">
                  Page <strong>{page + 1}</strong> of{" "}
                  <strong>{totalPages}</strong>
                </span>

                <button
                  type="button"
                  className="pagination-button"
                  onClick={() =>
                    setPage((prev) => prev + 1)
                  }
                  disabled={
                    page >= totalPages - 1
                  }
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* =================================================
          USER DETAILS MODAL
          ================================================= */}

      {selectedUser && (
        <div
          className="admin-details-overlay"
          onClick={closeUserDetails}
        >
          <div
            className="admin-details-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="admin-details-close"
              onClick={closeUserDetails}
              aria-label="Close"
            >
              ×
            </button>

            <div className="admin-details-avatar">
              {selectedUser.name
                ?.charAt(0)
                ?.toUpperCase()}
            </div>

            <h2>{selectedUser.name}</h2>

            <p className="admin-details-subtitle">
              User account details
            </p>

            {detailsLoading ? (
              <div className="admin-details-loading">
                <div className="admin-users-spinner"></div>
                <p>Loading details...</p>
              </div>
            ) : (
              <div className="admin-details-list">
                <div className="admin-detail-row">
                  <span>ID</span>
                  <strong>
                    #{selectedUser.id}
                  </strong>
                </div>

                <div className="admin-detail-row">
                  <span>Name</span>
                  <strong>
                    {selectedUser.name}
                  </strong>
                </div>

                <div className="admin-detail-row">
                  <span>Email</span>
                  <strong>
                    {selectedUser.email}
                  </strong>
                </div>

                <div className="admin-detail-row">
                  <span>Role</span>

                  <span
                    className={`user-role ${
                      selectedUser.role === "ADMIN"
                        ? "user-role-admin"
                        : "user-role-user"
                    }`}
                  >
                    {selectedUser.role}
                  </span>
                </div>
              </div>
            )}

            <button
              type="button"
              className="admin-details-done-button"
              onClick={closeUserDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* =================================================
          DELETE MODAL
          ================================================= */}

      {deleteUserId && (
        <div className="admin-details-overlay">
          <div className="admin-delete-modal">
            <div className="admin-delete-icon">
              !
            </div>

            <h2>Delete user?</h2>

            <p>
              This user will be permanently deleted.
              This action cannot be undone.
            </p>

            <div className="admin-delete-actions">
              <button
                type="button"
                className="admin-delete-cancel"
                onClick={() =>
                  setDeleteUserId(null)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="admin-delete-confirm"
                onClick={confirmDelete}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;