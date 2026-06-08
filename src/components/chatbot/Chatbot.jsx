import React from 'react';
import { useChatbot } from './hooks/useChatbot';
import './Chatbot.css';

export default function Chatbot() {
  const {
    isOpen,
    messages,
    input,
    setInput,
    loading,
    chatEndRef,
    handleSendMessage,
    setIsOpen
  } = useChatbot();

  return (
    <div className="chatbot-root">
      
      {/* ================= BUTTON ICON CHATBOT (Hiện khi đóng) ================= */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Mở chat trợ lý mua sắm"
          title="Trợ lý mua sắm"
          className="chatbot-trigger"
        >
          {/* Chat bubble SVG icon */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" fill="white" opacity="0.95" />
            <circle cx="8" cy="11" r="1.2" fill="#2563eb" />
            <circle cx="12" cy="11" r="1.2" fill="#2563eb" />
            <circle cx="16" cy="11" r="1.2" fill="#2563eb" />
          </svg>
        </button>
      )}

      {/* ================= KHUNG HỘP CHATBOX (Hiện khi click mở) ================= */}
      {isOpen && (
        <div className="chatbot-panel">
          
          {/* Header của Chatbox kèm nút đóng "✕" */}
          <div className="chatbot-header">
            <div className="chatbot-header-title">
              <div className="chatbot-status-dot"></div>
              <span>Trợ Lý Mua Sắm AI 🤖</span>
            </div>
            {/* Nút đóng */}
            <button 
              onClick={() => setIsOpen(false)}
              className="chatbot-close-btn"
            >
              ✕
            </button>
          </div>

          {/* Khung hiển thị nội dung tin nhắn */}
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message-row ${msg.sender === 'user' ? 'user' : 'ai'}`}
              >
                {/* Hộp thoại tin nhắn bằng chữ */}
                <div className={`chatbot-message-bubble ${msg.sender === 'user' ? 'user' : 'ai'}`}>
                  {msg.text}
                </div>

                {/* Danh sách sản phẩm đề xuất */}
                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="chatbot-recommendation-grid">
                    {msg.recommendedProducts.map(item => (
                      <a
                        key={item.product.id}
                        href={`#product-${item.product.id}`}
                        className="chatbot-product-card"
                      >
                        <div className="chatbot-product-image">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                          />
                        </div>
                        <div className="chatbot-product-body">
                          <div className="chatbot-product-category">
                            {item.product.category}
                          </div>
                          <div className="chatbot-product-name">
                            {item.product.name}
                          </div>
                          <div className="chatbot-product-price">
                            {item.product.price.toLocaleString()} {item.product.currency}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="chatbot-loading">
                AI đang tìm trang phục phù hợp...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Thanh nhập dữ liệu đầu vào phía dưới */}
          <div className="chatbot-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Nhập yêu cầu của bạn..."
              className="chatbot-input"
            />
            <button 
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="chatbot-send-button"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}