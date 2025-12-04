import os
import json
import cloudinary
import cloudinary.uploader
from PIL import Image
import io

# --- Configuration ---
# Local Directory containing the photos
LOCAL_PHOTOS_DIR = '/Users/renandkt/Sites/annapinkerman-site/Photos party/Prélude à Paris'

# Cloudinary Configuration (Load from environment variables)
CLOUDINARY_CLOUD_NAME = os.environ.get('CLOUDINARY_CLOUD_NAME')
CLOUDINARY_API_KEY = os.environ.get('CLOUDINARY_API_KEY')
CLOUDINARY_API_SECRET = os.environ.get('CLOUDINARY_API_SECRET')

# Target Cloudinary Folder and Tag
CLOUDINARY_FOLDER = 'anna-15/pre-session'
CLOUDINARY_TAG = 'pre-session'

# Max file size in bytes (10MB - safety margin)
MAX_SIZE_BYTES = 9.5 * 1024 * 1024 

def compress_image(file_path):
    """Compresses/Resizes image to fit within the size limit."""
    try:
        img = Image.open(file_path)
        
        # Convert to RGB if necessary (e.g. for PNGs with transparency if saving as JPEG)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
            
        # Resize if dimensions are huge (optional, but helps size)
        max_dimension = 4000
        if max(img.size) > max_dimension:
            img.thumbnail((max_dimension, max_dimension), Image.Resampling.LANCZOS)
            
        output_buffer = io.BytesIO()
        # Save as JPEG with quality 85
        img.save(output_buffer, format='JPEG', quality=85, optimize=True)
        
        # If still too big, reduce quality
        quality = 85
        while output_buffer.tell() > MAX_SIZE_BYTES and quality > 30:
            output_buffer = io.BytesIO()
            quality -= 10
            img.save(output_buffer, format='JPEG', quality=quality, optimize=True)
            
        output_buffer.seek(0)
        return output_buffer
    except Exception as e:
        print(f"Error compressing {file_path}: {e}")
        return None

def upload_to_cloudinary(file_obj, filename):
    """Uploads a file object to Cloudinary."""
    cloudinary.config(
        cloud_name=CLOUDINARY_CLOUD_NAME,
        api_key=CLOUDINARY_API_KEY,
        api_secret=CLOUDINARY_API_SECRET
    )
    
    response = cloudinary.uploader.upload(
        file_obj,
        folder=CLOUDINARY_FOLDER,
        public_id=os.path.splitext(filename)[0],
        tags=[CLOUDINARY_TAG],
        resource_type="auto"
    )
    return response

def main():
    print("--- Starting Local Photo Migration (with Auto-Resize) ---")
    print(f"Source Directory: {LOCAL_PHOTOS_DIR}")
    
    if not all([CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET]):
        print("Error: Cloudinary environment variables are not set.")
        return

    if not os.path.exists(LOCAL_PHOTOS_DIR):
        print(f"Error: Directory not found: {LOCAL_PHOTOS_DIR}")
        return

    try:
        files = [f for f in os.listdir(LOCAL_PHOTOS_DIR) if not f.startswith('.')]
        print(f"Found {len(files)} files in directory.")
        
        uploaded_images = []

        for filename in files:
            file_path = os.path.join(LOCAL_PHOTOS_DIR, filename)
            
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp', '.heic')):
                print(f"Processing: {filename}...")
                
                file_size = os.path.getsize(file_path)
                upload_payload = file_path
                
                if file_size > MAX_SIZE_BYTES:
                    print(f"  File size ({file_size/1024/1024:.2f}MB) exceeds limit. Compressing...")
                    compressed_buffer = compress_image(file_path)
                    if compressed_buffer:
                        upload_payload = compressed_buffer
                        print(f"  Compressed size: {compressed_buffer.getbuffer().nbytes/1024/1024:.2f}MB")
                    else:
                        print("  Compression failed. Skipping.")
                        continue
                
                try:
                    # Upload
                    print(f"  Uploading to Cloudinary ({CLOUDINARY_FOLDER})...")
                    result = upload_to_cloudinary(upload_payload, filename)
                    
                    uploaded_images.append({
                        'public_id': result['public_id'],
                        'url': result['secure_url']
                    })
                    print(f"  Success! URL: {result['secure_url']}")
                except Exception as upload_error:
                    print(f"  Failed to upload {filename}: {upload_error}")
            else:
                print(f"Skipping non-image file: {filename}")

        # Save results
        output_file = 'uploaded_local_photos_v2.json'
        with open(output_file, 'w') as f:
            json.dump(uploaded_images, f, indent=2)
            
        print(f"\nMigration Complete! {len(uploaded_images)} images uploaded.")
        print(f"Results saved to {output_file}")

    except Exception as e:
        print(f"\nAn error occurred: {str(e)}")

if __name__ == '__main__':
    main()
