import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AuthView } from "./pages/auth/AuthView";
import { useAuthViewModel } from "./pages/auth/useAuthViewModel";
import { FavoritesView } from "./pages/favorites/FavoritesView";
import { useFavoritesViewModel } from "./pages/favorites/useFavoritesViewModel";
import { HomeView } from "./pages/home/HomeView";
import { useHomeViewModel } from "./pages/home/useHomeViewModel";

function ProtectedFavoritesRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <FavoritesPage />;
}

function HomePage() {
  const { query, movies, loading, error, setQuery } = useHomeViewModel();
  const { user, signOutUser } = useAuth();

  const handleToggleFavorite = () => {
    return undefined;
  };

  return (
    <>
      <Header
        isAuthenticated={Boolean(user)}
        onLogin={() => window.location.assign("/auth")}
        onLogout={() => void signOutUser()}
      />
      <HomeView
        query={query}
        movies={movies}
        loading={loading}
        error={error}
        onQueryChange={setQuery}
        onToggleFavorite={handleToggleFavorite}
        favorites={[]}
      />
    </>
  );
}

function AuthPage() {
  const { user, signOutUser } = useAuth();
  const {
    mode,
    email,
    password,
    loading,
    error,
    setMode,
    setEmail,
    setPassword,
    handleSubmit,
  } = useAuthViewModel();

  return (
    <>
      <Header
        isAuthenticated={Boolean(user)}
        onLogin={() => window.location.assign("/auth")}
        onLogout={() => void signOutUser()}
      />
      <AuthView
        mode={mode}
        email={email}
        password={password}
        loading={loading}
        error={error}
        onModeChange={setMode}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />
    </>
  );
}

function FavoritesPage() {
  const { user, signOutUser } = useAuth();
  const { favorites, loading, error, toggleFavorite } = useFavoritesViewModel();

  return (
    <>
      <Header
        isAuthenticated={Boolean(user)}
        onLogin={() => window.location.assign("/auth")}
        onLogout={() => void signOutUser()}
      />
      <FavoritesView
        favorites={favorites}
        loading={loading}
        error={error}
        onToggleFavorite={toggleFavorite}
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/favorites" element={<ProtectedFavoritesRoute />} />
      </Routes>
    </AuthProvider>
  );
}
