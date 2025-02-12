import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.warn("No token found, you must login again");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
