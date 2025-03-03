import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../api/productServer";
import { useDispatch } from "react-redux";
import { addToCart, openCart } from "../features/cartSlice";

const ShowProduct = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [productData, setProductData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        getProductById(id).then(res => {
            setProductData(res.data);
        }).catch(err => {
            alert("לא ניתן להביא את המוצר: " + err.message);
        });
    }, [id]);

    if (!productData) return;

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "8px",
                minWidth: "300px",
                position: "relative"
            }}>
                <button onClick={() => navigate("/home")} style={{ position: "absolute", top: 10, right: 10 }}>❌</button>
                <h2>{productData.name}</h2>
                <p>{productData.description}</p>
                <p>{productData.price} ₪</p>
                <p>{productData.date}</p>
                <p>{productData.category}</p>
                <input type="button" value="+" onClick={() => {
                    dispatch(addToCart(productData));
                    navigate("/home");
                    dispatch(openCart())
                }} />
            </div>
        </div>
    );
};

export default ShowProduct;