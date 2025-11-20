import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function TechnologyDetail() {
    const { techId } = useParams();
    const navigate = useNavigate();
    const [technology, setTechnology] = useState(null);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('technologies');
        if (saved) {
            const technologies = JSON.parse(saved);
            const tech = technologies.find(t => t.id === parseInt(techId));
            setTechnology(tech);
            setNotes(tech?.notes || '');
        }
    }, [techId]);

    const updateStatus = (newStatus) => {
        const saved = localStorage.getItem('technologies');
        if (saved) {
            const technologies = JSON.parse(saved);
            const updated = technologies.map(tech =>
                tech.id === parseInt(techId) ? { ...tech, status: newStatus } : tech
            );
            localStorage.setItem('technologies', JSON.stringify(updated));
            setTechnology({ ...technology, status: newStatus });
        }
    };

    const saveNotes = () => {
        const saved = localStorage.getItem('technologies');
        if (saved) {
            const technologies = JSON.parse(saved);
            const updated = technologies.map(tech =>
                tech.id === parseInt(techId) ? { ...tech, notes } : tech
            );
            localStorage.setItem('technologies', JSON.stringify(updated));
            setTechnology({ ...technology, notes });
            alert('Заметки сохранены!');
        }
    };

    const deleteTechnology = () => {
        if (window.confirm('Вы уверены, что хотите удалить эту технологию?')) {
            const saved = localStorage.getItem('technologies');
            if (saved) {
                const technologies = JSON.parse(saved);
                const updated = technologies.filter(tech => tech.id !== parseInt(techId));
                localStorage.setItem('technologies', JSON.stringify(updated));
                navigate('/technologies');
            }
        }
    };

    if (!technology) {
        return (
            <div className="page">
                <h1>Технология не найдена</h1>
                <p>Технология с ID {techId} не существует.</p>
                <Link to="/technologies" className="btn">
                    ← Назад к списку
                </Link>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="page-header">
                <Link to="/technologies" className="back-link">
                    ← Назад к списку
                </Link>
                <div className="header-actions">
                    <h1>{technology.title}</h1>
                    <button onClick={deleteTechnology} className="btn btn-danger">
                        Удалить
                    </button>
                </div>
            </div>

            <div className="technology-detail">
                <div className="detail-section">
                    <h3>Описание</h3>
                    <p>{technology.description}</p>
                </div>

                <div className="detail-section">
                    <h3>Статус изучения</h3>
                    <div className="status-buttons">
                        <button
                            onClick={() => updateStatus('not-started')}
                            className={`btn ${technology.status === 'not-started' ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            Не начато
                        </button>
                        <button
                            onClick={() => updateStatus('in-progress')}
                            className={`btn ${technology.status === 'in-progress' ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            В процессе
                        </button>
                        <button
                            onClick={() => updateStatus('completed')}
                            className={`btn ${technology.status === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            Завершено
                        </button>
                    </div>
                </div>

                <div className="detail-section">
                    <h3>Мои заметки</h3>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Записывайте сюда важные моменты..."
                        rows="6"
                        className="notes-textarea"
                    />
                    <button onClick={saveNotes} className="btn btn-primary">
                        Сохранить заметки
                    </button>
                </div>

                <div className="detail-section">
                    <h3>Информация</h3>
                    <div className="tech-info">
                        <p><strong>Категория:</strong> {technology.category}</p>
                        <p><strong>ID:</strong> {technology.id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechnologyDetail;