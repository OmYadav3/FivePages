import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./globals.css";

export const metadata = {
  title: "FivePages",
  description: "Read the latest novels Chaptervise",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className="" >
      <Toaster position="top-right" reverseOrder={false} />
      <div className="sticky-navbar">
          <Navbar />
        </div>
        {children}
        <Footer /></body>
    </html>
  );
}
