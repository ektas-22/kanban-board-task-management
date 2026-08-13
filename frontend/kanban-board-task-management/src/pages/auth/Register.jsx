import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { register as registerService } from "../../services/authService";
import { useAuth } from "../../context/useAuth";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const { login } = useAuth();
  const navigate = useNavigate();

  const password = watch("password");

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
    <div>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div>
          <label htmlFor="name">Name</label>

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

          {errors.name && <p>{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>

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

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />

          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>

          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />

          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Register"}
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <button type="button" onClick={() => navigate("/")}>
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;
