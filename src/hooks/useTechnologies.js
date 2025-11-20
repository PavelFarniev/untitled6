import useLocalStorage from './useLocalStorage.js';

const initialTechnologies = [
    {
        id: 1,
        title: 'React Components',
        description: 'Изучение базовых компонентов',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 2,
        title: 'Node.js Basics',
        description: 'Основы серверного JavaScript',
        status: 'not-started',
        notes: '',
        category: 'backend'
    },
    {
        id: 3,
        title: 'HTML & CSS',
        description: 'Основы верстки веб-страниц',
        status: 'in-progress',
        notes: '',
        category: 'frontend'
    },
    {
        id: 4,
        title: 'MongoDB',
        description: 'Работа с нереляционными базами данных',
        status: 'completed',
        notes: 'Прошел базовый курс по MongoDB',
        category: 'database'
    },
    {
        id: 5,
        title: 'Express.js',
        description: 'Создание серверных приложений на Node.js',
        status: 'not-started',
        notes: '',
        category: 'backend'
    }
];

function useTechnologies() {
    const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

    const updateStatus = (techId, newStatus) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, status: newStatus } : tech
            )
        );
    };

    const updateNotes = (techId, newNotes) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    };

    const calculateProgress = () => {
        if (technologies.length === 0) return 0;
        const completed = technologies.filter(tech => tech.status === 'completed').length;
        return Math.round((completed / technologies.length) * 100);
    };

    const markAllCompleted = () => {
        setTechnologies(prev =>
            prev.map(tech => ({ ...tech, status: 'completed' }))
        );
    };

    const resetAllStatuses = () => {
        setTechnologies(prev =>
            prev.map(tech => ({ ...tech, status: 'not-started' }))
        );
    };

    return {
        technologies,
        updateStatus,
        updateNotes,
        markAllCompleted,
        resetAllStatuses,
        progress: calculateProgress()
    };
}

export default useTechnologies;