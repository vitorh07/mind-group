# Mind Group Blog

Este projeto é composto por duas partes principais: **Back-end** (API Node.js + Prisma + MySQL) e **Front-end** (React Native com Expo).

---

## Clonar o repositório
```bash
git clone https://github.com/vitorh07/mind-group.git
```

## 📦 Backend

Localização: [`backend/`](backend/)

### Tecnologias
- Node.js
- Express
- Prisma ORM
- MySQL
- Bcrypt

### Como rodar

1. Instale as dependências:
   ```sh
   cd backend
   npm install
   ```

2. Configure o banco de dados:
   - Crie um banco MySQL chamado `db_mg`.
   - Ajuste as variáveis no arquivo `.env` (exemplo abaixo):

     ```
     DATABASE_URL="mysql://root:12345@localhost:3306/db_mg"
     ```

3. Rode as migrações do Prisma:
   ```sh
   npx prisma migrate deploy
   ```

4. Inicie o servidor:
   ```sh
   npm start
   ```
   O backend estará disponível em `http://localhost:3000`.

### Endpoints disponíveis

- **Usuários**
  - `POST /usuarios` — Cria um novo usuário
  - `POST /login` — Realiza login do usuário
  - `GET /usuarios` — Lista todos os usuários
  - `GET /usuarios/:id` — Busca usuário por ID
  - `PUT /usuarios/:id` — Atualiza usuário
  - `DELETE /usuarios/:id` — Remove usuário

- **Artigos**
  - `POST /artigos` — Cria um novo artigo
  - `GET /artigos` — Lista todos os artigos
  - `GET /artigos/:id` — Busca artigo por ID
  - `PUT /artigos/:id` — Atualiza artigo
  - `DELETE /artigos/:id` — Remove artigo

- **Curtidas**
  - `POST /artigos/:id/curtir` — Curte/descurte um artigo
---

#### Exemplo: Criar Usuário

**Requisição**
```http
POST /usuarios

{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "123456"
}
```

**Resposta**
```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com"
}
```

---

#### Exemplo: Criar Artigo

**Requisição**
```http
POST /artigos

{
  "titulo": "Meu Primeiro Artigo",
  "conteudo": "Este é o conteúdo do artigo.",
  "usuarioId": 1
}
```

**Resposta**
```json
{
  "id": 1,
  "titulo": "Meu Primeiro Artigo",
  "conteudo": "Este é o conteúdo do artigo.",
  "usuarioId": 1,
  "createdAt": "2025-05-22T12:00:00.000Z"
}
```

---


## 📱 Frontend

Localização: [`frontend/Blog/`](frontend/Blog/)

### Tecnologias
- React Native
- Expo

### Como rodar

1. Instale as dependências:
   ```sh
   cd frontend/Blog
   npm install
   ```

2. Inicie o app:
   ```sh
   npm start
   ```
   O Expo abrirá um painel para rodar no emulador, dispositivo físico ou web.

---

## 📚 Estrutura de Pastas

```
backend/
  index.js
  db.js
  prisma/
    schema.prisma
    migrations/
frontend/
  Blog/
    App.tsx
    assets/
```

---

## 📝 Observações

- O backend expõe rotas para usuários e artigos (CRUD, login, curtir artigo, etc).
- O frontend possui telas de splash, login, registro e perfil.
- Infelizmente não há comunicação do front-end com o back-end.
- Foi iniciado em 20/05/2025 e finalizado em 22/05/2025.
- Primeira experiência com React Native e Expo.
- Processo Seletivo Desenvolvimento - Mind Group.
---