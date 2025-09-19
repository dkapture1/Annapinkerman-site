import { NextResponse } from 'next/server';

export async function GET() {
  const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
  const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    cloudinary: {
      cloud_name: CLOUDINARY_CLOUD_NAME ? '✅ Configurada' : '❌ Não configurada',
      api_key: CLOUDINARY_API_KEY ? '✅ Configurada' : '❌ Não configurada',
      api_secret: CLOUDINARY_API_SECRET ? '✅ Configurada' : '❌ Não configurada',
      // Mostrar apenas os últimos 4 caracteres para debug
      cloud_name_value: CLOUDINARY_CLOUD_NAME,
      api_key_suffix: CLOUDINARY_API_KEY ? '***' + CLOUDINARY_API_KEY.slice(-4) : 'undefined',
      api_secret_suffix: CLOUDINARY_API_SECRET ? '***' + CLOUDINARY_API_SECRET.slice(-4) : 'undefined'
    },
    allEnvVars: Object.keys(process.env).filter(key => key.includes('CLOUDINARY'))
  });
}
