import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoutes() {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/" replace />;

    }
    return <Outlet />;

}

export default PrivateRoutes
