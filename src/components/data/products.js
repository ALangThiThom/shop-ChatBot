export const products = [
  // --- THỜI TRANG NỮ ---
  {
    id: 1,
    name: "Áo len vàng xoắn",
    category: "Áo len",
    gender: "Nữ",
    price: 350000,
    currency: "VND",
    image: "/img/products/product-1.jpg",
    color: "Vàng",
    status: "Giảm",
    sizes: ["S", "M", "L"],
    specs: {
      height: { min: 150, max: 165 },
      weight: { min: 42, max: 58 }
    },
    description: "Áo len vàng nữ với cổ chữ V rộng và chi tiết vặn dây trước, tạo nên phong cách trẻ trung và năng động.",
    tags: ["áo len", "vàng", "nữ", "cổ chữ V", "xoắn", "giảm giá"]
  },
  {
    id: 2,
    name: "Áo len hồng buộc dây",
    category: "Áo len",
    gender: "Nữ",
    price: 325000,
    currency: "VND",
    image: "/img/products/product-2.jpg",
    color: "Hồng",
    status: "Còn hàng",
    sizes: ["S", "M"],
    specs: {
      height: { min: 148, max: 160 },
      weight: { min: 40, max: 52 }
    },
    description: "Áo len hồng pastel cộc tay kiểu buộc dây chéo sau lưng, mềm mại và kiểu dáng nữ tính.",
    tags: ["áo len", "hồng", "nữ", "buộc dây", "pastel", "cropped"]
  },
  {
    id: 6,
    name: "Áo len gấu kem",
    category: "Áo len",
    gender: "Nữ",
    price: 850000,
    currency: "VND",
    image: "/img/products/product-6.jpg",
    color: "Kem",
    status: "Còn hàng",
    sizes: ["S", "M", "L"],
    specs: {
      height: { min: 150, max: 168 },
      weight: { min: 43, max: 60 }
    },
    description: "Áo len kem cổ tròn với họa tiết gấu dễ thương ở tay, phù hợp phong cách Hàn Quốc nhẹ nhàng.",
    tags: ["áo len", "kem", "gấu", "nữ", "Hàn Quốc", "cute"]
  },
  {
    id: 10,
    name: "Đầm hoa chiffon trắng",
    category: "Đầm",
    gender: "Nữ",
    price: 450000,
    currency: "VND",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop&q=80",
    color: "Trắng",
    status: "Còn hàng",
    sizes: ["S", "M", "L"],
    specs: {
      height: { min: 153, max: 170 },
      weight: { min: 45, max: 58 }
    },
    description: "Đầm trắng chiffon hoa nhẹ, eo chun và tay phồng vintage, thích hợp đi tiệc và dạo phố.",
    tags: ["đầm", "hoa", "trắng", "chiffon", "nữ", "dạ hội"]
  },

  // --- THỜI TRANG NAM ---
  {
    id: 11,
    name: "Áo sơ mi Oxford xanh",
    category: "Áo sơ mi",
    gender: "Nam",
    price: 380000,
    currency: "VND",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&auto=format&fit=crop&q=80",
    color: "Xanh",
    status: "Còn hàng",
    sizes: ["M", "L", "XL", "XXL"],
    specs: {
      height: { min: 165, max: 185 },
      weight: { min: 55, max: 85 }
    },
    description: "Áo sơ mi Oxford xanh nhạt, form slim-fit, chất vải thoáng mát phù hợp công sở và sự kiện lịch sự.",
    tags: ["áo sơ mi", "xanh", "nam", "oxford", "công sở"]
  },
  {
    id: 12,
    name: "Áo hoodie đen tối giản",
    category: "Áo hoodie",
    gender: "Nam",
    price: 490000,
    currency: "VND",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=80",
    color: "Đen",
    status: "Giảm",
    sizes: ["M", "L", "XL", "XXL"],
    specs: {
      height: { min: 160, max: 188 },
      weight: { min: 50, max: 90 }
    },
    description: "Hoodie đen dáng thường, chất nỉ dày ấm, thiết kế đơn giản với túi kangaroo phía trước.",
    tags: ["hoodie", "đen", "nam", "nỉ", "giảm giá"]
  },
  {
    id: 13,
    name: "Quần jeans co giãn",
    category: "Quần",
    gender: "Nam",
    price: 550000,
    currency: "VND",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=80",
    color: "Xanh",
    status: "Còn hàng",
    sizes: ["29", "30", "31", "32", "34"],
    specs: {
      height: { min: 165, max: 182 },
      weight: { min: 56, max: 80 }
    },
    description: "Quần jeans xanh đậm co giãn, form slim-fit tạo dáng gọn gàng và thoải mái khi vận động.",
    tags: ["quần jeans", "xanh", "nam", "co giãn", "slim fit"]
  },

  // --- ĐỒ UNISEX ---
  {
    id: 3,
    name: "Áo khoác kaki xanh rêu",
    category: "Áo khoác",
    gender: "Unisex",
    price: 850000,
    currency: "VND",
    image: "/img/products/product-3.jpg",
    color: "Xanh",
    status: "Còn hàng",
    sizes: ["M", "L", "XL"],
    specs: {
      height: { min: 158, max: 180 },
      weight: { min: 48, max: 78 }
    },
    description: "Áo khoác kaki xanh rêu dáng sơ-mi, nhiều túi hộp thời trang, phù hợp làm áo khoác ngoài cho cả nam và nữ.",
    tags: ["áo khoác", "kaki", "xanh", "unisex", "cargo", "outerwear"]
  },
  {
    id: 8,
    name: "Áo gió mũ trùm xanh",
    category: "Áo khoác",
    gender: "Unisex",
    price: 1100000,
    currency: "VND",
    image: "/img/products/product-8.jpg",
    color: "Xanh",
    status: "Còn hàng",
    sizes: ["S", "M", "L", "XL"],
    specs: {
      height: { min: 155, max: 185 },
      weight: { min: 45, max: 85 }
    },
    description: "Áo gió xanh nhẹ, có mũ trùm và lớp chống nước, phù hợp hoạt động ngoài trời và du lịch.",
    tags: ["áo gió", "xanh", "unisex", "chống nước", "hoodie"]
  },

  // --- PHỤ KIỆN & GIÀY DÉP ---
  {
    id: 4,
    name: "Khăn len microfiber xám",
    category: "Phụ kiện",
    gender: "Unisex",
    price: 1600000,
    currency: "VND",
    image: "/img/products/product-4.jpg",
    color: "Xám",
    status: "Còn hàng",
    sizes: ["Free Size"],
    specs: {
      height: { min: 140, max: 190 },
      weight: { min: 35, max: 100 }
    },
    description: "Khăn len microfiber cao cấp, mềm mượt và ấm, thiết kế họa tiết cable knit màu xám đa dụng.",
    tags: ["khăn len", "xám", "phụ kiện", "microfiber", "unisex"]
  },
  {
    id: 5,
    name: "Nón lưỡi trai vàng",
    category: "Phụ kiện",
    gender: "Unisex",
    price: 1100000,
    currency: "VND",
    image: "/img/products/product-5.jpg",
    color: "Vàng",
    status: "Còn hàng",
    sizes: ["Adjustable"],
    specs: {
      height: { min: 140, max: 190 },
      weight: { min: 35, max: 100 }
    },
    description: "Nón lưỡi trai vàng thêu chữ tối giản, có dây điều chỉnh phía sau cho vừa mọi đầu.",
    tags: ["nón", "vàng", "phụ kiện", "streetwear", "unisex"]
  },
  {
    id: 7,
    name: "Balo trekking vàng",
    category: "Ba lô",
    gender: "Unisex",
    price: 1600000,
    currency: "VND",
    image: "/img/products/product-7.jpg",
    color: "Vàng",
    status: "Giảm",
    sizes: ["Large Capacity"],
    specs: {
      height: { min: 150, max: 190 },
      weight: { min: 40, max: 95 }
    },
    description: "Balo trekking vàng dung tích lớn, nhiều ngăn và thiết kế bền chắc cho chuyến đi phượt.",
    tags: ["balo", "vàng", "trekking", "phượt", "unisex", "sale"]
  },
  {
    id: 9,
    name: "Giày cao cổ vàng",
    category: "Giày",
    gender: "Unisex",
    price: 850000,
    currency: "VND",
    image: "/img/products/product-9.jpg",
    color: "Vàng",
    status: "Còn hàng",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    specs: {
      height: { min: 145, max: 188 },
      weight: { min: 40, max: 85 }
    },
    description: "Giày cao cổ vải vàng phong cách thể thao, đế cao su bền và logo biểu tượng nổi bật.",
    tags: ["giày", "vàng", "sneakers", "cao cổ", "unisex"]
  }
];