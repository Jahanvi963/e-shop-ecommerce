import { useState } from "react";
import { useCart } from "../context/CartContext";

function Checkout() {
    const { cart, clearCart } = useCart();

    const [orderPlaced, setOrderPlaced] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const totalPrice = cart.reduce(
        (total, product) =>
            total + product.price * product.quantity,
        0
    );

    const handlePlaceOrder = async () => {
        try {
            setLoading(true);
            setError("");

            const orderItems = cart.map((product) => ({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: product.quantity
            }));

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/orders`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        items: orderItems,
                        totalAmount: totalPrice
                    })
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Failed to place order"
                );
            }

            console.log("Order Created:", data);

            clearCart();
            setOrderPlaced(true);

        } catch (error) {
            console.error("Order Error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (orderPlaced) {
        return (
            <main className="page">

                <div className="cart-container">

                    <h1>Order Placed Successfully!</h1>

                    <p>
                        Thank you for your order.
                    </p>

                    <p>
                        Total Amount: ₹{totalPrice}
                    </p>

                </div>

            </main>
        );
    }

    return (
        <main className="page">

            <div className="cart-container">

                <h1>Checkout</h1>

                <p>
                    Review your order before placing it.
                </p>

                <h2>
                    Total: ₹{totalPrice}
                </h2>

                {error && (
                    <p>
                        {error}
                    </p>
                )}

                <button
                    className="checkout-button"
                    onClick={handlePlaceOrder}
                    disabled={loading || cart.length === 0}
                >
                    {loading ? "Placing Order..." : "Place Order"}
                </button>

            </div>

        </main>
    );
}

export default Checkout;