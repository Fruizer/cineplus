import React from "react";
import { MovieCard } from "../../components/MovieCard";
import type { Movie } from "../../types/movie";

type HomeViewProps = {
  query: string;
  movies: Movie[];
  loading: boolean;
  error: string | null;
  onQueryChange: (value: string) => void;
  onToggleFavorite: (movie: Movie) => void;
  favorites: string[];
};

export function HomeView({
  query,
  movies,
  loading,
  error,
  onQueryChange,
  onToggleFavorite,
  favorites,
}: HomeViewProps) {
  return (
    <main className="home-page">
      <div className="home-page__search">
        <input
          type="text"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search movies..."
          aria-label="Search movies"
          className="search-input"
        />
      </div>

      {loading && (
        <p className="loading-state">
          <span className="spinner" aria-hidden="true" />
          Loading movies...
        </p>
      )}
      {error && <p className="error-state" role="alert">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="empty-state">No movies found.</p>
      )}

      <section className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={favorites.includes(movie.imdbID)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </section>
    </main>
  );
}
