import api from "./apiConfig";

export async function listarDataset() {
  try {
    const response = await api.get("/datasets");
    return response.data;
  } catch (error) {
    console.error("Erro ao listar datasets:", error.response?.data || error.message);
    throw error;
  }
}

export async function enviarArquivo(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post(`/datasets/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar arquivo:", error.response?.data || error.message);
    throw error;
  }
}

export async function listarRecordsPorDataset(datasetId) {
  try {
    const response = await api.get(`/datasets/${datasetId}/records`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar registros do dataset:", error.response?.data || error.message);
    throw error;
  }
}