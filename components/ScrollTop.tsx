"use client";

import { useEffect, useState } from "react";

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      aria-label="Voltar ao topo"
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-50 rounded-full shadow-xl transition-all
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-3"}
        bg-primary hover:bg-primary-dark text-white w-12 h-12 flex items-center justify-center`}
      title="Topo"
    >
      <span className="material-symbols-outlined">arrow_upward</span>
    </button>
  );
}
