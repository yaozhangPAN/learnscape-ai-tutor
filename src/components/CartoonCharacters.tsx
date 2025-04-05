
import React, { useState, useEffect } from "react";

type Character = {
  id: number;
  src: string;
  alt: string;
  position: string;
};

const characters: Character[] = [
  {
    id: 1,
    src: "/lovable-uploads/ce097d01-bc99-4e05-b7be-923c0a9b37d7.png",
    alt: "Cartoon character with yellow hat",
    position: "bottom-0 left-10",
  },
  {
    id: 2,
    src: "/lovable-uploads/45a5242c-2a59-4b50-9e53-87cc679205a7.png",
    alt: "Raccoon with red hat",
    position: "bottom-0 right-10",
  },
  {
    id: 3,
    src: "/lovable-uploads/a52ce74e-5497-4f34-acbe-db9a55f764c8.png",
    alt: "Bear with orange hat",
    position: "bottom-20 left-1/3",
  },
];

const CartoonCharacters: React.FC = () => {
  const [hoveredCharacter, setHoveredCharacter] = useState<number | null>(null);

  useEffect(() => {
    // Add a small bounce animation when component mounts
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.cartoon-character');
      elements.forEach((el, index) => {
        setTimeout(() => {
          (el as HTMLElement).style.transform = 'translateY(-10px)';
          setTimeout(() => {
            (el as HTMLElement).style.transform = 'translateY(0)';
          }, 300);
        }, index * 200);
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {characters.map((character) => (
        <div
          key={character.id}
          className={`absolute ${character.position} transition-all duration-300 cartoon-character z-10`}
          style={{
            transform: hoveredCharacter === character.id ? 'scale(1.1)' : 'scale(1)',
            filter: `drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))`,
          }}
          onMouseEnter={() => setHoveredCharacter(character.id)}
          onMouseLeave={() => setHoveredCharacter(null)}
        >
          <img
            src={character.src}
            alt={character.alt}
            className="h-24 md:h-32 lg:h-40 object-contain"
          />
        </div>
      ))}
    </>
  );
};

export default CartoonCharacters;
