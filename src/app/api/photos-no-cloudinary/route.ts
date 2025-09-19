import { NextResponse } from 'next/server'

export async function GET() {
  console.log('🧪 Testing API without Cloudinary import...')
  
  try {
    return NextResponse.json({
      success: true,
      message: 'API without Cloudinary import working',
      environment: process.env.NODE_ENV,
      cloudinary_vars: {
        CLOUDINARY_CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: !!process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET,
      },
      timestamp: new Date().toISOString()
    })
    
  } catch (error: any) {
    console.error('❌ Error:', error)
    
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
