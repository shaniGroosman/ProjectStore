import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import CartDrawer from "./components/CartDrawer";
import ShowProduct from './pages/ShowProduct';
import SignUp from './pages/SignUp';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import EndOrder from './pages/EndOrder';
import LogIn from './pages/Login';
import OrderList from './pages/OrderList';
import About from './pages/About';
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import AllOrder from "./pages/AllOrder";

// פונקציה שגורמת לכל מעבר עמוד לגלול לראש הדף
// const ScrollToTop = () => {
//   const { pathname } = useLocation(); 

//   useEffect(() => {
//     console.log("🔄 Scrolling to top...");
//     setTimeout(() => {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }, 0);
//   }, [pathname]);
//     return null;
// };

function App() {
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  return (
    <>
      <NavBar />
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/home" element={<ProductList />} >
          <Route path='details/:id' element={<ShowProduct />} />
        </Route>

        <Route path="/cart" element={<Cart />} >
          <Route path='details/:id' element={<ShowProduct />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/AllOrder" element={<AllOrder />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/About" element={<About />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/EndOrder" element={<EndOrder />} />
        <Route path="/MyOrder" element={<OrderList />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes >
      
      <Footer />
      {isCartOpen && <CartDrawer />}
    </>
  );
}

export default App;
