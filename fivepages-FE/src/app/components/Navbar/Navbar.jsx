"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import { DropDown } from "../DropDown";

const Navbar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [localStorage.getItem("user")]);

 


  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "profile") {
      router.push("/profile");
    } else if (selectedValue === "logout") {
      handleLogout();
    }
    event.target.value = ""; // Reset dropdown to allow re-selection
  };



  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.clear();
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    toast.success("You have logged out successfully!");
    setUser(null);
    setIsAuthenticated(false);

    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between px-10 bg-white shadow-md mb-2 sticky">
      {/* Logo */}
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <img src="/fivepagelogo.png" alt="Logo" className="w-auto h-20" />
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-4 list-none">
        <li><Link href="/" className="text-black font-medium hover:text-blue-700">Home</Link></li>
        <li><Link href="/popularbooks" className="text-black font-medium hover:text-blue-700">Popular</Link></li>
        <li><Link href="/new-releases-page" className="text-black font-medium hover:text-blue-700">New Release</Link></li>
        <li><Link href="/allnovels" className="text-black font-medium hover:text-blue-700">Novels</Link></li>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Search Box */}
        <div className="flex items-center border border-gray-400 rounded-md px-3 py-[0.32rem]">
          <input
            type="text"
            placeholder="Search"
            className="outline-none text-sm text-gray-700 px-2 w-[8rem]"
          />
          <FaSearch className="text-blue-700" />
        </div>


        {/* Profile Section with Dropdown */}
        {isAuthenticated && user ? (
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-2xl text-black" />
             {/* <DropDown/> */}
              <select
              className="border border-gray-300 rounded-md px-2 py-1 bg-white cursor-pointer"
              onChange={handleSelectChange}
              defaultValue=""

        
            >
              <option value="" disabled hidden>{user.name}</option>
              <option value="profile">Profile</option>
              <option value="logout">Logout</option>
            </select> 
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-white text-black px-2 py-1 rounded-md hover:bg-gray-100 transition">
              Login
            </button>
          </Link>

        )}
        </div>
        }
          {/* <select
            name="Profile"
            id="profile-dropdown"
            className="focus:outline-none "
            onChange={handleSelectChange}
          >
            <option value="profile" className="bg-white">
              Profile
            </option>
            <option value="register" className="bg-white">
              Register
            </option> 
            <option value="Logout" className="bg-white">
              Log out
            </option>  
          </select> */}

          {/* Register Button */}
          {/* <Link href="/login">
            <button className="bg-white text-black px-2 py-1 rounded-md hover:bg-gray-100 transition"
            onClick={() => router.push("/login")}
            >
              Login
            </button>
          </Link> */

          
        }
          
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
