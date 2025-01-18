import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-6 flex flex-col items-center justify-center">
      <p className="text-sm mb-2">© 2025 Explorateur de l'Espace.</p>
      {/* Lien vers GitHub */}
      <a
        href="https://github.com/Tbruand"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-500 text-sm"
      >
        Lien vers mon GitHub
      </a>
    </footer>
  );
};

export default Footer;
