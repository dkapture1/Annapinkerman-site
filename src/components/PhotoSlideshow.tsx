'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  '/images/slideshow/petala1.png',
  '/images/slideshow/petala2.png',
  '/images/slideshow/petala3.png',
  '/images/slideshow/petala4.png',
  '/images/slideshow/petala5.png',
];

export default function PhotoSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="photos" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-script text-center text-gray-800 mb-8">
          Fotos
        </h2>
        <div className="relative h-96 w-full max-w-4xl mx-auto">
          {images.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-1000 ${                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}>
              <Image
                src={image}
                alt={`Slideshow image ${index + 1}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
