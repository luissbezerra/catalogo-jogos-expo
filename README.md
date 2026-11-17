# 🎮 Catálogo de Jogos Gratuitos

Aplicação mobile desenvolvida em **React Native** com **Expo**. O app consome dados em tempo real de uma API pública de jogos gratuitos e exibe o catálogo em uma interface com filtro de busca.

## 🚀 Funcionalidades

- **Consumo de API REST:** Requisição assíncrona via `fetch` para a API pública [FreeToGame](https://www.freetogame.com/api-doc).
- **Listagem Otimizada:** Exibição dos jogos utilizando `FlatList` com imagem de capa, título, gênero, plataforma e descrição resumida.
- **Busca em Tempo Real:** Filtro instantâneo por nome do jogo ou gênero, com botão para limpar a pesquisa e feedback visual quando nenhum resultado é encontrado.
- **Tratamento de Estados:** Indicador de carregamento (`ActivityIndicator`) durante a requisição e tela de aviso em caso de falha na conexão.

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- JavaScript (ES6+)
- [FreeToGame API](https://www.freetogame.com/api/games)

## 📂 Estrutura do Projeto

```text
meu-app/
├── assets/          # Ícones e splash screen da aplicação
├── App.js           # Componente principal, consumo da API, busca e estilização
├── app.json         # Configurações do Expo
├── index.js         # Ponto de entrada da aplicação
└── package.json     # Dependências e scripts do projeto
```

## ▶️ Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado na máquina
- Aplicativo **Expo Go** instalado no celular (Android ou iOS) ou um emulador configurado

### Passo a passo

1. Clone este repositório:
   ```bash
   git clone https://github.com/luissbezerra/catalogo-jogos-expo.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd meu-app
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento do Expo:
   ```bash
   npx expo start
   ```

5. Leia o QR Code exibido no terminal com o aplicativo **Expo Go** (no Android) ou com a câmera do dispositivo (no iOS).

---

Desenvolvido por **Luís Felipe Bezerra**