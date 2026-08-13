import React from "react";
import type { Movie } from "../../types/movie";
import { MovieCard } from "../../components/MovieCard";

type FavoritesViewProps = {
  favorites: Movie[];
  loading: boolean;
  error: string | null;
  onToggleFavorite: (movie: Movie) => void;
};

export function FavoritesView({
  favorites,
  loading,
  error,
  onToggleFavorite,
}: FavoritesViewProps) {
  return (
    <main className="favorites-page">
      <h1>Favorites</h1>

      {loading && (
        <p className="loading-state">
          <span className="spinner" aria-hidden="true" />
          Loading favorites...
        </p>
      )}
      {error && <p className="error-state" role="alert">{error}</p>}

      {!loading && !error && favorites.length === 0 && (
        <p className="empty-state">No favorites saved yet.</p>
      )}

      <section className="movie-grid">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </section>
    </main>
  );
}
