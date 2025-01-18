import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Planet3D = ({ texture }) => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null); // Référence pour le renderer

  useEffect(() => {
    const currentMount = mountRef.current;

    // Création de la scène, caméra et renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Alpha pour fond transparent
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer; // Stocke le renderer pour le nettoyage

    // Création de la planète avec texture
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const material = new THREE.MeshStandardMaterial({
      map: textureLoader.load(texture),
    });
    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    // Lumières
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Animation
    const animate = () => {
      planet.rotation.y += 0.005; // Rotation lente
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate); // Définit la boucle d'animation

    // Nettoyage
    return () => {
      renderer.dispose(); // Détruit le renderer
      geometry.dispose(); // Libère la géométrie
      material.dispose(); // Libère le matériau
      renderer.setAnimationLoop(null); // Stoppe l'animation
      if (renderer.domElement) {
        currentMount.removeChild(renderer.domElement); // Retire le canvas
      }
    };
  }, [texture]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "300px" }}
      className="mx-auto"
    ></div>
  );
};

export default Planet3D;
