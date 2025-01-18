import React from "react";
import SolarSystem3D from "../components/SolarSystem3D"; // Composant pour afficher le système solaire en 3D

const SolarSystem = () => {
  // Échelle pour ajuster les distances entre les orbites des planètes
  const SCALE_DISTANCE = 10;
  // Échelle pour ajuster les tailles des planètes
  const SCALE_SIZE = 0.0025;

  // Données des planètes du système solaire
  const planets = [
    {
      name: "Mercure",
      description: "La planète la plus proche du Soleil.", // Courte description de la planète
      distance: 0.39 * SCALE_DISTANCE * 1.5, // Distance relative au Soleil, augmentée pour l'espacement visuel
      diameter: 4879 * SCALE_SIZE, // Diamètre ajusté à l'échelle
      orbitDuration: 88, // Durée d'une orbite autour du Soleil (en jours terrestres)
      orbitalSpeed: 365 / 88, // Vitesse orbitale relative à la Terre (normalisation)
      temperature: 167, // Température moyenne en °C
      satellites: 0, // Nombre de satellites naturels
      texture: "/textures/mercury.jpg", // Texture de la planète
    },
    {
      name: "Vénus",
      description: "La planète la plus chaude du système solaire.",
      distance: 0.72 * SCALE_DISTANCE * 1.4,
      diameter: 12104 * SCALE_SIZE,
      orbitDuration: 225,
      orbitalSpeed: 365 / 225,
      temperature: 464,
      satellites: 0,
      texture: "/textures/venus.jpg",
    },
    {
      name: "Terre",
      description: "Notre maison dans l'univers.",
      distance: 1 * SCALE_DISTANCE * 1.3,
      diameter: 12742 * SCALE_SIZE,
      orbitDuration: 365,
      orbitalSpeed: 1, // Terre comme référence pour la vitesse orbitale
      temperature: 15,
      satellites: 1,
      texture: "/textures/earth.jpg",
    },
    {
      name: "Mars",
      description: "Connue comme la planète rouge.",
      distance: 1.52 * SCALE_DISTANCE * 1.2,
      diameter: 6779 * SCALE_SIZE,
      orbitDuration: 687,
      orbitalSpeed: 365 / 687,
      temperature: -65,
      satellites: 2,
      texture: "/textures/mars.jpg",
    },
    {
      name: "Jupiter",
      description: "La plus grande planète du système solaire.",
      distance: 5.2 * SCALE_DISTANCE,
      diameter: 139820 * SCALE_SIZE, // Taille significativement plus grande que les autres
      orbitDuration: 4333,
      orbitalSpeed: 365 / 4333,
      temperature: -110,
      satellites: 79,
      texture: "/textures/jupiter.jpg",
    },
    {
      name: "Saturne",
      description: "Fameuse pour ses anneaux spectaculaires.",
      distance: 9.58 * SCALE_DISTANCE,
      diameter: 116460 * SCALE_SIZE,
      orbitDuration: 10759,
      orbitalSpeed: 365 / 10759,
      temperature: -140,
      satellites: 83,
      texture: "/textures/saturn.jpg",
    },
    {
      name: "Uranus",
      description: "Une planète géante glacée.",
      distance: 19.22 * SCALE_DISTANCE,
      diameter: 50724 * SCALE_SIZE,
      orbitDuration: 30687,
      orbitalSpeed: 365 / 30687,
      temperature: -195,
      satellites: 27,
      texture: "/textures/uranus.jpg",
    },
    {
      name: "Neptune",
      description: "La planète la plus éloignée du Soleil.",
      distance: 30.05 * SCALE_DISTANCE,
      diameter: 49244 * SCALE_SIZE,
      orbitDuration: 60190,
      orbitalSpeed: 365 / 60190,
      temperature: -200,
      satellites: 14,
      texture: "/textures/neptune.jpg",
    },
  ];

  return (
    <div className='bg-black min-h-screen text-white flex flex-col'>
      {/* Titre principal de la page */}
      <h1 className='text-4xl font-bold text-center py-8'>Système Solaire</h1>
      
      {/* Composant principal contenant la visualisation 3D */}
      <div className='flex-grow'>
        {/* Passage des données des planètes au composant SolarSystem3D */}
        <SolarSystem3D planets={planets} />
      </div>
    </div>
  );
};

export default SolarSystem;
