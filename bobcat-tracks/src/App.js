import "./App.css";
import LoginPage from "./components/login-page";
import NavBar from "./components/navBar";
import { BarChart, Bargraph } from "./components/Bar.js";

function App() {
  return (
    <div className="App">
      {/* <Linegraph /> */}
      <h1>Banana</h1>
      <Bargraph />
      {/* <Piegraph /> */}
    </div>
  );
}

export default App;
