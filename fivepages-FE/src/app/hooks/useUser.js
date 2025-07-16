import { useState, useEffect, useCallback } from "react";

export function useUser(defaultUser) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const getToken = useCallback(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      const parsedUser = JSON.parse(storedUser);
      return parsedUser.token;
    } catch (err) {
      console.error("Error parsing user from localStorage", err);
      return null;
    }
  }, []);

  const fetchUserData = useCallback(async () => {
    try {
      const token = getToken();
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
      setUser(defaultUser);
    } finally {
      setLoadingUser(false);
    }
  }, [getToken, defaultUser]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return { user, setUser, token, loadingUser };
}
