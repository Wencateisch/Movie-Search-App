import React from 'react';

const Img_api = "https://image.tmdb.org/t/p/w300";

/**
 * Returns vote color class based on rating
 * @param {number} vote - The movie rating (0-10)
 * @returns {string} CSS class name
 */
const setVoteClass = (vote) => {
  if (vote >= 8) return 'green';
  if (vote >= 6) return 'orange';
  return 'red';
};

/**
 * MovieCard Component
 * Displays movie poster, title, rating, and overview
 * Responsive design that works on all device sizes
 */
const Movie = ({ title, poster_path, overview, vote_average }) => {
  const fallbackImageUrl = "https://www.bloopanimation.com/wp-content/uploads/2018/05/making-a-film-yourself.jpg";

  return (
    <div className="movie card">
      <div className="movie-poster-wrapper">
        <img
          src={poster_path ? `${Img_api}${poster_path}` : fallbackImageUrl}
          alt={title}
          loading="lazy"
          className="movie-poster"
          onError={(e) => {
            e.target.src = fallbackImageUrl;
          }}
        />
        <div className="movie-overlay">
          <h3 className="movie-title">{title}</h3>
          <span className={`tag ${setVoteClass(vote_average)}`}>
            {vote_average.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="movie-content">
        <div className="movie-info">
          <h3 className="movie-title-mobile">{title}</h3>
          <span className={`tag ${setVoteClass(vote_average)}`}>
            ★ {vote_average.toFixed(1)}
          </span>
        </div>

        <div className="movie-overview">
          <h4>Overview</h4>
          <p>{overview || 'No overview available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default Movie;