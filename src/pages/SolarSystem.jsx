import React from "react";
import SolarSystem3D from "../components/SolarSystem3D";

const SolarSystem = () => {
  const SCALE_DISTANCE = 10; // Échelle pour espacer les orbites
  const SCALE_SIZE = 0.0025; // Échelle pour ajuster les tailles des planètes

  const planets = [
    {
      name: "Mercure",
      description: "La planète la plus proche du Soleil.",
      distance: 0.39 * SCALE_DISTANCE * 1.5, // Distance augmentée pour donner plus d'espace
      diameter: 4879 * SCALE_SIZE,
      orbitDuration: 88, // Durée d'une orbite (en jours terrestres)
      orbitalSpeed: 365 / 88, // Normalisé par rapport à la Terre
      temperature: 167, // Température moyenne (°C)
      satellites: 0, // Nombre de satellites
      texture: "/textures/mercury.jpg",
    },
    {
      name: "Vénus",
      description: "La planète la plus chaude du système solaire.",
      distance: 0.72 * SCALE_DISTANCE * 1.4, // Distance augmentée
      diameter: 12104 * SCALE_SIZE,
      orbitDuration: 225,
      orbitalSpeed: 365 / 225, // Normalisé par rapport à la Terre
      temperature: 464,
      satellites: 0,
      texture: "/textures/venus.jpg",
    },
    {
      name: "Terre",
      description: "Notre maison dans l'univers.",
      distance: 1 * SCALE_DISTANCE * 1.3, // Distance augmentée
      diameter: 12742 * SCALE_SIZE,
      orbitDuration: 365,
      orbitalSpeed: 1, // Référence (1 orbite par an)
      temperature: 15,
      satellites: 1,
      texture: "/textures/earth.jpg",
    },
    {
      name: "Mars",
      description: "Connue comme la planète rouge.",
      distance: 1.52 * SCALE_DISTANCE * 1.2, // Distance augmentée
      diameter: 6779 * SCALE_SIZE,
      orbitDuration: 687,
      orbitalSpeed: 365 / 687, // Normalisé par rapport à la Terre
      temperature: -65,
      satellites: 2,
      texture: "/textures/mars.jpg",
    },
    {
      name: "Jupiter",
      description: "La plus grande planète du système solaire.",
      distance: 5.2 * SCALE_DISTANCE,
      diameter: 139820 * SCALE_SIZE, // Jupiter est très grande
      orbitDuration: 4333,
      orbitalSpeed: 365 / 4333, // Normalisé par rapport à la Terre
      temperature: -110,
      satellites: 79,
      texture: "/textures/jupiter.jpg",
    },
    {
      name: "Saturne",
      description: "Fameuse pour ses anneaux spectaculaires.",
      distance: 9.58 * SCALE_DISTANCE,
      diameter: 116460 * SCALE_SIZE, // Légèrement plus petite que Jupiter
      orbitDuration: 10759,
      orbitalSpeed: 365 / 10759, // Normalisé par rapport à la Terre
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
      orbitalSpeed: 365 / 30687, // Normalisé par rapport à la Terre
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
      orbitalSpeed: 365 / 60190, // Normalisé par rapport à la Terre
      temperature: -200,
      satellites: 14,
      texture: "/textures/neptune.jpg",
    },
  ];

  return (
    <div className='bg-black min-h-screen text-white flex flex-col'>
      <h1 className='text-4xl font-bold text-center py-8'>Système Solaire</h1>
      <div className='flex-grow'>
        <SolarSystem3D planets={planets} />
      </div>
    </div>
  );
};

export default SolarSystem;
