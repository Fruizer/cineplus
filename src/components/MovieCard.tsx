import React from "react";
import type { Movie } from "../types/movie";

type MovieCardProps = {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
};

export function MovieCard({ movie, isFavorite, onToggleFavorite }: MovieCardProps) {
  const posterSrc =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <article className="movie-card">
      <div className="movie-card__poster-wrap">
        <img src={posterSrc} alt={movie.Title} className="movie-card__poster" />
      </div>

      <div className="movie-card__content">
        <div className="movie-card__header">
          <h3 className="movie-card__title">{movie.Title}</h3>
          <button
            type="button"
            onClick={() => onToggleFavorite(movie)}
            className={`favorite-toggle ${isFavorite ? "is-favorite" : ""}`}
            aria-label={
              isFavorite
                ? `Remove ${movie.Title} from favorites`
                : `Add ${movie.Title} to favorites`
            }
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>

        <div className="movie-card__meta">
          <span className="movie-card__badge">{movie.Year}</span>
          <span className="movie-card__badge type">{movie.Type}</span>
        </div>
      </div>
    </article>
  );
}
