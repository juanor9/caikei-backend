import { Request, Response } from 'express';
import fs from 'fs';
import { promisify } from 'util';
import { uploadImage, uploadXLSX } from './upload.services';
import * as XLSX from 'xlsx';

const unlinkAsync = promisify(fs.unlink);

export async function handleUploadSingle(req: Request, res: Response): Promise<void> {
  // Verificar si el archivo está presente en la solicitud
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  const { path, size } = req.file;
  const maxSize = 1024 * 1024 * 2; // Tamaño máximo: 2 MB

  // Verificar el tamaño del archivo
  if (size > maxSize) {
    try {
      await unlinkAsync(path); // Eliminar el archivo de manera asíncrona
    } catch (error) {
      console.error("Error deleting file:", error);
    }
    res.status(400).json({ message: "File is too large" });
    return;
  }

  try {
    // Subir la imagen
    const result = await uploadImage(path);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  } finally {
    // Asegurarse de eliminar el archivo cargado
    try {
      await unlinkAsync(path);
    } catch (error) {
      console.error("Error deleting file in finally block:", error);
    }
  }
}

export async function handleUploadXlsx(req: Request, res: Response): Promise<void> {
  // Verificar si el archivo está presente en la solicitud
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  const { path } = req.file;

  try {
    // Leer el archivo Excel
    const workbook = XLSX.readFile(path);
    const worksheet = workbook.Sheets['Hoja1'];

    // Convertir la hoja de Excel a JSON
    if (!worksheet) {
      res.status(400).json({ message: "Sheet 'Hoja1' not found in the provided XLSX file" });
      return;
    }

    const json = XLSX.utils.sheet_to_json(worksheet);
    res.json(json);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  } finally {
    // Asegurarse de eliminar el archivo cargado
    try {
      await unlinkAsync(path);
    } catch (error) {
      console.error("Error deleting file in finally block:", error);
    }
  }
}
