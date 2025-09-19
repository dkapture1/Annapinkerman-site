import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Verificar configurações do Cloudinary
    const cloudinaryConfig = {
      cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
      api_key: !!process.env.CLOUDINARY_API_KEY,
      api_secret: !!process.env.CLOUDINARY_API_SECRET,
    }
    
    const allConfigured = Object.values(cloudinaryConfig).every(Boolean)
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      cloudinary: {
        configured: allConfigured,
        details: cloudinaryConfig
      },
      version: '1.0.0'
    })
    
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
