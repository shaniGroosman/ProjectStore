import { Link } from "react-router-dom";
const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="home">home</Link>
                </li>
                <li>
                    <Link to="cart">cart</Link>
                </li>
                <li>
                    <Link to="LogIn">LogIn</Link>
                </li>
                <li>
                    <Link to="SignUp">SignUp</Link>
                </li>

            </ul>
        </nav>
    );
}
export default NavBar;