import { useEffect, useState } from "react";
import ApiTest from "../components/ApiTest";
import ProductCard from "../components/ProductCard";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/products`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                return response.json();
            })
            .then((data) => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Products Error:", error);
                setError("Unable to load products");
                setLoading(false);
            });
    }, []);

    return (
        <main>

            <section className="hero">
                <h1>Welcome to E-Shop</h1>

                <p>
                    Find everything you need in one place.
                </p>
            </section>

            <ApiTest />

            <section className="products-section">

                <h2>Featured Products</h2>

                {loading && <p>Loading products...</p>}

                {error && <p>{error}</p>}

                {!loading && !error && (
                    <div className="product-grid">

                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}

                    </div>
                )}

            </section>

        </main>
    );
}

export default Home;