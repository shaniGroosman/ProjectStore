import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userOut } from "../features/userSlice";
import { deledeCart } from "../features/cartSlice";

const NavBar = () => {
    const isCurrentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    return (
        <nav>
            {isCurrentUser && (
                <input
                    type="button"
                    value="LogOut"
                    onClick={() => {
                        dispatch(userOut());
                        dispatch(deledeCart());
                    }}
                />
            )}
            <ul>
                <li><Link to="home">home</Link></li>
                <li><Link to="cart">cart</Link></li>
                {!isCurrentUser && <li><Link to="LogIn">LogIn</Link></li>}
                {!isCurrentUser && <li><Link to="SignUp">SignUp</Link></li>}
                <li><Link to="AddProduct">AddProduct</Link></li>
            </ul>
            <p>{isCurrentUser && <span>hello {isCurrentUser.userName}</span>}</p>
        </nav>
    );
};

export default NavBar;