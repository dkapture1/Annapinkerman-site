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

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {validPhotos.map((photo) => (
        <div key={photo.public_id} className="break-inside-avoid">
          <Image
            src={photo.secure_url} // Use the correct property for the image source
            alt={`Gallery image ${photo.public_id}`}
            width={500}
            height={500}
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
  );
};

export default MasonryGrid;