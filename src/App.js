import React, { useEffect, useState, useCallback } from 'react';
import Movie from './components/Movie';
import './App.css';

// API configuration - use .env for production
const API_KEY = process.env.REACT_APP_API_KEY || 'f7b19bf11253b0ebc77a2b7b62673e3e';
const BASE_URL = 'https://api.themoviedb.org/3';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Fetch movies from API
  const fetchMovies = useCallback(async (apiUrl, isSearch = false) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (isSearch) {
        setMovies(data.results || []);
        setSearchPerformed(true);
      } else {
        setMovies(data.results || []);
        setSearchPerformed(false);
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError(err.message || 'Failed to fetch movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch featured movies on component mount
  useEffect(() => {
    const featuredApiUrl = `${BASE_URL}/discover/movie?sort_by=popularity.desc&page=1&api_key=${API_KEY}`;
    fetchMovies(featuredApiUrl);
  }, [fetchMovies]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      // Reset to featured movies if search is empty
      const featuredApiUrl = `${BASE_URL}/discover/movie?sort_by=popularity.desc&page=1&api_key=${API_KEY}`;
      await fetchMovies(featuredApiUrl);
      setSearchPerformed(false);
      return;
    }

    const searchApiUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}&page=1&include_adult=false`;
    await fetchMovies(searchApiUrl, true);
  };

  // Handle search input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle "Clear Search" button
  const handleClearSearch = async () => {
    setSearchTerm('');
    setSearchPerformed(false);
    const featuredApiUrl = `${BASE_URL}/discover/movie?sort_by=popularity.desc&page=1&api_key=${API_KEY}`;
    await fetchMovies(featuredApiUrl);
  };

  // Handle key press on Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="app-title">🎬 Movie Search</h1>
      </header>

      <div className="search-container">
        <form onSubmit={handleSubmit} className="search-form" role="search">
          <input
            type="search"
            className="search-input"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            aria-label="Search movies"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="clear-btn"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          <button type="submit" className="search-btn" aria-label="Search">
            🔍
          </button>
        </form>

        {searchPerformed && (
          <div className="search-info" role="status">
            Found {movies.length} result{movies.length !== 1 ? 's' : ''} for "{searchTerm}"
          </div>
        )}
      </div>

      {loading && (
        <div className="loading" role="status">
          <span>Loading</span>
        </div>
      )}

      {error && (
        <div className="error-message" role="alert">
          <p>⚠️ {error}</p>
          <button
            onClick={() => fetchMovies(`${BASE_URL}/discover/movie?sort_by=popularity.desc&page=1&api_key=${API_KEY}`)}
            className="retry-btn"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && movies.length === 0 && !searchPerformed && (
        <div className="empty-state">
          <h3>No movies loaded</h3>
          <p>Try refreshing the page</p>
        </div>
      )}

      {!loading && !error && movies.length === 0 && searchPerformed && (
        <div className="empty-state">
          <h3>No movies found</h3>
          <p>Try a different search term</p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="movie-container" role="list">
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              title={movie.title || movie.name}
              poster_path={movie.poster_path}
              overview={movie.overview}
              vote_average={movie.vote_average}
              release_date={movie.release_date}
              popularity={movie.popularity}
              role="listitem"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;