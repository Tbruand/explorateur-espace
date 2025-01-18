import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Planets from "./pages/Planets";
import SolarSystem from "./pages/SolarSystem";
import Missions from "./pages/Missions";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        {/* Contenu principal avec flex-grow */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/solar-system" element={<SolarSystem />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {/* Affiche le footer sur toutes les pages sauf NotFound */}
        <Routes>          
          <Route path="/" element={<Footer />} />
          <Route path="/planets" element={<Footer />} />
          <Route path="/solar-system" element={<Footer />} />
          <Route path="/missions" element={<Footer />} />
          <Route path="*" element={null} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
