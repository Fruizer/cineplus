import React, { type FormEvent } from "react";

type AuthViewProps = {
  mode: "login" | "register";
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  onModeChange: (mode: "login" | "register") => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function AuthView({
  mode,
  email,
  password,
  loading,
  error,
  onModeChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: AuthViewProps) {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-toggle">
          <button
            type="button"
            onClick={() => onModeChange("login")}
            className={mode === "login" ? "active" : ""}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => onModeChange("register")}
            className={mode === "register" ? "active" : ""}
          >
            Register
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error && <p role="alert">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
}
