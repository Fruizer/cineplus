import { useEffect, useRef, useState } from "react";

import { fetchInitialMovies, searchMoviesModel } from "./homeModel";
import type { Movie } from "../../types/movie";

export function useHomeViewModel() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadInitialMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const initialMovies = await fetchInitialMovies();
        if (isMounted) {
          setMovies(initialMovies);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load movies right now."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadInitialMovies();

    return () => {
      isMounted = false;
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleSearch = (nextQuery: string) => {
    setQuery(nextQuery);

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(async () => {
      const trimmedQuery = nextQuery.trim();

      if (!trimmedQuery) {
        setMovies([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await searchMoviesModel(trimmedQuery);
        setMovies(results);
      } catch (searchError) {
        setError(
          searchError instanceof Error
            ? searchError.message
            : "Unable to search movies right now."
        );
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  return {
    query,
    movies,
    loading,
    error,
    setQuery: handleSearch,
    handleSearch,
  };
}
