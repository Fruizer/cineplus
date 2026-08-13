# CinePulse — React & TypeScript Movie Discovery App

A modern, responsive movie discovery web application built with **React**, **TypeScript**, and **Vite** using the **MVVM (Model-View-ViewModel)** architectural pattern. Developed with the assistance of **GitHub Copilot / AI**, this project integrates with the **OMDB API** for movie search and features a local/session-persisted user authentication and favorites flow.

---

## 🌟 Features

- **MVVM Architecture:** Strict separation of data fetching/business logic (Model), UI state & actions (ViewModel), and presentational components (View).
- **Dynamic Search & Discovery:** Automated random initial movie generation on startup using seed keywords, along with debounced real-time title searches.
- **User Authentication & Favorites:** Scoped favorites management using local persistence (`localStorage`), fully prepared for Firebase Realtime Database migration.
- **Modern Dark UI:** Responsive multi-column grid layout with dark-mode aesthetic, glowing actions, and interactive movie cards.

---

## 🏗️ Project Architecture & Folder Structure

```text
cineplus/
├── public/
├── src/
│   ├── components/       # Reusable presentational components (Header, MovieCard)
│   ├── context/          # React Context (AuthContext for user session)
│   ├── pages/            # MVVM Screen Layers
│   │   ├── home/         # homeModel.ts, useHomeViewModel.ts, HomeView.tsx
│   │   ├── favorites/    # favoritesModel.ts, useFavoritesViewModel.ts, FavoritesView.tsx
│   │   └── auth/         # authModel.ts, useAuthViewModel.ts, AuthView.tsx
│   ├── services/         # Low-level API clients (omdbService, firebaseService)
│   ├── types/            # TypeScript interfaces (movie, user types)
│   ├── App.tsx           # Router configuration & protected routes
│   ├── main.tsx          # Application entry point
│   └── index.css         # Dark theme design system
├── .env                  # Environment configuration
├── index.html            # Vite entry point
├── package.json
├── tsconfig.json
└── vite.config.ts

