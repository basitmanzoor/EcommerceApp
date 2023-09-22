import "./App.css";
import Nav from "./Components/Nav";
// import Footer from "./Components/Footer";
import LoginSignup from "./Components/LoginSignup";
import Products from "./Components/Products";
import DeleteProduct from "./Components/DeleteProduct";
import AddProduct from "./Components/AddProduct";
import UpdateProduct from "./Components/UpdateProduct";
import MyProducts from "./Components/MyProducts";
import MyOrders from "./Components/MyOrders";
import Orders from "./Components/Orders";
import OrderHistory from "./Components/OrderHistory";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateComponent from "./Components/PrivateComponent";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Products />} />
            <Route path="/myproducts" element={<MyProducts />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/delete" element={<DeleteProduct />} />
            <Route path="/update" element={<UpdateProduct />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orderhistory" element={<OrderHistory />} />

            <Route path="/logout" />
            <Route
              path="/profile"
              element={<h1>this is the profile section</h1>}
            />
          </Route>

          <Route path="/sign" element={<LoginSignup />} />
          <Route path="/*" element={<h1>PAGE NOT FOUND</h1>} />
          {/* login and signup */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
