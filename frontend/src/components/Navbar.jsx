import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
    const { cart } = useCart();

const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
);

    return (
        <nav className="navbar">

            <div className="logo">
                🛒 E-Shop
            </div>

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/products">
                    Products
                </Link>

                <Link to="/cart">
                    Cart ({cartCount})
                </Link>

            </div>

            <div className="nav-actions">

                <Link to="/products">
                    <button>
                        🔍
                    </button>
                </Link>

                <Link to="/cart">
                    <button>
                        🛒 Cart
                    </button>
                </Link>

                <button>
                    Login
                </button>

            </div>

        </nav>
    );
}

export default Navbar;