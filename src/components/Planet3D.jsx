import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Planet3D = ({ texture }) => {
  // Références pour le conteneur du rendu et le renderer
  const mountRef = useRef(null);
  const rendererRef = useRef(null); // Référence pour stocker le renderer

  useEffect(() => {
    const currentMount = mountRef.current;

    // 1. Création de la scène, de la caméra et du renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, // Champ de vision (FOV)
      currentMount.clientWidth / currentMount.clientHeight, // Ratio largeur/hauteur
      0.1, // Distance minimale visible
      1000 // Distance maximale visible
    );
    camera.position.z = 2; // Position initiale de la caméra

    // Création du renderer avec fond transparent
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight); // Définit la taille du canvas
    currentMount.appendChild(renderer.domElement); // Ajoute le canvas au DOM
    rendererRef.current = renderer; // Stocke le renderer pour le nettoyage futur

    // 2. Création de la planète avec texture
    const geometry = new THREE.SphereGeometry(1, 32, 32); // Géométrie sphérique avec 32 segments
    const textureLoader = new THREE.TextureLoader(); // Chargeur de textures
    const material = new THREE.MeshStandardMaterial({
      map: textureLoader.load(texture), // Applique la texture sur la sphère
    });
    const planet = new THREE.Mesh(geometry, material); // Combine géométrie et matériau
    scene.add(planet); // Ajoute la planète à la scène

    // 3. Ajout des lumières
    const light = new THREE.PointLight(0xffffff, 1); // Lumière directionnelle
    light.position.set(5, 5, 5); // Position de la lumière
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Lumière ambiante douce
    scene.add(ambientLight);

    // 4. Fonction d'animation
    const animate = () => {
      planet.rotation.y += 0.005; // Rotation lente autour de l'axe Y
      renderer.render(scene, camera); // Rend la scène à chaque frame
    };

    renderer.setAnimationLoop(animate); // Définit une boucle d'animation

    // 5. Nettoyage lors du démontage du composant
    return () => {
      renderer.dispose(); // Libère le renderer
      geometry.dispose(); // Libère la géométrie
      material.dispose(); // Libère le matériau
      renderer.setAnimationLoop(null); // Arrête la boucle d'animation
      if (renderer.domElement) {
        currentMount.removeChild(renderer.domElement); // Retire le canvas du DOM
      }
    };
  }, [texture]); // Exécuter l'effet lorsqu'une nouvelle texture est fournie

  return (
    // Conteneur pour l'affichage du canvas Three.js
    <div
      ref={mountRef}
      style={{ width: "100%", height: "300px" }} // Définit les dimensions du conteneur
      className="mx-auto" // Centrage horizontal
    ></div>
  );
};

export default Planet3D;
