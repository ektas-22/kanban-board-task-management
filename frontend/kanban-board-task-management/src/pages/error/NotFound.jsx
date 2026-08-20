import { useNavigate } from "react-router-dom";
import "../../assets/styles/error/error.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-card">

        <div className="error-icon">
          ?
        </div>

        <p className="error-code">404</p>

        <h1>Page Not Found</h1>

        <p className="error-message">
          The page you're looking for doesn't exist or may
          have been moved.
        </p>

        <div className="error-actions">
          <button
            type="button"
            className="error-primary-button"
            onClick={() => navigate("/")}
          >
            Go to Login
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

export default NotFound;