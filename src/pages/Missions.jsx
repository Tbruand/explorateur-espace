import React, { useEffect, useState } from "react";
import missionsData from "../data/missions.json"; // Importez directement le JSON

const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Charger les missions par page
    const loadMissions = () => {
      const newMissions = missionsData.slice((page - 1) * 5, page * 5);
      setMissions((prev) => [...prev, ...newMissions]);
      if (newMissions.length === 0) {
        setHasMore(false);
      }
    };

    loadMissions();
  }, [page]);

  const loadMoreMissions = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className='min-h-screen text-white p-4'>
      <h1 className='text-4xl font-bold text-center mb-8'>
        Missions Spatiales
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {missions.map((mission) => (
          <div
            key={mission.id}
            className='bg-gray-800 p-4 rounded-lg shadow-lg'
          >
            <img
              src={mission.image}
              alt={mission.nom}
              className='w-full h-80 object-cover rounded-lg mb-4'
            />
            <h2 className='text-2xl font-bold mb-2'>{mission.nom}</h2>
            <p className='text-sm mb-2'>{mission.description}</p>
            <p className='text-sm text-gray-400'>
              Date : {mission.date} | Pays : {mission.pays}
            </p>
            <p className='text-sm text-gray-400'>Agence : {mission.agence}</p>
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={loadMoreMissions}
          className='bg-blue-500 text-white px-4 py-2 rounded-md mt-8 block mx-auto'
        >
          Charger plus
        </button>
      )}
    </div>
  );
};

export default Missions;
