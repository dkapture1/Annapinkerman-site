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
      .expression('public_id:h_* AND folder=videos')
      .sort_by('public_id', 'desc')
      .max_results(20)
      .execute();

    const videos = result.resources?.map((resource: any) => resource.secure_url) || [];

    return NextResponse.json(videos);

  } catch (error: any) {
    console.error('Error fetching horizontal videos from Cloudinary:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch horizontal videos.', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}
