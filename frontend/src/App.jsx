import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import { CartProvider } from "./context/CartContext";

import "./App.css";

function App() {
    return (
        <CartProvider>
            <BrowserRouter>

                <Navbar />

                <Routes>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/products"
                        element={<Products />}
                    />

                    <Route
                        path="/products/:id"
                        element={<ProductDetails />}
                    />

                    <Route
                        path="/cart"
                        element={<Cart />}
                    />

                    <Route
                        path="/checkout"
                        element={<Checkout />}
                    />

                </Routes>

            </BrowserRouter>
        </CartProvider>
    );
}

export default App;