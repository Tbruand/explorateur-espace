import { motion } from "framer-motion"; // Librairie pour les animations
import { useState, useEffect } from "react"; // Hooks React pour la gestion des états et des effets
import { fetchAPOD } from "../utils/api"; // Fonction utilitaire pour appeler l'API APOD

const Home = () => {
  const [apod, setApod] = useState(null); // État pour stocker les données de l'APOD (Astronomy Picture of the Day)
  const [error, setError] = useState(null); // État pour gérer les erreurs d'appel API

  useEffect(() => {
    // Fonction pour récupérer les données depuis l'API
    const fetchData = async () => {
      try {
        const data = await fetchAPOD(); // Appel à l'API
        setApod(data); // Stocker les données dans l'état
      } catch (err) {
        setError(err.message); // Stocker le message d'erreur en cas de problème
      }
    };

    fetchData(); // Appel de la fonction au chargement du composant
  }, []); // Le tableau de dépendances vide signifie que l'effet s'exécute uniquement au montage

  return (
    <motion.div
      className='flex flex-col items-center justify-center text-white px-6'
      initial={{ opacity: 0 }} // Animation de départ avec une opacité de 0
      animate={{ opacity: 1 }} // Transition vers une opacité de 1
      transition={{ duration: 1 }} // Durée de l'animation
    >
      {/* Titre principal de la page */}
      <h1 className='lg:text-5xl text-3xl font-bold my-6 text-center'>
        Bienvenue sur l'Explorateur de l'Espace
      </h1>

      {/* Description introductive */}
      <p className='text-lg mb-10 text-center max-w-2xl'>
        Découvrez les merveilles de l'univers grâce à nos explorations
        interactives.
      </p>

      {/* Afficher un message d'erreur en cas de problème avec l'API */}
      {error && <p className='text-red-500 mb-4'>Erreur : {error}</p>}

      {/* Afficher les données APOD si elles sont disponibles */}
      {apod ? (
        <div className='w-full max-w-4xl flex flex-col items-center bg-gray-800 bg-opacity-75 p-6 mb-8 rounded-lg shadow-lg'>
          {/* Titre de l'image ou vidéo */}
          <h2 className='text-3xl font-bold mb-2'>{apod.title}</h2>
          {/* Date de la photo ou vidéo */}
          <p className='text-gray-400 mb-6'>{apod.date}</p>
          {/* Image ou vidéo */}
          {apod.media_type === "video" ? (
            <iframe
              src={apod.url}
              title={apod.title}
              className='rounded-lg shadow-lg mb-6 max-w-md w-full aspect-video'
              allow="fullscreen"
            ></iframe>
          ) : (
            <img
              src={apod.url} // URL de l'image
              alt={apod.title} // Texte alternatif
              className='rounded-lg shadow-lg mb-6 max-w-md w-full' // Styles de l'image
            />
          )}
          {/* Explication de l'image ou vidéo */}
          <div className='text-gray-300 text-sm leading-relaxed max-h-64 overflow-y-auto'>
            {apod.explanation}
          </div>
        </div>
      ) : (
        // Message affiché pendant le chargement des données
        <p className='text-gray-300'>Chargement de l'image ou de la vidéo du jour...</p>
      )}
    </motion.div>
  );
};

export default Home;
