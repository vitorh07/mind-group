const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());

app.get('/usuarios', async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

app.post('/usuarios', async (req, res) => {
  const { nome, email, senha } = req.body;

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const novoUsuario = await prisma.usuario.create({
    data: { nome, email, senha: senhaCriptografada }
  });

  res.json(novoUsuario);
});

app.post('/usuarios/login', async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await prisma.usuario.findUnique({
    where: { email }
  });

  if (!usuario) {
    return res.status(401).json({ mensagem: 'Email ou senha incorretos' });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (senhaValida) {
    res.json({ mensagem: 'Login com sucesso' });
  } else {
    res.status(401).json({ mensagem: 'Email ou senha incorretos' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
