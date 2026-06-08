function ProductDetail({ product }) {
  return (
    <section className="product-shop page-details spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="product-pic-zoom">
              <img className="product-big-img" src={product.image} alt={product.name} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="product-details">
              <div className="pd-title">
                <span>{product.category}</span>
                <h3>{product.name}</h3>
              </div>
              <div className="pd-rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
                <span>({product.status === 'Sale' ? 'Hàng giảm giá' : 'Còn hàng'})</span>
              </div>
              <div className="pd-desc">
                <p>{product.description}</p>
                <h4>{product.price.toLocaleString()} {product.currency}</h4>
              </div>
              <div className="pd-color">
                <h6>Màu sắc:</h6>
                <div className="pd-color-choose">
                  <div className="cc-item">
                    <input type="radio" id={`color-${product.id}`} name="color" defaultChecked />
                    <label className="cc-black" htmlFor={`color-${product.id}`} style={{ background: product.color.toLowerCase() }} />
                  </div>
                </div>
              </div>
              <div className="pd-size-choose">
                {product.sizes.map((size) => (
                  <div className="sc-item" key={size}>
                    <input type="radio" id={`size-${product.id}-${size}`} name="size" defaultChecked={size === product.sizes[0]} />
                    <label htmlFor={`size-${product.id}-${size}`}>{size}</label>
                  </div>
                ))}
              </div>
              <div className="quantity">
                <div className="pro-qty">
                  <span className="qtybtn dec">-</span>
                  <input type="text" defaultValue="1" />
                  <span className="qtybtn inc">+</span>
                </div>
                <a href="#" className="primary-btn pd-cart">Thêm vào giỏ</a>
              </div>
              <ul className="pd-tags">
                <li><span>Giới tính:</span> {product.gender}</li>
                <li><span>Trạng thái:</span> {product.status}</li>
                <li><span>Kích cỡ:</span> {product.sizes.join(', ')}</li>
              </ul>
              <ul className="pd-share">
                <li className="p-code">Mã sản phẩm: <span>{product.id}</span></li>
                <li className="pd-social">
                  <a href="#">FB</a>
                  <a href="#">IG</a>
                  <a href="#">TW</a>
                </li>
              </ul>
              <div style={{ marginTop: '30px' }}>
                <a href="#" className="site-btn btn-line">Quay lại cửa hàng</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
