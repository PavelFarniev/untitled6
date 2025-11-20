import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSettings from '../hooks/useSettings.js';

function Settings() {
    const { settings, updateSetting, resetSettings } = useSettings();
    const [showNotification, setShowNotification] = useState(false);

    const handleSettingChange = (key, value) => {
        updateSetting(key, value);

        // Показываем уведомление если включены уведомления
        if (settings.notifications && key !== 'notifications') {
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000);
        }
    };

    const testNotification = () => {
        if (settings.notifications) {
            alert('🔔 Это тестовое уведомление! Настройки уведомлений работают.');
        } else {
            alert('Уведомления выключены в настройках');
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <Link to="/" className="back-link">
                    ← На главную
                </Link>
                <h1>Настройки пользователя</h1>
            </div>

            {showNotification && (
                <div className="notification">
                    ⚡ Настройка сохранена!
                </div>
            )}

            <div className="settings-container">
                <div className="settings-section">
                    <h3>👤 Основные настройки</h3>

                    <div className="setting-group">
                        <label htmlFor="username">Имя пользователя:</label>
                        <input
                            id="username"
                            type="text"
                            value={settings.username}
                            onChange={(e) => handleSettingChange('username', e.target.value)}
                            placeholder="Введите ваше имя"
                        />
                    </div>

                    <div className="setting-group">
                        <label htmlFor="theme">Тема оформления:</label>
                        <select
                            id="theme"
                            value={settings.theme}
                            onChange={(e) => handleSettingChange('theme', e.target.value)}
                        >
                            <option value="light">🌞 Светлая</option>
                            <option value="dark">🌙 Темная</option>
                            <option value="auto">⚡ Авто</option>
                        </select>
                    </div>

                    <div className="setting-group">
                        <label htmlFor="language">Язык интерфейса:</label>
                        <select
                            id="language"
                            value={settings.language}
                            onChange={(e) => handleSettingChange('language', e.target.value)}
                        >
                            <option value="ru">🇷🇺 Русский</option>
                            <option value="en">🇺🇸 English</option>
                        </select>
                    </div>
                </div>

                <div className="settings-section">
                    <h3>🎨 Внешний вид</h3>

                    <div className="setting-group">
                        <label htmlFor="fontSize">Размер шрифта:</label>
                        <select
                            id="fontSize"
                            value={settings.fontSize}
                            onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                        >
                            <option value="small">Маленький</option>
                            <option value="medium">Средний</option>
                            <option value="large">Большой</option>
                        </select>
                    </div>

                    <div className="setting-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.compactView}
                                onChange={(e) => handleSettingChange('compactView', e.target.checked)}
                            />
                            Компактный вид (меньше отступов)
                        </label>
                    </div>
                </div>

                <div className="settings-section">
                    <h3>🔔 Уведомления</h3>

                    <div className="setting-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.notifications}
                                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                            />
                            Включить уведомления
                        </label>
                    </div>

                    <div className="setting-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.autoSave}
                                onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                            />
                            Автосохранение изменений
                        </label>
                    </div>

                    <button onClick={testNotification} className="btn btn-info">
                        Тест уведомления
                    </button>
                </div>

                <div className="settings-section">
                    <h3>📊 Текущие настройки</h3>
                    <div className="current-settings">
                        <div className="setting-item">
                            <strong>Имя пользователя:</strong> {settings.username}
                        </div>
                        <div className="setting-item">
                            <strong>Тема:</strong> {settings.theme === 'light' ? '🌞 Светлая' : settings.theme === 'dark' ? '🌙 Темная' : '⚡ Авто'}
                        </div>
                        <div className="setting-item">
                            <strong>Язык:</strong> {settings.language === 'ru' ? '🇷🇺 Русский' : '🇺🇸 English'}
                        </div>
                        <div className="setting-item">
                            <strong>Размер шрифта:</strong> {settings.fontSize === 'small' ? 'Маленький' : settings.fontSize === 'large' ? 'Большой' : 'Средний'}
                        </div>
                        <div className="setting-item">
                            <strong>Уведомления:</strong> {settings.notifications ? '✅ Включены' : '❌ Выключены'}
                        </div>
                        <div className="setting-item">
                            <strong>Автосохранение:</strong> {settings.autoSave ? '✅ Включено' : '❌ Выключено'}
                        </div>
                        <div className="setting-item">
                            <strong>Компактный вид:</strong> {settings.compactView ? '✅ Включен' : '❌ Выключен'}
                        </div>
                    </div>
                </div>

                <div className="settings-actions">
                    <button onClick={resetSettings} className="btn btn-warning">
                        🔄 Сбросить настройки
                    </button>
                    <div className="settings-hint">
                        ⚡ Настройки применяются автоматически
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;