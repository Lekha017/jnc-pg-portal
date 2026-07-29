import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();

      logout();

      if (onLogout) {
        onLogout();
      }

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md font-semibold"
    >
      Logout
    </button>
  );
};

export default LogoutButton;