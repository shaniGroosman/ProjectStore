import { Drawer, List, ListItem, ListItemText, IconButton, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { remove, reduce, addToCart, closeCart } from "../features/cartSlice";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import "./CartDrawer.css";

const CartDrawer = () => {
    const cart = useSelector(state => state.cart.arr);
    const isCartOpen = useSelector(state => state.cart.isCartOpen);
    const cnt = useSelector(state => state.cart.count);
    const sum = useSelector(state => state.cart.sum);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Drawer anchor="left" open={isCartOpen} onClose={() => dispatch(closeCart())}>
            <div className="cart-drawer">
                {/* כפתור סגירה */}
                <IconButton onClick={() => dispatch(closeCart())} className="cart-close-button" disableRipple disableFocusRipple
                >
                    <CloseIcon />
                </IconButton>

                <h2>Shopping Cart</h2>
                <div className="cart-summary">
                    <span className="cart-total">סה"כ לתשלום: ₪{sum}</span>
                </div>
                <List className="cart-list">
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <ListItem key={item._id} className="cart-item">
                                {/* תמונת המוצר */}
                                <img
                                    src={`${item.img}${item.name}.jpg`}
                                    onError={(e) => e.currentTarget.src = `${item.img}${item.name}.png`}
                                    alt={item.name}
                                    className="cart-item-image"
                                />
                                {/* מידע על המוצר */}
                                <div className="cart-item-content">
                                    <div className="cart-item-title">{item.name}</div>
                                    <div className="cart-item-price">₪{item.price} x {item.qty}</div>
                                </div>
                                {/* כפתורי הוספה / הפחתה */}
                                <div className="cart-item-actions">
                                    <IconButton onClick={() => dispatch(addToCart(item))}>+</IconButton>
                                    <IconButton onClick={() => dispatch(reduce(item))}>-</IconButton>
                                    <IconButton onClick={() => dispatch(remove(item))}>🗑</IconButton>
                                </div>
                            </ListItem>
                        ))
                    )}
                </List>

                {cart.length > 0 && (

                    <Button
                        variant="contained"
                        // color="primary"

                        fullWidth
                        className="cart-full-view"
                        onClick={() => {
                            dispatch(closeCart());
                            navigate("/cart");
                        }}
                    >
                        View Full Cart
                    </Button>
                )}
            </div>
        </Drawer>
    );
};

export default CartDrawer;
