const { getKV, setKV, setCORSHeaders } = require('./_kv');

module.exports = async (req, res) => {
  const KEY = 'historico-compras';

  setCORSHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const historico = await getKV(KEY);
      return res.status(200).json(historico || {});
    }

    if (req.method === 'POST') {
      const { historico } = req.body;
      if (typeof historico !== 'object' || Array.isArray(historico)) {
        return res.status(400).json({ error: 'historico deve ser um objeto' });
      }
      await setKV(KEY, historico);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (err) {
    return res.status(500).json({ error: 'Falha ao acessar o KV', details: String(err) });
  }
};
