# 🎓 THIỆP MỜI TỐT NGHIỆP ONLINE – ĐẶNG PHƯƠNG THANH
> **A Beautiful Chapter of Youth** • Lễ Tốt Nghiệp THPT Trần Quang Khải (14.02.2027)

---

## 🌸 Giới Thiệu Dự Án

Website thiệp mời tốt nghiệp online hoàn chỉnh, cao cấp và lãng mạn dành riêng cho **Đặng Phương Thanh**. Dự án được xây dựng theo tiêu chuẩn thiết kế thông minh **UI/UX PRO MAX**, lấy cảm hứng từ phong cách **Korean Vintage + Youth Memories**, mang lại trải nghiệm như lật mở từng trang của một cuốn lưu bút, photobook thanh xuân cao cấp.

### 🔗 Link Truy Cập Công Khai (Public HTTPS)
- **Website Live:** [https://basket-viewing-page-accompanying.trycloudflare.com](https://basket-viewing-page-accompanying.trycloudflare.com)
- **Local Server:** [http://localhost:3000](http://localhost:3000)
- **Mã PIN Quản Trị Khách Mời (Admin):** `thanh2027`

---

## 🎨 Điểm Nhấn Thiết Kế UI/UX (Tuân thủ UI/UX Pro Max)

- **Phong cách:** Korean Vintage + Graduation + Youth Memories.
- **Bảng màu:**
  - Cream & Soft Ivory (`#FAF7F2`, `#FBF9F5`)
  - Warm Beige & Parchment (`#F4EFE6`, `#EAE0D2`)
  - Warm Coffee & Dark Sepia (`#3D2C22`, `#5C4436`)
  - Pastel Sage Green (`#6C8666`, `#E5ECE3`)
  - Burgundy Wax Seal (`#8A2534`)
- **Typography:**
  - Display / Headings: `Cormorant Garamond` & `Playfair Display` (Serif cổ điển, sang trọng)
  - Body / Subtitles: `Be Vietnam Pro` (Sans-serif chuẩn tiếng Việt, dễ đọc trên di động)
  - Chữ ký nghệ thuật: `Alex Brush` (Mềm mại, thanh lịch)
- **Hiệu ứng & Chuyển động:**
  - Phong bì vintage với con dấu sáp nổi 3D "PT", mở thư mượt mà khi chạm.
  - Cánh hoa đào (Sakura petals) và ánh nắng vàng bay lơ lửng bằng HTML5 Canvas hiệu năng cao.
  - Tự động bật nhạc nền piano thanh xuân ngay sau khi chạm mở phong bì.
  - Đĩa than quay chuyển động (Spinning vinyl) hiển thị trực quan trạng thái âm thanh.
  - Tôn trọng cài đặt `prefers-reduced-motion` của thiết bị.

---

## 📋 Cấu Trúc Các Section

1. **SECTION 1 – OPEN INVITATION (Mở Thiệp Mời):**
   - Phong bì thư phong cách vintage với tem bưu điện Nam Định và dấu sáp niêm phong PT 2027.
   - Nút "OPEN INVITATION / MỞ THIỆP" với hiệu ứng 3D flap mở thư và kích hoạt âm nhạc.
2. **SECTION 2 – MAIN INVITATION (Khung Ảnh & Lời Mời):**
   - Ảnh chân dung trung tâm chất lượng cao của Đặng Phương Thanh trong khung ảnh Polaroid mỹ thuật.
   - Giữ nguyên vẹn 100% khuôn mặt, không can thiệp AI làm biến đổi nhận dạng.
   - Tiêu đề: *A BEAUTIFUL CHAPTER OF YOUTH*.
   - Lời nhắn thanh xuân: *"Đây là ngày mà mình muốn lưu lại những khoảnh khắc đẹp đẽ nhất của thời học sinh. Hy vọng bức ảnh thanh xuân tươi đẹp của mình sẽ có sự tham gia của bạn!"*
3. **SECTION 3 – EVENT DETAILS (Thông Tin Buổi Lễ):**
   - Ngày: **Chủ Nhật, 14/02/2027** (09:00 AM – 11:00 AM).
   - Địa điểm: **THPT Trần Quang Khải** - Ngõ 176 Phan Đình Phùng, Nam Định, Ninh Bình.
   - Nút tiện ích: *Thêm vào Google Calendar* & *Tải file Lịch (.ics cho Apple / Outlook)*.
4. **SECTION 4 – GOOGLE MAPS (Bản Đồ Chỉ Đường):**
   - Tích hợp Google Maps chuẩn xác đến Trường THPT Trần Quang Khải.
   - Nút nổi bật **XEM ĐƯỜNG ĐI** mở trực tiếp ứng dụng Google Maps.
   - Nút sao chép địa chỉ nhanh kèm thông báo toast.
5. **SECTION 5 – COUNTDOWN (Đếm Ngược Thời Gian Thực):**
   - Bộ đếm thời gian thực đến 09:00 AM ngày 14/02/2027 theo chuẩn giờ Việt Nam UTC+7.
   - 4 ô thẻ ngày, giờ, phút, giây phong cách vintage typography.
6. **SECTION 6 – RSVP (Xác Nhận Tham Dự & Sổ Lưu Bút):**
   - Hai lựa chọn: *Mình sẽ đến ❤️* / *Rất tiếc, mình không thể đến.*
   - Nhập tên, số điện thoại, lời chúc tốt nghiệp.
   - Xác thực chặn dữ liệu rỗng, chống spam gửi trùng lặp.
   - Lưu trữ trực tiếp vào cơ sở dữ liệu **SQLite** thực tế (`data/rsvps.db`).
   - Hiệu ứng pháo giấy confetti rực rỡ và thông báo cảm ơn ấm áp.
7. **SECTION 7 – FINAL MESSAGE & QUẢN TRỊ:**
   - Dòng chữ tri ân: *THANK YOU FOR BEING PART OF MY YOUTH*.
   - Chữ ký thư pháp của Phương Thanh.
   - Nút chia sẻ thiệp qua Web Share API / Copy Link.
   - Trang quản trị riêng biệt xem danh sách khách mời, lọc theo trạng thái, tìm kiếm và xuất file CSV.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** React 19, Vite 6, Tailwind CSS v4, Lucide Icons, Canvas Confetti.
- **Backend:** Node.js, Express.js.
- **Database:** SQLite3 (Persistent file `data/rsvps.db`).
- **Tunnels / Public URL:** Cloudflare Quick Tunnel (HTTPS SSL).
