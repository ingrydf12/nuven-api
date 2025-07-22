import prisma from "../database/prisma.js";

export const listarRecords = async (req, res) => {
  try {
    const records = await prisma.records.findMany();
    res.status(200).json(records);
    }
    catch (error) { 
    console.error("Erro ao listar registros:", error);
    res.status(500).json({ error: "Erro ao listar registros" });
    }
};

export const listaRecordsPorQuery = async (query) => {
  try {
    const records = await prisma.records.findMany({
      where: {
        dataset: {
          nome: {
            contains: query,
            mode: 'insensitive'
          }
        }
      },
      include: {
        dataset: true
      }
    });
    return records;
  } catch (error) {
    console.error("Erro ao listar registros:", error);
    throw error;
  }
}