import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation.js';
import Home from './pages/Home.js';
import TechnologyList from './pages/TechnologyList.js';
import TechnologyDetail from './pages/TechnologyDetail.js';
import AddTechnology from './pages/AddTechnology.js';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import Settings from './pages/Settings.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import useSettings from './hooks/useSettings.js';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const { settings } = useSettings();

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const user = localStorage.getItem('username') || '';
        setIsLoggedIn(loggedIn);
        setUsername(user);
    }, []);

    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setUsername(user);
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <Router>
            <div className="app" data-theme={settings.theme}>
                <Navigation
                    isLoggedIn={isLoggedIn}
                    username={username}
                    onLogout={handleLogout}
                />

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/technologies" element={<TechnologyList />} />
                        <Route path="/technology/:techId" element={<TechnologyDetail />} />
                        <Route path="/add-technology" element={<AddTechnology />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route
                            path="/login"
                            element={<Login onLogin={handleLogin} />}
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute isLoggedIn={isLoggedIn}>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;