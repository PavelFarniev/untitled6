import { useState } from 'react';
import Modal from './Modal.js';

function QuickActions({ onMarkAllCompleted, onResetAll, technologies }) {
    const [showExportModal, setShowExportModal] = useState(false);

    const handleExport = () => {
        const data = {
            exportedAt: new Date().toISOString(),
            technologies: technologies
        };
        const dataStr = JSON.stringify(data, null, 2);

        // Создаем blob и скачиваем файл
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `technologies-export-${new Date().getTime()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setShowExportModal(true);
    };

    return (
        <div className="quick-actions">
            <h3>Быстрые действия</h3>
            <div className="action-buttons">
                <button onClick={onMarkAllCompleted} className="btn btn-success">
                    ☑ Отметить все как выполненные
                </button>
                <button onClick={onResetAll} className="btn btn-warning">
                    ↻ Сбросить все статусы
                </button>
                <button onClick={handleExport} className="btn btn-info">
                    📤 Экспорт данных
                </button>
            </div>

            <Modal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                title="Экспорт данных"
            >
                <div className="export-modal-content">
                    <p>✅ Данные успешно экспортированы!</p>
                    <p>Файл с технологиями скачан автоматически.</p>
                    <button
                        onClick={() => setShowExportModal(false)}
                        className="btn btn-primary"
                    >
                        Закрыть
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default QuickActions;