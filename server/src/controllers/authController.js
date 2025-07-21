import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userModel from "../models/userModel.js";
import { buscarUsuarioPorEmail } from "./usersControllers.js";

export const register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const camposObrigatorios = { nome, email, senha };
    const camposFaltando = Object.entries(camposObrigatorios)
      .filter(([_, valor]) => !valor)
      .map(([campo]) => campo);

    if (camposFaltando.length > 0) {
      return res.status(400).json({
        error: "Campos obrigatórios faltando!",
        campos: camposFaltando,
      });
    }

    const usuarioExistente = await buscarUsuarioPorEmail(email);
    if (usuarioExistente) {
      return res
        .status(409)
        .json({ error: "Email já cadastrado!", field: "email" });
    }

    const novoUsuario = await userModel.criarUsuario(nome, email, senha);

    const token = jwt.sign(
      {
        id: novoUsuario.id,
        email: novoUsuario.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      id: novoUsuario.id,
      token,
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return res.status(500).json({ error: "Erro ao cadastrar usuário!" });
  }
};

export const login = async (req, res) => {
  console.log("REQUEST", req.body);
  try {
    const { email, senha } = req.body;

    const usuario = await buscarUsuarioPorEmail(email);
    console.log("Resultado da busca:", usuario);

    if (!usuario || !usuario.senha_hash) {
      return res.status(401).send({ error: "Credenciais inválidas!" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    console.log("Senha válida?", senhaValida);

    if (!senhaValida) {
      return res.status(401).send({ error: "Credenciais inválidas!" });
    }

    const token = jwt.sign(
      { id: usuario.id, name: usuario.nome, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro ao fazer login!" });
  }
};