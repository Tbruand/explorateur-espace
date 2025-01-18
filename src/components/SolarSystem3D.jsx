import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const SolarSystem3D = ({ planets }) => {
  const mountRef = useRef(null); // Référence pour le conteneur de la scène
  const [planetVisibility, setPlanetVisibility] = useState(
    planets.reduce((acc, planet) => ({ ...acc, [planet.name]: true }), {}) // Initialisation : toutes les planètes visibles
  );
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768); // Détecte si l'utilisateur est sur un écran desktop

  // Mise à jour de l'état en fonction de la taille de l'écran
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialisation de la scène, caméra, renderer et objets 3D
  useEffect(() => {
    const currentMount = mountRef.current;

    // Création de la scène
    const scene = new THREE.Scene();

    // Configuration de la caméra
    const camera = new THREE.PerspectiveCamera(
      75, // Champ de vision
      currentMount.clientWidth / currentMount.clientHeight, // Ratio d'aspect
      0.1, // Distance minimale visible
      1000 // Distance maximale visible
    );
    camera.position.set(0, 40, 80); // Position initiale de la caméra

    // Création du renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Ajout des lumières
    const light = new THREE.PointLight(0xffffff, 1.5);
    light.position.set(0, 0, 0);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x808080, 1.5);
    scene.add(ambientLight);

    // Soleil (étoile centrale)
    const sunTexture = new THREE.TextureLoader().load("/textures/sun.jpg");
    const sunMaterial = new THREE.MeshStandardMaterial({
      map: sunTexture,
      emissive: 0xffa500,
      emissiveIntensity: 1.5,
    });
    const sunGeometry = new THREE.SphereGeometry(2.5, 32, 32);
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Création des planètes
    const planetMeshes = [];
    planets.forEach((planet) => {
      const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(planet.texture),
        emissive: new THREE.Color(0x222222),
        emissiveIntensity: 0.3,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(planet.distance, 0, 0); // Position initiale en orbite
      scene.add(mesh);
      planetMeshes.push(mesh);
    });

    // Configuration des OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Damping pour des transitions plus fluides
    controls.dampingFactor = 0.05;

    // Gestion des comètes
    const cometGeometry = new THREE.SphereGeometry(0.5, 8, 8);
    const cometMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const comets = [];
    const MAX_COMETS = 10;

    const spawnComet = () => {
      if (comets.length >= MAX_COMETS) return;

      const comet = new THREE.Mesh(cometGeometry, cometMaterial);
      comet.position.set(
        Math.random() * 300 - 150, // Position X aléatoire
        Math.random() * 300 - 150, // Position Y aléatoire
        Math.random() * 300 - 150 // Position Z aléatoire
      );
      const velocity = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize(); // Vitesse normalisée
      scene.add(comet);
      comets.push({ mesh: comet, velocity, life: 300 }); // Comète avec durée de vie limitée
    };

    const cometInterval = setInterval(spawnComet, 2000); // Génère une comète toutes les 2 secondes

    // Fonction d'animation
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.0001;

      // Animation des planètes (orbites et rotation)
      planetMeshes.forEach((mesh, index) => {
        const planet = planets[index];
        const orbitalTime = time * planet.orbitalSpeed; // Calcule la position en orbite
        const x = planet.distance * Math.cos(orbitalTime);
        const z = planet.distance * Math.sin(orbitalTime);
        mesh.position.set(x, 0, z);
        mesh.rotation.y += 0.01; // Rotation sur l'axe Y
        mesh.visible = planetVisibility[planet.name]; // Affiche ou masque la planète
      });

      // Animation des comètes
      comets.forEach((comet, index) => {
        comet.mesh.position.add(comet.velocity);
        comet.life -= 1;
        if (comet.life <= 0) {
          scene.remove(comet.mesh); // Retire la comète lorsque sa durée de vie est écoulée
          comets.splice(index, 1);
        }
      });

      controls.update(); // Met à jour les contrôles de la caméra
      renderer.render(scene, camera); // Rendu de la scène
    };

    animate();

    // Nettoyage
    return () => {
      clearInterval(cometInterval); // Arrête la génération de comètes
      controls.dispose(); // Libère les ressources des OrbitControls
      renderer.dispose(); // Libère le renderer
      currentMount.removeChild(renderer.domElement); // Supprime le canvas
    };
  }, [planets, planetVisibility]);

  // Fonction pour basculer la visibilité des planètes
  const togglePlanetVisibility = (planetName) => {
    setPlanetVisibility((prev) => ({
      ...prev,
      [planetName]: !prev[planetName],
    }));
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Conteneur pour le canvas Three.js */}
      <div ref={mountRef} style={{ width: "100%", height: "800px" }} />

      {/* Interface utilisateur pour gérer la visibilité des planètes (desktop uniquement) */}
      {isDesktop && (
        <div
          className="absolute right-4 top-4 bg-gray-800 p-4 rounded-lg shadow-lg w-64"
          style={{ zIndex: 10 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-white text-xl font-bold mb-4">Planètes</h2>
          <ul>
            {planets.map((planet) => (
              <li key={planet.name} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={planet.name}
                  checked={planetVisibility[planet.name]} // Gère l'état de visibilité
                  onChange={(e) => {
                    e.stopPropagation();
                    togglePlanetVisibility(planet.name); // Bascule la visibilité
                  }}
                  className="mr-2"
                />
                <label
                  htmlFor={planet.name}
                  className="text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  {planet.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SolarSystem3D;
