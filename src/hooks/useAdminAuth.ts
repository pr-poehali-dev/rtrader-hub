import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

// Маппинг admin-логинов на email в club_users
const USERNAME_TO_EMAIL: Record<string, string> = {
  rtrader11: "rtrader11@rtrader11.ru",
  admin: "admin@rtrader11.ru",
};

export function useAdminAuth() {
  const { user, loading, login: authLogin, logout: authLogout } = useAuth();
  const [error, setError] = useState("");

  const isAuthed = !!user && (user.role === "owner" || user.role === "admin");

  const login = async (username: string, password: string) => {
    setError("");
    const email = USERNAME_TO_EMAIL[username.toLowerCase()] ?? username.toLowerCase();
    try {
      await authLogin(email, password);
    } catch {
      setError("Неверный логин или пароль");
    }
  };

  const logout = async () => {
    await authLogout();
  };

  return { isAuthed, login, logout, loading, error };
}

export function getAdminToken(): string {
  return localStorage.getItem("auth_token") || "";
}

export function getAdminUsername(): string {
  return localStorage.getItem("auth_username") || "";
}

export function useIsAdminAuthed(): boolean {
  return !!localStorage.getItem("auth_token");
}