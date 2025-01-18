import React, { useEffect } from "react";
import Modal from "react-modal";

const PlanetModal = ({ selectedPlanet, setSelectedPlanet }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedPlanet(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setSelectedPlanet]);

  if (!selectedPlanet) return null;

  return (
    <Modal
      isOpen={!!selectedPlanet}
      onRequestClose={() => setSelectedPlanet(null)}
      className="bg-gray-900 rounded-lg p-6 max-w-3xl mx-auto text-white"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
    >
      <div onClick={(e) => e.stopPropagation()}>
        {/* Bouton de fermeture */}
        <button
          className="text-red-500 font-bold mb-4"
          onClick={() => setSelectedPlanet(null)}
        >
          Fermer
        </button>

        {/* Contenu de la modale */}
        <div>
          <h2 className="text-3xl font-bold mb-4">{selectedPlanet.name}</h2>

          <img
            src={selectedPlanet.texture}
            alt={selectedPlanet.name}
            className="rounded shadow-lg w-full max-w-sm mx-auto mb-4"
          />

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
