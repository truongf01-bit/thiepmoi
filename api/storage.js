// Serverless in-memory & file storage helper for Vercel
const fs = require('fs');
const path = require('path');

const storageFile = path.join('/tmp', 'rsvps_store.json');

function getStore() {
  try {
    if (fs.existsSync(storageFile)) {
      const content = fs.readFileSync(storageFile, 'utf8');
      return JSON.parse(content);
    }
  } catch (e) {}

  return [
    {
      id: 1,
      name: 'Nguyễn Thu Trang',
      attending: 'yes',
      phone: '0912345678',
      message: 'Chúc bạn Phương Thanh tốt nghiệp thật rạng rỡ! Nhất định mình sẽ có mặt chụp ảnh cùng bạn nhé ❤️',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Trần Đức Anh',
      attending: 'no',
      phone: '0987654321',
      message: 'Hôm đó mình bận việc gia đình mất rồi, chúc Thanh tốt nghiệp đạt kết quả xuất sắc nhé!',
      created_at: new Date().toISOString()
    }
  ];
}

function saveStore(data) {
  try {
    fs.writeFileSync(storageFile, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {}
}

module.exports = { getStore, saveStore };
