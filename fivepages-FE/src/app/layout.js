import { Toaster } from "react-hot-toast";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import "./globals.css";

export const metadata = {
  title: "FivePages",
  description: "Read the latest novels Chaptervise",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4">{children}</main>
        <Toaster position="top-right" />
        <Footer />
      </body>
    </html>
  );
}
