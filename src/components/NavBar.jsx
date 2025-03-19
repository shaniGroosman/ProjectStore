import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userOut } from "../features/userSlice";
import { deledeCart } from "../features/cartSlice";
import { useState, useEffect, useRef } from "react";
import './NavBar.css';

// ייבוא אייקונים מ-MUI
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

const NavBar = () => {
    const isCurrentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null); // רפרנס לתיבת המידע
    const toggleTooltip = () => setShowTooltip(prev => !prev);
    const cnt = useSelector(state => state.cart.count)
    // סוגר את ה-tooltip כשנלחץ מחוץ אליו
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                setShowTooltip(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="navbar">
            <Link to="/">
                <img src="/images/logo.png" alt="logo" />
            </Link>
            <Link to="/cart" className="cart-icon">
                <img src="/images/cart.gif" alt="cart" className="cart-image" />
                {cnt > 0 && <span className="cart-count">{cnt}</span>}
            </Link>

            <ul className="nav-links">
                {!isCurrentUser && <li><Link to="LogIn"> LogIn</Link></li>}
                {!isCurrentUser && <li><Link to="SignUp"> SignUp</Link></li>}
                {isCurrentUser && isCurrentUser.role === "manager" && (
                    <>
                        <li><Link to="AddProduct">AddProduct</Link></li>
                        <li><Link to="AllOrder">כל ההזמנות</Link></li> {/* ✅ אחרי AddProduct */}
                    </>
                )}
                <li><Link to="home"> תפריט</Link></li>
                <li><Link to="about"> אודות</Link></li>
                <li><Link to="/"> ראשי</Link></li>

            </ul>

            {isCurrentUser && (
                <div className="profile-container" ref={tooltipRef}>
                    <div className="profile-picture" onClick={toggleTooltip}>
                        {isCurrentUser.userName[0].toUpperCase()}
                    </div>

                    {showTooltip && (
                        <div className="tooltip">
                            <p>{isCurrentUser.userName}  שלום</p>
                            <p>{isCurrentUser.email}</p>
                            <ul>
                                <li><Link to="MyOrder"><ListAltIcon /> ההזמנות שלי</Link></li>
                                <li><Link to="cart"><ShoppingCartIcon /> הסל שלי</Link></li>
                                {isCurrentUser && (
                                    <Link
                                        to="/LogIn"
                                        className="logout-button"
                                        onClick={() => {
                                            dispatch(userOut());
                                            dispatch(deledeCart());
                                        }}
                                    >
                                        <LogoutIcon /> התנתק
                                    </Link>
                                )}
                                <li><Link to="LogIn"><SwapHorizIcon /> החלף חשבון</Link></li>
                            </ul>
                        </div>
                    )}
                </div>

            )}


        </nav>
    );
};

export default NavBar;
