import prisma from "../database/prisma.js";

export const listarDataset = async (req, res) => {
  try {
    const datasets = await prisma.datasets.findMany();
    res.status(200).json(datasets);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar datasets" });
  }
}

export const envioArquivo = async (req, res) => {
    try {
        const { id } = req.params;
        const arquivo = req.file;

        if (!arquivo) {
            return res.status(400).json({ error: "Nenhum arquivo enviado" });
        }

        await prisma.datasets.update({
            where: { id: Number(id) },
            data: { arquivo: arquivo.path }
        });

        res.status(200).json({ message: `Arquivo enviado com sucesso para o dataset ${id}` });
    } catch (error) {
        res.status(500).json({ error: "Erro ao enviar arquivo" });
    }
}

export const listarRecordsPorDataset = async (req, res) => {
  const { id } = req.params;

  try {
    let records = await prisma.records.findMany({
      where: { dataset_id: Number(id) },
    });

    records = records.map(record => ({
      ...record,
      dados_json: typeof record.dados_json === 'string' 
        ? JSON.parse(record.dados_json) 
        : record.dados_json
    }));

    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar registros' });
  }
};
