import { useSelector, useDispatch } from "react-redux";
import { addToCart, reduce, remove } from "../features/cartSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@mui/material"; // ייבוא כפתור MUI

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const arrCart = useSelector(state => state.cart.arr);
    const cnt = useSelector(state => state.cart.count);
    const sum = useSelector(state => state.cart.sum);
    const isCurrentUser = useSelector(state => state.user.currentUser);

    const handleFinishOrder = () => {
        if (!isCurrentUser) {
            const confirmLogin = window.confirm("You are not logged in. Do you want to go to the login page?");
            if (confirmLogin) {
                navigate("/Login"); // ניתוב לעמוד ההתחברות
            }
        } else {
            navigate("/EndOrder"); // אם המשתמש מחובר, המשך לעמוד ההזמנה
        }
    };

    return (
        <div>
            <h2>My Cart</h2>
            {`Count: ${cnt}`}
            {`Sum: ₪${sum}`}
            {arrCart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {arrCart.map(item => (
                        <li key={item._id}>
                            <Link to={`/cart/details/${item._id}`}>
                                {item.name} - {item.qty}
                            </Link>
                            <input type="button" value="+" onClick={() => dispatch(addToCart(item))} />
                            <input type="button" value="-" onClick={() => dispatch(reduce(item))} />
                            <input type="button" value="🗑" onClick={() => dispatch(remove(item))} />
                        </li>
                    ))}
                </ul>
            )}
            <Outlet />

            {arrCart && arrCart.length > 0 && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFinishOrder}
                    sx={{ mt: 2 }}
                >
                    Finish Order
                </Button>
            )}
        </div>
    );
};

export default Cart;
