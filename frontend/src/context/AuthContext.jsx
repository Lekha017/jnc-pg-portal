import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getProfile,
  logoutUser,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      setLoading(true);

      const res = await getProfile();

      setUser(res.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async () => {
    await checkAuth();
  };

  const logout = async () => {
    try {
      // Tell backend to clear JWT cookie
      await logoutUser();

      // Clear frontend authentication state
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);

      // Still clear frontend state
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);