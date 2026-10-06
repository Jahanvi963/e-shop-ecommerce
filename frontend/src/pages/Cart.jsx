import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useCart();

    const totalPrice = cart.reduce(
        (total, product) =>
            total + product.price * product.quantity,
        0
    );

    return (
        <main className="page">

            <div className="cart-container">

                <h1>Shopping Cart</h1>

                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>

                        {cart.map((product) => (
                            <div
                                className="cart-item"
                                key={product._id}
                            >

                                <div className="cart-item-info">

                                    <h2>{product.name}</h2>

                                    <p>
                                        Price: ₹{product.price}
                                    </p>

                                    {product.stock === 0 ? (
    <p>Out of Stock</p>
) : product.stock <= 5 ? (
    <p>Low Stock: {product.stock} left</p>
) : (
    <p>In Stock</p>
)}

                                </div>

                                <div className="quantity-controls">

                                    <button
                                        onClick={() =>
                                            decreaseQuantity(product._id)
                                        }
                                    >
                                        −
                                    </button>

                                    <span className="quantity">
                                        {product.quantity}
                                    </span>

                                    <button
    onClick={() =>
        increaseQuantity(product._id)
    }
    disabled={product.quantity >= product.stock}
>
    +
</button>

                                </div>

                                <button
                                    onClick={() =>
                                        removeFromCart(product._id)
                                    }
                                >
                                    Remove
                                </button>

                            </div>
                        ))}

                        <div className="cart-total">

                            <h2>
                                Total: ₹{totalPrice}
                            </h2>

                            <Link to="/checkout">
                                <button className="checkout-button">
                                    Proceed to Checkout
                                </button>
                            </Link>

                        </div>

                    </>
                )}

            </div>

        </main>
    );
}

export default Cart;