# Justock - Frontend

Uma aplicação frontend moderna construída com React e Vite para o sistema Justock.

## 📋 Pré-requisitos

Antes de começar, certifique-se de que você tem instalado em sua máquina:

- **Node.js** (versão 16 ou superior)
- **npm** (normalmente vem com o Node.js) ou **yarn**

### Verificando a instalação

```bash
node --version
npm --version
```

## 🚀 Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

## 🏃‍♂️ Executando o Projeto

### Modo de Desenvolvimento

Para iniciar o servidor de desenvolvimento com hot reload:

```bash
npm run dev
```

O aplicativo estará disponível em: `http://localhost:5173`

## 📁 Estrutura do Projeto

```
frontend/
├── public/          # Arquivos estáticos
├── src/             # Código fonte
│   ├── assets/      # Imagens e recursos
│   ├── components/  # Componentes React
│   ├── styles/      # Arquivos CSS
│   ├── App.jsx      # Componente principal
│   └── main.jsx     # Ponto de entrada
├── package.json     # Dependências e scripts
└── vite.config.js   # Configuração do Vite
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run lint` - Executa o ESLint

## 🏗️ Tecnologias Utilizadas

- **React** 19.1.1 - Biblioteca para interfaces de usuário
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento para React
- **ESLint** - Linting de código JavaScript
