import "./App.css";
import LoginPage from "./components/login-page";
import NavBar from "./components/navBar";
import { BarChart } from "./components/Bar.js";

function App() {
  return (
    <div>
      <h1>Banana</h1>
      <BarChart />
    </div>

    // <LoginPage />

    // <div className="container">
    //   <NavBar />

    //   <LoginPage />
    // </div>
  );
}

export default App;
