import { NextRequest, NextResponse } from 'next/server'
import cloudinary from 'cloudinary'

// Mapeamento das URLs para as pastas reais no Cloudinary
const categoryMapping: { [key: string]: string } = {
  'behind-the-scenes-details': 'Photos party/Behind the Scenes & Details',
  'guests-arriving': 'Photos party/Guests Arriving', 
  'ceremony-tributes': 'Photos party/Ceremony & Tributes',
  'waltz': 'Photos party/Waltz',
  'the-party-vibes': 'Photos party/The Party Vibes'
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tag: string }> }
) {
  try {
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      CLOUDINARY_CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: !!process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET,
    })

    // Aguardar a resolução da Promise params (Next.js 15)
    const resolvedParams = await params
    const { tag } = resolvedParams
    
    console.log('Received tag:', tag)
    
    // Verificar se o tag é válido
    const validTags = Object.keys(categoryMapping)
    
    if (!validTags.includes(tag.toLowerCase())) {
      console.log('Category not found:', tag)
      return NextResponse.json(
        { 
          error: 'Category not found',
          availableCategories: validTags,
          receivedTag: tag
        },
        { status: 404 }
      )
    }

    console.log('Searching by tag:', tag)

    // Configurar Cloudinary
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    // Buscar imagens por tag no Cloudinary (método original que funcionava)
    const result = await cloudinary.v2.search
      .expression(`tags=${tag}`)
      .max_results(100)
      .execute()

    console.log('Cloudinary search result:', {
      total: result.total_count,
      found: result.resources?.length || 0
    })

    // Transformar os resultados para o formato original esperado
    const photos = result.resources?.map((resource: any) => ({
      public_id: resource.public_id,
      secure_url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      tags: resource.tags || [],
      context: resource.context
    })) || []

    return NextResponse.json(photos)

  } catch (error: any) {
    console.error('❌ Error in API route:', error)
    console.error('Error message:', error.message)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message || 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}