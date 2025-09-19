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
  const resolvedParams = await params
  const { tag } = resolvedParams

  console.log(`API route called for tag: ${tag}`);
  console.log(`Cloud Name read from env: ${process.env.CLOUDINARY_CLOUD_NAME}`);
  console.log(`API Key read from env: ${process.env.CLOUDINARY_API_KEY ? 'Loaded' : 'NOT LOADED'}`);
  console.log(`API Secret read from env: ${process.env.CLOUDINARY_API_SECRET ? 'Loaded' : 'NOT LOADED'}`);

  try {
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

    // Configurar Cloudinary
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    // Buscar imagens por tag no Cloudinary
    const result = await cloudinary.v2.search
      .expression(`tags=${tag}`)
      .max_results(100)
      .execute()

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
    console.error('Detailed error caught in API route:', error);
    
    return NextResponse.json(
      { 
        error: 'An internal server error occurred.', 
        details: 'Check server logs on Vercel for more information.' 
      },
      { status: 500 }
    )
  }
}