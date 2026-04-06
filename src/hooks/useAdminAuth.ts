import { useState, useEffect } from "react";

const AUTH_KEY = "rtrader_admin_auth";
const AUTH_URL = "https://functions.poehali.dev/2c438a15-2b16-4025-b518-29abd4812fc7";

export function useAdminAuth() {
  const [isAuthed, setIsAuthed] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === "1";
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (password: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        localStorage.setItem(AUTH_KEY, "1");
        localStorage.setItem("rtrader_admin_pwd", password);
        setIsAuthed(true);
      } else {
        setError("Неверный пароль");
      }
    } catch {
      setError("Ошибка соединения");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem("rtrader_admin_pwd");
    setIsAuthed(false);
  };

  return { isAuthed, login, logout, loading, error };
}

export function getAdminPassword(): string {
  return localStorage.getItem("rtrader_admin_pwd") || "";
}
