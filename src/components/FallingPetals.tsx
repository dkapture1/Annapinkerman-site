'use client';

import { useEffect, useRef, useState } from 'react';

const petalImages = [
  '/images/petala1.png',
  '/images/petala2.png',
  '/images/petala3.png',
  '/images/petala4.png',
  '/images/petala5.png',
];

export default function FallingPetals() {
  const petalsContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (petalsContainerRef.current) {
        petalsContainerRef.current.classList.remove('petals--paused');
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        if (petalsContainerRef.current) {
          petalsContainerRef.current.classList.add('petals--paused');
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isScrolled) {
      const createPetal = () => {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        if (petalsContainerRef.current) {
          const randomImage = petalImages[Math.floor(Math.random() * petalImages.length)];
          petal.style.backgroundImage = `url(${randomImage})`;
          petal.style.left = Math.random() * 100 + 'vw';
          petal.style.animationDuration = Math.random() * 5 + 5 + 's'; // 5-10 segundos
          petal.style.animationDelay = Math.random() * 2 + 's';
          petalsContainerRef.current.appendChild(petal);
          setTimeout(() => petal.remove(), 10000); // Remove após 10s
        }
      };

      const interval = setInterval(createPetal, 200);

      return () => clearInterval(interval);
    }
  }, [isScrolled]);

  return <div className="petals petals--paused" ref={petalsContainerRef}></div>;
}