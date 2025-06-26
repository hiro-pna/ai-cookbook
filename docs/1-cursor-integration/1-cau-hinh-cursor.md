---
sidebar_position: 2
---

# Cấu hình & Sử dụng Cursor

Để bắt đầu, cán bộ phát triển cần tải và cài đặt Cursor từ trang web chính thức:

- **Trang chủ & Tải về:** [https://cursor.com](https://cursor.com)

**Cursor** là một phiên bản "fork" của VS Code, kế thừa toàn bộ hệ sinh thái extension, theme, keybinding của VS Code và bổ sung các tính năng AI mạnh mẽ.

---

## Các thao tác cơ bản

### Trò chuyện với AI (Chat)

Đây là tính năng cốt lõi của Cursor. Sử dụng phím tắt `Cmd + K` (macOS) hoặc `Ctrl + K` (Windows) để mở giao diện chat với AI. Có thể đặt câu hỏi, yêu cầu phân tích code, giải thích lỗi, hoặc tạo mới tài liệu ngay trong IDE.

**Ví dụ:**  

![Giao diện Chat trong Cursor](https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/chat/chat-checkpoint.png)

---

### Sinh mã hoặc Chỉnh sửa code (Generate/Edit)

Để sử dụng AI sinh code hoặc chỉnh sửa đoạn mã, chọn vùng code hoặc đặt con trỏ tại vị trí mong muốn, sau đó nhấn `Cmd + J` (macOS) hoặc `Ctrl + J` (Windows).

**Ví dụ:**  
*Chọn một hàm và nhập prompt: "Bổ sung comment JSDoc cho hàm này."*

---

## Các thao tác nâng cao

### Thiết lập Workspace chung cho Team

Để đảm bảo mọi thành viên đều làm việc trên môi trường đồng nhất, cần cấu hình workspace dự án. Cursor sử dụng lại cấu hình của VS Code thông qua file `.vscode/settings.json` trong thư mục gốc dự án.

**Ví dụ file `.vscode/settings.json`:**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.tsdk": "node_modules/typescript/lib",
  "extensions.recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "orta.vscode-jest",
    "eamodio.gitlens"
  ]
}
