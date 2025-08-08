import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { JSX, useMemo } from "react";
import { Page } from "../../utils/route";

interface DecodedToken {
  id: number;
  role: "user" | "admin";
  exp: number;
}

interface ProtectedAdminProps {
  children: JSX.Element;
}

const ProtectedAdmin: React.FC<ProtectedAdminProps> = ({ children }) => {
  const token = localStorage.getItem(
    import.meta.env.VITE_LOCAL_STORAGE_ACCESS_TOKEN
  );

  // Decode token safely
  const decoded = useMemo<DecodedToken | null>(() => {
    if (!token) return null;
    try {
      return jwtDecode<DecodedToken>(token);
    } catch {
      return null;
    }
  }, [token]);

  const isTokenValid = decoded && decoded.exp * 1000 > Date.now();
  if (!isTokenValid || decoded?.role !== "admin") {
    return <Navigate to={Page.LOGIN_PAGE} replace />;
  }

  return children;
};

export default ProtectedAdmin;
