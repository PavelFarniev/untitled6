import { useState, useEffect } from 'react';

function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('https://jsonplaceholder.typicode.com/posts');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setPosts(result);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="page">
                <div className="loading">
                    <p>Загрузка постов...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page">
                <div className="error">
                    <h2>Ошибка при загрузке постов</h2>
                    <p>{error}</p>
                    <button onClick={fetchPosts} className="btn btn-primary">Попробовать снова</button>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="page-header">
                <h1>Список постов ({posts.length})</h1>
                <button onClick={fetchPosts} className="btn btn-secondary">
                    Обновить
                </button>
            </div>

            <div className="posts-container">
                {posts.slice(0, 20).map(post => (
                    <article key={post.id} className="post-card">
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <div className="post-meta">
                            <span>ID: {post.id}</span>
                            <span>User: {post.userId}</span>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default PostList;