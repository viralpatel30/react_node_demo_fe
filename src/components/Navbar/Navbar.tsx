import { useNavigate } from "react-router-dom";
import { Page } from "../../utils/route";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE_ACCESS_TOKEN);
    navigate(Page.LOGIN_PAGE);
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#282c34",
      }}
    >
      <button
        onClick={handleLogout}
        style={{
          padding: "8px 16px",
          backgroundColor: "#ff4d4f",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
};
