import React, { useEffect, useState } from "react";
import missionsData from "../data/missions.json"; // Importation des données de missions depuis un fichier JSON

const Missions = () => {
  const [missions, setMissions] = useState([]); // État pour stocker les missions chargées
  const [page, setPage] = useState(1); // État pour suivre la page actuelle
  const [hasMore, setHasMore] = useState(true); // État pour savoir s'il reste des missions à charger

  useEffect(() => {
    // Fonction pour charger les missions par page
    const loadMissions = () => {
      const newMissions = missionsData.slice((page - 1) * 5, page * 5); // Charger 5 missions par page
      setMissions((prev) => [...prev, ...newMissions]); // Ajouter les nouvelles missions aux missions existantes
      if (newMissions.length === 0) {
        setHasMore(false); // Si aucune mission n'est chargée, désactiver le chargement
      }
    };

    loadMissions(); // Appel de la fonction lors de l'exécution du useEffect
  }, [page]); // Dépendance sur la page, ce qui recharge les missions lorsque la page change

  // Fonction pour charger plus de missions (augmenter la page)
  const loadMoreMissions = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className='min-h-screen text-white p-4'>
      {/* Titre principal de la page */}
      <h1 className='text-4xl font-bold text-center mb-8'>
        Missions Spatiales
      </h1>
      {/* Grille d'affichage des missions */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {missions.map((mission) => (
          <div
            key={mission.id} // Clé unique pour chaque mission
            className='bg-gray-800 p-4 rounded-lg shadow-lg'
          >
            {/* Image de la mission */}
            <img
              src={mission.image} // URL de l'image
              alt={mission.nom} // Texte alternatif
              className='w-full h-80 object-cover rounded-lg mb-4' // Styles pour l'image
            />
            {/* Nom de la mission */}
            <h2 className='text-2xl font-bold mb-2'>{mission.nom}</h2>
            {/* Description de la mission */}
            <p className='text-sm mb-2'>{mission.description}</p>
            {/* Informations supplémentaires sur la mission */}
            <p className='text-sm text-gray-400'>
              Date : {mission.date} | Pays : {mission.pays}
            </p>
            <p className='text-sm text-gray-400'>Agence : {mission.agence}</p>
          </div>
        ))}
      </div>
      {/* Bouton pour charger plus de missions */}
      {hasMore && (
        <button
          onClick={loadMoreMissions} // Appel de la fonction pour charger plus de missions
          className='bg-blue-500 text-white px-4 py-2 rounded-md mt-8 block mx-auto'
        >
          Charger plus
        </button>
      )}
    </div>
  );
};

export default Missions;
