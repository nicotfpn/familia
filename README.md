# Lista da Família 🛒

Lista de compras compartilhada. Qualquer pessoa que abrir o link vê os mesmos itens, em tempo quase real (sincroniza a cada 4s).

## Como subir no Vercel

1. Suba esses 3 arquivos (`index.html`, `api/lista.js`, `README.md`) num repositório novo no GitHub.
2. No painel do Vercel, clique em **Add New → Project** e importe esse repositório. Não precisa configurar nada de build (é estático + uma função serverless).
3. Depois do primeiro deploy, vá em **Storage → Create Database → KV** (Upstash) e crie um banco.
4. Na tela do KV, clique em **Connect Project** e selecione esse projeto — isso cria automaticamente as variáveis `KV_REST_API_URL` e `KV_REST_API_TOKEN`.
5. Vá em **Deployments** e clique em **Redeploy** (as env vars só entram em vigor depois de um novo deploy).
6. Pronto — o link do projeto (tipo `lista-familia.vercel.app`) já pode ser salvo na tela inicial do celular de todo mundo da família.

Se abrir o site e aparecer um aviso vermelho de "KV não configurado", é sinal de que os passos 3–5 ainda faltam.

## Salvar na tela inicial (fica com carinha de app)

- **iPhone (Safari):** abrir o link → botão de compartilhar → "Adicionar à Tela de Início".
- **Android (Chrome):** abrir o link → menu ⋮ → "Adicionar à tela inicial".
