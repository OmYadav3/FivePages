import { useState } from "react";

export function ProfileForm({ user, token, setUser }) {
  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newName.trim() || !newEmail.trim()) {
      return setError("Name and email cannot be empty.");
    }

    setUpdating(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}user/updateProfile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName, email: newEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser((prev) => ({ ...prev, name: newName, email: newEmail }));
        setSuccess("Profile updated successfully!");
      } else {
        setError(data.message || "Error updating profile.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <form onSubmit={handleUpdateProfile} className="mt-6">
      <h3 className="text-xl font-semibold text-center mb-4">{newName}</h3>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && <p className="text-green-600 text-sm text-center">{success}</p>}

      <label className="block text-gray-600 text-sm font-medium">Email</label>
      <input
        type="email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        disabled={updating}
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
      />

      <label className="block text-gray-600 text-sm font-medium mt-4">Name</label>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        disabled={updating}
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
      />

      <button
        type="submit"
        disabled={updating}
        className={`w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition mt-6 cursor-pointer ${
          updating && "cursor-not-allowed opacity-70"
        }`}
      >
        {updating ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
}
