import { useState } from 'react';
import Modal from './Modal.js';  // Добавьте .js

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
    const [showNotesModal, setShowNotesModal] = useState(false);
    const [localNotes, setLocalNotes] = useState(technology.notes);

    const statusColors = {
        'not-started': '#f44336',
        'in-progress': '#ff9800',
        'completed': '#4caf50'
    };

    const statusLabels = {
        'not-started': 'Не начато',
        'in-progress': 'В процессе',
        'completed': 'Завершено'
    };

    const handleStatusChange = (newStatus) => {
        onStatusChange(technology.id, newStatus);
    };

    const handleSaveNotes = () => {
        onNotesChange(technology.id, localNotes);
        setShowNotesModal(false);
    };

    return (
        <div className="technology-card">
            <div className="tech-header">
                <h3>{technology.title}</h3>
                <span className={`category-badge ${technology.category}`}>
                    {technology.category}
                </span>
            </div>

            <p className="tech-description">{technology.description}</p>

            <div className="tech-status">
                <span
                    className="status-indicator"
                    style={{ backgroundColor: statusColors[technology.status] }}
                />
                <span>{statusLabels[technology.status]}</span>
            </div>

            <div className="tech-actions">
                <select
                    value={technology.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="status-select"
                >
                    <option value="not-started">Не начато</option>
                    <option value="in-progress">В процессе</option>
                    <option value="completed">Завершено</option>
                </select>

                <button
                    onClick={() => setShowNotesModal(true)}
                    className="notes-btn"
                >
                    📝 Заметки
                </button>
            </div>

            {technology.notes && (
                <div className="notes-preview">
                    <strong>Заметка:</strong> {technology.notes.substring(0, 50)}...
                </div>
            )}

            <Modal
                isOpen={showNotesModal}
                onClose={() => setShowNotesModal(false)}
                title={`Заметки: ${technology.title}`}
            >
                <div className="notes-modal-content">
                    <textarea
                        value={localNotes}
                        onChange={(e) => setLocalNotes(e.target.value)}
                        placeholder="Записывайте сюда важные моменты..."
                        rows="6"
                        className="notes-textarea"
                    />
                    <div className="notes-hint">
                        {localNotes.length > 0
                            ? `Заметка сохранена (${localNotes.length} символов)`
                            : 'Добавьте заметку'
                        }
                    </div>
                    <div className="modal-actions">
                        <button onClick={handleSaveNotes} className="btn btn-primary">
                            Сохранить
                        </button>
                        <button
                            onClick={() => setShowNotesModal(false)}
                            className="btn btn-secondary"
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default TechnologyCard;