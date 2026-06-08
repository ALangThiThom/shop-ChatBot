import { useState, useEffect, useRef } from 'react';
import { chatbotService } from '../services/chatbotService';
import { LOCAL_BOT_CONFIG } from '../services/chatbotPrompt';

const STORAGE_KEY = 'chatbot_state_v1';

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: LOCAL_BOT_CONFIG.persona.greeting, sender: 'ai' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Tải trạng thái chatbot lưu trữ từ localStorage khi khởi động
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
          setMessages(parsed.messages);
        }
        setIsOpen(Boolean(parsed.isOpen));
      } catch (error) {
        console.warn('Không thể đọc trạng thái chatbot từ localStorage', error);
      }
    }
  }, []);

  // Đồng bộ trạng thái mới của chatbot vào localStorage
  useEffect(() => {
    const stateToSave = {
      isOpen,
      messages
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [isOpen, messages]);

  // Hàm tự động cuộn xuống dưới cùng của danh sách tin nhắn
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cuộn khi danh sách tin nhắn thay đổi, trạng thái loading thay đổi hoặc khi mở hộp chat
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  /**
   * Xử lý gửi tin nhắn của người dùng và nhận tin nhắn phản hồi của bot.
   */
  const handleSendMessage = async () => {
    const userQuery = input.trim();
    if (!userQuery || loading) return;

    // Cập nhật tin nhắn của người dùng lên UI
    setMessages(prev => [...prev, { text: userQuery, sender: 'user' }]);
    setInput("");
    setLoading(true);

    try {
      // Gọi service để lấy câu trả lời
      const botResponse = await chatbotService.getResponse(userQuery);
      
      setMessages(prev => [...prev, {
        text: botResponse.reply,
        sender: 'ai',
        recommendedProducts: botResponse.recommendedProducts
      }]);
    } catch (error) {
      console.error("Lỗi Chatbot:", error);
      setMessages(prev => [...prev, { 
        text: LOCAL_BOT_CONFIG.persona.error, 
        sender: 'ai' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleOpen = () => setIsOpen(prev => !prev);

  return {
    isOpen,
    messages,
    input,
    setInput,
    loading,
    chatEndRef,
    handleSendMessage,
    toggleOpen,
    setIsOpen
  };
}
