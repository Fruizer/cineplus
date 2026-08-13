import { searchMovies as searchOmdbMovies } from "../../services/omdbService";
import type { Movie } from "../../types/movie";

const seedKeywords = [
  "Batman",
  "Avengers",
  "Matrix",
  "Inception",
  "Spirited Away",
  "Alien",
  "Jurassic Park",
  "Toy Story",
  "The Godfather",
  "Star Wars",
  "Harry Potter",
  "The Dark Knight",
  "Interstellar",
  "Shrek",
  "Mad Max",
  "Dune",
  "Finding Nemo",
  "The Lion King",
  "Pride and Prejudice",
  "The Matrix",
];

function shuffle<T>(items: T[]): T[] {
  const nextItems = [...items];

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[randomIndex]] = [nextItems[randomIndex], nextItems[index]];
  }

  return nextItems;
}

export async function fetchInitialMovies(): Promise<Movie[]> {
  const results = await Promise.all(
    seedKeywords.map((keyword) => searchOmdbMovies(keyword))
  );

  const movies = results.flat();
  const uniqueMovies = Array.from(
    new Map(movies.map((movie) => [movie.imdbID, movie])).values()
  );

  return shuffle(uniqueMovies).slice(0, 20);
}

export async function searchMoviesModel(query: string): Promise<Movie[]> {
  return searchOmdbMovies(query);
}
