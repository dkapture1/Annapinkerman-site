import { NextRequest, NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

export async function GET(request: NextRequest, { params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;

  if (!tag) {
    return NextResponse.json({ error: 'Tag parameter is required' }, { status: 400 });
  }

  const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
  const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.error('Cloudinary credentials are not set. Please check your environment variables.');
    console.error('Missing variables:', {
      CLOUDINARY_CLOUD_NAME: !!CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: !!CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: !!CLOUDINARY_API_SECRET
    });
    return NextResponse.json(
      { 
        error: 'Server configuration error', 
        details: 'Cloudinary credentials are not fully set. Please configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.',
        missing: {
          CLOUDINARY_CLOUD_NAME: !CLOUDINARY_CLOUD_NAME,
          CLOUDINARY_API_KEY: !CLOUDINARY_API_KEY,
          CLOUDINARY_API_SECRET: !CLOUDINARY_API_SECRET
        }
      },
      { status: 500 }
    );
  }

  try {
    console.log('Configurando Cloudinary com:', {
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY ? '***' + CLOUDINARY_API_KEY.slice(-4) : 'undefined',
      api_secret: CLOUDINARY_API_SECRET ? '***' + CLOUDINARY_API_SECRET.slice(-4) : 'undefined'
    });

    cloudinary.v2.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
      secure: true,
    });

    console.log('Buscando fotos com tag:', tag);
    const result = await cloudinary.v2.search
      .expression(`tags=${tag}`)
      .max_results(500)
      .execute();
    
    console.log('Resultado da busca:', {
      totalCount: result.total_count,
      resourcesCount: result.resources.length,
      tag: tag
    });

    const photos = result.resources.map((resource: any) => ({
      public_id: resource.public_id,
      secure_url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      tags: resource.tags,
      context: resource.context,
    }));

    return NextResponse.json(photos);
  } catch (error: any) {
    console.error('Error fetching photos from Cloudinary:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      status: error.status,
      name: error.name,
      stack: error.stack
    });
    
    // Log the search expression for debugging
    console.error('Search expression:', `tags=${tag}`);
    
    return NextResponse.json(
        { 
          error: 'Failed to fetch photos from Cloudinary.', 
          details: error.message,
          code: error.code,
          status: error.status,
          searchExpression: `tags=${tag}`,
          timestamp: new Date().toISOString()
        }, 
        { status: 500 }
    );
  }
}