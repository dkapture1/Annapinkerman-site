from PIL import Image
import os

SOURCE_IMAGE = "Photos party/Prélude à Paris/Anna-19.jpg"
OUTPUT_ICO = "public/favicon.ico"
OUTPUT_PNG = "public/images/anna-19-icon.png"

def generate_favicon():
    try:
        if not os.path.exists(SOURCE_IMAGE):
            print(f"Error: Source image not found at {SOURCE_IMAGE}")
            return

        img = Image.open(SOURCE_IMAGE)
        
        # Generate ICO (usually contains multiple sizes, but 32x32 is standard for basic use)
        # We'll include 16x16, 32x32, 48x48 as requested
        img.save(OUTPUT_ICO, format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
        print(f"Generated {OUTPUT_ICO}")

        # Generate PNG (32x32)
        img_png = img.resize((32, 32), Image.Resampling.LANCZOS)
        img_png.save(OUTPUT_PNG, format='PNG')
        print(f"Generated {OUTPUT_PNG}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    generate_favicon()
