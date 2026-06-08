import { getBotResponse } from './src/components/chatbot/services/localSearchEngine.js';
import { products } from './src/components/data/products.js';

(async () => {
  try {
    const res = getBotResponse('hi', products);
    console.log('Response:', JSON.stringify(res, null, 2));
  } catch (e) {
    console.error('Test failed:', e);
  }
})();