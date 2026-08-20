import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

import "../../assets/styles/error/error.css";

function Unauthorized() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDashboard = () => {
    if (user?.role === "ADMIN") {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="error-page">
      <div className="error-card">

        <div className="error-icon error-icon-warning">
          !
        </div>

        <p className="error-code">403</p>

        <h1>Access Denied</h1>

        <p className="error-message">
          You don't have permission to access this page.
        </p>

        <div className="error-actions">
          <button
            type="button"
            className="error-primary-button"
            onClick={handleDashboard}
          >
            Go to Dashboard
          </button>

          <button
            type="button"
            className="error-secondary-button"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}

export default Unauthorized;