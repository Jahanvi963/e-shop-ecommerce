import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");

        return savedCart ? JSON.parse(savedCart) : [];
    });

    const saveCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const addToCart = (product) => {

        const existingProduct = cart.find(
            (item) => item._id === product._id
        );

        let updatedCart;

        if (existingProduct) {

            updatedCart = cart.map((item) =>
                item._id === product._id
                    ? {
                          ...item,
                          quantity: item.quantity + 1
                      }
                    : item
            );

        } else {

            updatedCart = [
                ...cart,
                {
                    ...product,
                    quantity: 1
                }
            ];

        }

        saveCart(updatedCart);
    };

    const increaseQuantity = (id) => {

    const updatedCart = cart.map((item) => {

        if (item._id === id) {

            if (item.quantity >= item.stock) {
                return item;
            }

            return {
                ...item,
                quantity: item.quantity + 1
            };
        }

        return item;
    });

    saveCart(updatedCart);
};

    const decreaseQuantity = (id) => {

        const updatedCart = cart
            .map((item) =>
                item._id === id
                    ? {
                          ...item,
                          quantity: item.quantity - 1
                      }
                    : item
            )
            .filter((item) => item.quantity > 0);

        saveCart(updatedCart);
    };

    const removeFromCart = (id) => {

        const updatedCart = cart.filter(
            (item) => item._id !== id
        );

        saveCart(updatedCart);
    };

    const clearCart = () => {
    saveCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQuantity,decreaseQuantity,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}