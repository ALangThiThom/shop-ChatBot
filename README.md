# 🛍️ Fashion Store - AI Chatbot

E-commerce platform với **AI-powered Chatbot** dùng **Google Gemini API** để tư vấn sản phẩm thông minh.

## ✨ Tính Năng

- 🤖 **AI Chatbot** — Trợ lý mua sắm thông minh dùng Gemini API
- 🛒 **Gợi Ý Sản Phẩm** — Chatbot tự động gợi ý sản phẩm phù hợp
- 💬 **Tiếng Việt Hoàn Toàn** — Hỗ trợ 100% bằng tiếng Việt
- 📱 **Responsive Design** — Hoạt động mượt trên mobile & desktop
- 🔧 **Dễ Cấu Hình** — Hỗ trợ 2 chế độ: Gemini API hoặc Local Rule-based

---

## 🚀 Setup Nhanh

### 1. Clone Repo
```bash
git clone https://github.com/ALangThiThom/shop-ChatBot.git

```

### 2. Cấu Hình Environment Variables

Copy file template:
```bash
cp .env.local.example .env.local
```

Mở `.env.local` và thay API Key của bạn:
```env
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
VITE_CHATBOT_MODE=gemini
```

📌 **Lấy API Key**: Truy cập [Google AI Studio](https://aistudio.google.com/apikey)

### 3. Cài Dependencies & Chạy
```bash
npm install
npm run dev
```

Mở browser vào `http://localhost:5173`

---

## ✅ Kiểm Tra Gemini Hoạt Động

1. Nhấn icon chatbot ở góc phải dưới
2. Gửi một tin nhắn test
3. Mở **DevTools** (F12) → **Console**
4. Xem log:
   - ✅ `✅ Gemini model initialized` → OK
   - ✅ `📤 Gemini:` → Phản hồi từ API
   - ❌ Nếu lỗi → Kiểm tra API Key & kết nối

---

## 📋 Cấu Hình

### Chế Độ Chatbot
```env
# Dùng Google Gemini AI (cloud)
VITE_CHATBOT_MODE=gemini
VITE_GEMINI_API_KEY=YOUR_KEY_HERE

# Hoặc dùng Rule-based Engine (offline, không cần API)
VITE_CHATBOT_MODE=local
```

### File Cấu Hình Chính
| File | Mô Tả |
|------|-------|
| `src/components/chatbot/services/chatbotService.js` | Logic khởi tạo & gọi Gemini API |
| `src/components/chatbot/services/chatbotPrompt.js` | System Prompt & Persona cho AI |
| `src/components/chatbot/services/localSearchEngine.js` | Rule-based engine (mode local) |
| `src/components/chatbot/Chatbot.jsx` | UI Component |

---

## 🛡️ Bảo Mật

⚠️ **QUAN TRỌNG**:
- ❌ **KHÔNG commit `.env.local`** — đã được ignore trong `.gitignore`
- ✅ Dùng `.env.local.example` làm template
- 🔐 Nếu API Key bị lộ → Regenerate ngay tại [Google AI Studio](https://aistudio.google.com/apikey)

---

## 📁 Cấu Trúc Project

```
src/
├── components/
│   ├── chatbot/
│   │   ├── Chatbot.jsx
│   │   ├── Chatbot.css
│   │   ├── hooks/
│   │   │   └── useChatbot.js
│   │   └── services/
│   │       ├── chatbotService.js      # Gemini API calls
│   │       ├── chatbotPrompt.js       # System Prompt
│   │       └── localSearchEngine.js   # Local rules
│   ├── app/
│   ├── header/
│   ├── footer/
│   └── ...
├── pages/
├── App.jsx
└── main.jsx
```

---

## 🔧 Build & Deploy

### Build Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

---

## 📞 Troubleshooting

### Khi API Key Sai / Hết Hạn

Nếu console DevTools hiển thị: **❌ Gemini init failed**

**Nguyên nhân & Cách Khắc Phục**:
| Lỗi | Nguyên Nhân | Giải Pháp |
|-----|-----------|---------|
| `API key not valid` | Key không hợp lệ hoặc sai | Kiểm tra lại key từ [Google AI Studio](https://aistudio.google.com/apikey) |
| `API key has expired` | Key đã hết hạn | Tạo key mới tại [Google AI Studio](https://aistudio.google.com/apikey) |
| `Quota exceeded` | Vượt quá giới hạn API | Chờ hạn mức reset hoặc upgrade plan |
| `Resource not found` | Model `gemini-pro` không tồn tại | Kiểm tra tên model trong `src/components/chatbot/services/chatbotService.js` |

### Hướng Dẫn Chi Tiết Khi Gặp Lỗi

**Bước 1**: Mở DevTools (F12) → Tab **Console**

**Bước 2**: Tìm log màu đỏ bắt đầu bằng `❌ Gemini init failed:`

**Bước 3**: Xem tin nhắn lỗi cụ thể

**Bước 4**: 
- Nếu lỗi về API Key → Regenerate key mới tại [Google AI Studio](https://aistudio.google.com/apikey)
- Nếu lỗi kết nối → Kiểm tra internet
- Nếu vẫn lỗi → Chatbot sẽ **tự động fallback** sang mode Local (offline)

### Lỗi Khác

| Vấn Đề | Giải Pháp |
|--------|---------|
| Trang không load | Chạy `npm install` → `npm run dev` lại |
| Port 5173 đã dùng | `npm run dev -- --port 3000` |
| Module không tìm thấy | Xóa `node_modules` → chạy `npm install` lại |

---

### Fallback Mode

✨ **Tính năng an toàn**: Nếu Gemini API bị lỗi, chatbot sẽ **tự động chuyển sang Local Rule-based Engine** (offline mode) để vẫn có thể trả lời người dùng!

---

## 🛠️ Stack Công Nghệ

- **React 19** — UI Library
- **TypeScript** — Type Safety
- **Vite** — Fast Build Tool
- **Google Gemini API** — AI Engine
- **Tailwind CSS** — Styling

---

## 📚 Tài Liệu

- [Google Gemini API](https://ai.google.dev/)
- [React Docs](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)

---

**Made with ❤️ for Fashion Store** 🛍️
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
