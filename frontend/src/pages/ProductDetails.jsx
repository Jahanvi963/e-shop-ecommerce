import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetails() {
    const { id } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log("Product ID:", id);

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/products/${id}`
                );

                const data = await response.json();

                console.log("Product API Response:", data);

                if (!response.ok || !data.success) {
                    throw new Error(data.message || "Product not found");
                }

                setProduct(data.product);
            } catch (error) {
                console.error("Product Details Error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <main className="page">
                <p>Loading...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="page">
                <p>{error}</p>
            </main>
        );
    }

    return (
        <main className="page">

            <div className="product-details">

                <div className="product-details-image">
    {product.image ? (
        <img
            src={product.image}
            alt={product.name}
        />
    ) : (
        <span>🛍️</span>
    )}
</div>

                <div className="product-details-info">

                    <p>{product.category}</p>

                    <h1>{product.name}</h1>

                    <p>{product.description}</p>

                    <h2>₹{product.price}</h2>

                    <p>
                        Stock: {product.stock}
                    </p>

                    <button
    onClick={() => {
        console.log("ADD TO CART CLICKED");
        addToCart(product);
    }}
    disabled={product.stock === 0}
>
    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
</button>

                </div>

            </div>

        </main>
    );
}

export default ProductDetails;