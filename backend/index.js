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

app.get('/usuarios/:id', async (req, res) => {
  const { id } = req.params;

  const usuario = await prisma.usuario.findUnique({
    where: { id: Number(id) }
  });

  if (!usuario) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }

  res.json(usuario);
});

app.post('/usuarios', async (req, res) => {
  const { nome, email, senha } = req.body;

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const novoUsuario = await prisma.usuario.create({
    data: { nome, email, senha: senhaCriptografada }
  });

  res.json(novoUsuario);
});

app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  const usuarioExistente = await prisma.usuario.findUnique({
    where: { id: Number(id) }
  });

  if (!usuarioExistente) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const usuarioAtualizado = await prisma.usuario.update({
    where: { id: Number(id) },
    data: { nome, email, senha: senhaCriptografada }
  });

  res.json(usuarioAtualizado);
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

app.get('/artigos', async (req, res) => {
  try {
    const artigos = await prisma.artigo.findMany({
      include: { autor: { select: { id: true, nome: true, email: true } } }
    });
    res.json(artigos);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar artigos' });
  }
});

app.get('/artigos/:id', async (req, res) => {
  const { id } = req.params;

  const artigo = await prisma.artigo.findUnique({
    where: { id: Number(id) }
  });

  if (!artigo) {
    return res.status(404).json({ mensagem: 'Artigo não encontrado' });
  }

  res.json(artigo);
});

app.post('/artigos', async (req, res) => {
  const { titulo, conteudo, imagemDestaque, autorId } = req.body;
  try {
    const novoArtigo = await prisma.artigo.create({
      data: {
        titulo,
        conteudo,
        imagemDestaque,
        autorId
      }
    });
    res.json(novoArtigo);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar artigo' });
  }
});

app.put('/artigos/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, conteudo, imagemDestaque } = req.body;
  try {
    const artigoAtualizado = await prisma.artigo.update({
      where: { id: Number(id) },
      data: {
        titulo,
        conteudo,
        imagemDestaque,
        dataAtualizacao: new Date()
      }
    });
    res.json(artigoAtualizado);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar artigo' });
  }
});

app.delete('/artigos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.artigo.delete({
      where: { id: Number(id) }
    });
    res.json({ mensagem: 'Artigo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar artigo' });
  }
});

app.post('/artigos/:id/curtir', async (req, res) => {
  const { id } = req.params;
  try {
    const artigo = await prisma.artigo.update({
      where: { id: Number(id) },
      data: { curtidas: { increment: 1 } }
    });
    res.json(artigo);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao curtir artigo' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
