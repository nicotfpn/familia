module.exports = {
  async getKV(key) {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;
    if (!url || !token) {
      throw new Error('KV não configurado');
    }
    const headers = { Authorization: `Bearer ${token}` };
    const resp = await fetch(`${url}/get/${key}`, { headers });
    const data = await resp.json();
    return data.result ? JSON.parse(data.result) : null;
  },

  async setKV(key, value) {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;
    if (!url || !token) {
      throw new Error('KV não configurado');
    }
    await fetch(`${url}/set/${key}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'text/plain' },
      body: JSON.stringify(value)
    });
  },

  checkAuth(req, res) {
    const appToken = req.headers['x-app-token'];
    if (process.env.APP_TOKEN && process.env.APP_TOKEN !== appToken) {
      res.status(401).json({ error: 'não autorizado' });
      return false;
    }
    return true;
  },

  setCORSHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-app-token');
  }
};
