'use client';

import { useState, useEffect } from 'react';

interface VideoData {
  videoUrl: string;
  posterUrl: string;
  title: string;
}

export default function VideoGallery() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        setVideos(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-xl max-w-2xl mx-auto mt-8">
        <p className="text-red-500 font-sans">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Masonry Layout using CSS Columns */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {videos.map((video, index) => (
          <div
            key={`${video.videoUrl}-${index}`}
            className="break-inside-avoid mb-8 bg-white/20 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] p-4 group"
          >
            {/* Video Container with rounded corners and subtle inner shadow */}
            <div className="relative overflow-hidden rounded-xl shadow-inner bg-black/5">
              <video
                src={video.videoUrl}
                poster={video.posterUrl}
                controls
                className="w-full h-auto object-cover transform transition-transform duration-700"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Caption / Title */}

          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 font-sans text-lg">No movies available yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
