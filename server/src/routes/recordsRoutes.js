import express from "express";
import * as recordsModel from "../models/recordsModel.js";

const router = express.Router();

router.get('/', recordsModel.listarRecords);

router.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Você precisa passar um termo para pesquisar" });
  }

  try {
    const records = await recordsModel.listaRecordsPorQuery(query);
    res.status(200).json(records);
  } catch (error) {
    console.error("Erro ao pesquisar registros:", error);
    res.status(500).json({ error: "Erro ao pesquisar registros" });
  }
});

export default router;
