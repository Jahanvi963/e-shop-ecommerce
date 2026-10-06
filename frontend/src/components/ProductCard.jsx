import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {

    const { addToCart } = useCart();

    return (
        <div className="product-card">

            <Link
                to={`/products/${product._id}`}
                className="product-link"
            >

                <div className="product-image">
    {product.image ? (
        <img
            src={product.image}
            alt={product.name}
        />
    ) : (
        <span>🛍️</span>
    )}
</div>

                <div className="product-info">

                    <span className="product-category">
                        {product.category}
                    </span>

                    <h3>{product.name}</h3>

                    <p className="product-description">
                        {product.description}
                    </p>

                    <div className="product-bottom">
                        <strong>₹{product.price}</strong>
                    </div>

                </div>

            </Link>

            <button
                onClick={() => addToCart(product)}
            >
                Add to Cart
            </button>

        </div>
    );
}

export default ProductCard;