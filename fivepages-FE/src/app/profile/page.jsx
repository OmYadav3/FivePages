"use client";

import { useMemo } from "react";
import { useUser } from "../hooks/useUser.js"; // adjust path if needed
import { ProfileForm } from ".././components/ProfileForm";
import { PasswordForm } from ".././components/PasswordForm";

export default function UserProfilePage() {
  const defaultUser = useMemo(
    () => ({
      name: "Guest User",
      email: "guest@example.com",
      profilePic: "/default-avatar.png",
    }),
    []
  );

  const { user, setUser, token, loadingUser } = useUser(defaultUser);

  if (loadingUser || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4">Loading user...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-[#F7F7F7] px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-[#4A90E2] text-center">
          User Profile
        </h2>

        <div className="flex justify-center mt-6">
          <img
            src={user.profilePic || "/default-avatar.webp"}
            // src={user.profilePic || ""}
            alt="Profile"
            className="w-28 h-28 rounded-full border-2 border-gray-300 shadow-sm cursor-pointer"
          />
        </div>

        <ProfileForm user={user} token={token} setUser={setUser} />
        {/* <div className="btn border-2 pt-4 pb-6 mt-2">ChangePassword</div> */}
        <PasswordForm token={token} />
        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/"; // Redirect to home page
          }}
          className="w-full bg-black text-white py-3 rounded hover:bg-blue-600 transition mt-2 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
