import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import type { Movie } from "../../types/movie";
import { fetchUserFavorites, toggleUserFavorite } from "./favoritesModel";

export function useFavoritesViewModel() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setError(null);
      return;
    }

    let isMounted = true;

    const loadFavorites = async () => {
      setLoading(true);
      setError(null);

      try {
        const userFavorites = await fetchUserFavorites(user.uid);
        if (isMounted) {
          setFavorites(userFavorites);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load favorites right now."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadFavorites();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const toggleFavorite = async (movie: Movie) => {
    if (!user) {
      return;
    }

    const isFavorite = favorites.some((favorite) => favorite.imdbID === movie.imdbID);

    try {
      await toggleUserFavorite(user.uid, movie, isFavorite);
      setFavorites((currentFavorites) =>
        isFavorite
          ? currentFavorites.filter((favorite) => favorite.imdbID !== movie.imdbID)
          : [...currentFavorites, movie]
      );
    } catch (toggleError) {
      setError(
        toggleError instanceof Error
          ? toggleError.message
          : "Unable to update favorites right now."
      );
    }
  };

  return {
    favorites,
    loading,
    error,
    toggleFavorite,
  };
}
