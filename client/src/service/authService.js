import api from './apiConfig.js';

export async function login(email, senha) {
  const response = await api.post('/auth/login', { email, senha });
  return response.data.usuario;
}

export async function register(nome, email, senha) {
  const response = await api.post('/auth/register', { nome, email, senha });
  return response.data.usuario;
}