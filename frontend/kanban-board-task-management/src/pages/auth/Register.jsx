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

import "../../assets/styles/register.css";

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

      // Registration API returns JWT, so log the user in
      login(response);

      toast.success("Registration successful");

      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);

      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Left branding section */}
        <section className="register-brand-section">
          <div className="register-brand-logo">
            <div className="register-brand-icon">
              <CheckSquare size={22} />
            </div>

            <div className="register-brand-text">
              <span className="register-brand-name">Taskly</span>

              <span className="register-brand-tagline">Work smarter</span>
            </div>
          </div>

          <div className="register-brand-content">
            <div className="register-eyebrow">
              <span className="register-eyebrow-dot"></span>
              GET STARTED
            </div>

            <h2>
              Turn your
              <br />
              <span>plans into progress.</span>
            </h2>

            <p>
              Create your account and start organizing your tasks with a simple
              and focused Kanban workflow.
            </p>

            <div className="register-benefits">
              <div className="register-benefit">
                <div className="benefit-icon">
                  <CheckSquare size={15} />
                </div>

                <div>
                  <strong>Stay organized</strong>
                  <span>Keep all your tasks in one place.</span>
                </div>
              </div>

              <div className="register-benefit">
                <div className="benefit-icon">
                  <ArrowRight size={15} />
                </div>

                <div>
                  <strong>Track your progress</strong>
                  <span>Move tasks from To Do to Done.</span>
                </div>
              </div>

              <div className="register-benefit">
                <div className="benefit-icon">
                  <User size={15} />
                </div>

                <div>
                  <strong>Your personal workspace</strong>
                  <span>Manage your work your way.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="register-brand-footer">
            <span>Simple.</span>
            <span>Focused.</span>
            <span>Productive.</span>
          </div>
        </section>

        {/* Registration form */}
        <section className="register-form-section">
          <div className="register-card">
            <div className="register-header">
              <h1>Create your account</h1>

              <p>Join TaskFlow and start organizing your work.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
              {/* Name */}
              <div className="register-form-group">
                <label htmlFor="name">Name</label>

                <div
                  className={`register-input-wrapper ${
                    errors.name ? "register-input-error" : ""
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
                        message: "Name must be at least 2 characters",
                      },
                      maxLength: {
                        value: 50,
                        message: "Name must be at most 50 characters",
                      },
                    })}
                  />
                </div>

                {errors.name && (
                  <span className="register-form-error">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="register-form-group">
                <label htmlFor="email">Email</label>

                <div
                  className={`register-input-wrapper ${
                    errors.email ? "register-input-error" : ""
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
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                </div>

                {errors.email && (
                  <span className="register-form-error">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="register-form-group">
                <label htmlFor="password">Password</label>

                <div
                  className={`register-input-wrapper ${
                    errors.password ? "register-input-error" : ""
                  }`}
                >
                  <Lock size={18} />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() => setShowPassword((previous) => !previous)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <span className="register-form-error">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="register-form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>

                <div
                  className={`register-input-wrapper ${
                    errors.confirmPassword ? "register-input-error" : ""
                  }`}
                >
                  <Lock size={18} />

                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword((previous) => !previous)
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
                  <span className="register-form-error">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="register-button"
                disabled={isSubmitting}
              >
                <span>
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </span>

                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="login-existing-account">
              <span>Already have an account?</span>

              <button
                type="button"
                className="register-login-link"
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
