function data(dataName) {
  switch (dataName) {
    case "products":
      const products = [
        {
          name: "LUMIX DMC-G20",
          img: "images/mayanh1.jpg",
          detail: "DIGITAL CAMERA NEW",
        },
        {
          name: "LUMIX DMC-G21",
          img: "images/mayanh2.jpg",
          detail: "DIGITAL CAMERA NEW",
        },
        {
          name: "LUMIX DMC-G22",
          img: "images/mayanh3.jpg",
          detail: "DIGITAL CAMERA OLD",
        },
        {
          name: "LUMIX DMC-G23",
          img: "images/mayanh2.jpg",
          detail: "DIGITAL CAMERA",
        },
        {
          name: "LUMIX DMC-G24",
          img: "images/mayanh1.jpg",
          detail: "DIGITAL CAMERA NEW",
        },
      ];
      return products;

    case "categories":
      const categories = [
        {
          name: "categories LUMIX DMC-G20",
          img: "images/mayanh1.jpg",
          detail: "DIGITAL CAMERA NEW",
        },
        {
        name: "LUMIX DMC-G22",
          img: "images/mayanh3.jpg",
          detail: "DIGITAL CAMERA OLD",
        },
        {
          name: "LUMIX DMC-G23",
          img: "images/mayanh2.jpg",
          detail: "DIGITAL CAMERA",
        },
        {
          name: "LUMIX DMC-G21",
          img: "images/mayanh2.jpg",
          detail: "DIGITAL CAMERA NEW", 
        },
        {
          name: "LUMIX DMC-G24",
          img: "images/mayanh1.jpg",
          detail: "DIGITAL CAMERA NEW",
        },
      ];
      return categories;
  }
}

export default data;