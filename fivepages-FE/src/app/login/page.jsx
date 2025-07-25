"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";

export default function AuthPage() {
  const {
    isLogin,
    setIsLogin,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    error,
    loading,
    emailRef,
    passwordRef,
    nameRef,
    handleKeyDown,
    handleSubmit,
  } = useAuth();

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F4F4F4]">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 text-center text-xl py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label className="text-gray-700 font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                ref={nameRef}
                onKeyDown={(e) => handleKeyDown(e, emailRef)}
              />
            </div>
          )}

          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              ref={emailRef}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              ref={passwordRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-2 rounded font-semibold hover:bg-blue-700 transition ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/forgot-password"
            className="text-blue-900 text-sm hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="text-center mt-8 text-sm text-gray-700">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-800 font-semibold ml-1 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
