import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import './Row.css';
import MovieModal from './MovieModal/MovieModal';

interface Movie {
  id: number;
  backdrop_path: string;
  name: string;
}

interface RowProps {
  title: string;
  id: string;
  fetchUrl: string;
}
const Row: React.FC<RowProps> = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [movieSelected, setMovieSelected] = useState<Movie | undefined>(
    undefined
  );

  useEffect(() => {
    fetchMovie();
  }, []);
  const fetchMovie = async () => {
    try {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = (movie: Movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider_arrow-left">
          <span
            className="arrow"
            onClick={() => {
              const element = document.getElementById(id);
              if (element) element.scrollLeft -= window.innerWidth - 80;
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
              const element = document.getElementById(id);
              if (element) element.scrollLeft += window.innerWidth - 80;
            }}
          >
            {'>'}
          </span>
        </div>
      </div>

      {modalOpen && movieSelected && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </div>
  );
};

export default Row;
