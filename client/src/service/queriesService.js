import api from "./apiConfig";

export async function listarQueries() {
  try {
    const response = await api.get("/queries");
    return response.data;
  } catch (error) {
    console.error("Erro ao puxar histórico das queries:", error.response?.data || error.message);
    throw error;
  }
}

export async function askAPI (pergunta, datasetId) {
  try {
    const response = await api.post("/queries", { pergunta, datasetId });
    return response.data;
  } catch (error) {
    console.error("Erro ao consultar API:", error.response?.data || error.message);
    throw error;
  }
}