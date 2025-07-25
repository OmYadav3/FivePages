import { useEffect, useState } from "react";

const useBooks = (endpoint = "/novels") => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PORT || ""}${endpoint}`);
      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Fetch Error:", err.message);
      setError("Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [endpoint]); // re-fetch if endpoint changes

  return { books, loading, error };
};

export default useBooks;
