import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getProductById, deleteProduct } from "../api/productServer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, openCart } from "../features/cartSlice";
import { removeProduct } from "../features/productSlice";

import ImageGallery from "../components/ImageCarousel"; // רכיב הגלריה
import "./ShowProduct.css"; // ייבוא עיצוב

const ShowProduct = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [productData, setProductData] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector(st => st.user.currentUser);

    useEffect(() => {
        if (!deleted) {
            getProductById(id)
                .then(res => setProductData(res.data))
                .catch(err => {
                    alert("לא ניתן להביא את המוצר: " + err.message);
                });
        }
    }, [id, deleted]);

    if (!productData) {
        return <p>Loading...</p>;
    }

    const handleClose = () => {
        navigate(location.pathname.includes("cart") ? "/cart" : "/home");
    };

    // נתיב לתמונות המוצר
    const imagePath = productData.img?.replace("../public/", "/");

    // מערך תמונות (מניח שהתמונות נמצאות בשרת)
    const productImages = [
        `${imagePath}${productData.name}.jpg`,
        "/images/קרוסלה1.jpg",
        "/images/קרסולה2.jpg",
        "/images/קרוסלה3.jpg",
    ];

    return (
        <div className="overlay">
            <div className="product-container">
                {/* ✅ גלריית תמונות */}
                <ImageGallery images={productImages} defaultImage={productImages[0]} />

                {/* ✅ פרטי המוצר */}
                <div className="product-details">
                    <button onClick={handleClose} className="close-button">X</button>
                    <h2 style={{fontSize:"30px"}}>{productData.name}</h2>
                    <p>{productData.description}</p>
                    <p style={{ fontSize: "25px", fontWeight: "bold" }}>₪{productData.price} </p>
                    <p>{productData.category}</p>

                    <input type="button" style={{
                        padding: "10px 15px",
                        fontSize: "16px",
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid",
                        borderRadius: "5px",
                        cursor: "pointer",
                        margin: "5px",
                        width: "100px",

                    }} value="+" onClick={() => {
                        dispatch(addToCart(productData));
                        navigate("/home");
                        dispatch(openCart());
                    }} />
                    {user.role == "manager" && (
                        <>
                            <div style={{
                                display: "flex", gap: "10px", alignItems: "center", justifyContent: "center", // מרכז את הכפתורים
                                width: "100%" // מוודא שהקונטיינר תופס את כל הרוחב
                            }}>

                                <button style={{
                                    padding: "10px 15px",
                                    fontSize: "16px",
                                    backgroundColor: "white",
                                    color: "black",
                                    border: "1px solid",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    margin: "5px",
                                    width: "100px",

                                }}
                                    onClick={() => navigate(`/edit-product/${productData._id}`)}>Edit</button>

                                <input type="button" style={{
                                    padding: "10px 15px",
                                    width: "100px",
                                    fontSize: "16px",
                                    backgroundColor: "white",
                                    color: "black",
                                    border: "1px solid",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    margin: "5px"
                                }}
                                    onClick={() => {
                                        deleteProduct(productData._id, user?.token)
                                            .then(() => {
                                                alert("המוצר נמחק בהצלחה");
                                                dispatch(removeProduct(productData._id));
                                                navigate("/home");
                                            })
                                            .catch(err => {
                                                alert("לא ניתן למחוק את המוצר: " + err.message);
                                            });
                                    }} value=" מחק מוצר" />

                            </div>  </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ShowProduct;
