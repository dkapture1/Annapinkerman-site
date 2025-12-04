'use client';

import Image from 'next/image';

// Define the same interface as in PhotoGallery to ensure type consistency
interface CloudinaryPhoto {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  tags: string[];
  context?: any;
}

interface MasonryGridProps {
  photos: CloudinaryPhoto[];
}

const MasonryGrid = ({ photos }: MasonryGridProps) => {
  // 1. Filter out any photos that don't have a valid `secure_url`
  const validPhotos = photos.filter(photo => photo && photo.secure_url);

  // 2. If no valid photos are left, display a friendly message
  if (validPhotos.length === 0) {
    return <p className="text-center text-white">Nenhuma foto encontrada neste álbum.</p>;
  }

  // Helper to optimize Cloudinary URLs
  const getOptimizedUrl = (url: string) => {
    if (!url.includes('cloudinary.com')) return url;
    // Insert transformations after /upload/
    // w_800: Resize to 800px width (good for grid)
    // q_auto: Automatic quality
    // f_auto: Automatic format (WebP/AVIF)
    return url.replace('/upload/', '/upload/w_800,q_auto,f_auto/');
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-2 md:gap-4 max-w-full">
        {validPhotos.map((photo) => (
          <div key={photo.public_id} className="break-inside-avoid mb-4">
            <Image
              src={getOptimizedUrl(photo.secure_url)} // Use optimized URL
              alt={`Gallery image ${photo.public_id}`}
              width={500}
              height={500}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) =>
                console.error(
                  'ERRO AO CARREGAR A IMAGEM:',
                  (e.target as HTMLImageElement).src
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid;