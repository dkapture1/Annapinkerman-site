import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

export async function GET(request: Request, { params }: { params: { tag: string } }) {
  const { tag } = params;

  if (!tag) {
    return NextResponse.json({ error: 'Tag parameter is required' }, { status: 400 });
  }

  const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
  const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.error('Cloudinary credentials are not set. Please check your .env.local file and restart the server.');
    return NextResponse.json(
      { error: 'Server configuration error', details: 'Cloudinary credentials are not fully set.' },
      { status: 500 }
    );
  }

  try {
    cloudinary.v2.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
      secure: true,
    });

    const result = await cloudinary.v2.search
      .expression(`tags=${tag}`)
      .max_results(500)
      .execute();

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
    return NextResponse.json(
        { error: 'Failed to fetch photos from Cloudinary.', details: error.message }, 
        { status: 500 }
    );
  }
}