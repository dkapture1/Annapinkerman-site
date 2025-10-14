'use client';

import { useState, useEffect } from 'react';

export default function VideoGallery() {
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
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
        setVideoUrls(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <p className="text-center">Loading videos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 sm:p-6 md:p-8">
      {videoUrls.map(url => (
        <div key={url} className="mb-4">
          <video
            src={url}
            controls
            className="w-full h-auto rounded-lg shadow-lg"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
}
