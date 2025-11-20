import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function TechnologyList() {
    const [technologies, setTechnologies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('technologies');
        if (saved) {
            setTechnologies(JSON.parse(saved));
        }
    }, []);

    const filteredTechnologies = technologies.filter(tech =>
        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusText = (status) => {
        const statusMap = {
            'not-started': 'Не начато',
            'in-progress': 'В процессе',
            'completed': 'Завершено'
        };
        return statusMap[status] || status;
    };

    const getStatusClass = (status) => {
        const classMap = {
            'not-started': 'status-not-started',
            'in-progress': 'status-in-progress',
            'completed': 'status-completed'
        };
        return classMap[status] || '';
    };

    return (
        <div className="page">
            <div className="page-header">
                <h1>Все технологии</h1>
                <Link to="/add-technology" className="btn btn-primary">
                    + Добавить технологию
                </Link>
            </div>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Поиск технологий..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <span className="search-results">
          Найдено: {filteredTechnologies.length}
        </span>
            </div>

            <div className="technologies-grid">
                {filteredTechnologies.map(tech => (
                    <div key={tech.id} className="technology-item">
                        <div className="tech-header">
                            <h3>{tech.title}</h3>
                            <span className={`category-badge ${tech.category}`}>
                {tech.category}
              </span>
                        </div>
                        <p className="tech-description">{tech.description}</p>
                        <div className="technology-meta">
              <span className={`status ${getStatusClass(tech.status)}`}>
                {getStatusText(tech.status)}
              </span>
                            <Link to={`/technology/${tech.id}`} className="btn-link">
                                Подробнее →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTechnologies.length === 0 && (
                <div className="empty-state">
                    {searchQuery ? (
                        <>
                            <p>По запросу "{searchQuery}" ничего не найдено.</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="btn btn-secondary"
                            >
                                Очистить поиск
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Технологий пока нет.</p>
                            <Link to="/add-technology" className="btn btn-primary">
                                Добавить первую технологию
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default TechnologyList;