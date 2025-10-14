
'use client';

import { useState, useEffect } from 'react';
import { albums } from '../lib/photo-data';
import MasonryGrid from './MasonryGrid';

interface CloudinaryPhoto {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  tags: string[];
  context?: any;
}

const PhotoGallery = () => {
  const [activeAlbumSlug, setActiveAlbumSlug] = useState(albums[0].slug);
  const [photos, setPhotos] = useState<CloudinaryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeAlbum = albums.find(album => album.slug === activeAlbumSlug);

  useEffect(() => {
    if (!activeAlbum) return;

    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/photos/${activeAlbum.slug}`);
        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch {
            // If the response is not JSON, use the status text
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
          }
          // Use the error message from the server if available
          const message = (errorData.details ? `${errorData.error}: ${errorData.details}` : errorData.error) || `HTTP error! status: ${response.status}`;
          throw new Error(message);
        }
        const data: CloudinaryPhoto[] = await response.json();
        console.log('Data received from API:', data);
        setPhotos(data);
        console.log('Photos state updated:', data);
      } catch (e: any) {
        setError(`Failed to load photos: ${e.message}`);
        console.error('Error fetching photos:', e);
        console.log('Error state updated:', e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [activeAlbum]);

  return (
    <div>
      <div className="py-4 mb-8">
        <div className="flex flex-wrap justify-center gap-2 px-4">
          {albums.map(album => (
            <button
              key={album.slug}
              onClick={() => setActiveAlbumSlug(album.slug)}
              className={`min-h-[44px] px-4 py-2 rounded-full text-white transition-colors duration-300 text-sm md:text-base ${
                activeAlbumSlug === album.slug
                  ? 'bg-pink-500'
                  : 'bg-gray-700 hover:bg-pink-400'
              }`}>
              {album.title}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-center text-white">
          <p>Carregando fotos...</p>
          <div className="mt-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      )}
      {error && (
        <div className="text-center text-red-500 bg-red-50 p-6 rounded-lg mx-4">
          <h3 className="text-lg font-semibold mb-2">❌ Erro ao carregar fotos</h3>
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-2 text-gray-600">
            Se este erro persistir, verifique se as variáveis de ambiente do Cloudinary estão configuradas corretamente.
          </p>
        </div>
      )}

      {!loading && !error && activeAlbum && <MasonryGrid photos={photos} />}
    </div>
  );
};

export default PhotoGallery;
