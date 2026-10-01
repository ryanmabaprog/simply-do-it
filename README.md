# Simply Do

API de gerenciamento de tarefas com TypeScript, Express, PostgreSQL e Better Auth.

## Requisitos

- Node.js 20 ou superior
- PostgreSQL 14 ou superior
- Um banco PostgreSQL criado para o projeto

## Configuração

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie o arquivo de ambiente:

   ```bash
   cp .env.example .env
   ```

3. Ajuste `POSTGRES_DB_CONN_STRING` e `BETTER_AUTH_SECRET` no `.env`.

4. Execute as migrações na ordem:

   ```bash
   psql "$POSTGRES_DB_CONN_STRING" -f migrations/002_auth.sql
   psql "$POSTGRES_DB_CONN_STRING" -f migrations/001_create_tasks_table.sql
   ```

   A migração de tarefas depende da tabela `user`, criada pela migração de autenticação.

## Desenvolvimento

Verifique os tipos:

```bash
npm run check
```

Compile o projeto:

```bash
npm run build
```

Execute em modo de desenvolvimento, recompilando quando houver alterações:

```bash
npm run watch
```

Em outro terminal, inicie a aplicação compilada:

```bash
npm start
```

Por padrão, o servidor fica disponível em `http://localhost:3000`.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run check` | Verifica os tipos sem gerar arquivos |
| `npm run build` | Compila `src/` para `dist/` |
| `npm run watch` | Recompila automaticamente durante o desenvolvimento |
| `npm start` | Inicia `dist/index.js` |

## API

### Autenticação

As rotas do Better Auth são expostas em:

```text
/api/auth/*
```

O fluxo de autenticação é baseado em e-mail e senha, conforme a configuração do Better Auth.

### Tarefas

As rotas disponíveis são:

| Método | Rota | Corpo |
| --- | --- | --- |
| `POST` | `/tasks` | `{ "title": "Minha tarefa", "description": "Opcional", "dueDate": "2026-10-01T12:00:00.000Z" }` |
| `GET` | `/tasks` | Nenhum |
| `PATCH` | `/tasks/:taskId` | `{ "title": "Novo título", "description": null, "dueDate": null, "completed": true }` |

As operações de tarefas usam o usuário autenticado da requisição e retornam JSON. Envie `Content-Type: application/json` nas requisições com corpo.

## Estrutura

```text
src/
  index.ts          # Entrada da aplicação e servidor HTTP
  router.ts         # Rotas de tarefas
  taskController.ts # Adaptador HTTP
  taskDomain.ts     # Regras da entidade Task
  taskModels.ts     # Persistência no PostgreSQL
  taskService.ts    # Casos de uso
  lib/              # Autenticação e conexão com o banco
  utils/            # Configuração de ambiente
migrations/         # Estrutura do banco de dados
```
