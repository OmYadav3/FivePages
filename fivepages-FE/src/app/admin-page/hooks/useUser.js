"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useUser(defaultUser) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    router.push("/login"); // Redirect to login page
  }, [router]);

  const fetchUserData = useCallback(async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) throw new Error("No user found");

      const parsedUser = JSON.parse(storedUser);
      const token = parsedUser.token;
      if (!token) throw new Error("No token found");

      setToken(token);

      const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}user/getUser`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.warn("Using default user due to error:", error);
      logout(); // Auto-logout on error
      setUser(defaultUser); // Fallback to default user (optional)
    } finally {
      setLoadingUser(false);
    }
  }, [defaultUser, logout]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return { user, setUser, token, loadingUser, logout };
}
