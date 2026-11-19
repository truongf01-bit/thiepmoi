const { getStore, saveStore } = require('./storage');

module.exports = (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-admin-pin');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, attending, message, phone } = req.body || {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Vui lòng nhập họ và tên hợp lệ (tối thiểu 2 ký tự).'
    });
  }

  const cleanName = name.trim();
  const cleanAttending = attending === 'yes' ? 'yes' : (attending === 'no' ? 'no' : null);

  if (!cleanAttending) {
    return res.status(400).json({
      success: false,
      error: 'Vui lòng chọn xác nhận tham dự.'
    });
  }

  const store = getStore();
  const newId = store.length > 0 ? Math.max(...store.map(s => s.id || 0)) + 1 : 1;

  const newEntry = {
    id: newId,
    name: cleanName,
    attending: cleanAttending,
    phone: phone ? String(phone).trim() : '',
    message: message ? String(message).trim() : '',
    created_at: new Date().toISOString()
  };

  store.unshift(newEntry);
  saveStore(store);

  return res.status(201).json({
    success: true,
    id: newId,
    message: cleanAttending === 'yes'
      ? 'Cảm ơn bạn thật nhiều! Phương Thanh rất mong chờ được gặp bạn trong ngày lễ tốt nghiệp ❤️'
      : 'Cảm ơn lời chúc của bạn! Dù tiếc vì bạn không thể đến nhưng Phương Thanh luôn trân trọng tình cảm của bạn.'
  });
};
