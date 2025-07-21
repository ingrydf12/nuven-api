import api from "./apiConfig";

export async function getUserProfile(token) {
    try {
        const response = await api.get("/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Usuário autenticado:", response.data.user);
        return response.data.user;
    } catch (error) {
        console.error("Erro ao obter perfil do usuário:", error.response?.data || error.message);
        return null;
    }
}