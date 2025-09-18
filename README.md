# Anna Pinkerman - Site Pessoal

Este é um projeto [Next.js](https://nextjs.org) para o site pessoal de Anna Pinkerman, criado para celebrar um evento especial.

## Visão Geral

O site inclui:
*   Contagem regressiva para o evento.
*   Detalhes da festa.
*   Uma seção "Sobre Mim".
*   Carrossel de memórias e slideshow de fotos.
*   Um formulário para convidados deixarem mensagens.
*   Galeria de fotos em tempo real.

## Tecnologias

*   **Framework:** Next.js
*   **Linguagem:** TypeScript
*   **Estilização:** Tailwind CSS
*   **Backend (BaaS):** Supabase (para mensagens e fotos em tempo real)
*   **Ícones:** React Icons

## Estrutura do Projeto

*   `src/app/`: Páginas da aplicação.
*   `src/components/`: Componentes React reutilizáveis.
*   `src/lib/`: Configuração do cliente Supabase.
*   `public/`: Imagens, vídeos e outros arquivos estáticos.

## Como Começar

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto e adicione as chaves do seu projeto Supabase:
    ```
    NEXT_PUBLIC_SUPABASE_URL=URL_DO_SEU_PROJETO_SUPABASE
    NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_SUPABASE
    ```

3.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Scripts Disponíveis

*   `npm run dev`: Inicia o servidor de desenvolvimento.
*   `npm run build`: Cria a build de produção do projeto.
*   `npm run start`: Inicia um servidor de produção.
*   `npm run lint`: Executa o linter para análise de código.