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
  console.log('🚀 API Route started')
  try {
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      CLOUDINARY_CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: !!process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET,
    })

    console.log('📋 Resolving params...')
    // Aguardar a resolução da Promise params (Next.js 15)
    const resolvedParams = await params
    console.log('✅ Params resolved:', resolvedParams)
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
    console.log('Configuring Cloudinary...')
    try {
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });
      console.log('✅ Cloudinary configured successfully')
    } catch (configError) {
      console.error('❌ Error configuring Cloudinary:', configError)
      throw configError
    }

    // Buscar imagens por tag no Cloudinary (método original que funcionava)
    console.log('Starting Cloudinary search...')
    const result = await cloudinary.v2.search
      .expression(`tags=${tag}`)
      .max_results(100)
      .execute()
    console.log('✅ Cloudinary search completed')

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
    console.error('Error code:', error.code)
    console.error('Error status:', error.status)
    console.error('Error http_code:', error.http_code)
    console.error('Error name:', error.name)
    console.error('Error stack:', error.stack)
    console.error('Full error object:', JSON.stringify(error, null, 2))
    
    // Log environment details for debugging
    console.error('Environment details:', {
      NODE_ENV: process.env.NODE_ENV,
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'undefined',
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'undefined'
    })
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message || 'Unknown error',
        code: error.code,
        status: error.status,
        http_code: error.http_code,
        name: error.name,
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}