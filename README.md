# Dashboard Application

## Descrição

Este projeto é um dashboard desenvolvido com Next.js, incluindo autenticação com NextAuth e gerenciamento de dados utilizando React Query. O objetivo é fornecer uma interface para criar, visualizar, atualizar e deletar produtos, integrando-se com uma API de back-end.

## Tecnologias Utilizadas

- **Next.js**: Framework React com suporte a SSR (Server-Side Rendering) e geração de páginas estáticas.
- **NextAuth**: Biblioteca para implementação de autenticação em Next.js.
- **React Query**: Ferramenta para gerenciamento de estados de dados assíncronos, simplificando o processo de data fetching.
- **CSS Modules**: Utilizado para estilização dos componentes.
- **Axios**: Biblioteca para fazer requisições HTTP para a API de back-end.

## Funcionalidades

- Autenticação de usuários com NextAuth.
- CRUD (Create, Read, Update, Delete) de produtos.
- Integração com API de back-end para gerenciamento de produtos.
- Interface responsiva e fácil de usar.

## Como Executar o Projeto

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/seu-projeto.git
    ```
2. **Instale as dependências:**
    ```bash
    cd seu-projeto
    npm install
    ```
3. **Configure as variáveis de ambiente:**
    - Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis:
        ```bash
        NEXTAUTH_URL=http://localhost:3000
        NEXTAUTH_SECRET=sua_chave_secreta
        ```

4. **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O projeto estará acessível em `http://localhost:3000`.
