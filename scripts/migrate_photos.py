import os
import json
import requests
from googleapiclient.discovery import build
from google.oauth2 import service_account
from googleapiclient.http import MediaIoBaseDownload
import cloudinary
import cloudinary.uploader
import io

# --- Configuration ---
# Google Drive Folder ID (from the provided URL)
FOLDER_ID = '1jmKlL6R6PHPsltA3kM_sMRlABbpZ3-Wp' 

# Cloudinary Configuration (Load from environment variables)
CLOUDINARY_CLOUD_NAME = os.environ.get('CLOUDINARY_CLOUD_NAME')
CLOUDINARY_API_KEY = os.environ.get('CLOUDINARY_API_KEY')
CLOUDINARY_API_SECRET = os.environ.get('CLOUDINARY_API_SECRET')

# Target Cloudinary Folder and Tag
CLOUDINARY_FOLDER = 'anna-15/pre-session'
CLOUDINARY_TAG = 'pre-session'

# Google Drive Credentials File
CREDENTIALS_FILE = 'credentials.json'

def authenticate_google_drive():
    """Authenticates with Google Drive API."""
    SCOPES = ['https://www.googleapis.com/auth/drive.readonly']
    creds = service_account.Credentials.from_service_account_file(
        CREDENTIALS_FILE, scopes=SCOPES)
    service = build('drive', 'v3', credentials=creds)
    return service

def list_files_in_folder(service, folder_id):
    """Lists all files in a specific Google Drive folder."""
    results = service.files().list(
        q=f"'{folder_id}' in parents and trashed = false",
        fields="nextPageToken, files(id, name, mimeType)").execute()
    return results.get('files', [])

def download_file(service, file_id):
    """Downloads a file from Google Drive into memory."""
    request = service.files().get_media(fileId=file_id)
    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fh, request)
    done = False
    while done is False:
        status, done = downloader.next_chunk()
    fh.seek(0)
    return fh

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
        tags=[CLOUDINARY_TAG], # CRITICAL: This tag is used by the frontend API
        resource_type="auto"
    )
    return response

def main():
    print("--- Starting Photo Migration ---")
    
    if not all([CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET]):
        print("Error: Cloudinary environment variables are not set.")
        return

    if not os.path.exists(CREDENTIALS_FILE):
        print(f"Error: {CREDENTIALS_FILE} not found. Please place your Google Service Account credentials in the same directory.")
        return

    try:
        service = authenticate_google_drive()
        files = list_files_in_folder(service, FOLDER_ID)
        
        print(f"Found {len(files)} files in Google Drive folder.")
        
        uploaded_images = []

        for file in files:
            if 'image' in file['mimeType']:
                print(f"Processing: {file['name']}...")
                
                # Download
                file_content = download_file(service, file['id'])
                
                # Upload
                print(f"  Uploading to Cloudinary ({CLOUDINARY_FOLDER})...")
                result = upload_to_cloudinary(file_content, file['name'])
                
                uploaded_images.append({
                    'public_id': result['public_id'],
                    'url': result['secure_url']
                })
                print(f"  Success! URL: {result['secure_url']}")
            else:
                print(f"Skipping non-image file: {file['name']}")

        # Save results
        with open('uploaded_photos.json', 'w') as f:
            json.dump(uploaded_images, f, indent=2)
            
        print(f"\nMigration Complete! {len(uploaded_images)} images uploaded.")
        print("Results saved to uploaded_photos.json")

    except Exception as e:
        print(f"\nAn error occurred: {str(e)}")

if __name__ == '__main__':
    main()
