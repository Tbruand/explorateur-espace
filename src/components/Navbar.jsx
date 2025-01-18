import React, { useState } from "react";
import { Link } from "react-router-dom";
import PlanetLogo from "../assets/images/planet.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // État du menu burger

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */} 
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            {/* Affichage du logo SVG */}
            <img
              src={PlanetLogo}
              alt="Logo Planet"
              className="w-8 h-8 mr-2"
            />
            <span className="hidden sm:block text-xl font-bold">
              Explorateur de l'Espace
            </span>
          </Link>
        </div>

        {/* Menu desktop */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-400">
            Accueil
          </Link>
          <Link to="/planets" className="hover:text-gray-400">
            Planètes
          </Link>
          <Link to="/solar-system" className="hover:text-gray-400">
            Système Solaire
          </Link>
          <Link to="/missions" className="hover:text-gray-400">
            Missions
          </Link>
        </div>

        {/* Menu burger pour mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {/* Icone du menu burger */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile (affiché uniquement si isOpen est true) */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-gray-900 p-4 space-y-4">
          <Link
            to="/"
            className="block hover:text-gray-400"
            onClick={() => setIsOpen(false)} // Ferme le menu après le clic
          >
            Accueil
          </Link>
          <Link
            to="/planets"
            className="block hover:text-gray-400"
            onClick={() => setIsOpen(false)}
          >
            Planètes
          </Link>
          <Link
            to="/solar-system"
            className="block hover:text-gray-400"
            onClick={() => setIsOpen(false)}
          >
            Système Solaire
          </Link>
          <Link
            to="/missions"
            className="block hover:text-gray-400"
            onClick={() => setIsOpen(false)}
          >
            Missions
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
