import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CheckSquare,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { register as registerService } from "../../services/authService";
import { useAuth } from "../../context/useAuth";

import "../../assets/styles/auth/register.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const registerData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const response = await registerService(registerData);

      console.log("Register response:", response);

      login(response);

      toast.success("Registration successful");

      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);

      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-page-container">

        {/* Branding */}
        <section className="register-page-brand">

          <div className="register-page-brand-logo">
            <div className="register-page-brand-icon">
              <CheckSquare size={22} />
            </div>

            <div className="register-page-brand-text">
              <span className="register-page-brand-name">
                Taskly
              </span>

              <span className="register-page-brand-tagline">
                Work smarter
              </span>
            </div>
          </div>

          <div className="register-page-brand-content">

            <div className="register-page-eyebrow">
              <span className="register-page-eyebrow-dot"></span>
              GET STARTED
            </div>

            <h2>
              Turn your
              <br />
              <span>plans into progress.</span>
            </h2>

            <p>
              Create your account and start organizing your tasks
              with a simple and focused Kanban workflow.
            </p>

            <div className="register-page-benefits">

              <div className="register-page-benefit">
                <div className="register-page-benefit-icon">
                  <CheckSquare size={15} />
                </div>

                <div className="register-page-benefit-content">
                  <strong>Stay organized</strong>
                  <span>
                    Keep all your tasks in one place.
                  </span>
                </div>
              </div>

              <div className="register-page-benefit">
                <div className="register-page-benefit-icon">
                  <ArrowRight size={15} />
                </div>

                <div className="register-page-benefit-content">
                  <strong>Track your progress</strong>
                  <span>
                    Move tasks from To Do to Done.
                  </span>
                </div>
              </div>

              <div className="register-page-benefit">
                <div className="register-page-benefit-icon">
                  <User size={15} />
                </div>

                <div className="register-page-benefit-content">
                  <strong>Your personal workspace</strong>
                  <span>
                    Manage your work your way.
                  </span>
                </div>
              </div>

            </div>
          </div>

          <div className="register-page-brand-footer">
            <span>Simple.</span>
            <span>Focused.</span>
            <span>Productive.</span>
          </div>

        </section>

        {/* Registration Form */}
        <section className="register-page-form-section">

          <div className="register-page-card">

            <div className="register-page-header">
              <h1>Create your account</h1>

              <p>
                Join Taskly and start organizing your work.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="register-page-form"
            >

              {/* Name */}
              <div className="register-page-form-group">

                <label htmlFor="name">
                  Name
                </label>

                <div
                  className={`register-page-input-wrapper ${
                    errors.name
                      ? "register-page-input-error"
                      : ""
                  }`}
                >
                  <User size={18} />

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message:
                          "Name must be at least 2 characters",
                      },
                      maxLength: {
                        value: 50,
                        message:
                          "Name must be at most 50 characters",
                      },
                    })}
                  />
                </div>

                {errors.name && (
                  <span className="register-page-form-error">
                    {errors.name.message}
                  </span>
                )}

              </div>

              {/* Email */}
              <div className="register-page-form-group">

                <label htmlFor="email">
                  Email
                </label>

                <div
                  className={`register-page-input-wrapper ${
                    errors.email
                      ? "register-page-input-error"
                      : ""
                  }`}
                >
                  <Mail size={18} />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message:
                          "Please enter a valid email address",
                      },
                    })}
                  />
                </div>

                {errors.email && (
                  <span className="register-page-form-error">
                    {errors.email.message}
                  </span>
                )}

              </div>

              {/* Password */}
              <div className="register-page-form-group">

                <label htmlFor="password">
                  Password
                </label>

                <div
                  className={`register-page-input-wrapper ${
                    errors.password
                      ? "register-page-input-error"
                      : ""
                  }`}
                >
                  <Lock size={18} />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message:
                          "Password must be at least 8 characters",
                      },
                    })}
                  />

                  <button
                    type="button"
                    className="register-page-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <span className="register-page-form-error">
                    {errors.password.message}
                  </span>
                )}

              </div>

              {/* Confirm Password */}
              <div className="register-page-form-group">

                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <div
                  className={`register-page-input-wrapper ${
                    errors.confirmPassword
                      ? "register-page-input-error"
                      : ""
                  }`}
                >
                  <Lock size={18} />

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                      required:
                        "Please confirm your password",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                  />

                  <button
                    type="button"
                    className="register-page-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) => !previous
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <span className="register-page-form-error">
                    {errors.confirmPassword.message}
                  </span>
                )}

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="register-page-button"
                disabled={isSubmitting}
              >
                <span>
                  {isSubmitting
                    ? "Creating Account..."
                    : "Create Account"}
                </span>

                {!isSubmitting && (
                  <ArrowRight size={18} />
                )}
              </button>

            </form>

            <div className="register-page-login-existing">
              <span>
                Already have an account?
              </span>

              <button
                type="button"
                className="register-page-login-link"
                onClick={() => navigate("/")}
              >
                Login
              </button>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
}

export default Register;