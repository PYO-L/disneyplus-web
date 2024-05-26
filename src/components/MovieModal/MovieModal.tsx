import React from 'react';
import './modal.css';

interface MovieModalProps {
  setModalOpen: (open: boolean) => void;
  overview?: string;
  backdrop_path?: string;
  name?: string;
  title?: string;
  release_date?: string;
  vote_average?: number;
  first_air_date?: string;
}
const MovieModal: React.FC<MovieModalProps> = ({
  setModalOpen,
  overview,
  backdrop_path,
  name,
  title,
  release_date,
  vote_average,
  first_air_date,
}) => {
  console.log(backdrop_path);
  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <span
            className="modal-close"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            X
          </span>

          <img
            className="modal-img"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal-img"
          />
          <div className="modal-content">
            <p className="movie-details">
              <span>100% for you</span>{' '}
              {release_date ? release_date : first_air_date}
            </p>
            <p className="modal-rating">평점: {vote_average}</p>
            <h2 className="modal-title">{title ? title : name}</h2>
          </div>
          <span className="modal-overview">{overview}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
