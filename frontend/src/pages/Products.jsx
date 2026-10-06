import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/products`
);

                const data = await response.json();

                console.log("Products API:", data);

                if (!response.ok || !data.success) {
                    throw new Error(
                        data.message || "Failed to fetch products"
                    );
                }

                setProducts(data.products || []);
            } catch (error) {
                console.error("Products Error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
    const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
        category === "All" ||
        product.category === category;

    return matchesSearch && matchesCategory;
});

    return (
        <main className="page">

            <h1>All Products</h1>

            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="search-input"
            />

            <select
    value={category}
    onChange={(event) => setCategory(event.target.value)}
    className="category-filter"
>
    <option value="All">All Categories</option>
    <option value="Electronics">Electronics</option>
    <option value="Fashion">Fashion</option>
</select>

            {loading && <p>Loading products...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && filteredProducts.length === 0 && (
                <p>No matching products found.</p>
            )}

            {!loading && !error && filteredProducts.length > 0 && (
                <div className="product-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            )}

        </main>
    );
}

export default Products;