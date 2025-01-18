import React, { useState } from "react";
import Modal from "react-modal";
import Planet3D from "../components/Planet3D";
import { motion } from "framer-motion";

Modal.setAppElement("#root");

const Planets = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const planets = [
    {
      name: "Mercure",
      description: "La planète la plus proche du Soleil.",
      texture: "/textures/mercury.jpg",
      diameter: "4,879 km",
      distance: "57,910,000 km",
      orbitDuration: "88 jours",
      temperature: "167°C",
      satellites: 0,
    },
    {
      name: "Vénus",
      description: "La planète la plus chaude du système solaire.",
      texture: "/textures/venus.jpg",
      diameter: "12,104 km",
      distance: "108,200,000 km",
      orbitDuration: "225 jours",
      temperature: "464°C",
      satellites: 0,
    },
    {
      name: "Terre",
      description: "Notre maison dans l'univers.",
      texture: "/textures/earth.jpg",
      diameter: "12,742 km",
      distance: "149,600,000 km",
      orbitDuration: "365 jours",
      temperature: "15°C",
      satellites: 1,
    },
    {
      name: "Mars",
      description: "Connue comme la planète rouge.",
      texture: "/textures/mars.jpg",
      diameter: "6,779 km",
      distance: "227,940,000 km",
      orbitDuration: "687 jours",
      temperature: "-65°C",
      satellites: 2,
    },
    {
      name: "Jupiter",
      description: "La plus grande planète du système solaire.",
      texture: "/textures/jupiter.jpg",
      diameter: "139,820 km",
      distance: "778,500,000 km",
      orbitDuration: "4,333 jours",
      temperature: "-110°C",
      satellites: 79,
    },
    {
      name: "Saturne",
      description: "Fameuse pour ses anneaux spectaculaires.",
      texture: "/textures/saturn.jpg",
      diameter: "116,460 km",
      distance: "1,434,000,000 km",
      orbitDuration: "10,759 jours",
      temperature: "-140°C",
      satellites: 83,
    },
    {
      name: "Uranus",
      description: "Une planète géante glacée.",
      texture: "/textures/uranus.jpg",
      diameter: "50,724 km",
      distance: "2,871,000,000 km",
      orbitDuration: "30,687 jours",
      temperature: "-195°C",
      satellites: 27,
    },
    {
      name: "Neptune",
      description: "La planète la plus éloignée du Soleil.",
      texture: "/textures/neptune.jpg",
      diameter: "49,244 km",
      distance: "4,495,000,000 km",
      orbitDuration: "60,190 jours",
      temperature: "-200°C",
      satellites: 14,
    },
  ];

  return (
    <motion.div
      className='min-h-screen text-white lg:mx-16'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className='text-4xl font-bold text-center py-8'>Les Planètes</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4'>
        {planets.map((planet) => (
          <div
            key={planet.name}
            className='bg-gray-800 p-4 rounded-lg shadow-lg text-center cursor-pointer hover:scale-105 transform transition-transform duration-300'
            onClick={() => setSelectedPlanet(planet)}
          >
            <h2 className='text-2xl font-bold mb-2'>{planet.name}</h2>
            <Planet3D texture={planet.texture} />
          </div>
        ))}
      </div>

      {selectedPlanet && (
        <Modal
          isOpen={!!selectedPlanet}
          onRequestClose={() => setSelectedPlanet(null)}
          className='bg-gray-900 rounded-lg p-8 max-w-4xl mx-auto text-white max-h-[90vh] overflow-y-auto'
          overlayClassName='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center'
        >
          <button
            className='text-red-500 font-bold mb-4 sticky top-0 bg-gray-900 p-2 rounded'
            onClick={() => setSelectedPlanet(null)}
          >
            Fermer
          </button>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Visuel de la planète */}
            <div>
              <Planet3D texture={selectedPlanet.texture} />
            </div>

            {/* Contenu descriptif */}
            <div>
              <h2 className='text-3xl font-bold mb-4'>{selectedPlanet.name}</h2>
              <p className='mb-4'>{selectedPlanet.description}</p>
              <ul className='space-y-2'>
                <li>
                  <strong>Diamètre :</strong> {selectedPlanet.diameter}
                </li>
                <li>
                  <strong>Distance au Soleil :</strong>{" "}
                  {selectedPlanet.distance}
                </li>
                <li>
                  <strong>Durée de l'orbite :</strong>{" "}
                  {selectedPlanet.orbitDuration}
                </li>
                <li>
                  <strong>Température moyenne :</strong>{" "}
                  {selectedPlanet.temperature}
                </li>
                <li>
                  <strong>Satellites :</strong> {selectedPlanet.satellites}
                </li>
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </motion.div>
  );
};

export default Planets;
