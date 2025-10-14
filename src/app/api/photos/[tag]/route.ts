import { NextRequest, NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import { albums } from '@/lib/photo-data'; // Import the single source of truth

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tag: string }> } // The parameter from the URL is the slug
) {
  const resolvedParams = await params;
  const { tag: slug } = resolvedParams; // Rename for clarity

  console.log(`--- API Request Started for Slug: ${slug} ---`);

  try {
    // Find the album configuration based on the slug from the URL
    const album = albums.find(a => a.slug === slug);

    if (!album) {
      console.log('Album configuration not found for slug:', slug);
      return NextResponse.json(
        { 
          error: 'Category configuration not found',
          receivedSlug: slug
        },
        { status: 404 }
      );
    }

    // The actual tag to search for in Cloudinary
    const searchTag = album.tag;

    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    const expression = `tags=${searchTag}`;
    console.log(`Executing Cloudinary search with expression: "${expression}"`);

    const result = await cloudinary.v2.search
      .expression(expression)
      .max_results(100)
      .execute();
    
    console.log('Cloudinary API Response:', JSON.stringify(result, null, 2));

    const photos = result.resources?.map((resource: any) => ({
      public_id: resource.public_id,
      secure_url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      tags: resource.tags || [],
      context: resource.context
    })) || [];

    return NextResponse.json(photos);

  } catch (error: any) {
    console.error('Detailed error caught in API route:', error);
    
    return NextResponse.json(
      { 
        error: 'An internal server error occurred.', 
        details: 'Check server logs on Vercel for more information.' 
      },
      { status: 500 }
    );
  }
}