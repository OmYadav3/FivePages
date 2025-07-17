import { useState } from "react";

export function PasswordForm({ token }) {
  const [isOpen, setIsOpen] = useState(false);  // 👈 add toggle state

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [changing, setChanging] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!oldPassword.trim() || !newPassword.trim()) {
      return setError("Both old and new passwords are required.");
    }
    if (oldPassword === newPassword) {
      return setError("New password must be different.");
    }

    setChanging(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}user/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
      } else {
        setError(data.message || "Error updating password.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    } finally {
      setChanging(false);
    }
  };

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black text-white py-3 rounded transition cursor-pointer"
      >
        {isOpen ? "Hide Change Password" : "Change Password"}
      </button>

      {isOpen && (
        <form onSubmit={handleChangePassword} className="mt-4">
          {/* <h3 className="text-xl font-semibold text-center mb-4">Change Password</h3> */}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}

          <label className="block text-gray-600 text-sm font-medium">Old Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            disabled={changing}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
          />

          <label className="block text-gray-600 text-sm font-medium mt-4">New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={changing}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm mt-2 text-[#4A90E2] cursor-pointer"
            disabled={changing}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>

          <button
            type="submit"
            disabled={changing}
            className={`w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition mt-6 cursor-pointer ${
              changing && "cursor-not-allowed opacity-70"
            }`}
          >
            {changing ? "Changing..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}
