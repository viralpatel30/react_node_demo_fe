import React, { type JSX } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { UserDashboard } from "./components/User/UserDashboard";
import { AdminDashboard } from "./components/Admin/AdminDashboard";

import { Registration } from "./pages/Registration/Registration";
import { LOCAL_STORAGE } from "./utils/enum";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Page } from "./utils/route";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated =
    localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN) !== null;

  return isAuthenticated ? children : <Navigate to={Page.LOGIN_PAGE} replace />;
};

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path={Page.LOGIN_PAGE} element={<Login />} />
          <Route path={Page.REGISTRATION_PAGE} element={<Registration />} />
          <Route
            path={Page.USER_DASHBOARD}
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={Page.ADMIN_DASHBOARD}
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
