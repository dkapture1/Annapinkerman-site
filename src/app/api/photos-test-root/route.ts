import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'API in root /api/ folder working',
    timestamp: new Date().toISOString()
  })
}
