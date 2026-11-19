const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PIN = process.env.ADMIN_PIN || 'thanh2027';

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Database setup
const dbPath = path.join(dataDir, 'rsvps.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database at', dbPath);
    db.run(`
      CREATE TABLE IF NOT EXISTS rsvps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        attending TEXT NOT NULL,
        message TEXT,
        phone TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        ip TEXT
      )
    `);
  }
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve dist folder if built
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// In-memory rate limiting map (IP -> timestamp)
const recentSubmissions = new Map();

// API Routes
app.post('/api/rsvp', (req, res) => {
  const { name, attending, message, phone } = req.body;
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  // Validation
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
      error: 'Vui lòng chọn xác nhận tham dự (Mình sẽ đến hoặc Rất tiếc không thể đến).'
    });
  }

  // Rate limiting / Spam prevention: 1 submission every 15 seconds per IP/name
  const rateLimitKey = `${clientIp}_${cleanName.toLowerCase()}`;
  const now = Date.now();
  if (recentSubmissions.has(rateLimitKey)) {
    const lastTime = recentSubmissions.get(rateLimitKey);
    if (now - lastTime < 15000) {
      return res.status(429).json({
        success: false,
        error: 'Bạn vừa gửi xác nhận. Vui lòng chờ ít giây trước khi gửi lại.'
      });
    }
  }
  recentSubmissions.set(rateLimitKey, now);

  const cleanMessage = message ? String(message).trim().slice(0, 1000) : '';
  const cleanPhone = phone ? String(phone).trim().slice(0, 20) : '';

  const stmt = db.prepare(`
    INSERT INTO rsvps (name, attending, message, phone, ip)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(cleanName, cleanAttending, cleanMessage, cleanPhone, clientIp, function(err) {
    if (err) {
      console.error('Database insert error:', err);
      return res.status(500).json({
        success: false,
        error: 'Có lỗi xảy ra khi lưu thông tin. Vui lòng thử lại sau.'
      });
    }

    const insertedId = this.lastID;
    return res.status(201).json({
      success: true,
      id: insertedId,
      message: cleanAttending === 'yes' 
        ? 'Cảm ơn bạn thật nhiều! Phương Thanh rất mong chờ được gặp bạn trong ngày lễ tốt nghiệp ❤️' 
        : 'Cảm ơn lời chúc của bạn! Dù tiếc vì bạn không thể đến nhưng Phương Thanh luôn trân trọng tình cảm của bạn.'
    });
  });
});

// Get RSVP Stats
app.get('/api/stats', (req, res) => {
  db.all(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN attending = 'yes' THEN 1 ELSE 0 END) as attending_count,
      SUM(CASE WHEN attending = 'no' THEN 1 ELSE 0 END) as not_attending_count
    FROM rsvps
  `, (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    const stat = rows[0] || { total: 0, attending_count: 0, not_attending_count: 0 };
    res.json({
      success: true,
      total: stat.total || 0,
      attending: stat.attending_count || 0,
      notAttending: stat.not_attending_count || 0
    });
  });
});

// Admin verification
app.post('/api/admin/verify', (req, res) => {
  const { pin } = req.body;
  if (pin === ADMIN_PIN) {
    return res.json({ success: true, authorized: true });
  }
  return res.status(401).json({ success: false, authorized: false, error: 'Mã PIN quản trị không chính xác.' });
});

// Get all RSVPs (Admin / Public Guestbook)
app.get('/api/rsvps', (req, res) => {
  const { filter, search, limit = 100 } = req.query;
  let sql = 'SELECT id, name, attending, message, phone, created_at FROM rsvps WHERE 1=1';
  const params = [];

  if (filter === 'yes' || filter === 'no') {
    sql += ' AND attending = ?';
    params.push(filter);
  }

  if (search && search.trim()) {
    sql += ' AND (name LIKE ? OR message LIKE ?)';
    params.push(`%${search.trim()}%`, `%${search.trim()}%`);
  }

  sql += ' ORDER BY created_at DESC LIMIT ?';
  params.push(Math.min(parseInt(limit, 10) || 100, 500));

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// Admin Delete RSVP
app.delete('/api/rsvps/:id', (req, res) => {
  const adminAuth = req.headers['x-admin-pin'];
  if (adminAuth !== ADMIN_PIN) {
    return res.status(403).json({ success: false, error: 'Unauthorized: Admin PIN required' });
  }

  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({ success: false, error: 'Invalid ID' });

  db.run('DELETE FROM rsvps WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, deleted: this.changes });
  });
});

// Fallback for SPA routing
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Dang Phuong Thanh Graduation</title></head>
        <body style="font-family:sans-serif;text-align:center;padding:50px;">
          <h2>Đặng Phương Thanh - Lễ Tốt Nghiệp 2027</h2>
          <p>Frontend đang được biên dịch hoặc hãy chạy <code>npm run dev</code>.</p>
        </body>
      </html>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
