import express from 'express';
import uploadConfig from '../utils/uploadConfig.js';
import { uploadDataset } from '../controllers/datasetController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/', async (req, res) => {
  res.status(200).json({ message: "Listando datasets" });
});

router.post('/upload', uploadConfig.single('file'), uploadDataset);

router.get('/:id/records', async (req, res) => {
  const { id } = req.params;
  const records = await prisma.records.findMany({
    where: { dataset_id: id },
  });
  res.status(200).json(records);
});

export default router;