import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CheckSquare, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

import { useAuth } from "../../context/useAuth";
import { login as loginService } from "../../services/authService";

import "../../assets/styles/login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginService(data);

      login(response);

      toast.success("Login successful");

      if (response.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Section */}
        {/* Left Section */}
        <section className="login-brand-section">
          <div className="brand-logo">
            <div className="brand-icon">
              <CheckSquare size={22} />
            </div>

            <div>
              <span className="brand-name">Taskly</span>
              <span className="brand-tagline">Work smarter</span>
            </div>
          </div>

          <div className="brand-content">
            <div className="eyebrow">
              <span className="eyebrow-dot"></span>
              YOUR WORKSPACE
            </div>

            <h2>
              Your work,
              <br />
              <span>organized.</span>
            </h2>

            <p>
              Plan your tasks, track your progress, and keep everything moving
              with a simple Kanban workflow.
            </p>

            <div className="kanban-wrapper">
              <div className="floating-card floating-card-one">
                <CheckSquare size={15} />
                <span>3 tasks completed</span>
              </div>

              <div className="floating-card floating-card-two">
                <span className="mini-avatar">E</span>
                <span>You're on track!</span>
              </div>

              <div className="kanban-board">
                {/* To Do */}
                <div className="kanban-column">
                  <div className="column-header">
                    <div className="column-title">
                      <span className="status-dot todo-dot"></span>
                      To Do
                    </div>

                    <span className="task-count">2</span>
                  </div>

                  <div className="task-card">
                    <div className="task-card-title">Design UI</div>

                    <div className="task-card-footer">
                      <span className="priority priority-high">High</span>

                      <span>Today</span>
                    </div>
                  </div>

                  <div className="task-card">
                    <div className="task-card-title">Write API</div>

                    <div className="task-card-footer">
                      <span className="priority priority-medium">Medium</span>

                      <span>Tomorrow</span>
                    </div>
                  </div>
                </div>

                {/* In Progress */}
                <div className="kanban-column">
                  <div className="column-header">
                    <div className="column-title">
                      <span className="status-dot progress-dot"></span>
                      Doing
                    </div>

                    <span className="task-count">1</span>
                  </div>

                  <div className="task-card">
                    <div className="task-card-title">Build Dashboard</div>

                    <div className="progress-line">
                      <span></span>
                    </div>

                    <div className="task-card-footer">
                      <span>60%</span>
                      <span>Today</span>
                    </div>
                  </div>
                </div>

                {/* Done */}
                <div className="kanban-column">
                  <div className="column-header">
                    <div className="column-title">
                      <span className="status-dot done-dot"></span>
                      Done
                    </div>

                    <span className="task-count">1</span>
                  </div>

                  <div className="task-card completed-card">
                    <div className="completed-title">
                      <CheckSquare size={13} />
                      Setup Project
                    </div>

                    <div className="task-card-footer">
                      <span>Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="brand-footer">
            <span>Simple.</span>
            <span>Focused.</span>
            <span>Productive.</span>
          </div>
        </section>

        {/* Right Section */}
        <section className="login-form-section">
          <div className="login-card">
            <div className="login-header">
              <h1>Welcome back</h1>

              <p>Sign in to continue to your workspace.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email address</label>

                <div
                  className={`input-wrapper ${
                    errors.email ? "input-error" : ""
                  }`}
                >
                  <Mail size={18} />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                </div>

                {errors.email && (
                  <span className="form-error">{errors.email.message}</span>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>

                <div
                  className={`input-wrapper ${
                    errors.password ? "input-error" : ""
                  }`}
                >
                  <Lock size={18} />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <span className="form-error">{errors.password.message}</span>
                )}
              </div>

              {/* Login */}
              <button
                type="submit"
                className="login-button"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Signing in..." : "Sign in"}</span>

                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="register-section">
              <span>Don't have an account?</span>

              <button
                type="button"
                className="register-link"
                onClick={() => navigate("/register")}
              >
                Create an account
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
