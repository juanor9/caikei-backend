import dotenv from 'dotenv';
dotenv.config();

const cloudinary = require('cloudinary').v2;

export async function uploadImage(image: string) {
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

export async function uploadXLSX(file: string){
  try {
    const result = await cloudinary.uploader.upload(file, 
      {
      folder: 'excelFiles',
      use_filename: true,
      unique_filename: false,
      resource_type: "raw",
      filename_override:`${file}.xlsx`,
      }
    );
    return result;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
}
}

