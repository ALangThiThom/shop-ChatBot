function ProductCard({ product }) {
  return (
    <div className="col-lg-4 col-sm-6">
      <div className="product-item">
        <div className="pi-pic">
          <img src={product.image} alt={product.name} />
          {product.status === "Sale" && <div className="sale pp-sale">Giảm</div>}
          <div className="icon">
            <i className="icon_heart_alt" />
          </div>
          <ul>
            <li className="w-icon active"><a href="#"><i className="icon_bag_alt" /></a></li>
            <li className="quick-view"><a href={`#product-${product.id}`}>Xem chi tiết</a></li>
            <li className="w-icon"><a href="#"><i className="fa fa-random" /></a></li>
          </ul>
        </div>
        <div className="pi-text">
          <div className="catagory-name">{product.category}</div>
          <a href={`#product-${product.id}`}>
            <h5>{product.name}</h5>
          </a>
          <div className="product-price">
            {product.price.toLocaleString()} {product.currency}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;