import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import datasetsRoutes from './routes/datasetsRoutes.js';
import recordsRoutes from './routes/recordsRoutes.js';
import queriesRoutes from './routes/queriesRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use('/', authRoutes);
app.use('/datasets', datasetsRoutes);
app.use('/records', recordsRoutes);
app.use('/queries', queriesRoutes);

app.get('/', (_req, res) => {
  res.send('NUVEN API - Desafio técnico, Ingryd.');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});