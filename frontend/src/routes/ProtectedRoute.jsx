import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
  children,
  roles = [],
}) => {
  const { user, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  // User not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based access
  if (
    roles.length > 0 &&
    !roles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  // Allow access
  return children;
};

export default ProtectedRoute;