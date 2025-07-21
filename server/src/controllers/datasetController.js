import fs from 'fs/promises';
import path from 'path';
import prisma from '../database/prisma.js';

export const uploadDataset = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Arquivo obrigatório' });

    const { originalname, path: filePath } = req.file;
    const userId = req.user?.id || 1;

    const dataset = await prisma.datasets.create({
      data: {
        nome: originalname,
        usuario_id: userId,
      },
    });

    let dadosJsonString = null;

    if (path.extname(originalname) === '.csv') {
      const csvContent = await fs.readFile(filePath, 'utf8');
      const rows = csvContent.split('\n').filter(Boolean);
      const headers = rows[0].split(',');

      const jsonData = rows.slice(1).map(row => {
        const values = row.split(',');
        const obj = {};
        headers.forEach((h, i) => (obj[h.trim()] = values[i]?.trim() || null));
        return obj;
      });

      dadosJsonString = JSON.stringify(jsonData);
    } else if (path.extname(originalname) === '.pdf') {
      const pdfBuffer = await fs.readFile(filePath);
      dadosJsonString = JSON.stringify({ base64: pdfBuffer.toString('base64') });
    }

    if (dadosJsonString) {
      await prisma.records.create({
        data: {
          dataset_id: dataset.id,
          dados_json: dadosJsonString,
        },
      });
    }

    res.status(201).json({ message: 'Upload e processamento concluído', datasetId: dataset.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar o upload' });
  }
};
