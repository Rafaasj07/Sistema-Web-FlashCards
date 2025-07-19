import express from 'express';
import multer from 'multer';
import { perguntarIA, perguntarComArquivo } from '../controllers/flashcontroller.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/perguntar', perguntarIA);
router.post('/perguntar-com-arquivo', upload.single('arquivo'), perguntarComArquivo);

export default router;