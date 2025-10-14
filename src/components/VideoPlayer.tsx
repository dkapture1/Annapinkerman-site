'use client';

import { useState, useEffect } from 'react';

export default function VideoPlayer() {
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch('/api/horizontal-videos');
        if (!response.ok) {
          throw new Error('Failed to fetch video playlist');
        }
        const data = await response.json();
        setPlaylist(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  const handleVideoEnd = () => {
    if (playlist.length > 0) {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    }
  };

  if (loading || playlist.length === 0) {
    return (
      <section className="relative w-full min-h-[50vh] my-10 text-center px-4">
        <div className="relative w-full overflow-hidden pb-[56.25%] rounded-2xl shadow-xl bg-gray-200 animate-pulse" />
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-[50vh] my-10 text-center px-4">
      <div className="relative w-full overflow-hidden pb-[56.25%] rounded-2xl shadow-xl bg-gray-100">
        <video
          key={currentVideoIndex}
          src={playlist[currentVideoIndex]}
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