import * as queriesModel from "../models/queriesModel.js";
import { perguntarHuggingFace } from "../utils/huggingfaceConfig.js";
import express from "express";
import { extrairTextoDoJSON } from "../utils/extracaoJSON.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const queries = await queriesModel.historicoQueries(req, res);
    res.status(200).json(queries);
  } catch (error) {
    console.error("Erro ao listar registros:", error);
    res.status(500).json({ error: "Erro ao listar registros" });
  }
});

router.post("/", async (req, res) => {
  const { pergunta, datasetId } = req.body;
  const usuarioId = req.user?.id;

  if (!pergunta || pergunta.trim() === '') {
    return res.status(400).json({ error: "Pergunta inválida" });
  }

  if (!datasetId) {
    return res.status(400).json({ error: "datasetId é obrigatório" });
  }

  try {
    const dataset = await queriesModel.buscarDatasetComRecords(datasetId);
    if (!dataset) {
      return res.status(404).json({ error: "Dataset não encontrado" });
    }

    const contexto = dataset.records
      .slice(0, 10)
      .map((r) => extrairTextoDoJSON(r.dados_json))
      .filter((texto) => texto && texto.trim() !== "")
      .join(" ");

    if (!contexto) {
      return res
        .status(404)
        .json({ error: "Não foi encontrado um contexto válido." });
    }

    let resposta;
    try {
      resposta = await perguntarHuggingFace(pergunta, contexto);
    } catch (hfError) {
      return res.status(502).json({ error: "Erro ao consultar serviço de IA" });
    }

    const savedQuery = await queriesModel.criarQuery({
      pergunta,
      resposta,
      datasetId: Number(datasetId),
      usuario_id: usuarioId,
      criado_em: new Date(),
    });

    res.status(200).json({ savedQuery, resposta });
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar consulta" });
  }
});


export default router;
