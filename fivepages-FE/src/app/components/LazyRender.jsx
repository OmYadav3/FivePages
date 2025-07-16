"use client";
import { useRef, useEffect, useState } from "react";

const LazyRender = ({ children, height = "h-48", mobileOnly = false }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768); // Optional: check screen size
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Optional: skip lazy loading on desktop if mobileOnly is true
  if (mobileOnly && !isMobile) return <>{children}</>;

  return (
    <div ref={ref} className="transition-opacity duration-700 ease-in-out">
      {isVisible ? (
        <div className="opacity-100 animate-fade-in">{children}</div>
      ) : (
        <div className={`bg-gray-100 dark:bg-gray-700 rounded ${height} animate-pulse`} />
      )}
    </div>
  );
};

export default LazyRender;
