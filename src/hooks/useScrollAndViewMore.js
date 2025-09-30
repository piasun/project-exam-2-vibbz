import { useEffect, useState } from "react";

export function useScrollAndViewMore(initialCount = 8, step = 8) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleCount, setVisibleCount] = useState(initialCount);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + step);
  };

  return { showScrollTop, visibleCount, handleScrollTop, handleViewMore };
}
