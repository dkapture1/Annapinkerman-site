import { NextRequest, NextResponse } from 'next/server'

// Cloudinary configuration
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

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
    
    // Mapear o tag para a pasta correta no Cloudinary
    const folderPath = categoryMapping[tag.toLowerCase()]
    
    if (!folderPath) {
      console.log('Category not found:', tag)
      return NextResponse.json(
        { 
          error: 'Category not found',
          availableCategories: Object.keys(categoryMapping),
          receivedTag: tag
        },
        { status: 404 }
      )
    }

    console.log('Searching in folder:', folderPath)

    // Buscar imagens na pasta do Cloudinary
    const result = await cloudinary.search
      .expression(`folder:"${folderPath}"`)
      .max_results(100)
      .execute()

    console.log('Cloudinary search result:', {
      total: result.total_count,
      found: result.resources?.length || 0
    })

    // Transformar os resultados para o formato esperado
    const photos = result.resources?.map((resource: any, index: number) => ({
      id: resource.public_id,
      url: resource.secure_url,
      category: folderPath.split('/').pop(),
      alt: `Gallery image ${index + 1}`,
      width: resource.width,
      height: resource.height,
      public_id: resource.public_id
    })) || []

    return NextResponse.json({
      photos,
      category: folderPath,
      tag,
      total: photos.length,
      success: true
    })

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