import { Link } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <nav className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="logo">
            <h2>BestIT</h2>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
        </button>
        <ul className="nav-links">
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-home"></i>
                    <span>Strona główna</span>
                </Link>
            </li>
            <li>
                <Link to="/profil">
                    <i className="fas fa-user"></i>
                    <span>Profil</span>
                </Link>
            </li>
            <li>
                <Link to="/dashboard/applications">
                    <i className="fas fa-briefcase"></i>
                    <span>Moje aplikacje</span>
                </Link>
            </li>
            <li>
                <Link to="/dashboard/messages">
                    <i className="fas fa-envelope"></i>
                    <span>Wiadomości</span>
                </Link>
            </li>
            <li>
                <Link to="/dashboard/settings">
                    <i className="fas fa-cog"></i>
                    <span>Ustawienia</span>
                </Link>
            </li>
        </ul>
        <div className="user-section">
            <div className="user-info">
                <div className="user-avatar">
                    <i className="fas fa-user-circle"></i>
                </div>
                <div className="user-details">
                    <span className="user-name">Jan Kowalski</span>
                    <span className="user-role">Użytkownik</span>
                </div>
            </div>
            <button className="logout-button">
                <i className="fas fa-sign-out-alt"></i>
                <span>Wyloguj</span>
            </button>
        </div>
    </nav>
    );
};

export default Sidebar;
