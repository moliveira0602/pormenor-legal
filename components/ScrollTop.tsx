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

  const handleScrollTopClick = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/351935293467", "_blank", "noopener");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-8">
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="rounded-full shadow-xl transition-all bg-green-500 hover:bg-green-600 text-white w-12 h-12 flex items-center justify-center"
        title="Chat no WhatsApp"
        aria-label="Chat no WhatsApp"
      >
        <span className="material-symbols-outlined">chat</span>
      </button>

      {/* Scroll to Top Button */}
      <button
        aria-label="Voltar ao topo"
        onClick={handleScrollTopClick}
        className={`rounded-full shadow-xl transition-all
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-3"}
          bg-primary hover:bg-primary-dark text-white w-12 h-12 flex items-center justify-center`}
        title="Topo"
      >
        <span className="material-symbols-outlined">arrow_upward</span>
      </button>
    </div>
  );
}
