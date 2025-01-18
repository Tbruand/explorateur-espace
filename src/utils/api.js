const API_KEY = process.env.REACT_APP_NASA_API_KEY;

export const fetchAPOD = async () => {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données APOD");
  }
  return response.json();
};
