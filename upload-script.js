const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const basePhotosPath = path.join(__dirname, 'Photos party');

// Define your local folders and their corresponding Cloudinary tags
const categories = [
  {
    folder: 'Behind-the-Scenes-details',
    tag: 'behind-the-scenes-details',
  },
  {
    folder: 'Guests-arriving',
    tag: 'guests-arriving',
  },
  {
    folder: 'Ceremony-and-tributes',
    tag: 'ceremony-tributes',
  },
  {
    folder: 'Waltz',
    tag: 'waltz',
  },
  {
    folder: 'The-party-vibes',
    tag: 'party-vibes',
  },
];

const uploadImages = async () => {
  for (const category of categories) {
    const categoryPath = path.join(basePhotosPath, category.folder);
    console.log(`Processing category: ${category.folder} with tag: ${category.tag}`);

    try {
      const files = fs.readdirSync(categoryPath);
      for (const file of files) {
        const filePath = path.join(categoryPath, file);
        // Check if it's an image file (you might want to expand this list)
        if (['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase())) {
          console.log(`Uploading ${file}...`);
          try {
            const result = await cloudinary.uploader.upload(filePath, {
              use_filename: true,
              unique_filename: false,
              tags: [category.tag],
              folder: 'annapinkerman-site-photos' // Optional: specify a folder in Cloudinary
            });
            console.log(`Successfully uploaded ${file}. Public ID: ${result.public_id}`);
          } catch (uploadError) {
            console.error(`Failed to upload ${file}:`, uploadError.message);
          }
        }
      }
    } catch (readDirError) {
      console.error(`Error reading directory ${categoryPath}:`, readDirError.message);
    }
  }
  console.log('All uploads attempted.');
};

uploadImages();
