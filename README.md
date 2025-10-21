# Justock - Frontend

Sistema de gerenciamento frontend construído com React e Vite.

## Requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## Instalação

```bash
npm install
```

## Execução

Desenvolvimento:
```bash
npm run dev
```
Acesse: `http://localhost:5173`

Build:
```bash
npm run build
```

## Estrutura do Projeto

```
├── public/                  # Arquivos estáticos públicos
├── src/                     # Código fonte principal
│   ├── assets/             # Recursos estáticos (imagens, ícones, etc.)
│   ├── components/         # Componentes React reutilizáveis
│   │   └── dashboard/      # Componentes específicos do dashboard
│   ├── mocks/             # Dados mockados para desenvolvimento
│   ├── pages/             # Páginas da aplicação
│   │   ├── dashboard/     # Páginas do painel administrativo
│   │   ├── home/         # Páginas da área pública
│   │   └── login/        # Páginas de autenticação
│   └── styles/           # Estilos CSS organizados por página
│       └── pages/        # Estilos específicos para cada página
├── index.html             # Ponto de entrada HTML
├── vite.config.js         # Configuração do Vite
└── eslint.config.js       # Configuração do ESLint
```

## Tecnologias Principais

- React 19.1.1
- Vite 7.1.2
- React Router DOM 7.9.1
- Chart.js 4.5.1
- React DatePicker 8.8.0

