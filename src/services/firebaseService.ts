import type { Movie } from "../types/movie";

type MockUser = {
  uid: string;
  email: string;
};

type MockSession = {
  user: MockUser | null;
};

const USERS_KEY = "cineplus_users";
const SESSION_KEY = "cineplus_session";
const FAVORITES_KEY_PREFIX = "cineplus_favorites_";

function readStorage<T>(key: string, fallback: T): T {
  const value = window.localStorage.getItem(key);

  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getUserStore(): Record<string, { email: string; password: string }> {
  return readStorage<Record<string, { email: string; password: string }>>(USERS_KEY, {});
}

function saveUserStore(users: Record<string, { email: string; password: string }>) {
  writeStorage(USERS_KEY, users);
}

function getSession(): MockSession {
  return readStorage<MockSession>(SESSION_KEY, { user: null });
}

function saveSession(session: MockSession) {
  writeStorage(SESSION_KEY, session);
}

export const auth = {
  currentUser: getSession().user,
};

export async function signInWithEmailAndPassword(email: string, password: string) {
  const users = getUserStore();
  const normalizedEmail = email.trim().toLowerCase();
  const userEntry = users[normalizedEmail];

  if (!userEntry || userEntry.password !== password) {
    throw new Error("Incorrect email or password.");
  }

  const user: MockUser = {
    uid: `mock-user-${normalizedEmail}`,
    email: userEntry.email,
  };

  auth.currentUser = user;
  saveSession({ user });

  return { user };
}

export async function createUserWithEmailAndPassword(email: string, password: string) {
  const users = getUserStore();
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !password.trim()) {
    throw new Error("Email and password are required.");
  }

  if (users[normalizedEmail]) {
    throw new Error("An account with this email already exists.");
  }

  users[normalizedEmail] = {
    email: normalizedEmail,
    password,
  };

  saveUserStore(users);

  return signInWithEmailAndPassword(normalizedEmail, password);
}

export async function signOut() {
  auth.currentUser = null;
  saveSession({ user: null });
}

export function onAuthStateChanged(
  _auth: typeof auth,
  callback: (user: MockUser | null) => void
) {
  const syncUser = () => callback(getSession().user ?? null);
  syncUser();

  window.addEventListener("storage", syncUser);

  return () => {
    window.removeEventListener("storage", syncUser);
  };
}

export async function addFavorite(userId: string, movie: Movie): Promise<void> {
  if (!userId.trim()) {
    throw new Error("A user ID is required to save a favorite.");
  }

  const favoritesKey = `${FAVORITES_KEY_PREFIX}${userId}`;
  const favorites = readStorage<Movie[]>(favoritesKey, []);

  const exists = favorites.some((favorite) => favorite.imdbID === movie.imdbID);
  if (!exists) {
    writeStorage(favoritesKey, [...favorites, movie]);
  }
}

export async function removeFavorite(userId: string, movieId: string): Promise<void> {
  if (!userId.trim()) {
    throw new Error("A user ID is required to remove a favorite.");
  }

  const favoritesKey = `${FAVORITES_KEY_PREFIX}${userId}`;
  const favorites = readStorage<Movie[]>(favoritesKey, []);
  writeStorage(
    favoritesKey,
    favorites.filter((favorite) => favorite.imdbID !== movieId)
  );
}

export async function getFavorites(userId: string): Promise<Movie[]> {
  if (!userId.trim()) {
    throw new Error("A user ID is required to fetch favorites.");
  }

  const favoritesKey = `${FAVORITES_KEY_PREFIX}${userId}`;
  return readStorage<Movie[]>(favoritesKey, []);
}
