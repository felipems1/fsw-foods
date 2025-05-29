# Fsw Foods

Um e-commerce de delivery com listagem de restaurantes, produtos e carrinho de compras.

## Acesso ao Projeto

Você pode acessar o projeto em produção clicando no link abaixo:

🔗 [https://fsw-foods-eight.vercel.app/](https://fsw-foods-eight.vercel.app/)

## Tecnologias Utilizadas

* Next.js

* TypeScript

* Tailwind CSS

* Shadcn/UI

* Prisma

* Postgres SQL

* NextAuth.js

## Requisitos

* Docker

* Node.js 18+

* PostgreSQL (via Docker Compose)

* Arquivo .env devidamente configurado

## Passos para Instalação

1. Clone o projeto:
 `git clone https://github.com/felipems1/fsw-foods.git`

2. Navegue até a pasta: 
  `cd fsw-foods`

3. Instale as dependências: 
  `npm install`

4. Crie um arquivo `.env` com base em `.env.example` e preencha as variáveis de ambiente.

5. Suba o banco de dados com Docker: 
  `docker compose up -d`

6. Aplique as migrações: 
  `npx prisma migrate dev`

7. Insira os dados iniciais: 
  `npx prisma db seed`

## Como Usar

* Inicie o servidor de desenvolvimento:
  `npm run dev`

* Acesse no navegador:
  `http://localhost:3000`

## Funcionalidades Principais

* Login com o Google (via NextAuth.js)

* Adicionar/remover restaurantes dos favoritos

* Pesquisa de restaurantes

* Criar e visualizar pedidos

* Visualizar produtos recomendados

* Filtrar produtos por categorias

* Listagem de restaurantes recomendados

## Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/felipems1/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-1DAB5F?style=for-the-badge&labelColor=1DAB5F&color=1DAB5F&logoColor=white)](https://wa.me/5583998719705)
[![Email](https://img.shields.io/badge/E--mail-D14836?style=for-the-badge&labelColor=D14836&color=D14836)](mailto:083felype@gmail.com)






