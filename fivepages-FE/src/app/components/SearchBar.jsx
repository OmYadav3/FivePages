"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const triggerSearch = useCallback(() => {
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search/${encodeURIComponent(trimmed)}`);
      setQuery("");
    }
  }, [query, router]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") triggerSearch();
    },
    [triggerSearch]
  );

  return (
    <div className="flex items-center border border-gray-400 rounded-md px-3 py-1">
      <input
        type="text"
        placeholder="Search novels..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="outline-none text-sm text-gray-700 px-2 w-36"
      />
      <FaSearch
        className="text-gray-600 cursor-pointer"
        onClick={triggerSearch}
      />
    </div>
  );
}
