import "./App.css";
import LoginPage from "./components/login-page";
import ChangePasswordPage from "./components/changePasswordPage";
import NavBar from "./components/navBar";
import AttendancePage from "./components/AttendancePage";
import UploadPage from "./components/UploadPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/change-password" element={<ChangePasswordPage/>}></Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="/attendance" element={ <ProtectedRoute><AttendancePage /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
      </Routes>
    </Router>
    // <div className="App">
    //   <AttendancePage />
    // </div>
  );
}

export default App;
