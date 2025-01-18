import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const SolarSystem3D = ({ planets }) => {
  const mountRef = useRef(null);
  const [planetVisibility, setPlanetVisibility] = useState(
    planets.reduce((acc, planet) => ({ ...acc, [planet.name]: true }), {})
  );
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Création de la scène, de la caméra et du renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 40, 80);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Lumières
    const light = new THREE.PointLight(0xffffff, 1.5);
    light.position.set(0, 0, 0);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x808080, 1.5);
    scene.add(ambientLight);

    // Soleil
    const sunTexture = new THREE.TextureLoader().load("/textures/sun.jpg");
    const sunMaterial = new THREE.MeshStandardMaterial({
      map: sunTexture,
      emissive: 0xffa500,
      emissiveIntensity: 1.5,
    });
    const sunGeometry = new THREE.SphereGeometry(2.5, 32, 32);
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Planètes et leur animation
    const planetMeshes = [];
    planets.forEach((planet) => {
      const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(planet.texture),
        emissive: new THREE.Color(0x222222),
        emissiveIntensity: 0.3,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(planet.distance, 0, 0);
      scene.add(mesh);
      planetMeshes.push(mesh);
    });

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Met à jour `controls.target` pour zoomer dans la direction regardée
    controls.addEventListener("start", () => {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      const newTarget = camera.position.clone().add(direction.multiplyScalar(100));
      controls.target.copy(newTarget);
    });

    // Gestion des comètes
    const cometGeometry = new THREE.SphereGeometry(0.5, 8, 8);
    const cometMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const comets = [];
    const MAX_COMETS = 10;

    const spawnComet = () => {
      if (comets.length >= MAX_COMETS) return;

      const comet = new THREE.Mesh(cometGeometry, cometMaterial);
      comet.position.set(
        Math.random() * 300 - 150,
        Math.random() * 300 - 150,
        Math.random() * 300 - 150
      );
      const velocity = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize();
      scene.add(comet);
      comets.push({ mesh: comet, velocity, life: 300 });
    };

    const cometInterval = setInterval(spawnComet, 2000);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.0001;

      planetMeshes.forEach((mesh, index) => {
        const planet = planets[index];
        const orbitalTime = time * planet.orbitalSpeed;
        const x = planet.distance * Math.cos(orbitalTime);
        const z = planet.distance * Math.sin(orbitalTime);
        mesh.position.set(x, 0, z);
        mesh.rotation.y += 0.01;
        mesh.visible = planetVisibility[planet.name];
      });

      comets.forEach((comet, index) => {
        comet.mesh.position.add(comet.velocity);
        comet.life -= 1;
        if (comet.life <= 0) {
          scene.remove(comet.mesh);
          comets.splice(index, 1);
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Nettoyage
    return () => {
      clearInterval(cometInterval);
      controls.dispose();
      renderer.dispose();
      currentMount.removeChild(renderer.domElement);
    };
  }, [planets, planetVisibility]);

  const togglePlanetVisibility = (planetName) => {
    setPlanetVisibility((prev) => ({
      ...prev,
      [planetName]: !prev[planetName],
    }));
  };

  return (
    <div style={{ position: "relative" }}>
      <div ref={mountRef} style={{ width: "100%", height: "800px" }} />

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
                  checked={planetVisibility[planet.name]}
                  onChange={(e) => {
                    e.stopPropagation();
                    togglePlanetVisibility(planet.name);
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
