import "./App.css";
import logo from "/logo.svg";
import { CalculatorSection } from "./components/calculator-section/CalculatorSection";

function App() {
  return (
    <>
      <header className="header">
        <img src={logo} className="logo" />
        <h1>Tax calculator</h1>
      </header>
      <CalculatorSection />
    </>
  );
}

export default App;
