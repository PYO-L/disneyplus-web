import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import './Row.css';
import MovieModal from './MovieModal/modal';

const Row = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovie();
  }, []);
  const fetchMovie = async () => {
    const response = await axios.get(fetchUrl);

    setMovies(response.data.results);
  };
  const handleModal = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
    console.log(movieSelected);
  };

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider_arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {'<'}
          </span>
        </div>

        <div id={id} className="row_posters">
          {movies.map((movie) => {
            return (
              <img
                key={movie.id}
                className="row_poster"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.name}
                onClick={() => handleModal(movie)}
              />
            );
          })}
        </div>

        <div className="slider_arrow-right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {'>'}
          </span>
        </div>
      </div>

      {modalOpen && (
        <MovieModal
          {...movieSelected}
          overview={movieSelected.overview}
          setmodalOpen={setModalOpen}
        />
      )}
    </div>
  );
};

export default Row;
