import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../../services/firebaseService";

export async function loginUser(email: string, password: string) {
  const trimmedEmail = email.trim();

  if (!trimmedEmail || !password.trim()) {
    throw new Error("Email and password are required.");
  }

  await signInWithEmailAndPassword(trimmedEmail, password);
}

export async function registerUser(email: string, password: string) {
  const trimmedEmail = email.trim();

  if (!trimmedEmail || !password.trim()) {
    throw new Error("Email and password are required.");
  }

  await createUserWithEmailAndPassword(trimmedEmail, password);
}
