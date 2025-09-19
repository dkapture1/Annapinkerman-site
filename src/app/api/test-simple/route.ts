import { NextResponse } from 'next/server'

export async function GET() {
  console.log('🧪 Simple test API started')
  
  try {
    console.log('📋 Testing basic functionality...')
    
    return NextResponse.json({
      success: true,
      message: 'Simple API working',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    })
    
  } catch (error: any) {
    console.error('❌ Error in simple API:', error)
    
    return NextResponse.json({
      error: 'Simple API error',
      message: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}
