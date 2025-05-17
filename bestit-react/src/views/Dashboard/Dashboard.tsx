import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Layout from '../../components/Layout/Layout';

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Definicja Serverless (5 minut)', completed: false },
        { id: 2, title: 'Wady i ograniczenia (5 minut)', completed: true },
        { id: 3, title: 'Mini-ćwiczenie (10 minut)', completed: false },
    ]);

    const progress = useMemo(() => {
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;
        return {
            percentage: (completedTasks / totalTasks) * 100,
            completed: completedTasks,
            total: totalTasks
        };
    }, [tasks]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleTask = (taskId: number) => {
        setTasks(tasks.map(task => 
            task.id === taskId 
                ? { ...task, completed: !task.completed }
                : task
        ));
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('pl-PL', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const navigateDate = (direction: 'prev' | 'next') => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            if (direction === 'prev') {
                newDate.setDate(newDate.getDate() - 1);
            } else {
                newDate.setDate(newDate.getDate() + 1);
            }
            return newDate;
        });
    };

    return (
        <Layout>
            <main className="content box">
                <header className="dashboard-header">
                    <div className="date-navigation">
                        <button className="nav-btn" onClick={() => navigateDate('prev')}>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <span className="current-date">{formatDate(currentDate)}</span>
                        <button className="nav-btn" onClick={() => navigateDate('next')}>
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </header>
                <div className="dashboard-content">
                    <div className="main-progress">
                        <div className="progress-bar-container">
                            <div 
                                className="progress-bar" 
                                style={{ width: `${progress.percentage}%` }}
                            >
                                <span className="progress-text">
                                    {Math.round(progress.percentage)}%
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="task-list">
                        {tasks.map(task => (
                            <div key={task.id} className="input-group">
                                <div className="checkbox-wrapper">
                                    <input 
                                        type="checkbox" 
                                        id={`task-${task.id}`}
                                        className="custom-checkbox"
                                        checked={task.completed}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            toggleTask(task.id);
                                        }}
                                    />
                                    <label 
                                        htmlFor={`task-${task.id}`} 
                                        className="checkbox-label"
                                        onClick={(e) => e.stopPropagation()}
                                    ></label>
                                </div>
                                <Link 
                                    to={`/task/${task.id}`} 
                                    className="task-link"
                                >
                                    <p className={`task-title ${task.completed ? 'completed' : ''}`}>
                                        {task.title}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            </Layout>
    );
};

export default Dashboard;
