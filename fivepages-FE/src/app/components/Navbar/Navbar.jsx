"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "register") {
      router.push("/login");
    } else if (selectedValue === "profile") {
      router.push("/profile");
    } else if (selectedValue === "Logout") {
      handleLogout();
    }
  };
//inauthenticated use effect
  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);

    if (!user) {
      etIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);


  const handleLogout = () => {
    // Clear authentication data (modify based on your auth system)
    localStorage.removeItem("user");
    sessionStorage.clear();
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      

          // Redirect to login page
    router.push("/login");
  };
  

  return (
    <nav className="flex items-center justify-between lg:px-31 px-10 bg-white shadow-md mb-2">
      {/* Logo */}
      <div className="" onClick={() => router.push("/")}>
        {/* <p className="text-3xl font-bold">FivePages</p> */}
        <img
          src="/fivepagelogo.png"
          alt="Logo"
          className="w-auto h-20"
        />
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-4 list-none ">
        <li>
          <Link href="/" className="text-black font-medium hover:text-blue-700">
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/popularbooks"
            className="text-black font-medium hover:text-blue-700"
          >
            Popular
          </Link>
        </li>
        <li>
          <Link
            href="/new-releases-page"
            className="text-black font-medium hover:text-blue-700"
          >
            New Release
          </Link>
        </li>
        <li>
          <Link
            href="/allnovels"
            className="text-black font-medium hover:text-blue-700"
          >
            Novels
          </Link>
        </li>
      </ul>

      {/* Right Section */}
      <div className="flex items-center lg:gap-8 gap-4 ">
        {/* Search Box */}
        <div className="flex items-center border border-gray-400 rounded-md px-3 py-[0.32rem]">
          <input
            type="text"
            placeholder="Search"
            className="outline-none text-sm text-gray-700 px-2 w-[8rem]"
          />
          <FaSearch className="text-blue-700" />
        </div>

        {/* Profile Icon */}
        <div className="flex ">
          <FaUserCircle className="text-2xl text-black cursor-pointer hover:text-700 transition s" />
          {isAuthenticated ?
          <select
          name="Profile"
          id="profile-dropdown"
          className="focus:outline-none "
          onChange={handleSelectChange}
        >
          <option value="profile" className="bg-white">
            Profile
          </option>
          
          <option value="Logout" className="bg-white">
            Log out
          </option>  
        </select>
        :
        <button>
          <Link href="/login">
            <button className="bg-white text-black px-2 py-1 rounded-md hover:bg-gray-100 transition"
            onClick={() => router.push("/login")}
            >
              Login
            </button>
          </Link>
        </button>
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
