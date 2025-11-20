import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [technologies, setTechnologies] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        inProgress: 0,
        notStarted: 0
    });

    useEffect(() => {
        const saved = localStorage.getItem('technologies');
        if (saved) {
            const techs = JSON.parse(saved);
            setTechnologies(techs);

            const completed = techs.filter(t => t.status === 'completed').length;
            const inProgress = techs.filter(t => t.status === 'in-progress').length;
            const notStarted = techs.filter(t => t.status === 'not-started').length;

            setStats({
                total: techs.length,
                completed,
                inProgress,
                notStarted
            });
        }
    }, []);

    const progressPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

    return (
        <div className="page">
            <h1>Панель управления</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Всего технологий</h3>
                    <div className="stat-number">{stats.total}</div>
                </div>
                <div className="stat-card">
                    <h3>Завершено</h3>
                    <div className="stat-number completed">{stats.completed}</div>
                </div>
                <div className="stat-card">
                    <h3>В процессе</h3>
                    <div className="stat-number in-progress">{stats.inProgress}</div>
                </div>
                <div className="stat-card">
                    <h3>Не начато</h3>
                    <div className="stat-number not-started">{stats.notStarted}</div>
                </div>
            </div>

            <div className="progress-section">
                <h3>Общий прогресс: {progressPercentage}%</h3>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>

            <div className="recent-technologies">
                <h3>Недавние технологии</h3>
                {technologies.slice(0, 5).map(tech => (
                    <div key={tech.id} className="dashboard-tech-item">
                        <span className="tech-name">{tech.title}</span>
                        <span className={`status status-${tech.status}`}>
              {tech.status === 'completed' ? '✅' :
                  tech.status === 'in-progress' ? '🔄' : '⏳'}
            </span>
                    </div>
                ))}
                {technologies.length === 0 && (
                    <p>Технологий пока нет. <Link to="/add-technology">Добавьте первую!</Link></p>
                )}
            </div>

            <div className="dashboard-actions">
                <Link to="/add-technology" className="btn btn-primary">
                    Добавить технологию
                </Link>
                <Link to="/technologies" className="btn btn-secondary">
                    Все технологии
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;