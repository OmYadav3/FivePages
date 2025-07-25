// hooks/useAuth.js
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useAuth() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAuthenticated(true);
      router.push("/");
    }
  }, [router]);

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef?.current) {
        nextRef.current.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isLogin && name.length < 3) {
      setError("Name must be at least 3 characters.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        isLogin
          ? `${process.env.NEXT_PUBLIC_PORT}user/login`
          : `${process.env.NEXT_PUBLIC_PORT}user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, ...(isLogin ? {} : { name }) }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Something went wrong!");
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data.user, token: data.accessToken })
        );
        setIsAuthenticated(true);

        setEmail("");
        setPassword("");
        setName("");

        toast.success(isLogin ? "Login successful! Redirecting..." : "Registration successful! Redirecting...");
        router.push("/");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    isLogin,
    setIsLogin,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    error,
    setError,
    loading,
    emailRef,
    passwordRef,
    nameRef,
    handleKeyDown,
    handleSubmit,
    isAuthenticated,
  };
}
