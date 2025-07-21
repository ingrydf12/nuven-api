import prisma from '../database/prisma.js';
import fs from 'fs/promises';
import path from 'path';

export const uploadDataset = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Arquivo obrigatório' });

    const { originalname, path: filePath } = req.file;
    const userId = req.user?.id || 1;

    const dataset = await prisma.datasets.create({
      data: {
        nome: originalname,
        usuario_id: userId,
        criado_em: new Date(),
      },
    });

    // No caso de ser csv, vai extrair os dados
    let dadosJson = null;
    if (path.extname(originalname) === '.csv') {
      const csv = await fs.readFile(filePath, 'utf8');
      const linhas = csv.split('\n').filter(Boolean);
      const cabecalhos = linhas[0].split(',');

      const json = linhas.slice(1).map(linha => {
        const colunas = linha.split(',');
        const obj = {};
        cabecalhos.forEach((chave, i) => {
          obj[chave.trim()] = colunas[i]?.trim() || null;
        });
        return obj;
      });

      dadosJson = JSON.stringify(json);
    }

    // E do tipo pdf, vai mudar pra base64
    else if (path.extname(originalname) === '.pdf') {
      const pdfBuffer = await fs.readFile(filePath);
      dadosJson = JSON.stringify({ base64: pdfBuffer.toString('base64') });
    }

    //Vincula aos records
    if (dadosJson) {
      await prisma.records.create({
        data: {
          dataset_id: dataset.id,
          dados_json: dadosJson,
          criado_em: new Date(),
        },
      });
    }

    res.status(201).json({ message: 'Upload realizado com sucesso', datasetId: dataset.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar o upload' });
  }
};