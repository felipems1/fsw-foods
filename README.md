# ![Texto Alternativo](/public/logo.png)


Este projeto é uma homepage dinâmica para um aplicativo que apresenta produtos e restaurantes, com foco em banners promocionais e itens recomendados. O aplicativo busca dados de um banco de dados Prisma e os exibe em várias seções na página inicial.


## Tecnologias Utilizadas
* React: Para criar a interface do usuário.
* Next.js: Para renderização e roteamento do lado do servidor.
* Prisma: Para gerenciamento de banco de dados.
* Lucide-React: Para ícones.
CSS: Para estilizar os componentes.

## Componentes
* CategoryList: Lista categorias de produtos.
* Cabeçalho: Exibe a seção de cabeçalho da página.
* Pesquisa: fornece uma entrada de pesquisa para os usuários.
* ProductList: Exibe uma lista de produtos.
Botão: Um componente de botão reutilizável.
* PromoBanner: Exibe banners promocionais.
* RestaurantList: Exibe uma lista de restaurantes recomendados.

## Base de dados
Este projeto utiliza o Prisma para interagir com o banco de dados. O cliente Prisma está configurado no arquivo._lib/prisma.js

## Instalação
### Clone o repositório

```sh
git clone https://github.com/felipems1/fsw-foods.git

cd fsw-foods
```

## Instalar dependências

```sh
npm install
```

## Configure o banco de dados:

Configure sua conexão de banco de dados no arquivo de esquema Prisma ().`prisma/schema.prisma`

### Execute as migrações

```sh
npx prisma migrate dev
```

### Inicie o servidor de desenvolvimento
```sh
npm run dev
```

### Abra o aplicativo em seu navegador
```sh
http://localhost:3000
```

### Licença
```sh
Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter detalhes.
```


