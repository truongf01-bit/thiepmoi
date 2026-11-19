module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { pin } = req.body || {};
  if (pin === 'thanh2027') {
    return res.json({ success: true, authorized: true });
  }

  return res.status(401).json({ success: false, authorized: false, error: 'Mã PIN quản trị không chính xác.' });
};
