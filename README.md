# API Usadas / Frontend

Esse repositório contém o frontend do projeto **API Usadas**, parte da Sprint 3 do Challenge da ESPG. O objetivo é fornecer uma interface para interagir com a API de anúncios de carros usados, permitindo visualizar, cadastrar, editar e remover anúncios, bem como filtrar e buscar por critérios (marca, modelo, preço, etc.).

---

## Índice

1. [Funcionalidades](#funcionalidades)  
2. [Tecnologias](#tecnologias)  
3. [Estrutura do Projeto](#estrutura-do-projeto)  
4. [Pré‑requisitos](#pré-requisitos)  
5. [Como executar](#como-executar)  
6. [Rotas / Endpoints usados](#rotas--endpoints-usados)  
7. [Variáveis de Ambiente](#variáveis-de-ambiente)  
8. [Como contribuir](#como-contribuir)  
9. [Licença](#licença)

---

## Funcionalidades

- Listar anúncios de carros usados.  
- Ver detalhes de um anúncio.  
- Filtrar anúncios por critérios (ex: marca, modelo, faixa de preço, ano).  
- Busca por palavra-chave.  
- Cadastro de novo anúncio.  
- Edição de anúncio existente.  
- Exclusão de anúncio.  
- Interface responsiva.  
- Autenticação / autorização (se aplicável; login / logout).  

---

## Tecnologias

- HTML / CSS / JavaScript  
- Framework front-end: React (ou equivalente)  
- Biblioteca de requisições HTTP: axios / fetch  
- Gerenciamento de estado (se houver): Redux / Context API  
- Ferramentas de build: npm / yarn  
- Estilização: CSS puro / Tailwind / Styled‑Components  

---

## Estrutura do Projeto

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/        # chamadas à API
│   ├── utils/           # helpers, validações
│   ├── assets/          # imagens, estilos
│   └── App.js
├── package.json
└── README.md
```

---

## Pré‑requisitos

- Node.js (versão X ou superior)  
- NPM ou Yarn  
- Acesso à API backend (URL e credenciais, se necessário)  

---

## Como executar

1. Clone este repositório:  
   ```bash
   git clone https://github.com/chalenge-1espg/SPRINT-3---FRONT.git
   ```

2. Entre no diretório:  
   ```bash
   cd SPRINT-3---FRONT
   ```

3. Instale dependências:  
   ```bash
   npm install
   # ou
   yarn install
   ```

4. Defina variáveis de ambiente (veja a seção abaixo).  

5. Inicie em modo de desenvolvimento:  
   ```bash
   npm start
   # ou
   yarn start
   ```

6. Abra no navegador: `http://localhost:3000`

---

## Rotas / Endpoints usados

| Método | Rota | Descrição |
|---|---|---|
| GET | `/anuncios` | Lista todos os anúncios |
| GET | `/anuncios/:id` | Detalhes de um anúncio |
| POST | `/anuncios` | Cria novo anúncio |
| PUT / PATCH | `/anuncios/:id` | Atualiza anúncio |
| DELETE | `/anuncios/:id` | Remove anúncio |
| GET | `/anuncios?marca=X&modelo=Y&precoMin=A&precoMax=B` | Filtragem |
| POST | `/auth/login` | Login de usuário |
| POST | `/auth/register` | Cadastro de usuário |

---

## Variáveis de Ambiente

Arquivo `.env` exemplo:

```env
REACT_APP_API_BASE_URL=https://seu-endpoint-da-api.com
REACT_APP_PORT=3000
REACT_APP_AUTH_TOKEN_KEY=token
```

---

## Como contribuir

1. Faça um *fork* do repositório.  
2. Crie uma branch:  
   ```bash
   git checkout -b minha-feature
   ```  
3. Faça as alterações.  
4. Teste localmente.  
5. Abra um *pull request*.  

---

## Licença

Este projeto está licenciado sob a **MIT License**.
