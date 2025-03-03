import { useEffect, useState } from "react";
import { getAllProduct } from "../api/productServer";
import Product from "../components/Product";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart,openCart } from "../features/cartSlice";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getAllProduct().then(res => {
            setProducts(res.data);
        }).catch(err => {
            alert("לא ניתן להביא את המוצרים: " + err.message);
        });
    }, []);

    return (
        <>
            <input type="button" value="My Cart" onClick={() => navigate("/cart")} />
            <div>
                {products.map(item => (
                    <li key={item._id}>
                        <Link to={`/home/details/${item._id}`}>
                            <Product product={item} />
                        </Link>
                        <input type="button" value="+" onClick={() => {
                            dispatch(addToCart(item));
                            dispatch(openCart())
                        }
                        } />
                    </li>
                ))}
            </div>

            {/* ה-Outlet יטען את ShowProduct רק כאשר הנתיב תואם */}
            <Outlet />
        </>
    );
};

export default ProductList;