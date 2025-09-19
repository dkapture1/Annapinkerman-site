'use client';

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface Photo {
  id: string
  url: string
  category: string
  alt?: string
  width?: number
  height?: number
  public_id?: string
}

interface MasonryGridProps {
  photos: Photo[]
  category?: string
}

function MasonryGrid({ photos, category }: MasonryGridProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const handleImageError = (photoId: string, originalUrl: string) => {
    console.error('ERRO AO CARREGAR A IMAGEM:', originalUrl)
    setImageErrors(prev => new Set([...prev, photoId]))
  }

  // Filtrar fotos pela categoria (se necessário)
  const filteredPhotos = Array.isArray(photos) ? photos : []

  if (filteredPhotos.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-500">Nenhuma foto encontrada para esta categoria.</p>
      </div>
    )
  }

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {filteredPhotos.map((photo) => {
        if (!photo?.url || imageErrors.has(photo.id)) {
          return (
            <div key={photo?.id || Math.random()} className="break-inside-avoid">
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Imagem não disponível</span>
              </div>
            </div>
          )
        }

        return (
          <div key={photo.id} className="break-inside-avoid">
            <Image
              src={photo.url}
              alt={photo.alt || `Foto ${photo.id}`}
              width={photo.width || 500}
              height={photo.height || 300}
              className="w-full h-auto rounded-lg shadow-lg"
              onError={() => handleImageError(photo.id, photo.url)}
              unoptimized={false}
            />
          </div>
        )
      })}
    </div>
  )
}

export default MasonryGrid;