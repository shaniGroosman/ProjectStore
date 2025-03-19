import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getByUserId } from "../api/orderService";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // אייקון לפתיחה
import "./OrderList.css"; // ייבוא קובץ העיצוב

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const user = useSelector(state => state.user.currentUser);

    useEffect(() => {
        if (user?._id) {
            getByUserId(user._id)
                .then(res => {
                    console.log("🔹 הזמנות שהתקבלו:", res.data);
                    setOrders(res.data);
                })
                .catch(err => {
                    console.error("❌ שגיאה בשליפת הנתונים:", err);
                    alert("לא ניתן להביא את המוצרים: " + err.message);
                });
        }
    }, [user]);

    return (
        <div className="order-list-container">
            <h2>ההזמנות שלי</h2>

            {orders.length > 0 ? (
                <div className="order-list">
                    {orders.map(order => (
                        <Accordion key={order._id} className="order-accordion">
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} className="order-summary-header">
                                <Typography className="order-number">מספר הזמנה: {order.orderNumber}</Typography>
                                <Typography className="order-date">תאריך: {new Date(order.date).toLocaleDateString()}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* פרטי ההזמנה */}
                                <div className="order-products">
                                    {order.products.map((item, index) => (
                                        <div key={index} className="order-product">
                                            <img
                                                src={`${item.product.img}${item.product.name}.jpg`}
                                                onError={(e) => e.currentTarget.src = `${item.product.img}${item.product.name}.png`}
                                                alt={item.product.name}
                                            />
                                            <span className="product-name">{item.product?.name}</span>
                                            <span className="product-details">{item.count} * {item.product?.price} ₪</span>
                                            <span className="product-price">סה"כ: {item.count * item.product?.price} ₪</span>
                                        </div>
                                    ))}
                                </div>
                                <hr className="order-divider" />

                                {/* סה"כ לתשלום + סטטוס משלוח בשורה אחת */}
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginTop: "10px"
                                }}>
                                    <p className="order-summary">סה"כ לתשלום: {order.price} ₪</p>

                                    {/* סטטוס משלוח */}
                                    <p style={{
                                        padding: "8px 15px",
                                        borderRadius: "5px",
                                        fontWeight: "bold",
                                        backgroundColor: order.isSend ? "#4CAF50" : "red",
                                        color: "white"
                                    }}>
                                        {order.isSend ? "📦 נשלח" : "⌛ בהמתנה"}
                                    </p>
                                </div>

                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            ) : (
                <p className="no-orders">אין הזמנות להצגה.</p>
            )}
        </div>
    );
};

export default OrderList;
