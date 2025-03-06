import { useEffect, useState } from "react";
import { getAllProduct, getTotalPages } from "../api/productServer";
import Product from "../components/Product";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../features/productSlice";
import { addToCart, openCart } from "../features/cartSlice";

const ProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.arr);

    const [totalPages, setTotalPages] = useState(1); // מספר עמודים ברירת מחדל

    useEffect(() => {
        getAllProduct(1) // טוען את המוצרים של העמוד הראשון
            .then(res => {
                dispatch(setProducts(res.data));
            })
            .catch(err => {
                alert("לא ניתן להביא את המוצרים: " + err.message);
            });
    
        getTotalPages()
            .then(res => {
                console.log("🔹 מספר עמודים:", res.data.pages); // בדיקה
                setTotalPages(res.data.pages); // שומר את מספר העמודים
            })
            .catch(err => {
                console.log("שגיאה בקבלת מספר העמודים: " + err.message);
            });
    
    }, [dispatch]);

let pageButtons = [];
for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
        <input 
            key={i} 
            type="button" 
            value={`עמוד ${i}`} 
            onClick={() => {
                getAllProduct(i) // טוען את המוצרים של העמוד שנבחר
                    .then(res => dispatch(setProducts(res.data)))
                    .catch(err => console.log("שגיאה בטעינת עמוד", i, err.message));
            }} 
        />
    );
}
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
                            dispatch(openCart());
                        }} />
                    </li>
                ))}
                {pageButtons}
            </div>


            <Outlet />
        </>
    );
};

export default ProductList;
