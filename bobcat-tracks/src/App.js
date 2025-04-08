import "./App.css";
import LoginPage from "./components/login-page";
import ChangePasswordPage from "./components/changePasswordPage";
import NavBar from "./components/navBar";
import AttendancePage from "./components/AttendancePage";
import UploadPage from "./components/UploadPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import MulticheckPage from "./components/MulticheckPage";
import AdminPage from "./components/createAdminAccount";
import CPTPage from "./components/CPTPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/change-password" element={<ChangePasswordPage />}></Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="/AdminCreate" element={<AdminPage />}></Route>

        {/* unprotected route for development */}
        <Route path="/CPT" element={<CPTPage />}></Route>

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <AttendancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/multicheck"
          element={
            <ProtectedRoute>
              <MulticheckPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    // <div className="App">
    //   <AttendancePage />
    // </div>
  );
}

export default App;
