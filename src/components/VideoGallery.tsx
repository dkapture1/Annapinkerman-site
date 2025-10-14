'use client';

interface VideoGalleryProps {
  videoFiles: string[];
}

export default function VideoGallery({ videoFiles }: VideoGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 sm:p-6 md:p-8">
      {videoFiles.map(file => (
        <div key={file} className="mb-4">
          <video
            src={`/videos/${file}`}
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
