
const Product = ({ product }) => {

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price} ₪</p>
        </div>
    );
};

export default Product;