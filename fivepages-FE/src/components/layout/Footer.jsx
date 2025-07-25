"use client";
import { FaDiscord } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white w-full px-8 md:px-20 py-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <a href="/about" className="block text-gray-400 hover:text-white transition">
            Terms of Use
          </a>
          <a href="/about" className="block text-gray-400 hover:text-white transition">
            Privacy Policy
          </a>
        </div>

        {/* Community Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Community</h3>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <FaDiscord className="text-xl" /> Discord
          </a>
        </div>

        {/* Partner Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Partner</h3>
          <a href="/partners" className="block text-gray-400 hover:text-white transition">
            Spyops
          </a>
          <a href="/partners" className="block text-gray-400 hover:text-white transition">
            Sky
          </a>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <a href="/contact" className="block text-gray-400 hover:text-white transition">
            Business Collaborations
          </a>
          <a
            href="mailto:hr@fivepages.com"
            className="block text-gray-400 hover:text-white transition"
          >
            Join Us: hr@fivepages.com
          </a>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-8">
        © {new Date().getFullYear()} NovelRead — FivePages Private Limited. All rights reserved.
      </div>
    </footer>
  );
}
