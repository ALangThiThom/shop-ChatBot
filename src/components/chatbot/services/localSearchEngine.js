/**
 * Rule-based NLP Search Engine for Chatbot
 * Analyzes query, applies semantic rules, scores and matches products.
 *
 * NOTE: This is the local rule-based engine. It does not automatically
 * apply the detailed Gemini system prompt from chatbotPrompt.js.
 * If you want the full prompt behavior, use Gemini mode with
 * VITE_CHATBOT_MODE=gemini and VITE_GEMINI_API_KEY set.
 */

import { LOCAL_BOT_CONFIG } from './chatbotPrompt';

export const normalizeText = (text) =>
  text
    ? text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    : '';

const stopwords = [
  'mua', 'tìm', 'cho', 'muon', 'muốn', 'can', 'cần', 'mình', 'shop', 'sản', 'phẩm', 'đồ', 'cai', 'cái', 'này', 'đó', 'do', 'nhé', 'vui', 'lòng', 'tôi', 'toi', 'chị', 'anh', 'em', 'và', 'va', 'hoặc', 'hoac', 'vẫn', 'van', 'please', 'help'
];

const semanticRules = {
  season: {
    dong: ['dong', 'mua dong', 'do mua dong', 'cai mua dong', 'mac mua dong', 'mua dong', 'đồ mua đông', 'mặc mùa đông', 'mùa đông', 'am', 'giu am', 'giữ ấm', 'dong'],
    xuan: ['xuan', 'mua xuan', 'thu', 'mua thu', 'thoi tiet', 'thu'],
    he: ['he', 'mua he', 'qua he', 'nong']
  },
  activities: {
    leoNui: ['leo nui', 'leo núi', 'phuot', 'hiking', 'du lich', 'du lịch', 'mountain'],
    camTrai: ['cam trai', 'cắm trại', 'camping'],
    diLam: ['di lam', 'đi làm', 'cong so', 'công sở'],
    diChoi: ['di choi', 'đi chơi', 'da pho', 'dạo phố', 'party'],
    duLich: ['du lich', 'du lịch', 'travel']
  },
  style: {
    treTrung: ['tre trung', 'trẻ trung', 'nang dong', 'năng động', 'streetwear', 'street style'],
    congSo: ['cong so', 'công sở', 'formal', 'lich su'],
    vintage: ['vintage', 'co dien', 'cổ điển']
  },
  type: {
    aoLen: ['ao len', 'áo len', 'len'],
    aoGio: ['ao gio', 'áo gió', 'windbreaker'],
    aoHoodie: ['hoodie', 'ao hoodie', 'áo hoodie'],
    aoKhoac: ['ao khoac', 'áo khoác', 'coat', 'jacket'],
    aoSoMi: ['ao so mi', 'áo sơ mi', 'shirt'],
    dam: ['dam', 'đầm', 'dress'],
    non: ['non', 'nón', 'hat', 'cap'],
    khan: ['khan', 'khăn', 'khăn quàng', 'khan quang'],
    balo: ['balo', 'ba lo', 'backpack'],
    giay: ['giay', 'giày', 'shoes', 'sneakers'],
    phuKien: ['phụ kiện', 'phu kien', 'scarf', 'phụ kiện thời trang']
  },
  feeling: {
    am: ['am', 'giữ ấm', 'giu am', 'nong', 'ấm áp'],
    mat: ['mat', 'mát', 'thoáng', 'thoang may'],
    chongNuoc: ['chong nuoc', 'chống nước', 'nuoc', 'waterproof'],
    chongGio: ['chong gio', 'chống gió', 'gio', 'gió']
  }
};

const excludedTerms = [
  'but', 'bút', 'bút bi', 'bút mực', 'son', 'kem', 'mỹ phẩm', 'my pham', 
  'nước hoa', 'nuoc hoa', 'điện thoại', 'dien thoai', 'laptop', 'máy ảnh', 
  'may anh', 'xe', 'ô tô', 'oto', 'đồ điện', 'do dien', 'đồ gia dụng', 
  'do gia dung', 'đồng hồ', 'dong ho'
];

const greetingTerms = ['xin chao', 'xin chào', 'chao', 'chào', 'hello', 'hi', 'hey', 'chào bạn', 'chào shop'];
const addressTerms = ['địa chỉ', 'shop ở đâu', 'cửa hàng ở đâu', 'ở đâu', 'địa chỉ shop', 'showroom', 'shop nằm ở', 'địa chỉ của bạn'];
const negativeFeedbackTerms = ['xấu', 'bục bội', 'buc boi', 'tệ', 'kém', 'không đẹp', 'ko đẹp', 'chê', 'thất vọng', 'dở', 'dở ẹc', 'không ưng', 'ko ưng', 'không phù hợp', 'ko phù hợp', 'không thích hợp', 'ko thích hợp'];
const complimentTerms = ['đẹp quá', 'đẹp lắm', 'đẹp nhỉ', 'đẹp thế', 'rất đẹp', 'quá đẹp', 'tuyệt vời', 'xinh quá', 'xinh đẹp', 'ưng lắm', 'cảm ơn', 'cam on', 'cám ơn', 'thanks', 'thank you', 'good job'];
const farewellTerms = ['tạm biệt', 'tam biet', 'bye', 'see you', 'hẹn gặp lại', 'hen gap lai', 'thoát', 'thoat', 'gặp lại', 'gap lai'];
const wideFitTerms = ['rộng', 'rộng rãi', 'thoải mái', 'dễ vận động', 'loose', 'thoải mái để leo núi', 'dễ dàng', 'dễ di chuyển', 'thích hợp leo núi'];

const clothesTerms = [
  'ao', 'áo', 'quan', 'quần', 'váy', 'đầm', 'nón', 'non', 'giày', 'giay', 
  'khăn', 'balo', 'phụ kiện', 'phu kien', 'phụ kiện thời trang', 'áo khoác', 
  'áo len', 'áo gió', 'hoodie', 'áo sơ mi', 'dress', 'đồ', 'trang phục'
];

const colorRules = {
  vang: ['vang', 'vàng'],
  xam: ['xam', 'xám'],
  den: ['den', 'đen'],
  hong: ['hong', 'hồng'],
  trang: ['trang', 'trắng'],
  do: ['do', 'đỏ'],
  xanh: ['xanh', 'xanh la', 'xanh duong'],
  kem: ['kem']
};

export function getBotResponse(userQuery, products = []) {
  const query = normalizeText(userQuery);
  const rawTerms = query
    .split(/\s+/)
    .filter(Boolean)
    .filter(term => !stopwords.includes(term));

  const queryTerms = rawTerms;
  const queryContains = (words) => {
    if (!Array.isArray(words) || words.length === 0) return false;
    return words.some(word => {
      const normalized = normalizeText(String(word));
      return query.includes(normalized);
    });
  };

  const queryHasType = queryContains(Object.values(semanticRules.type).flat());
  const queryHasColor = Object.values(colorRules).some(colorList => queryContains(colorList));
  const detectedColor = Object.entries(colorRules).find(([, colorList]) => queryContains(colorList))?.[0] || null;
  const queryHasSize = /\b(?:xs|s|m|l|xl|xxl|\d{2})\b/i.test(query);
  const detectedSizeMatch = query.match(/\b(?:xs|s|m|l|xl|xxl|\d{2})\b/i);
  const detectedSize = detectedSizeMatch ? detectedSizeMatch[0].toUpperCase() : null;
  const queryHasClothes = queryContains(clothesTerms)
    || queryHasType
    || queryHasColor
    || queryHasSize
    || Object.values(semanticRules.activities).flat().some(phrase => query.includes(normalizeText(String(phrase))))
    || Object.values(semanticRules.style).flat().some(phrase => query.includes(normalizeText(String(phrase))))
    || Object.values(semanticRules.season).flat().some(phrase => query.includes(normalizeText(String(phrase))));
  const queryIsExcluded = queryContains(excludedTerms);
  const queryIsGreeting = queryContains(greetingTerms);
  const queryAsksAddress = queryContains(addressTerms);
  const queryHasNegativeFeedback = queryContains(negativeFeedbackTerms);
  const queryHasFarewell = queryContains(farewellTerms);
  const queryHasCompliment = queryContains(complimentTerms)
    || (!queryHasClothes && /\b(dep|rat dep|tuyet voi|xinh)\b/.test(query));
  const queryWantsWideFit = queryContains(wideFitTerms);
  const queryHasConstraints = queryHasType || queryHasColor || queryHasSize || queryWantsWideFit;
  const onlyGreeting = queryIsGreeting && !queryHasClothes && !queryHasNegativeFeedback && !queryHasCompliment && !queryHasFarewell;

  if (queryAsksAddress) {
    return {
      reply: LOCAL_BOT_CONFIG.replies.address,
      recommendedProducts: []
    };
  }

  if (queryHasNegativeFeedback) {
    return {
      reply: LOCAL_BOT_CONFIG.replies.apology,
      recommendedProducts: []
    };
  }

  if (queryHasCompliment && !queryHasNegativeFeedback) {
    return {
      reply: LOCAL_BOT_CONFIG.replies.thankYou,
      recommendedProducts: []
    };
  }

  if (queryHasFarewell) {
    return {
      reply: "Cảm ơn bạn đã ghé shop nhé! Chúc bạn một ngày thật vui, cần gì lại nhắn mình nha 😊",
      recommendedProducts: []
    };
  }

  if (onlyGreeting) {
    return {
      reply: LOCAL_BOT_CONFIG.replies.greeting,
      recommendedProducts: []
    };
  }

  const desired = {
    season: [],
    activities: [],
    style: [],
    types: [],
    features: []
  };

  if (queryWantsWideFit) {
    desired.features.push('Rộng rãi');
  }

  if (queryContains(semanticRules.season.dong)) {
    desired.season.push('Dong');
    desired.features.push('Giữ ấm');
  }
  if (queryContains(semanticRules.season.he)) {
    desired.season.push('He');
  }
  if (queryContains(semanticRules.season.xuan)) {
    desired.season.push('Xuan');
  }
  if (queryContains(semanticRules.activities.leoNui)) {
    desired.activities.push('Leo núi', 'Cắm trại', 'Du lịch');
    desired.features.push('Chống nước', 'Chống gió', 'Nhẹ');
  }
  if (queryContains(semanticRules.activities.camTrai)) {
    desired.activities.push('Cắm trại');
    desired.features.push('Giữ ấm', 'Dễ vận động');
  }
  if (queryContains(semanticRules.activities.diLam)) {
    desired.activities.push('Đi làm');
    desired.style.push('Công sở');
  }
  if (queryContains(semanticRules.activities.diChoi)) {
    desired.activities.push('Đi chơi', 'Dạo phố');
    desired.style.push('Năng động', 'Trẻ trung');
  }
  if (queryContains(semanticRules.activities.duLich)) {
    desired.activities.push('Du lịch');
    desired.features.push('Nhẹ', 'Dễ vận động');
  }
  if (queryContains(semanticRules.style.treTrung)) {
    desired.style.push('Năng động', 'Trẻ trung');
  }
  if (queryContains(semanticRules.style.congSo)) {
    desired.style.push('Công sở');
  }
  if (queryContains(semanticRules.style.vintage)) {
    desired.style.push('Vintage');
  }
  if (queryContains(semanticRules.type.aoLen)) {
    desired.types.push('Áo len');
  }
  if (queryContains(semanticRules.type.aoGio)) {
    desired.types.push('Áo gió');
  }
  if (queryContains(semanticRules.type.aoHoodie)) {
    desired.types.push('Áo hoodie');
  }
  if (queryContains(semanticRules.type.aoKhoac)) {
    desired.types.push('Áo khoác');
  }
  if (queryContains(semanticRules.type.aoSoMi)) {
    desired.types.push('Áo sơ mi');
  }
  if (queryContains(semanticRules.type.dam)) {
    desired.types.push('Đầm');
  }
  if (queryContains(semanticRules.type.non)) {
    desired.types.push('Nón');
  }
  if (queryContains(semanticRules.type.khan)) {
    desired.types.push('Khăn');
  }
  if (queryContains(semanticRules.type.balo)) {
    desired.types.push('Ba lô');
  }
  if (queryContains(semanticRules.type.giay)) {
    desired.types.push('Giày');
  }
  if (queryContains(semanticRules.type.phuKien)) {
    desired.types.push('Phụ kiện');
  }
  if (queryContains(semanticRules.feeling.chongNuoc)) {
    desired.features.push('Chống nước');
    desired.features.push('Chống gió');
  }
  if (queryContains(semanticRules.feeling.chongGio)) {
    desired.features.push('Chống gió');
  }
  if (queryContains(semanticRules.feeling.am)) {
    desired.features.push('Giữ ấm');
  }
  if (queryContains(semanticRules.feeling.mat)) {
    desired.features.push('Mát');
  }

  const attributeSupports = (product, field, values) => {
    if (!Array.isArray(product[field])) {
      return values.some(value => {
        const normalizedValue = normalizeText(value);
        const sourceText = normalizeText(String(product[field] || ''));
        if (normalizedValue === 'rong rai') {
          const wideSearch = normalizeText([
            product.name,
            product.description,
            (product.tags || []).join(' '),
            product.category
          ].join(' '));
          return ['rong', 'rong rai', 'thoai mai', 'loose', 'de van dong', 'dễ vận động'].some(keyword => wideSearch.includes(keyword));
        }
        return typeof product[field] === 'string' && sourceText.includes(normalizedValue);
      });
    }
    return values.some(value => product[field].some(item => normalizeText(item).includes(normalizeText(value))));
  };

  const productMatchesType = (product) => {
    if (desired.types.length === 0) return true;
    return attributeSupports(product, 'category', desired.types)
      || attributeSupports(product, 'tags', desired.types)
      || attributeSupports(product, 'name', desired.types);
  };

  const productMatchesColor = (product) => {
    if (!detectedColor) return true;
    try {
      const color = normalizeText(String(product.color || ''));
      const tags = normalizeText((product.tags || []).join(' '));
      const desc = normalizeText(String(product.description || ''));
      return color.includes(detectedColor) || tags.includes(detectedColor) || desc.includes(detectedColor);
    } catch {
      return true;
    }
  };

  const productMatchesSize = (product) => {
    if (!detectedSize || !Array.isArray(product.sizes)) return true;
    try {
      const normalizedSizes = product.sizes.map(size => normalizeText(String(size)));
      return normalizedSizes.includes(normalizeText(detectedSize));
    } catch {
      return true;
    }
  };

  const scoredProducts = products.map(product => {
    const content = normalizeText([
      product.name,
      product.category,
      product.type,
      product.gender,
      product.color,
      product.description,
      product.material,
      ...(product.style || []),
      ...(product.season || []),
      ...(product.activities || []),
      ...(product.features || []),
      ...(product.tags || [])
    ].join(' '));

    if (queryIsExcluded) {
      return null;
    }
    if (queryHasType && !productMatchesType(product)) {
      return null;
    }
    if (queryHasSize && !productMatchesSize(product)) {
      return null;
    }

    let score = 0;
    const matchedTerms = queryTerms.filter(term => content.includes(term));
    score += matchedTerms.length * 3;

    if (desired.types.length && productMatchesType(product)) score += 8;
    if (desired.activities.length && attributeSupports(product, 'activities', desired.activities)) score += 7;
    if (desired.style.length && attributeSupports(product, 'style', desired.style)) score += 5;
    if (desired.features.length && attributeSupports(product, 'features', desired.features)) score += 4;
    if (desired.season.length && attributeSupports(product, 'season', desired.season)) score += 4;
    if (queryTerms.some(term => normalizeText(product.gender).includes(term))) score += 2;
    if (queryHasType && productMatchesType(product)) score += 5;
    if (queryHasColor && productMatchesColor(product)) score += 10;
    if (queryHasSize && productMatchesSize(product)) score += 10;

    const reasonParts = [];
    if (desired.activities.length && attributeSupports(product, 'activities', desired.activities)) {
      reasonParts.push('phù hợp hoạt động');
    }
    if (desired.season.length && attributeSupports(product, 'season', desired.season)) {
      reasonParts.push('phù hợp mùa');
    }
    if (desired.style.length && attributeSupports(product, 'style', desired.style)) {
      reasonParts.push('phong cách yêu cầu');
    }
    if (desired.features.length && attributeSupports(product, 'features', desired.features)) {
      reasonParts.push('tính năng phù hợp');
    }
    if (queryHasColor && productMatchesColor(product) && reasonParts.length === 0) {
      reasonParts.push('màu sắc phù hợp');
    }
    if (queryHasSize && productMatchesSize(product) && reasonParts.length === 0) {
      reasonParts.push('size phù hợp');
    }
    if (matchedTerms.length && reasonParts.length === 0) {
      reasonParts.push('phù hợp yêu cầu tìm kiếm');
    }
    const reason = reasonParts.length > 0
      ? `Đề xuất vì ${reasonParts.join(', ')}.`
      : 'Đề xuất vì gần với yêu cầu tìm kiếm.';

    return {
      product,
      score,
      reason
    };
  }).filter(Boolean);

  const sorted = scoredProducts
    .sort((a, b) => b.score - a.score)
    .filter(item => item.score > 0);

  const resultList = queryIsExcluded
    ? []
    : sorted.length > 0
      ? sorted.slice(0, 3)
      : queryHasClothes
        ? scoredProducts.slice(0, 3).map(item => ({
            ...item,
            reason: item.reason || 'Đề xuất các lựa chọn tương tự.'
          }))
        : [];

  const reply = queryIsExcluded
    ? LOCAL_BOT_CONFIG.replies.excluded
    : sorted.length > 0
      ? LOCAL_BOT_CONFIG.replies.success
      : queryHasClothes && queryHasConstraints
        ? LOCAL_BOT_CONFIG.replies.noExactMatch
        : resultList.length > 0
          ? LOCAL_BOT_CONFIG.replies.similar
          : LOCAL_BOT_CONFIG.replies.fallback;

  return {
    reply,
    recommendedProducts: resultList
  };
}
