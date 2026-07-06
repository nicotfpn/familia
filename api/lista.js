const { getKV, setKV, setCORSHeaders } = require('./_kv');

module.exports = async (req, res) => {
  const KEY = 'lista-compras';

  setCORSHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const itens = await getKV(KEY);
      return res.status(200).json(itens || []);
    }

    if (req.method === 'POST') {
      const { itens } = req.body;
      if (!Array.isArray(itens)) {
        return res.status(400).json({ error: 'itens deve ser um array' });
      }
      await setKV(KEY, itens);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (err) {
    return res.status(500).json({ error: 'Falha ao acessar o KV', details: String(err) });
  }
};
