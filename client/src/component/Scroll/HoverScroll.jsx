import React, { useEffect, useState } from "react";
import "./HoverScroll.css"; // Importa los estilos CSS

export const HoverScroll = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY <= 450);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`to-up-button ${isHovered ? "hovered" : ""} ${
        isAtTop ? "hidden" : "visible"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (!isAtTop) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      &#8593; {/* Flecha hacia arriba */}
    </button>
  );
};
