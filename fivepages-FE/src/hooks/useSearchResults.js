"use client";
import { useEffect, useState, useMemo } from "react";

export default function useSearchResults(param) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = useMemo(() => decodeURIComponent(param || "").trim(), [param]);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PORT}novels/search/${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(data?.data || []);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return { query, results, loading };
}
