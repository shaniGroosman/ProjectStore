import { Drawer, List, ListItem, ListItemText, IconButton, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { remove, reduce, addToCart, closeCart } from "../features/cartSlice";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom"; 

const CartDrawer = () => { 
    const cart = useSelector(state => state.cart.arr);
    const isCartOpen = useSelector(state => state.cart.isCartOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    return (
        <Drawer anchor="left" open={isCartOpen} onClose={() => dispatch(closeCart())}>
            <div style={{ width: 300, padding: 16 }}>
                <IconButton onClick={() => dispatch(closeCart())} style={{ float: "right" }}>
                    <CloseIcon />
                </IconButton>
                <h2>Shopping Cart</h2>
                <List>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <ListItem key={item._id} style={{ display: "flex", justifyContent: "space-between" }}>
                                <ListItemText primary={item.name} secondary={`₪${item.price} x ${item.qty}`} />
                                <IconButton onClick={() => dispatch(addToCart(item))}>+</IconButton>
                                <IconButton onClick={() => dispatch(reduce(item))}>-</IconButton>
                                <IconButton onClick={() => dispatch(remove(item))}>🗑</IconButton>
                            </ListItem>
                        ))
                    )}
                </List>

                {cart.length > 0 && (
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
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
