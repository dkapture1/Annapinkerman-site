'use client';

import { useState, useEffect } from 'react';

interface VideoPlayerProps {
  playlist: string[];
}

export default function VideoPlayer({ playlist }: VideoPlayerProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  if (!playlist || playlist.length === 0) {
    return null; // or a placeholder
  }

  return (
    <section className="relative w-full min-h-[50vh] my-10 text-center px-4">
      <h2 className="font-script text-4xl text-gray-800 mb-6">Um Momento Especial</h2>
      <div className="relative w-full overflow-hidden pb-[56.25%] rounded-2xl shadow-xl bg-gray-100">
        <video
          key={currentVideoIndex}
          src={`/videos/${playlist[currentVideoIndex]}`}
          playsInline
          autoPlay
          muted
          onEnded={handleVideoEnd}
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          Seu navegador não suporta o elemento de vídeo.
        </video>
      </div>
    </section>
  );
}