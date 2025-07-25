"use client";
import { useState } from "react";
import Link from "next/link";
import { useForgotPassword } from "@/hooks/useForgotPassword";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const {
    resetPassword,
    loading,
    message,
    error,
    setError,
    setMessage,
  } = useForgotPassword();

  const handleReset = async (e) => {
    e.preventDefault();
    await resetPassword(email);
    setEmail(""); // Clear email after reset
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Forgot Password</h2>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 text-center py-3 rounded mb-4">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 text-center py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link href="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
