import "./App.css";
import LoginPage from "./components/login-page";
import NavBar from "./components/navBar";
import AttendancePage from "./components/AttendancePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AttendancePage />} /> 
          <Route path="/login-page" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
