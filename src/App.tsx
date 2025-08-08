import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { UserDashboard } from "./components/User/UserDashboard";
import { AdminDashboard } from "./components/Admin/AdminDashboard";

import { Registration } from "./pages/Registration/Registration";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Page } from "./utils/route";
import ProtectedUser from "./components/ProtectedUser/ProtectedUser";
import ProtectedAdmin from "./components/ProtectedAdmin/ProtectedAdmin";
import { Navbar } from "./components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path={Page.LOGIN_PAGE} element={<Login />} />
          <Route path={Page.REGISTRATION_PAGE} element={<Registration />} />

          <Route>
            <Route
              path={Page.USER_DASHBOARD}
              element={
                <ProtectedUser>
                  <>
                    <Navbar />
                    <UserDashboard />
                  </>
                </ProtectedUser>
              }
            />
            <Route
              path={Page.ADMIN_DASHBOARD}
              element={
                <ProtectedAdmin>
                  <>
                    <Navbar />
                    <AdminDashboard />
                  </>
                </ProtectedAdmin>
              }
            />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
