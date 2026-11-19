const { getStore } = require('./storage');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const store = getStore();
  const total = store.length;
  const attending = store.filter(s => s.attending === 'yes').length;
  const notAttending = store.filter(s => s.attending === 'no').length;

  res.json({
    success: true,
    total,
    attending,
    notAttending
  });
};
