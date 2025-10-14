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
        console.log('Data received from /api/horizontal-videos:', data);
        setPlaylist(data);
        console.log('Playlist state updated:', data);
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
    // Optional: return a loading spinner or a placeholder
    return (
      <section className="relative w-full min-h-[50vh] my-10 text-center px-4">
        <h2 className="font-script text-4xl text-gray-800 mb-6">Um Momento Especial</h2>
        <div className="relative w-full overflow-hidden pb-[56.25%] rounded-2xl shadow-xl bg-gray-200 animate-pulse">
          {/* Placeholder content */}
        </div>
      </section>
    );
  }

  const currentVideoSrc = playlist && playlist.length > 0 ? playlist[currentVideoIndex] : '';
  console.log('Attempting to load video:', currentVideoSrc);

  return (
    <section className="relative w-full min-h-[50vh] my-10 text-center px-4">
      <h2 className="font-script text-4xl text-gray-800 mb-6">Um Momento Especial</h2>
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