import { useSelector, useDispatch } from "react-redux";
import { addToCart, reduce, remove } from "../features/cartSlice";

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
                            {item.name} - {item.qty}
                            <input type="button" value="+" onClick={() => dispatch(addToCart(item))} />
                            <input type="button" value="-" onClick={() => dispatch(reduce(item))} />
                            <input type="button" value="🗑" onClick={() => dispatch(remove(item))} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;