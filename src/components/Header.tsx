import React from "react";
import { NavLink, Link } from "react-router-dom";

type HeaderProps = {
  isAuthenticated: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
};

export function Header({ isAuthenticated, onLogin, onLogout }: HeaderProps) {
  return (
    <header className="header">
      <div className="brand">
        <span className="brand-mark">C</span>
        <Link to="/" className="brand-link">
          CinePlus
        </Link>
      </div>

      <nav className="nav" aria-label="Main navigation">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Home
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Favorites
        </NavLink>
      </nav>

      <button
        type="button"
        onClick={isAuthenticated ? onLogout : onLogin}
        className="auth-button"
      >
        {isAuthenticated ? "Logout" : "Login"}
      </button>
    </header>
  );
}
