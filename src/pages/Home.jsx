import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchAPOD } from "../utils/api";

const Home = () => {
  const [apod, setApod] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAPOD();
        setApod(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      className='flex flex-col items-center justify-center text-white px-6'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className='lg:text-5xl text-3xl font-bold my-6 text-center'>
        Bienvenue sur l'Explorateur de l'Espace
      </h1>
      <p className='text-lg mb-10 text-center max-w-2xl'>
        Découvrez les merveilles de l'univers grâce à nos explorations
        interactives.
      </p>

      {/* Afficher une erreur si l'API échoue */}
      {error && <p className='text-red-500 mb-4'>Erreur : {error}</p>}

      {/* Afficher l'image du jour */}
      {apod ? (
        <div className='w-full max-w-4xl flex flex-col items-center bg-gray-800 bg-opacity-75 p-6 mb-8 rounded-lg shadow-lg'>
          <h2 className='text-3xl font-bold mb-2'>{apod.title}</h2>
          <p className='text-gray-400 mb-6'>{apod.date}</p>
          <img
            src={apod.url}
            alt={apod.title}
            className='rounded-lg shadow-lg mb-6 max-w-md w-full'
          />
          {/* Conteneur pour le texte de l'explication */}
          <div className='text-gray-300 text-sm leading-relaxed max-h-64 overflow-y-auto'>
            {apod.explanation}
          </div>
        </div>
      ) : (
        <p className='text-gray-300'>Chargement de l'image du jour...</p>
      )}
    </motion.div>
  );
};

export default Home;
