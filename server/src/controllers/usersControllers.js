import * as users from "../models/userModel.js";
import prisma from "../database/prisma.js";

export const listarUsuario = async (req, res) => {
  try {
    const usuario = await users.listarUsuario();
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ erro: error.message || "Erro ao listar!" });
  }
};

export const buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await users.buscarUsuarioPorId(Number(id));
    res.status(200).json(usuario);
  } catch (error) {
    res.status(404).json({ error: error.message || "Erro ao buscar!" });
  }
};

export const buscarUsuarioPorEmail = async (email) => {
  try {
    if (!email) {
      throw new Error("Email é obrigatório");
    }

    const usuario = await prisma.users.findUnique({
      where: { email },
    });

    return usuario;
  } catch (error) {
    console.error("ERRO AO BUSCAR USUÁRIO POR EMAIL:", error);
    throw error;
  }
};

export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const novoUsuario = await users.criarUsuario(nome, email, senha);
    res.status(201).json(novoUsuario);
  } catch (erro) {
    res.status(500).json({ error: erro.message || "Erro ao criar!" });
  }
};
