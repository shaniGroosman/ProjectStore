import { useEffect, useState } from "react";
import { getAllOrders, updateStatusOrder } from "../api/orderService";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import "./OrderList.css"; // ייבוא קובץ העיצוב

const AllOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getAllOrders().then(res => {
            console.log("🔹 הזמנות שהתקבלו:", res.data);
            setOrders(res.data);
        })
            .catch(err => {
                console.error("❌ שגיאה בשליפת הנתונים:", err);
                alert("לא ניתן להביא את המוצרים: " + err.message);
            });
    }, []);

    const handleStatusChange = async (orderId) => {
        try {
            const res = await updateStatusOrder(orderId);
            console.log("✅ סטטוס עודכן בהצלחה:", res.data);

            // עדכון הסטייט - משתמשים בערך שחוזר מהשרת
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, isSend: res.data.isSend } : order
                )
            );
        } catch (err) {
            console.error("❌ שגיאה בעדכון הסטטוס:", err);
            alert("⛔ אין לך הרשאה לעדכן סטטוס.");
        }
    };

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
                                                src={`${item?.product?.img}${item?.product?.name}.jpg`}
                                                onError={(e) => e.currentTarget.src = `${item?.product?.img}${item?.product?.name}.png`}
                                                alt={item?.product?.name || "תמונה חסרה"}
                                            />
                                            <span className="product-name">{item.product?.name}</span>
                                            <span className="product-details">{item.count} * {item.product?.price} ₪</span>
                                            <span className="product-price">סה"כ: {item.count * item.product?.price} ₪</span>
                                        </div>
                                    ))}
                                </div>
                                <hr className="order-divider" />

                                {/* סכום כולל + כפתור בשורה אחת */}
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginTop: "10px"
                                }}>
                                    <p className="order-summary">סה"כ לתשלום: {order.price} ₪</p>

                                    <Button
                                        variant="contained"
                                        color={order.isSend ? "success" : "error"}
                                        onClick={() => handleStatusChange(order._id)}
                                        disabled={order.isSend} // אם נשלח - הכפתור מושבת
                                    >
                                        {order.isSend ? "נשלח " : "לא נשלח "}
                                    </Button>
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
}

export default AllOrder;
