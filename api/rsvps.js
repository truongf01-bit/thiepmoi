const { getStore, saveStore } = require('./storage');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'x-admin-pin, Content-Type');

  if (req.method === 'DELETE') {
    const adminPin = req.headers['x-admin-pin'];
    if (adminPin !== 'thanh2027') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;
    let store = getStore();
    store = store.filter(s => s.id !== parseInt(id, 10));
    saveStore(store);
    return res.json({ success: true });
  }

  const { filter, search } = req.query || {};
  let store = getStore();

  if (filter === 'yes' || filter === 'no') {
    store = store.filter(s => s.attending === filter);
  }

  if (search && search.trim()) {
    const term = search.trim().toLowerCase();
    store = store.filter(s =>
      (s.name && s.name.toLowerCase().includes(term)) ||
      (s.message && s.message.toLowerCase().includes(term))
    );
  }

  res.json({
    success: true,
    data: store
  });
};
