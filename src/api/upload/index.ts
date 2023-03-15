import Router from 'express';
import multer from 'multer';
import { handleUploadSingle, handleUploadXlsx } from './upload.controller';

const router = Router();

const upload = multer({ dest: './temp'});

router.post('/file', upload.single('file'), handleUploadSingle);
router.post('/import-inventory', upload.single('file'), handleUploadXlsx);

export default router;