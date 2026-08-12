import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { login as loginService } from "../../services/authService";
function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log("0. onSubmit called", data);

    try {
      const response = await loginService(data);

      console.log("Login response:", response);

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
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
