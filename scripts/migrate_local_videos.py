import os
import json
import cloudinary
import cloudinary.uploader

# --- Configuration ---
# Local Directory containing the videos
LOCAL_VIDEOS_DIR = 'Videos Upload'

# Cloudinary Configuration (Load from environment variables)
CLOUDINARY_CLOUD_NAME = os.environ.get('CLOUDINARY_CLOUD_NAME')
CLOUDINARY_API_KEY = os.environ.get('CLOUDINARY_API_KEY')
CLOUDINARY_API_SECRET = os.environ.get('CLOUDINARY_API_SECRET')

# Target Cloudinary Folder
CLOUDINARY_FOLDER = 'videos'

def upload_video_to_cloudinary(file_path, filename):
    """Uploads a video file to Cloudinary using upload_large for safety."""
    cloudinary.config(
        cloud_name=CLOUDINARY_CLOUD_NAME,
        api_key=CLOUDINARY_API_KEY,
        api_secret=CLOUDINARY_API_SECRET
    )
    
    print(f"  Starting upload for {filename}...")
    # upload_large handles chunking for larger files
    response = cloudinary.uploader.upload_large(
        file_path,
        folder=CLOUDINARY_FOLDER,
        public_id=os.path.splitext(filename)[0],
        resource_type="video",
        chunk_size=6000000 # 6MB chunks
    )
    return response

def main():
    print("--- Starting Local Video Migration ---")
    print(f"Source Directory: {os.path.abspath(LOCAL_VIDEOS_DIR)}")
    
    if not all([CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET]):
        print("Error: Cloudinary environment variables are not set.")
        return

    if not os.path.exists(LOCAL_VIDEOS_DIR):
        print(f"Error: Directory not found: {LOCAL_VIDEOS_DIR}")
        return

    try:
        files = [f for f in os.listdir(LOCAL_VIDEOS_DIR) if not f.startswith('.')]
        print(f"Found {len(files)} files in directory.")
        
        uploaded_videos = []

        for filename in files:
            file_path = os.path.join(LOCAL_VIDEOS_DIR, filename)
            
            if filename.lower().endswith(('.mp4', '.mov', '.avi', '.webm', '.mkv', '.m4v')):
                print(f"Processing: {filename}...")
                
                try:
                    # Upload
                    result = upload_video_to_cloudinary(file_path, filename)
                    
                    uploaded_videos.append({
                        'public_id': result['public_id'],
                        'url': result['secure_url']
                    })
                    print(f"  Success! URL: {result['secure_url']}")
                except Exception as upload_error:
                    print(f"  Failed to upload {filename}: {upload_error}")
            else:
                print(f"Skipping non-video file: {filename}")

        # Save results
        output_file = 'uploaded_videos.json'
        with open(output_file, 'w') as f:
            json.dump(uploaded_videos, f, indent=2)
            
        print(f"\nMigration Complete! {len(uploaded_videos)} videos uploaded.")
        print(f"Results saved to {output_file}")

    except Exception as e:
        print(f"\nAn error occurred: {str(e)}")

if __name__ == '__main__':
    main()
