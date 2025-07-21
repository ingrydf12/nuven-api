import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import datasetsRoutes from './routes/datasetsRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use('/', authRoutes);
app.use('/datasets', datasetsRoutes);

app.get('/', (_req, res) => {
  res.send('NUVEN API - Desafio técnico, Ingryd.');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});