import Router from 'express';
import multer from 'multer';
import { handleUploadSingle } from './upload.controller';

const router = Router();

const upload = multer({ dest: './temp'});

router.post('/file', upload.single('file'), handleUploadSingle);

export default router;