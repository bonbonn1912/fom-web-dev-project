import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import "./App.css"; // Stile können mit TailwindCSS-Klassen angepasst werden
import LandingPage from "./components/LandinPage/LandingPage";


const App = () => {

  return (
    <Router>
    <Routes>
    <Route path="/" element={ <LandingPage />}/>
    <Route path="/home" element={ <Home />}/>
    </Routes>
  </Router>
  );
 
};


export default App;
