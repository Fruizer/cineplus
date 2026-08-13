import { addFavorite, getFavorites, removeFavorite } from "../../services/firebaseService";
import type { Movie } from "../../types/movie";

export async function fetchUserFavorites(userId: string): Promise<Movie[]> {
  return getFavorites(userId);
}

export async function toggleUserFavorite(
  userId: string,
  movie: Movie,
  isFavorite: boolean
): Promise<void> {
  if (isFavorite) {
    await removeFavorite(userId, movie.imdbID);
    return;
  }

  await addFavorite(userId, movie);
}
