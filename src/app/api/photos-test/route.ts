import { NextResponse } from 'next/server'
import cloudinary from 'cloudinary'

export async function GET() {
  console.log('🧪 Testing Cloudinary connection...')
  
  try {
    // Configurar Cloudinary
    console.log('Configuring Cloudinary...')
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    console.log('✅ Cloudinary configured')

    // Teste simples de busca
    console.log('Testing simple search...')
    const result = await cloudinary.v2.search
      .expression('tags=behind-the-scenes-details')
      .max_results(1)
      .execute()
    
    console.log('✅ Search completed:', {
      total: result.total_count,
      found: result.resources?.length || 0
    })

    return NextResponse.json({
      success: true,
      message: 'Cloudinary test successful',
      total: result.total_count,
      found: result.resources?.length || 0,
      sample: result.resources?.[0] ? {
        public_id: result.resources[0].public_id,
        secure_url: result.resources[0].secure_url ? 'Present' : 'Missing'
      } : null,
      timestamp: new Date().toISOString()
    })
    
  } catch (error: any) {
    console.error('❌ Cloudinary test failed:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Cloudinary test failed',
      message: error.message,
      code: error.code,
      status: error.status,
      http_code: error.http_code,
      name: error.name,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
