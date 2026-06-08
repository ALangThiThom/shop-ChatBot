import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <div className="product-list">
      <div className="row">
        {products.map(item => (
          <ProductCard 
            key={item.id} 
            product={item} 
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;