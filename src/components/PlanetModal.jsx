import React, { useEffect } from "react";
import Modal from "react-modal";

const PlanetModal = ({ selectedPlanet, setSelectedPlanet }) => {
  // Utilisation d'un effet pour gérer la fermeture de la modale avec la touche "Escape"
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedPlanet(null); // Fermer la modale si "Escape" est pressée
      }
    };

    // Ajout d'un écouteur pour détecter les touches du clavier
    window.addEventListener("keydown", handleKeyDown);

    // Nettoyage lors du démontage du composant
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setSelectedPlanet]); // Dépendance sur `setSelectedPlanet` pour éviter des références obsolètes

  // Si aucune planète n'est sélectionnée, ne pas afficher la modale
  if (!selectedPlanet) return null;

  return (
    <Modal
      isOpen={!!selectedPlanet} // Vérifie si une planète est sélectionnée
      onRequestClose={() => setSelectedPlanet(null)} // Ferme la modale si l'utilisateur clique en dehors
      className="bg-gray-900 rounded-lg p-6 max-w-3xl mx-auto text-white"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
    >
      <div onClick={(e) => e.stopPropagation()}> {/* Empêche la propagation des clics vers l'overlay */}
        {/* Bouton pour fermer la modale */}
        <button
          className="text-red-500 font-bold mb-4"
          onClick={() => setSelectedPlanet(null)}
        >
          Fermer
        </button>

        {/* Contenu de la modale */}
        <div>
          {/* Nom de la planète */}
          <h2 className="text-3xl font-bold mb-4">{selectedPlanet.name}</h2>

          {/* Image de la planète */}
          <img
            src={selectedPlanet.texture} // Texture de la planète
            alt={selectedPlanet.name} // Texte alternatif
            className="rounded shadow-lg w-full max-w-sm mx-auto mb-4"
          />

          {/* Détails de la planète */}
          <ul className="space-y-2 text-lg">
            <li>
              <strong>Description : </strong>
              {selectedPlanet.description}
            </li>
            <li>
              <strong>Distance au Soleil : </strong>
              {selectedPlanet.distance} unités astronomiques (UA)
            </li>
            <li>
              <strong>Diamètre : </strong>
              {selectedPlanet.diameter} km
            </li>
            <li>
              <strong>Durée d'une orbite : </strong>
              {selectedPlanet.orbitDuration} jours terrestres
            </li>
            <li>
              <strong>Température moyenne : </strong>
              {selectedPlanet.temperature}°C
            </li>
            <li>
              <strong>Nombre de satellites : </strong>
              {selectedPlanet.satellites}
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default PlanetModal;
