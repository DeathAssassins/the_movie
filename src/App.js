import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const apiKey = "f33cd318f5135dba306176c13104506a";
  const baseUrl = "http://api.themoviedb.org/3/search/movie";

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Veuillez entrer un titre de film.");
      return;
    }
    setError("");
    try {
      const response = await fetch(
        `${baseUrl}?api_key=${apiKey}&query=${encodeURIComponent(
          query
        )}&language=fr-FR`
      );
      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="App">
      <h1>Recherche de Films</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Entrez un titre de film"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Rechercher</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="results">
        {movies.length > 0 ? (
          movies.map((movies) => (
            <div key={movies.id} className="movie">
              <h2>{movies.title}</h2>
              <p>
                <strong>Date de sortie :</strong>{" "}
                {movies.release_date || "Inconue"}
              </p>
              <p>{movies.overview || "Aucune description disponible."}</p>
            </div>
          ))
        ) : (
          <p>Aucun résultat trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default App;
