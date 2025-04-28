import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: File): Promise<string> {
  if (process.env.NODE_ENV === 'production') {
    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;
    
    // Upload to Cloudinary
    try {
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'first-flavors',
        resource_type: 'auto',
        transformation: [
          { width: 1200, crop: 'limit' }, // Limit max width while maintaining aspect ratio
          { quality: 'auto:good' }, // Automatic quality optimization
          { fetch_format: 'auto' } // Automatic format optimization
        ]
      });
      
      return result.secure_url;
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      throw new Error('Failed to upload image');
    }
  } else {
    // Local development storage
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    // Ensure uploads directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, ignore error
    }

    // Generate unique filename
    const uniqueFilename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadDir, uniqueFilename);
    
    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);
    
    return `/uploads/${uniqueFilename}`;
  }
}