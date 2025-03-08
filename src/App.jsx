import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import CartDrawer from "./components/CartDrawer";
import { useSelector } from "react-redux";
import ShowProduct from './pages/ShowProduct';
import LogIn from './pages/Login';
import SignUp from './pages/SignUp';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

function App() {
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" element={<ProductList />} >
          <Route path='details/:id' element={<ShowProduct />} />
        </Route>
        <Route path="/cart" element={<Cart />} >
          <Route path='details/:id' element={<ShowProduct />} />
        </Route>
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes >
      {isCartOpen && <CartDrawer />}


    </>
  );
}

export default App;