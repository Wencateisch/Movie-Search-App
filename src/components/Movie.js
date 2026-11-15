import React, { useState } from 'react';

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
 * Displays movie poster, title, rating, and opens IMDb-style modal on click
 */
const Movie = ({ title, poster_path, overview, vote_average, release_date, popularity, id }) => {
  const [showModal, setShowModal] = useState(false);

  const fallbackImageUrl = "https://www.bloopanimation.com/wp-content/uploads/2018/05/making-a-film-yourself.jpg";

  const handleOpenModal = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflow = ''; // Restore scroll
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <>
      <div
        className="movie-card"
        onClick={handleOpenModal}
        role="button"
        tabIndex={0}
        onKeyPress={handleKeyDown}
        aria-label={`Open ${title} details`}
      >
        <div className="movie-poster-wrapper">
          <img
            src={poster_path ? `${Img_api}${poster_path}` : fallbackImageUrl}
            alt={title}
            loading="lazy"
            onError={(e) => {
              e.target.src = fallbackImageUrl;
            }}
          />
          <div className="movie-overlay">
            <h3 className="movie-title">{title}</h3>
            <span className={`tag ${setVoteClass(vote_average)}`}>
              ★ {vote_average.toFixed(1)}
            </span>
            {release_date && (
              <small className="release-date">{release_date}</small>
            )}
          </div>
        </div>

        <div className="movie-content">
          <div className="movie-info">
            <h3 className="movie-title">{title}</h3>
            <span className={`tag ${setVoteClass(vote_average)}`}>
              ★ {vote_average.toFixed(1)}
            </span>
          </div>

          <div className="movie-meta">
            {release_date && <span className="meta-item">📅 {release_date}</span>}
            {popularity && <span className="meta-item">🔥 {popularity.toFixed(0)}</span>}
            <span className="meta-item">🎬 Click to view details</span>
          </div>
        </div>
      </div>

      {/* IMDb-style Modal */}
      {showModal && (
        <div className="movie-modal" onClick={handleBackdropClick} onKeyPress={handleKeyDown} role="dialog" aria-modal="true" aria-label={`Movie details: ${title}`}>
          <div className="movie-modal-content">
            <button className="modal-close" onClick={handleCloseModal} aria-label="Close modal">✕</button>

            <div className="modal-poster-section">
              <img
                src={poster_path ? `https://image.tmdb.org/t/p/w400${poster_path}` : fallbackImageUrl}
                alt={title}
                loading="lazy"
                onError={(e) => {
                  e.target.src = fallbackImageUrl;
                }}
              />
              <div className="modal-info">
                <h2 className="modal-title">{title}</h2>
                <div className="modal-rating">
                  <span className={`tag rating-big ${setVoteClass(vote_average)}`}>
                    ★ {vote_average.toFixed(1)}
                  </span>
                </div>
                <div className="modal-meta">
                  {release_date && <span>Release: {release_date}</span>}
                  {popularity && <span>Popularity: {popularity.toFixed(0)}</span>}
                </div>
              </div>
            </div>

            <div className="modal-details-section">
              <h3 className="details-heading">Synopsis</h3>
              <p className="modal-overview">{overview || 'No overview available.'}</p>

              <div className="details-row">
                <div className="detail-category">
                  <h4>Movie Details</h4>
                  <ul>
                    {release_date && <li><strong>Release Date:</strong> {release_date}</li>}
                    {popularity && <li><strong>Popularity:</strong> {popularity.toFixed(1)}</li>}
                    <li><strong>Vote:</strong> {vote_average.toFixed(1)} / 10</li>
                    <li><strong>ID:</strong> {id}</li>
                  </ul>
                </div>

                <div className="detail-category">
                  <h4>Quick Facts</h4>
                  <ul>
                    <li>Genre: Action, Adventure, Drama</li>
                    <li>Runtime: 148 min</li>
                    <li>Language: English</li>
                    <li>Status: Released</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;