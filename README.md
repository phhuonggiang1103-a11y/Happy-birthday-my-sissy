# A Little Universe — Birthday Gift

Website quà sinh nhật cho chị Linh, dùng HTML, CSS và JavaScript thuần.

## Chạy trên VS Code
1. Giải nén thư mục.
2. Mở thư mục `birthday-gift` bằng VS Code.
3. Cài extension **Live Server** nếu chưa có.
4. Nhấp phải `index.html` → **Open with Live Server**.

## Thêm tài nguyên của bạn

### Nhạc
- Đặt file nhạc tại `assets/music/audio.mp3`.
- Code hiện sử dụng beat map mẫu để game chạy trước. Để đồng bộ chính xác với đoạn nhạc cụ thể, cần chỉnh `BEAT_TIMES` trong `js/game.js` theo các mốc beat của đoạn trích.
- Nếu file có định dạng khác, hãy cập nhật `src` trong `index.html` và giữ đúng phần mở rộng.

### Ảnh
Đặt 12 ảnh tại:
`assets/photos/anh1.jpg` đến `assets/photos/anh12.jpg`

Nếu ảnh là `.png` hoặc `.webp`, sửa đường dẫn trong `js/gallery.js` cho đúng. CSS ưu tiên giữ trọn ảnh, không tự crop mặt người.

### Video
Khi quay xong, đặt video tại `assets/video/video.mp4`. Nếu dùng định dạng khác, hãy cập nhật thẻ `<source>` trong `index.html`.

### Tarot
- Dữ liệu đủ 78 lá đã nhúng trong `js/tarot.js`.
- Có thể thêm hình từng lá vào `assets/tarot/cards/` theo đường dẫn `image` trong từng record.
- Khi chưa có ảnh riêng, giao diện vẫn hiện biểu tượng dự phòng.
- Dùng ảnh Tarot do bạn tự tạo hoặc có quyền sử dụng phù hợp.

## Ghi chú
- Website tĩnh không tự gửi kết quả Tarot vào inbox. Nút cuối cùng sao chép tên ba lá để chị gửi cho Giang.
- Nên kiểm tra cả màn hình máy tính lẫn điện thoại.
