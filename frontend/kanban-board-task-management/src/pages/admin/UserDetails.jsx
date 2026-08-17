import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserById } from "../../services/adminService";

function UserDetails() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(userId);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);

        toast.error(
          error.response?.data?.message || "Failed to load user details",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div>
      <h1>User Details</h1>

      <p>
        <strong>ID:</strong> {user.id}
      </p>

      <p>
        <strong>Name:</strong> {user.name}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Role:</strong> {user.role}
      </p>

      <button onClick={() => navigate("/admin/users")}>Back to Users</button>
    </div>
  );
}

export default UserDetails;
