# Gửi bạn một chút dịu dàng · 20/10

Web tiếng Việt màu hồng pastel với thỏ và mèo pixel tự vẽ, lời nhắn, lời chúc, tặng hoa, cái ôm, chia sẻ và mã QR tải được. Responsive cho iPhone 13 (390 × 844) và desktop. Không cần backend hoặc API key.

## Chạy và build

Dùng Node.js 22 trở lên.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

## GitHub Pages

1. Đẩy code lên nhánh `main` của `MLAkainu/MiniApp`.
2. Trong **Settings → Pages → Build and deployment → Source**, chọn **GitHub Actions**.
3. Workflow `Deploy to GitHub Pages` sẽ build và deploy tự động.
4. URL dự kiến: https://mlakainu.github.io/MiniApp/

Mã QR tự tạo từ URL trang đang mở, vì vậy sau khi deploy hãy mở website thật để tải QR. QR khi chạy local chỉ trỏ đến địa chỉ local. Dùng nút mã QR → **Tải mã QR** để lưu ảnh và gửi hoặc in.

Sửa lời nhắn trong `index.html`, các lời chúc trong `src/messages.js`, màu và responsive trong `src/style.css`. Font Google là tùy chọn; trang dùng font dự phòng nếu không truy cập được.
