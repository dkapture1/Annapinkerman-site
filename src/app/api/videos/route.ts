import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

export async function GET() {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    const result = await cloudinary.v2.search
      .expression('folder=videos')
      .sort_by('public_id', 'desc')
      .max_results(50)
      .execute();

    const videos = result.resources?.map((resource: any) => resource.secure_url) || [];

    return NextResponse.json(videos);

  } catch (error: any) {
    console.error('Error fetching videos from Cloudinary:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch videos.', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}
