import ProductList from '../../components/data/ProductList';
import { products } from '../../components/data/products';

export function ShopPage() {
  return (
    <section className="product-shop spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 order-1 order-lg-2">
            <ProductList products={products} />
          </div>
        </div>
      </div>

    </section>
  );
}