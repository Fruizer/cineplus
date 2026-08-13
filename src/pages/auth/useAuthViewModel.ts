import React, { useState } from "react";

import { loginUser, registerUser } from "./authModel";

export function useAuthViewModel() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        await loginUser(email, password);
      } else {
        await registerUser(email, password);
      }
    } catch (authError) {
      setError(
        authError instanceof Error
          ? authError.message
          : "Unable to complete authentication right now."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    mode,
    email,
    password,
    loading,
    error,
    setMode,
    setEmail,
    setPassword,
    handleSubmit,
  };
}
