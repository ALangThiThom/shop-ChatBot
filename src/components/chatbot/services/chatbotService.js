import { getBotResponse as getLocalResponse } from './localSearchEngine';
import { products } from '../../data/products';
import { SYSTEM_PROMPT } from './chatbotPrompt';

// Tùy chọn cấu hình chế độ Chatbot: 'local' (offline rules) | 'gemini' (Google Gemini API)
const CHATBOT_MODE = import.meta.env.VITE_CHATBOT_MODE || 'local';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let geminiModel = null;
let isInitializing = false;

async function initializeGemini() {
  if (geminiModel || isInitializing) return;
  
  if (CHATBOT_MODE !== 'gemini' || !GEMINI_API_KEY) {
    console.log('ℹ️ Using local mode for chatbot');
    return;
  }

  isInitializing = true;
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    geminiModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
    console.log('✅ Gemini model initialized');
  } catch (error) {
    console.error('❌ Gemini init failed:', error);
  }
  isInitializing = false;
}

export const chatbotService = {
  /**
   * Trả về phản hồi của chatbot dựa trên truy vấn người dùng.
   * @param {string} userQuery - Câu hỏi/Yêu cầu của người dùng.
   * @returns {Promise<{reply: string, recommendedProducts: Array}>}
   */
  async getResponse(userQuery) {
    await initializeGemini();
    // With local mode, the system prompt from chatbotPrompt.js is not applied
    // to the matching engine. Local mode uses rule-based matching only.
    
    if (CHATBOT_MODE === 'gemini' && geminiModel) {
      return this.getGeminiResponse(userQuery);
    }
    
    // Giả lập độ trễ phản hồi (600ms) để mang lại cảm giác tự nhiên như AI đang suy nghĩ
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return getLocalResponse(userQuery, products);
  },

  /**
   * Gọi Google Gemini API để lấy phản hồi AI.
   * @param {string} userQuery
   */
  async getGeminiResponse(userQuery) {
    try {
      if (!geminiModel) {
        throw new Error("Gemini model chưa khởi tạo");
      }

      const productsInfo = products.map(p => 
        `${p.id}: ${p.name} (${p.category}, ${p.color}, ${p.price} VND)`
      ).join('\n');
      
      const prompt = `${SYSTEM_PROMPT}

Danh sách sản phẩm:
${productsInfo}

Người dùng hỏi: "${userQuery}"

Trả lời và gợi ý sản phẩm dưới dạng JSON:
{
  "reply": "Câu trả lời thân thiện bằng tiếng Việt",
  "productIds": [1, 2]
}

Lưu ý: Chỉ dùng ID sản phẩm có trong danh sách, nếu không có thích hợp để productIds: []`;

      const response = await geminiModel.generateContent(prompt);
      const responseText = response.response.text();
      
      console.log('📤 Gemini:', responseText);

      let result;
      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No JSON found");
        
        const parsed = JSON.parse(jsonMatch[0]);
        const productIds = Array.isArray(parsed.productIds) ? parsed.productIds : [];
        
        result = {
          reply: parsed.reply || responseText,
          recommendedProducts: productIds
            .map(id => {
              const product = products.find(p => p.id === id);
              return product ? { product, score: 10, reason: 'Được Gemini gợi ý' } : null;
            })
            .filter(Boolean)
        };
      } catch (e) {
        console.error('Parse error:', e);
        result = {
          reply: responseText,
          recommendedProducts: []
        };
      }

      return result;
    } catch (error) {
      console.error("❌ Gemini error:", error);
      // Nếu Gemini lỗi, fallback về engine cục bộ để vẫn trả lời người dùng
      try {
        const fallback = getLocalResponse(userQuery, products);
        return fallback;
      } catch (e) {
        return {
          reply: "Xin lỗi bạn, có lỗi kỹ thuật xảy ra. Bạn thử lại nhé! 😊",
          recommendedProducts: []
        };
      }
    }
  }
};

