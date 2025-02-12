import "./App.css";
import LoginPage from "./components/login-page";
import NavBar from "./components/navBar";
import AttendancePage from "./components/AttendancePage";
import UploadPage from "./components/UploadPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </Router>
    // <div className="App">
    //   <AttendancePage />
    // </div>
  );
}

export default App;
