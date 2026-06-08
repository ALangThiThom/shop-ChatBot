import './App.css';
import { useEffect, useState } from 'react';
import {Header} from '../header/Header.jsx'
import { BreadSection } from '../bread_crumber/Bread.jsx';
import { Footer } from '../footer/Footer.jsx';
import {Partner} from '../partner/Partner.jsx';
import {ShopPage} from '../../pages/shop/Shop.jsx'
import Chatbot from '../chatbot/Chatbot.jsx';
import { products } from '../../components/data/products';
import ProductDetail from '../../components/data/ProductDetail.jsx';

export function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const updateRoute = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('product-')) {
        const id = Number(hash.replace('product-', ''));
        setSelectedProductId(Number.isInteger(id) ? id : null);
      } else {
        setSelectedProductId(null);
      }
    };

    updateRoute();
    window.addEventListener('hashchange', updateRoute);
    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);

  const selectedProduct = products.find(product => product.id === selectedProductId);

  return (
    <div className="App">
      <Header />
      <BreadSection />
      {selectedProduct ? (
        <ProductDetail product={selectedProduct} />
      ) : (
        <ShopPage />
      )}
      <Chatbot />
      <Partner />
      <Footer />
    </div>
  );
}