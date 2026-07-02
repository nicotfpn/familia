module.exports = async (req, res) => {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  const KEY = 'historico-compras';

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

  async function getHistorico() {
    const resp = await fetch(`${url}/get/${KEY}`, { headers });
    const data = await resp.json();
    return data.result ? JSON.parse(data.result) : {};
  }

  async function setHistorico(obj) {
    await fetch(`${url}/set/${KEY}`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'text/plain' },
      body: JSON.stringify(obj)
    });
  }

  try {
    if (req.method === 'GET') {
      const historico = await getHistorico();
      return res.status(200).json(historico);
    }

    if (req.method === 'POST') {
      const { historico } = req.body;
      if (typeof historico !== 'object' || Array.isArray(historico)) {
        return res.status(400).json({ error: 'historico deve ser um objeto' });
      }
      await setHistorico(historico);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (err) {
    return res.status(500).json({ error: 'Falha ao acessar o KV', details: String(err) });
  }
};
