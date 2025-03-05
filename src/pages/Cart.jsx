import { useSelector, useDispatch } from "react-redux";
import { addToCart, reduce, remove } from "../features/cartSlice";
import { Link, Outlet } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const arrCart = useSelector(state => state.cart.arr);
    const cnt = useSelector(state => state.cart.count);
    const sum = useSelector(state => state.cart.sum);

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
                            {/* לינק למוצר ספציפי */}
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

        </div>

    );
};

export default Cart;
