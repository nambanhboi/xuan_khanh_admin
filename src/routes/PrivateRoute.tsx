import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useAuth();

    if (isAuthenticated === null) return <div>Loading...</div>;
    return isAuthenticated ? children : <Navigate to="/seller-center/login" replace />;
};

export default ProtectedRoute;