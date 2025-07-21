import express from 'express';
import uploadConfig from '../utils/uploadConfig.js';
import { uploadDataset } from '../controllers/datasetController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import * as datasetModel from '../models/datasetModel.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/', authMiddleware, datasetModel.listarDataset);

router.post('/upload', authMiddleware, uploadConfig.single('file'), uploadDataset);
router.get('/:id/records', authMiddleware, datasetModel.listarRecordsPorDataset);

export default router;