import api from "./apiConfig";

export async function pesquisarRegistros(query) {
  try {
    const response = await api.get(`/records/search`, {
      params: { query },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao pesquisar registros:", error);
    throw error;
  }
}