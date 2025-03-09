import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getByUserId } from "../api/orderService";

const OrderList = () => {
    const [orders, setOrders] = useState([]); // שיניתי את השם ל- orders כדי לשקף נכון את הנתונים
    const user = useSelector(state => state.user.currentUser);

    useEffect(() => {
        if (user?._id) { 
            getByUserId(user._id)
                .then(res => {
                    console.log("🔹 הזמנות שהתקבלו:", res.data); // הצגת הנתונים שהתקבלו מהשרת
                    setOrders(res.data);
                })
                .catch(err => {
                    console.error("❌ שגיאה בשליפת הנתונים:", err);
                    alert("לא ניתן להביא את המוצרים: " + err.message);
                });
        }
    }, [user]);

    return (
        <div>
            <h2>ההזמנות שלי</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map(order => (
                        <li key={order._id}>
                            <p><strong>מספר הזמנה:</strong> {order.orderNumber}</p>
                            <p><strong>תאריך:</strong> {new Date(order.date).toLocaleDateString()}</p>
                            <p><strong>סה"כ לתשלום:</strong> {order.price} ₪</p>

                            <h4>פרטי ההזמנה:</h4>
                            <ul>
                                {order.products.map((item, index) => (
                                    <li key={index}>
                                        <p><strong>{item.product?.name}</strong></p>
                                        <p>כמות: {item.count}</p>
                                        <p>מחיר ליחידה: {item.product?.price} ₪</p>
                                        <p><strong>סה"כ: {item.count * item.product?.price} ₪</strong></p>
                                    </li>
                                ))}
                            </ul>

                            <hr />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>אין הזמנות להצגה.</p>
            )}
        </div>
    );
};

export default OrderList;
