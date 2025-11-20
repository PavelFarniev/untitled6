import { useState, useEffect, useRef } from 'react';

function ProductSearch() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchTimeoutRef = useRef(null);
    const abortControllerRef = useRef(null);

    const searchProducts = async (query) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        try {
            setLoading(true);
            setError(null);

            if (!query.trim()) {
                setProducts([]);
                setLoading(false);
                return;
            }

            const response = await fetch(
                `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`,
                { signal: abortControllerRef.current.signal }
            );

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json();
            setProducts(data.products || []);

        } catch (err) {
            if (err.name !== 'AbortError') {
                setError(err.message);
                console.error('Ошибка при поиске продуктов:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            searchProducts(value);
        }, 500);
    };

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return (
        <div className="page">
            <h1>Поиск продуктов</h1>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Введите название продукта..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                {loading && <span className="search-loading">⌛</span>}
            </div>

            {error && (
                <div className="error-message">
                    Ошибка: {error}
                </div>
            )}

            <div className="search-results">
                {products.length > 0 ? (
                    <>
                        <h3>Найдено продуктов: {products.length}</h3>
                        <div className="products-grid">
                            {products.map(product => (
                                <div key={product.id} className="product-card">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="product-image"
                                    />
                                    <div className="product-info">
                                        <h4>{product.title}</h4>
                                        <p className="product-price">${product.price}</p>
                                        <p className="product-category">{product.category}</p>
                                        <p className="product-description">{product.description}</p>
                                        <div className="product-rating">
                                            Рейтинг: {product.rating} ⭐
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    searchTerm.trim() && !loading && (
                        <p className="no-results">Продукты не найдены</p>
                    )
                )}
            </div>
        </div>
    );
}

export default ProductSearch;