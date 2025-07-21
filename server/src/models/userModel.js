import prisma from '../database/prisma.js';
import bcrypt from 'bcrypt';

export const listarUsuario = async () => {
    return await prisma.users.findMany();
};

export const buscarUsuarioPorId = async (id) => {
    const users = await prisma.users.findUnique({
        where: { id }
    });
    if (!users) {
        throw new Error('Usuário não encontrado...');
    };
    return users;
};

export const buscarUsuarioPorEmail = async (email) => {
  return await prisma.users.findUnique({ where: { email } });
};

export const criarUsuario = async (nome, email, senha) => {
    const senhaHash = await bcrypt.hash(senha, 10);
    return await prisma.users.create({
        data:
        {
            nome, 
            email, 
            senha_hash: senhaHash, 
        }
    });
};