module.exports = async (req, res) => {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  const KEY = 'lista-compras';

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!url || !token) {
    return res.status(500).json({
      error: 'KV não configurado. Crie um Vercel KV Store e conecte ao projeto (as env vars KV_REST_API_URL e KV_REST_API_TOKEN precisam existir).'
    });
  }

  const headers = { Authorization: `Bearer ${token}` };

  async function getItens() {
    const resp = await fetch(`${url}/get/${KEY}`, { headers });
    const data = await resp.json();
    return data.result ? JSON.parse(data.result) : [];
  }

  async function setItens(arr) {
    await fetch(`${url}/set/${KEY}`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'text/plain' },
      body: JSON.stringify(arr)
    });
  }

  try {
    if (req.method === 'GET') {
      const itens = await getItens();
      return res.status(200).json(itens);
    }

    if (req.method === 'POST') {
      const { itens } = req.body;
      if (!Array.isArray(itens)) {
        return res.status(400).json({ error: 'itens deve ser um array' });
      }
      await setItens(itens);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (err) {
    return res.status(500).json({ error: 'Falha ao acessar o KV', details: String(err) });
  }
};