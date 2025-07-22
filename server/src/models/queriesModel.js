import prisma from "../database/prisma.js";

export const historicoQueries = async (req, res) => {
  try {
    const queries = await prisma.queries.findMany({
      orderBy: { criado_em: "desc" },
      include: { user: true },
    });
    res.status(200).json(queries);
  } catch (error) {
    console.error("Erro ao listar histórico de queries:", error);
    res.status(500).json({ error: "Erro ao listar histórico de queries" });
  }
};

export const criarQuery = async ({ pergunta, resposta, datasetId, usuario_id }) => {
  try {
    const dataset = await prisma.datasets.findUnique({
      where: { id: datasetId },
    });

    if (!dataset) {
      throw new Error("Dataset não encontrado");
    }
  } catch (error) {
    throw new Error("Erro ao criar query");
  }

  return prisma.queries.create({
    data: {
      pergunta,
      resposta,
      dataset_id: datasetId,
      usuario_id,
      criado_em: new Date(),
    },
  });
};

//Para montar a query
export const buscarDatasetComRecords = async (datasetId) => {
  return await prisma.datasets.findUnique({
    where: { id: Number(datasetId) },
    include: { records: true },
  });
};
