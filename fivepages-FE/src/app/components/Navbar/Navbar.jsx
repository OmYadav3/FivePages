"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const isAuthenticated = useMemo(() => !!user, [user]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    } catch {
      setUser(null);
    }
  }, [pathname]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    sessionStorage.clear();
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    toast.success("You have logged out successfully!");
    setUser(null);
    router.push("/login");
  }, [router]);

  const handleSelectChange = useCallback(
    (e) => {
      const val = e.target.value;
      if (val === "profile") router.push("/profile");
      else if (val === "logout") handleLogout();
      e.target.value = "";
    },
    [router, handleLogout]
  );

  const triggerSearch = useCallback(() => {
    const q = searchQuery.trim();
    if (q) {
      router.push(`/search/${encodeURIComponent(q)}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  }, [router, searchQuery]);

  const onSearchKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") triggerSearch();
    },
    [triggerSearch]
  );

  const userLabel = useMemo(() => (user ? user.name : ""), [user]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/popularbooks", label: "Popular" },
    { path: "/new-releases-page", label: "New Release" },
    { path: "/allnovels", label: "Novels" },
  ];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-white text-blue-700 p-2"
      >
        Skip to content
      </a>

      <nav className="flex items-center justify-between px-6 bg-white shadow-md mb-2 sticky top-0 z-50">
        {/* Logo */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Go to homepage"
          onClick={() => router.push("/")}
          onKeyDown={(e) => e.key === "Enter" && router.push("/")}
          className="cursor-pointer"
        >
          <img src="/fivepagelogo.png" alt="Logo" className="w-auto h-16" />
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="md:hidden text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Nav Items */}
        <ul className="hidden md:flex gap-6 items-center">
          {navItems.map(({ path, label }) => {
            const isActive = pathname === path;
            return (
              <li key={path}>
                <Link
                  href={path}
                  className={`font-medium hover:text-blue-700 ${
                    isActive ? "text-blue-700" : "text-black"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Search + Profile (desktop) */}
        <div className="hidden md:flex items-center justify-center gap-4">
          {/* 🔍 Desktop SearchBar */}
          <SearchBar />

          {/* 👤 Profile */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <img
                src={"/default-avatar.webp"}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm"
              />
              <select
                aria-label="User menu"
                className="border border-gray-300 rounded-md px-2 py-1 bg-white cursor-pointer"
                onChange={handleSelectChange}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  {userLabel}
                </option>
                <option value="profile">Profile</option>
                <option value="logout">Logout</option>
              </select>
            </div>
          ) : (
            <Link href="/login">
              <button className="text-black px-2 py-1 rounded-md hover:bg-gray-100 transition">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* 📱 Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pb-4 space-y-3">
          {navItems.map(({ path, label }) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                onClick={() => setMenuOpen(false)}
                className={`block py-1 text-lg ${
                  isActive ? "text-blue-700 font-semibold" : "text-black"
                }`}
              >
                {label}
              </Link>
            );
          })}

          {/* 🔍 Mobile Search */}
          <div className="flex items-center border border-gray-400 rounded-md px-3 py-2">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={onSearchKeyDown}
              className="outline-none text-sm text-gray-700 px-2 w-full"
            />
            <FaSearch
              className="text-gray-700 cursor-pointer"
              onClick={triggerSearch}
            />
          </div>

          <hr className="my-3 border-gray-300" />

          {/* 👤 Mobile Profile */}
          {isAuthenticated ? (
            <>
              <div className="text-base text-black">{userLabel}</div>
              <button
                onClick={() => {
                  router.push("/profile");
                  setMenuOpen(false);
                }}
                className="w-full text-left py-1 text-black hover:text-blue-700"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left py-1 text-black hover:text-blue-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              <button className="w-full text-left py-1 text-black hover:text-blue-700">
                Login
              </button>
            </Link>
          )}
        </div>
      )}

      <main id="main-content" />
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed top-4 right-4"
      >
        <Toaster />
      </div>
    </>
  );
}
