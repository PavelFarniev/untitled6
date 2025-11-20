import { useState, useEffect } from 'react';

function useSettings() {
    const [settings, setSettings] = useState({
        username: 'Гость',
        theme: 'light',
        notifications: true,
        language: 'ru',
        autoSave: true,
        fontSize: 'medium',
        compactView: false
    });

    // Загрузка настроек при монтировании
    useEffect(() => {
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
            const parsedSettings = JSON.parse(savedSettings);
            setSettings(parsedSettings);
            applySettings(parsedSettings);
        }
    }, []);

    // Применение настроек к приложению
    const applySettings = (newSettings) => {
        const root = document.documentElement;
        const body = document.body;

        // Применяем тему
        root.setAttribute('data-theme', newSettings.theme);

        // Применяем размер шрифта
        if (newSettings.fontSize === 'small') {
            root.style.fontSize = '14px';
        } else if (newSettings.fontSize === 'large') {
            root.style.fontSize = '18px';
        } else {
            root.style.fontSize = '16px';
        }

        // Применяем компактный вид
        if (newSettings.compactView) {
            body.classList.add('compact-view');
        } else {
            body.classList.remove('compact-view');
        }

        // Применяем язык
        root.setAttribute('lang', newSettings.language);

        // Сохраняем имя пользователя
        const currentUser = localStorage.getItem('username');
        if (!currentUser || currentUser === 'Гость') {
            localStorage.setItem('username', newSettings.username);
        }
    };

    const updateSettings = (newSettings) => {
        setSettings(newSettings);
        applySettings(newSettings);
        localStorage.setItem('userSettings', JSON.stringify(newSettings));
    };

    const updateSetting = (key, value) => {
        const newSettings = { ...settings, [key]: value };
        updateSettings(newSettings);
    };

    const resetSettings = () => {
        const defaultSettings = {
            username: 'Гость',
            theme: 'light',
            notifications: true,
            language: 'ru',
            autoSave: true,
            fontSize: 'medium',
            compactView: false
        };
        updateSettings(defaultSettings);
    };

    return {
        settings,
        updateSettings,
        updateSetting,
        resetSettings
    };
}

export default useSettings;