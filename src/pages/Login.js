import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username && password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);

            onLogin(username);
            navigate('/dashboard');
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    };

    return (
        <div className="page">
            <div className="login-container">
                <h1>Вход в систему</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Имя пользователя:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Введите имя пользователя"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Введите пароль"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">
                        Войти
                    </button>
                </form>

                <div className="login-info">
                    <p>Для демонстрации введите любое имя пользователя и пароль</p>
                </div>
            </div>
        </div>
    );
}

export default Login;