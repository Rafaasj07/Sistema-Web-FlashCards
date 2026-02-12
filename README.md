# 🧠 FlashCards AI

[](https://react.dev/)
[](https://expressjs.com/)
[](https://vitejs.dev/)
[](https://tailwindcss.com/)

**FlashCards AI** é uma aplicação web de estudos que utiliza inteligência artificial para gerar flashcards automaticamente a partir de um tema fornecido pelo usuário ou de um arquivo PDF. O objetivo é facilitar e acelerar a criação de materiais de revisão, tornando o aprendizado mais eficiente e interativo.

O projeto é construído com uma arquitetura moderna, separando o front-end (React com Vite) do back-end (Node.js com Express), e está totalmente configurado para deploy em plataformas como Render e Vercel.

## 📍 Deploy

**Acesse a aplicação ao vivo aqui:**

### 🚀 **[https://sistema-web-flashcards-interface.onrender.com/](https://sistema-web-flashcards-interface.onrender.com/)**

-----

> ### ⚠️ Atenção: Limitações do Modelo de IA
>
> Este projeto utiliza um **modelo de inteligência artificial gratuito** através da plataforma OpenRouter para fins de demonstração. Modelos gratuitos possuem um limite na quantidade de texto que conseguem processar de uma só vez (conhecido como "janela de contexto").
>
> Por essa razão, **o tamanho do upload de PDF foi limitado para 5MB**. Se o conteúdo de texto extraído do arquivo for muito denso e ultrapassar o limite de tokens do modelo, a geração de flashcards pode falhar ou retornar uma resposta incompleta.

-----

## 📸 Preview

-----

## ✨ Funcionalidades

  * **Geração de Flashcards via Texto**: Basta digitar um tema, como *"5 flashcards sobre a Segunda Guerra Mundial"*, para que a IA crie cartões objetivos e informativos sobre o assunto.
  * **Geração de Flashcards via PDF**: Faça o upload de um arquivo PDF (com limite de 5MB) e a IA irá analisar o conteúdo para criar flashcards baseados **exclusivamente** nas informações do documento. Ideal para transformar notas de aula e resumos em material de estudo ativo.
  * **Interface Reativa e Intuitiva**: Uma interface limpa, com tema escuro e totalmente responsiva, construída com as tecnologias mais recentes de front-end para uma ótima experiência de usuário.
  * **Validação de Arquivos**: O front-end valida o tamanho do arquivo PDF antes do envio para garantir que ele esteja dentro dos limites permitidos, fornecendo feedback instantâneo ao usuário.
  * **Visualização Interativa**: As respostas dos flashcards ficam ocultas por padrão. O usuário pode revelá-las com um clique em um ícone, facilitando a prática de recordação ativa, uma técnica de estudo comprovadamente eficaz.

-----

## 🛠️ Arquitetura e Tecnologias

O projeto segue uma arquitetura de aplicação desacoplada, com um back-end servindo uma API RESTful e um front-end consumindo essa API.

### **Back-end (API)**

O back-end é responsável por toda a lógica de negócio, incluindo o processamento de arquivos e a comunicação com o serviço de IA.

  * **Runtime**: **Node.js**
  * **Framework**: **Express.js** para a criação do servidor, gerenciamento de rotas e middlewares.
  * **Rotas**: As rotas (`/perguntar` e `/perguntar-com-arquivo`) são modularizadas usando o `express.Router`.
  * **Upload de Arquivos**: A biblioteca **`multer`** é utilizada como middleware para processar os uploads de arquivos PDF, armazenando-os em memória para extração do texto.
  * **Extração de PDF**: O texto dos arquivos PDF é extraído utilizando a biblioteca **`pdf-parse`**.
  * **Comunicação com IA**: O **`axios`** é usado para fazer as requisições HTTP para a API da **OpenRouter**, que por sua vez acessa o modelo de linguagem da IA (**`deepseek/deepseek-r1:free`**).
  * **Variáveis de Ambiente**: A biblioteca **`dotenv`** gerencia as variáveis de ambiente (`OPENROUTER_API_KEY`, `CORS_ORIGIN`, `PORT`) para manter as chaves seguras.
  * **CORS**: O middleware **`cors`** é configurado para permitir requisições apenas da origem do front-end, garantindo a segurança da API.

### **Front-end (Interface)**

A interface é uma Single Page Application (SPA) construída para ser rápida, reativa e amigável.

  * **Framework**: **React 19** para a construção da interface de usuário baseada em componentes.
  * **Build Tool**: **Vite** como ferramenta de build e servidor de desenvolvimento, garantindo Hot Module Replacement (HMR) e um processo de build otimizado.
  * **Estilização**:
      * **Tailwind CSS**: Framework CSS utility-first que permitiu a criação rápida de um design moderno e responsivo, diretamente no JSX.
      * **CSS Modules / Global CSS**: Utilizado para criar estilos escopados e globais para resolver problemas de estilização do navegador, como o preenchimento automático.
  * **Gerenciamento de Estado**:
      * **React Hooks (`useState`)**: Todos os estados da aplicação, como a lista de flashcards, status de carregamento e erros, são gerenciados localmente nos componentes.
      * **Custom Hook (`useFlashcards`)**: A lógica de comunicação com a API e o gerenciamento dos estados relacionados aos flashcards foram abstraídos em um hook customizado para reutilização e organização do código.
  * **Comunicação com a API**: O **`axios`** é utilizado para enviar as solicitações do usuário para o back-end e receber os dados dos flashcards.
  * **Variáveis de Ambiente**: A URL da API é gerenciada por uma variável de ambiente (`VITE_API_URL`) para facilitar a configuração entre os ambientes de desenvolvimento e produção.

-----

## 🔧 Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto em sua máquina local.

### **Pré-requisitos**

  * [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
  * [npm](https://www.npmjs.com/)
  * Uma chave de API da [OpenRouter.ai](https://openrouter.ai/)

### **1. Configurando o Back-end (API)**

```bash
# 1. Clone o repositório
https://github.com/rafaelaugustodev/Sistema-Web-FlashCards.git

# 2. Navegue até a pasta da API
cd Sistema-Web-FlashCards/API

# 3. Instale as dependências
npm install

# 4. Crie um arquivo .env na raiz da pasta API
#    e adicione suas variáveis:
#
# OPENROUTER_API_KEY=sua_chave_secreta_da_openrouter
# CORS_ORIGIN=http://localhost:5173

# 5. Inicie o servidor em modo de desenvolvimento
npm run dev
```

Após esses passos, o servidor da API estará rodando em `http://localhost:3001`.

### **2. Configurando o Front-end (Interface)**

```bash
# 1. Abra um novo terminal e navegue até a pasta da interface
cd Sistema-Web-FlashCards/InterfaceFlashCards

# 2. Instale as dependências
npm install

# 3. Crie um arquivo .env na raiz da pasta InterfaceFlashCards
#    e adicione a URL da sua API local:
#
# VITE_API_URL=http://localhost:3001/api/

# 4. Inicie o servidor de desenvolvimento do Vite
npm run dev
```

Após esses passos, a aplicação React estará disponível em `http://localhost:5173`.
