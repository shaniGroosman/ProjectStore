import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import CartDrawer from "./components/CartDrawer";
import { useSelector } from "react-redux";
import ShowProduct from './pages/ShowProduct';
import SignUp from './pages/SignUp';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import EndOrder from './pages/EndOrder'
import LogIn from './pages/Login';
import OrderList from './pages/OrderList';

function App() {
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  return (<>
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
        <Route path="/EndOrder" element={<EndOrder />} />
        <Route path="/MyOrder" element={<OrderList/>} />

        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes >
      
      
      {isCartOpen && <CartDrawer />}


    </>
  );
}

export default App;
