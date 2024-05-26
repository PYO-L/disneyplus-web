import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import './DetailPage.css';

interface Movie {
  id: number;
  title: string;
  name: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

const DetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Movie>(`/movie/${movieId}`);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (loading) return <span className="span">Loading</span>;

  if (!movie) return <span className="span">Movie not Found</span>;

  return (
    <div className="presentation">
      <div key={movie.id} className="movie-detail">
        <img
          className="movie-img"
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt="movieImg"
        />
        <h1 className="movie-title">
          {movie.title ? movie.title : movie.name}
        </h1>
        <h2 className="movie-date">
          {movie.release_date ? movie.release_date : ''}
        </h2>
        <p className="movie-rank">
          평점:{movie.vote_average ? movie.vote_average : ''}
        </p>
        <span className="movie-overview">{movie.overview}</span>
      </div>
    </div>
  );
};

export default DetailPage;
