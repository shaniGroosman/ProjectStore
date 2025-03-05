import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getProductById, deleteProduct } from "../api/productServer";
import { useDispatch } from "react-redux";
import { addToCart, openCart } from "../features/cartSlice";
import { removeProduct } from "../features/productSlice";


const ShowProduct = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [productData, setProductData] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation(); // כדי לדעת מאיפה הגענו

    useEffect(() => {
        if (!deleted) {
            getProductById(id).then(res => {
                setProductData(res.data);
            }).catch(err => {
                alert("לא ניתן להביא את המוצר: " + err.message);
            });
        }
    }, [id, deleted]);

    if (!productData) return null;
    const handleClose = () => {
        if (location.pathname.includes("cart")) {
            navigate("/cart");
        } else {
            navigate("/home");
        }
    };

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
                <button onClick={handleClose} style={{ position: "absolute", top: 10, right: 10 }}>❌</button>
                <h2>{productData.name}</h2>
                <p>{productData.description}</p>
                <p>{productData.price} ₪</p>
                <p>{productData.date}</p>
                <p>{productData.category}</p>

                <input type="button" value="+" onClick={() => {
                    dispatch(addToCart(productData));
                    navigate("/home");
                    dispatch(openCart());
                }} />

                <button onClick={() => {
                    console.log("Navigating to edit:", productData);
                    navigate(`/edit-product/${productData._id}`);
                }}>
                    Edit
                </button>

                <input type="button" onClick={() => {
                    deleteProduct(productData._id)
                        .then(() => {
                            alert("המוצר נמחק בהצלחה");
                            dispatch(removeProduct(productData._id)); // עדכון Redux
                            navigate("/home")

                        })
                        .catch(err => {
                            alert("לא ניתן למחוק את המוצר: " + err.message);
                        });

                }} value="🗑️ מחק מוצר" />
            </div>
        </div>
    );
};

export default ShowProduct;
