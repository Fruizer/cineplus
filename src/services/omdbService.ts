import type { Movie, OMDBResponse } from "../types/movie";

export async function searchMovies(query: string): Promise<Movie[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    throw new Error("Please enter a movie title to search.");
  }

  const env =
    (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env ??
    (globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> };
    }).process?.env ??
    {};

  const apiKey = env.VITE_OMDB_API_KEY?.trim() || "trilogy";

  const url = new URL("https://www.omdbapi.com/");
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("s", trimmedQuery);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`OMDB request failed (${response.status} ${response.statusText}).`);
  }

  const data = (await response.json()) as OMDBResponse;

  if (data.Response === "False") {
    throw new Error(data.Error ?? "No movies were found for that search.");
  }

  return data.Search ?? [];
}
