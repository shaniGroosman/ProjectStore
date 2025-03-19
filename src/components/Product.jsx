const Product = ({ product }) => {
    return (
        <div className="product-card">
            <img
                src={`${product.img}${product.name}.jpg`}
                onError={(e) => e.currentTarget.src = `${product.img}${product.name}.png`}
                height="130px"
            />
            <h2 className="productName">{product.name}</h2>
            {/* <p>{product.description}</p> */}
            <p className="productPrice">{product.price} ₪</p>
        </div>
    );
};

export default Product;
