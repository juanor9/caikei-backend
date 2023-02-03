import dotenv from 'dotenv';
dotenv.config();

const cloudinary = require('cloudinary').v2;

async function uploadImage(image: string) {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'dataFiles', // verificar luego
      use_filename: true,
      unique_filename: false,
    })
    return result;
  } catch (error: any) {
    throw new Error(error)
  }
}

export default uploadImage;
