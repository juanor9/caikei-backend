import { Request, Response } from "express"
import { createBook } from "./book.services"

export async function handleCreateBook(
    req: Request, 
    res: Response
){
    const newBook = req.body;
     
    try {
    // activate book
    newBook.isActive = true;

    const book = createBook(newBook);

    return res.status(200).json(book) 
        
    } catch (error) {
        return res.status(500).json(error);
    }
}
